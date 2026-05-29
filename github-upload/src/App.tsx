/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PageId, ScreenState, Product, PointsProduct, CartItem, Address, Order, PointsLog } from './types';
import { PRODUCTS, POINTS_PRODUCTS, INITIAL_ADDRESSES, INITIAL_ORDERS, INITIAL_POINTS_HISTORY } from './data';
import { WeChatFrame } from './components/WeChatFrame';
import { PageRenderer } from './components/PageRenderer';
import { 
  Sparkles, 
  RotateCcw, 
  Palette, 
  Info, 
  Check, 
  Zap, 
  HelpCircle,
  Smartphone, 
  FileCode,
  CheckCircle,
  Clock,
  LayoutGrid
} from 'lucide-react';

export default function App() {
  // 1. Interactive Application States
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [screenState, setScreenState] = useState<ScreenState>('normal');
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [pointsProducts, setPointsProducts] = useState<PointsProduct[]>(POINTS_PRODUCTS);
  
  // Initialize with standard items in cart to make it instantly alive
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Humidifier (189)
      quantity: 1,
      selectedSpec: '基础款-白色',
      checked: true,
    },
    {
      product: PRODUCTS[7], // Cup (69)
      quantity: 2,
      selectedSpec: '灰白色粗陶',
      checked: true,
    }
  ]);

  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [pointsHistory, setPointsHistory] = useState<PointsLog[]>(INITIAL_POINTS_HISTORY);
  
  // User Profile details
  const [userPoints, setUserPoints] = useState<number>(3500); // 3500 starting points
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>(['香薰', '水杯', '台灯']);
  const [selectedAddress, setSelectedAddressState] = useState<Address | null>(INITIAL_ADDRESSES[0]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(INITIAL_ORDERS[1]); // defaulted pending_pay order

  // Detail item views state trackers
  const [currentProduct, setCurrentProduct] = useState<Product>(PRODUCTS[0]);
  const [currentPointsProduct, setCurrentPointsProduct] = useState<PointsProduct>(POINTS_PRODUCTS[0]);

  // 2. State Actions for Interactivity
  const addToCart = (product: Product, spec?: string) => {
    const selectedSpec = spec || product.specs?.[0] || '默认规格';
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.selectedSpec === selectedSpec
    );

    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { product, quantity: 1, selectedSpec, checked: true }]);
    }
    alert(`成功加购: ${product.title}\n规格: ${selectedSpec}`);
  };

  const updateCartQty = (index: number, change: number) => {
    const newCart = [...cart];
    newCart[index].quantity += change;
    if (newCart[index].quantity < 1) {
      newCart[index].quantity = 1;
    }
    setCart(newCart);
  };

  const toggleCartCheck = (index: number) => {
    const newCart = [...cart];
    newCart[index].checked = !newCart[index].checked;
    setCart(newCart);
  };

  const toggleAllCartCheck = () => {
    const allChecked = cart.every((it) => it.checked);
    const newCart = cart.map((it) => ({ ...it, checked: !allChecked }));
    setCart(newCart);
  };

  const deleteCartItem = (index: number) => {
    const newCart = cart.filter((_, idx) => idx !== index);
    setCart(newCart);
  };

  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addr,
      id: String(addresses.length + 1),
    };
    if (newAddr.isDefault) {
      setAddresses(addresses.map((a) => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses([...addresses, newAddr]);
    }
    setSelectedAddressState(newAddr);
  };

  const deleteAddress = (id: string) => {
    const newAddresses = addresses.filter((a) => a.id !== id);
    setAddresses(newAddresses);
    if (selectedAddress?.id === id) {
      setSelectedAddressState(newAddresses[0] || null);
    }
  };

  const setDefaultAddress = (id: string) => {
    const newAddresses = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    setAddresses(newAddresses);
    const def = newAddresses.find((a) => a.id === id);
    if (def) setSelectedAddressState(def);
  };

  const createOrderFromCart = () => {
    const checkedItems = cart.filter((item) => item.checked);
    if (checkedItems.length === 0) {
      alert("请至少勾选一样加购物品进行结算！");
      return;
    }

    const subtotal = checkedItems.reduce((s, it) => s + it.product.price * it.quantity, 0);
    const newOrder: Order = {
      id: `o${orders.length + 1}`,
      orderNumber: `WX202605290${Math.floor(100000 + Math.random() * 900000)}`,
      items: checkedItems,
      totalPrice: subtotal,
      status: 'pending_pay',
      address: selectedAddress || addresses[0] || undefined,
      createTime: '2026-05-29 00:37',
    };

    setOrders([newOrder, ...orders]);
    setActiveOrder(newOrder);
    
    // Clear checked elements from cart
    setCart(cart.filter((it) => !it.checked));
    
    // Go directly to payment selection
    setCurrentPage('payment_select');
  };

  const completePayment = (success: boolean) => {
    if (!activeOrder) return;
    
    // Update order state
    const updatedOrders = orders.map((o) => {
      if (o.id === activeOrder.id) {
        return {
          ...o,
          status: success ? 'completed' as const : 'pending_pay' as const,
          payTime: success ? '2026-05-29 00:37' : undefined,
          paymentMethod: success ? '微信支付' : undefined,
        };
      }
      return o;
    });

    setOrders(updatedOrders);
    
    const matched = updatedOrders.find(o => o.id === activeOrder.id);
    if (matched) setActiveOrder(matched);

    setCurrentPage('payment_result');
  };

  const redeemPoints = (product: PointsProduct) => {
    if (userPoints < product.points) {
      alert("您的剩余积分额度不足，无法进行兑换！");
      return;
    }

    const newLog: PointsLog = {
      id: `pl${pointsHistory.length + 1}`,
      productTitle: product.title,
      pointsSpent: product.points,
      cashSpent: product.cashPrice,
      date: '2026-05-29 00:37',
      status: 'pending',
      code: `DH${Math.floor(10000000 + Math.random() * 90000000)}`,
    };

    setUserPoints(userPoints - product.points);
    setPointsHistory([newLog, ...pointsHistory]);
    
    // Decrease stock count
    setPointsProducts(
      pointsProducts.map((p) => (p.id === product.id ? { ...p, stock: p.stock - 1 } : p))
    );

    alert(`兑换成功！消费 ${product.points} 积分。可前往兑换记录查看详情！`);
  };

  const cancelOrder = (orderId: string) => {
    const updatedOrders = orders.filter((o) => o.id !== orderId);
    setOrders(updatedOrders);
    alert("订单取消成功！");
  };

  const resetAllSimulations = () => {
    setCart([
      {
        product: PRODUCTS[0],
        quantity: 1,
        selectedSpec: '基础款-白色',
        checked: true,
      },
      {
        product: PRODUCTS[7],
        quantity: 2,
        selectedSpec: '灰白色粗陶',
        checked: true,
      }
    ]);
    setAddresses(INITIAL_ADDRESSES);
    setOrders(INITIAL_ORDERS);
    setPointsHistory(INITIAL_POINTS_HISTORY);
    setUserPoints(3500);
    setSearchQuery('');
    setSearchHistory(['香薰', '水杯', '台灯']);
    setSelectedAddressState(INITIAL_ADDRESSES[0]);
    setActiveOrder(INITIAL_ORDERS[1]);
    setCurrentPage('home');
    setScreenState('normal');
    alert("所有的演示模拟数据、购物车以及积分设定已复位成功！");
  };

  // Determine standard page titles
  const getPageTitle = (id: PageId) => {
    switch (id) {
      case 'home': return '极简生活馆';
      case 'categories': return '分类浏览';
      case 'list': return '精品好物';
      case 'detail': return '好物详情';
      case 'search': return '搜索好物';
      case 'cart': return '我的购物车';
      case 'checkout': return '确认结算';
      case 'payment_select': return '微信支付平台';
      case 'payment_result': return '付款状态';
      case 'address_manage': return '收货地址';
      case 'points_home': return '积分专享馆';
      case 'points_detail': return '专享好礼详情';
      case 'points_history': return '我的积分兑换记录';
      case 'profile': return '极简会员中心';
      case 'orders': return '我的电子账单一览';
      case 'settings': return '系统设置空间';
      default: return '店内好物';
    }
  };

  const pageChineseNames: Record<PageId, string> = {
    home: '01. 首页 (Home)',
    categories: '02. 商品分类页 (Category)',
    list: '03. 商品列表页 (List)',
    detail: '04. 商品详情页 (Detail)',
    search: '05. 搜索页 (Search)',
    cart: '06. 购物车页 (Cart)',
    checkout: '07. 订单确认页 (Checkout)',
    payment_select: '08. 支付选择页 (Pay Select)',
    payment_result: '09. 支付结果页 (Pay Result)',
    address_manage: '10. 地址管理页 (Address)',
    points_home: '11. 积分商城首页 (Points Mall)',
    points_detail: '12. 积分详情页 (Points Detail)',
    points_history: '13. 积分历史页 (Points History)',
    profile: '14. 个人中心页 (Profile)',
    orders: '15. 全部订单页 (Orders)',
    settings: '16. 系统设置页 (Settings)',
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] text-[#333333] font-sans flex flex-col antialiased">
      
      {/* Dynamic Header row */}
      <header className="bg-white border-b border-[#E5E5E5] px-8 py-4 shrink-0 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#FF7A2F] rounded-[8px] flex items-center justify-center text-white">
            <LayoutGrid className="w-5 h-5 pointer-events-none" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-[#333333]">微信小程序全套极简主义电商 UI 系统一览规范</h1>
            <p className="text-[10px] text-[#999999] font-medium tracking-wide">MINIMALIST WECHAT MINI-PROGRAM DESIGN TOKENS & WORKFLOW INTERACTION EMULATOR</p>
          </div>
        </div>

        <button 
          id="global-reset-btn"
          onClick={resetAllSimulations}
          className="flex items-center gap-1.5 px-4 h-9 bg-[#F5F5F5] text-xs font-semibold rounded-[8px] border border-[#E5E5E5] text-[#333333] hover:bg-orange-50 hover:text-[#FF7A2F] hover:border-[#FF7A2F]/40 active:scale-95 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>重设模拟器数值</span>
        </button>
      </header>

      {/* Main 3-Column Workspace Frame */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start overflow-hidden">
        
        {/* Left Column - Specifications (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-[16px] border border-[#E5E5E5] p-5 shadow-sm flex flex-col gap-5 h-[calc(100vh-130px)] overflow-y-auto no-scrollbar">
          
          {/* Header section info */}
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#FF7A2F] flex items-center gap-1.5 select-none">
              <Palette className="w-4 h-4" />
              <span>UI 核心设计令牌 (TOKENS)</span>
            </h2>
            <p className="text-[10px] text-[#999999] mt-1">严格遵循 8px 网格与高品质留白规范搭建</p>
          </div>

          {/* Palette spec cards */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[11px] font-bold text-[#333333]">1. 标准色值 (Brand Palette)</h3>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="bg-[#FF7A2F] rounded-[8px] p-2.5 text-white flex flex-col justify-between h-14">
                <span className="text-[9px] tracking-wide font-semibold opacity-90">主色 (Brand Orange)</span>
                <span className="text-xs font-mono font-bold">#FF7A2F</span>
              </div>
              <div className="bg-[#333333] rounded-[8px] p-2.5 text-white flex flex-col justify-between h-14">
                <span className="text-[9px] tracking-wide font-semibold opacity-90">深灰质感文字</span>
                <span className="text-xs font-mono font-bold">#333333</span>
              </div>
              <div className="bg-white border border-[#E5E5E5] rounded-[8px] p-2.5 text-[#333333] flex flex-col justify-between h-14 shadow-xs">
                <span className="text-[9px] tracking-wide font-medium text-[#999999]">辅助背景白</span>
                <span className="text-xs font-mono font-bold text-[#333333]">#FFFFFF</span>
              </div>
              <div className="bg-[#F5F5F5] rounded-[8px] p-2.5 text-[#333333] flex flex-col justify-between h-14">
                <span className="text-[9px] tracking-wide font-medium text-[#999999]">浅灰背景色</span>
                <span className="text-xs font-mono font-bold text-[#666666]">#F5F5F5</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-1">
              <div className="bg-red-500 rounded-[8px] p-2 text-white h-11 flex flex-col justify-between">
                <span className="text-[8px] opacity-90">警示红</span>
                <span className="text-[9px] font-mono font-semibold">Danger</span>
              </div>
              <div className="bg-[#09BB07] rounded-[8px] p-2 text-white h-11 flex flex-col justify-between">
                <span className="text-[8px] opacity-90">成功绿 (WeChat)</span>
                <span className="text-[9px] font-mono font-semibold">#09BB07</span>
              </div>
              <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[8px] p-2 text-[#999999] h-11 flex flex-col justify-between shadow-xs">
                <span className="text-[8px]">次要文字</span>
                <span className="text-[9px] font-mono font-semibold">#999999</span>
              </div>
            </div>
          </div>

          {/* Guidelines notes */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[11px] font-bold text-[#333333]">2. 结构间距与规范原则</h3>
            <ul className="text-[10px] text-[#666666] flex flex-col gap-2.5 bg-[#FBFBFB] p-3 rounded-[8px] border border-gray-100 list-none font-sans">
              <li className="flex items-start gap-1.5 leading-relaxed">
                <span className="text-[#FF7A2F] font-bold shrink-0 mt-0.5">•</span>
                <span><strong>8px 圆角标准</strong>：所有界面元素（商品卡片、按钮、分类区块、弹窗容器）均采用精准 8px 圆角限制，保障视觉连续性和柔美轮廓。</span>
              </li>
              <li className="flex items-start gap-1.5 leading-relaxed">
                <span className="text-[#FF7A2F] font-bold shrink-0 mt-0.5">•</span>
                <span><strong>包容性留白 (Negative Space)</strong>：弃用繁复的分隔边线与花哨插画。采用宽阔、明亮的内边距排布，呼吸感充足。</span>
              </li>
              <li className="flex items-start gap-1.5 leading-relaxed">
                <span className="text-[#FF7A2F] font-bold shrink-0 mt-0.5">•</span>
                <span><strong>线性极简图标</strong>：基于 Lucide 精调，笔触精细统一，杜绝臃肿的色块图标对用户注意力的无谓干扰。</span>
              </li>
              <li className="flex items-start gap-1.5 leading-relaxed">
                <span className="text-[#FF7A2F] font-bold shrink-0 mt-0.5">•</span>
                <span><strong>卡片阴影抑制</strong>：运用 `shadow-sm` 及 1.5% 的半透明弥散暗色，烘托层次的同时避免厚重或人工质感。</span>
              </li>
            </ul>
          </div>

          {/* Interactive State Control panel */}
          <div className="flex flex-col gap-3.5 bg-orange-50/50 p-4 border border-[#FF7A2F]/15 rounded-[8px] mt-auto">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FF7A2F]" />
              <h3 className="text-[11px] font-bold text-[#FF7A2F]">3. 界面状态审核监控 (Screen State)</h3>
            </div>
            
            <p className="text-[10px] text-[#666666] leading-relaxed">
              根据设计规范，每个页面都必须适配三种反馈视图。点击即可一键改变
              目前右侧 Mini 程序承载器的呈现状态：
            </p>

            <div className="grid grid-cols-3 gap-1.5">
              <button
                id="state-controller-normal"
                onClick={() => setScreenState('normal')}
                className={`py-1.5 rounded-[8px] text-[10px] font-bold border transition-all cursor-pointer ${
                  screenState === 'normal'
                    ? 'bg-[#FF7A2F] text-white border-[#FF7A2F] shadow-sm'
                    : 'bg-white text-[#666666] border-[#E5E5E5] hover:bg-orange-50/40'
                }`}
              >
                1. 正常 (Normal)
              </button>
              
              <button
                id="state-controller-loading"
                onClick={() => setScreenState('loading')}
                className={`py-1.5 rounded-[8px] text-[10px] font-bold border transition-all cursor-pointer ${
                  screenState === 'loading'
                    ? 'bg-[#FF7A2F] text-white border-[#FF7A2F] shadow-sm'
                    : 'bg-white text-[#666666] border-[#E5E5E5] hover:bg-orange-50/40'
                }`}
              >
                2. 加载 (Loading)
              </button>

              <button
                id="state-controller-empty"
                onClick={() => setScreenState('empty')}
                className={`py-1.5 rounded-[8px] text-[10px] font-bold border transition-all cursor-pointer ${
                  screenState === 'empty'
                    ? 'bg-[#FF7A2F] text-white border-[#FF7A2F] shadow-sm'
                    : 'bg-white text-[#666666] border-[#E5E5E5] hover:bg-orange-50/40'
                }`}
              >
                3. 空态 (Empty)
              </button>
            </div>

            <div className="flex gap-2 items-center text-[9px] text-[#999999] mt-0.5 justify-center">
              <Info className="w-3 h-3 text-[#FF7A2F] shrink-0" />
              <span>加载状态使用骨架屏，空数据状态自适应页面。</span>
            </div>
          </div>

        </div>

        {/* Center Column - WeChat Device Emulator (lg:col-span-4) */}
        <div className="lg:col-span-4 flex items-center justify-center h-[calc(100vh-130px)]">
          <WeChatFrame 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            title={getPageTitle(currentPage)}
          >
            <PageRenderer
              pageId={currentPage}
              screenState={screenState}
              products={products}
              pointsProducts={pointsProducts}
              cart={cart}
              addresses={addresses}
              orders={orders}
              pointsHistory={pointsHistory}
              userPoints={userPoints}
              searchQuery={searchQuery}
              searchHistory={searchHistory}
              selectedAddress={selectedAddress}
              activeOrder={activeOrder}
              currentProduct={currentProduct}
              currentPointsProduct={currentPointsProduct}
              setPageId={setCurrentPage}
              setSearchQuery={setSearchQuery}
              setSearchHistory={setSearchHistory}
              addToCart={addToCart}
              updateCartQty={updateCartQty}
              toggleCartCheck={toggleCartCheck}
              toggleAllCartCheck={toggleAllCartCheck}
              deleteCartItem={deleteCartItem}
              addAddress={addAddress}
              deleteAddress={deleteAddress}
              setDefaultAddress={setDefaultAddress}
              setSelectedAddress={setSelectedAddressState}
              createOrderFromCart={createOrderFromCart}
              completePayment={completePayment}
              redeemPoints={redeemPoints}
              setCurrentProduct={setCurrentProduct}
              setCurrentPointsProduct={setCurrentPointsProduct}
              setUserPoints={setUserPoints}
              cancelOrder={cancelOrder}
            />
          </WeChatFrame>
        </div>

        {/* Right Column - Controls & Navigation Gateway (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-[16px] border border-[#E5E5E5] p-5 shadow-sm flex flex-col gap-5 h-[calc(100vh-130px)] overflow-y-auto no-scrollbar">
          
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#FF7A2F] flex items-center gap-1.5 select-none">
              <Smartphone className="w-4 h-4" />
              <span>16 套标准电商页面控制门廊</span>
            </h2>
            <p className="text-[10px] text-[#999999] mt-1">点击任意按钮强行跳转查看该页面的具体设计</p>
          </div>

          {/* Quick Nav list with clean Chinese and indicators */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[11px] font-bold text-[#333333]">跳转到页面 (Jump to Page):</h3>
            
            <div className="flex flex-col gap-1.5 max-h-[290px] overflow-y-auto pr-1 no-scrollbar border border-slate-100 p-2 rounded-[8px] bg-slate-50/40">
              {(Object.keys(pageChineseNames) as PageId[]).map((pId) => {
                const isActive = currentPage === pId;
                return (
                  <button
                    id={`nav-gate-jump-${pId}`}
                    key={pId}
                    onClick={() => {
                      setCurrentPage(pId);
                      // automatically restore state back to normal on navigation to make it smooth,
                      // but user can toggle state later
                      setScreenState('normal');
                    }}
                    className={`w-full text-left font-medium rounded-[8px] px-3 py-2 text-[10.5px] transition-all flex items-center justify-between cursor-pointer border ${
                      isActive 
                        ? 'bg-[#FF7A2F] text-white border-[#FF7A2F] font-bold shadow-xs' 
                        : 'bg-white text-[#666666] border-[#F0F0F0] hover:border-[#FF7A2F]/30 hover:bg-orange-50/20'
                    }`}
                  >
                    <span>{pageChineseNames[pId]}</span>
                    {isActive ? (
                      <CheckCircle className="w-3.5 h-3.5 text-white shrink-0" />
                    ) : (
                      <span className="text-[8.5px] text-[#999999] bg-[#F5F5F5] px-1.5 py-0.5 rounded-[4px]">预览</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions panel */}
          <div className="flex flex-col gap-3 bg-[#FBFBFB] border border-[#E5E5E5] p-3.5 rounded-[8px]">
            <h3 className="text-[11px] font-bold text-[#333333] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#FF7A2F]" />
              <span>极简互动沙盒快捷控键</span>
            </h3>

            <div className="flex flex-col gap-2 mt-1">
              <button 
                id="quick-add-points"
                onClick={() => {
                  setUserPoints(p => p + 2000);
                  alert("赠礼操作：成功为李知白充入 2000 积分储蓄！");
                }}
                className="w-full text-center py-2 border border-[#FF7A2F] text-[#FF7A2F] hover:bg-orange-50/50 text-[10.5px] rounded-[8px] font-bold transition-all cursor-pointer"
              >
                一键赠送李知白 2000 积分
              </button>

              <button 
                id="quick-add-cart-item"
                onClick={() => {
                  setCart([...cart, {
                    product: PRODUCTS[2], // Headphones
                    quantity: 1,
                    selectedSpec: '沙砾灰',
                    checked: true,
                  }]);
                  alert("极速操作：在购物车内加塞了【降噪头戴耳机】！");
                }}
                className="w-full text-center py-2 bg-white border border-[#E5E5E5] text-[#333333] hover:text-[#FF7A2F] hover:border-[#FF7A2F]/40 text-[10.5px] rounded-[8px] font-medium transition-all cursor-pointer"
              >
                备忘：在购物车追加一件高货值耳机
              </button>
            </div>
          </div>

          {/* Mini-programs WeChat compatibility checklist */}
          <div className="flex gap-2.5 items-center mt-auto border-t border-gray-100 pt-3 text-[9.5px] text-[#999999] select-none justify-center">
            <Info className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>适配 iOS / Android 微信客户端，内置微信分享及胶囊导航防触保驾功能。</span>
          </div>

        </div>

      </main>

      {/* Styled minimalistic footer */}
      <footer className="bg-white border-t border-[#E5E5E5] px-8 py-3.5 text-center shrink-0">
        <p className="text-[10px] text-[#999999] tracking-wider font-mono font-medium">
          MINSTORE DESIGN LAB © 2026. CREATED WITH EXCELLENT CRAFTSMANSHIP FOR WECHAT MINI-PROGRAMS.
        </p>
      </footer>

    </div>
  );
}
