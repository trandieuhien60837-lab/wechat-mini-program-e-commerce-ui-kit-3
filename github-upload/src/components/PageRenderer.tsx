import React, { useState } from 'react';
import { 
  PageId, 
  ScreenState, 
  Product, 
  PointsProduct, 
  CartItem, 
  Address, 
  Order, 
  PointsLog 
} from '../types';
import { ProductImage } from './ProductImage';
import { 
  Search, 
  ChevronRight, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Trash2, 
  MapPin, 
  Check, 
  AlertTriangle, 
  Settings, 
  ShoppingBag, 
  Gift, 
  CreditCard, 
  User, 
  Clock, 
  FileText, 
  MapPinned, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  PlusCircle, 
  ShieldAlert,
  ChevronLeft,
  Wine,
  Flame,
  Sparkles
} from 'lucide-react';
import { CATEGORIES } from '../data';

interface PageRendererProps {
  pageId: PageId;
  screenState: ScreenState;
  
  // Data States
  products: Product[];
  pointsProducts: PointsProduct[];
  cart: CartItem[];
  addresses: Address[];
  orders: Order[];
  pointsHistory: PointsLog[];
  userPoints: number;
  searchQuery: string;
  searchHistory: string[];
  selectedAddress: Address | null;
  activeOrder: Order | null;
  currentProduct: Product;
  currentPointsProduct: PointsProduct;
  
  // Callbacks for interactivity
  setPageId: (id: PageId) => void;
  setSearchQuery: (query: string) => void;
  setSearchHistory: React.Dispatch<React.SetStateAction<string[]>>;
  addToCart: (product: Product, spec?: string) => void;
  updateCartQty: (index: number, change: number) => void;
  toggleCartCheck: (index: number) => void;
  toggleAllCartCheck: () => void;
  deleteCartItem: (index: number) => void;
  addAddress: (addr: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  setSelectedAddress: (addr: Address) => void;
  createOrderFromCart: () => void;
  completePayment: (success: boolean) => void;
  redeemPoints: (product: PointsProduct) => void;
  setCurrentProduct: (product: Product) => void;
  setCurrentPointsProduct: (product: PointsProduct) => void;
  setUserPoints: React.Dispatch<React.SetStateAction<number>>;
  cancelOrder: (id: string) => void;
}

export const PageRenderer: React.FC<PageRendererProps> = ({
  pageId,
  screenState,
  products,
  pointsProducts,
  cart,
  addresses,
  orders,
  pointsHistory,
  userPoints,
  searchQuery,
  searchHistory,
  selectedAddress,
  activeOrder,
  currentProduct,
  currentPointsProduct,
  setPageId,
  setSearchQuery,
  setSearchHistory,
  addToCart,
  updateCartQty,
  toggleCartCheck,
  toggleAllCartCheck,
  deleteCartItem,
  addAddress,
  deleteAddress,
  setDefaultAddress,
  setSelectedAddress,
  createOrderFromCart,
  completePayment,
  redeemPoints,
  setCurrentProduct,
  setCurrentPointsProduct,
  setUserPoints,
  cancelOrder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<'sales' | 'price_asc' | 'price_desc'>('sales');
  const [tempSearch, setTempSearch] = useState<string>('');
  
  // Add address model state
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');
  const [newAddrProv, setNewAddrProv] = useState('上海市');
  const [newAddrCity, setNewAddrCity] = useState('上海市');
  const [newAddrDist, setNewAddrDist] = useState('静安区');
  const [newAddrDetail, setNewAddrDetail] = useState('');

  // Handle address submit
  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrName || !newAddrPhone || !newAddrDetail) return;
    addAddress({
      name: newAddrName,
      phone: newAddrPhone,
      province: newAddrProv,
      city: newAddrCity,
      district: newAddrDist,
      detail: newAddrDetail,
      isDefault: addresses.length === 0, // default if first
    });
    // Reset form
    setNewAddrName('');
    setNewAddrPhone('');
    setNewAddrDetail('');
    setShowAddAddressForm(false);
  };

  // State renders
  if (screenState === 'loading') {
    return <LoadingSkeleton type={pageId} />;
  }

  if (screenState === 'empty') {
    return <EmptyDataView type={pageId} setPageId={setPageId} setUserPoints={setUserPoints} />;
  }

  // Active Category products
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = searchQuery ? p.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === 'sales') return b.sales - a.sales;
    if (selectedSort === 'price_asc') return a.price - b.price;
    if (selectedSort === 'price_desc') return b.price - a.price;
    return 0;
  });

  const activeCategoryName = CATEGORIES.find(c => c.id === selectedCategory)?.name || '所有商品';

  switch (pageId) {
    // -------------------------------------------------------------
    // Page 1: 首页 (Home Page)
    // -------------------------------------------------------------
    case 'home':
      return (
        <div className="flex flex-col gap-4 pb-16 animate-fade-in text-[#333333]">
          {/* Custom Search Header Button */}
          <div className="px-4 pt-2">
            <button 
              id="home-search-bar"
              onClick={() => setPageId('search')}
              className="w-full h-9 bg-[#F5F5F5] rounded-[8px] flex items-center px-3 gap-2 text-[#999999] text-xs cursor-pointer active:opacity-80 transition-all font-sans"
            >
              <Search className="w-4 h-4 text-[#999999]" />
              <span>搜索极简好物...</span>
            </button>
          </div>

          {/* Minimalist Soft Banners */}
          <div className="px-4">
            <div className="w-full aspect-[21/9] bg-[#FF7A2F] rounded-[8px] relative overflow-hidden shadow-md flex items-center p-5">
              <div className="z-10 max-w-[60%] flex flex-col gap-1">
                <span className="text-[9px] tracking-wider text-white/80 font-bold uppercase">SUMMER SERIES / 夏季上新季</span>
                <h3 className="text-sm font-bold leading-tight text-white">设计源于生活<br />回归纯粹本源</h3>
                <span className="text-[10px] text-white/90 font-medium mt-1">精选好物限时尊享3折起</span>
              </div>
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full pointer-events-none"></div>
              <div className="absolute right-3 bottom-0 w-24 h-24 opacity-90">
                <ProductImage type="bottle" showOrangeHighlight={false} className="w-full h-full" />
              </div>
            </div>
          </div>

          {/* Categories Horizontal Grid */}
          <div className="px-4">
            <div className="grid grid-cols-3 gap-1 bg-white p-3 rounded-[8px] border border-[#F5F5F5] shadow-sm shadow-black/[0.01]">
              {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                <button
                  id={`cat-btn-${cat.id}`}
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setPageId('categories');
                  }}
                  className="flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-[8px] bg-[#FFF3EB] group-active:bg-[#FEEAD9] flex items-center justify-center transition-all">
                    {cat.id === 'baijiu' && <Flame className="w-5 h-5 text-[#FF7A2F]" />}
                    {cat.id === 'beer' && <Sparkles className="w-5 h-5 text-[#FF7A2F]" />}
                    {cat.id === 'spirits' && <Wine className="w-5 h-5 text-[#FF7A2F]" />}
                  </div>
                  <span className="text-[10px] text-[#333333] font-medium scale-95">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts to point store */}
          <div className="px-4">
            <div 
              onClick={() => setPageId('points_home')}
              className="w-full bg-[#FFFFFF] rounded-[8px] border border-[#F5F5F5] shadow-sm shadow-black/[0.01] p-3 flex items-center justify-between cursor-pointer active:opacity-80 transition-all"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#FF7A2F]/10 flex items-center justify-center rounded-[8px]">
                  <Gift className="w-4 h-4 text-[#FF7A2F]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#333333]">积分专区</h4>
                  <p className="text-[10px] text-[#999999]">当前可用积分: {userPoints}积分可兑好物</p>
                </div>
              </div>
              <div className="flex items-center text-[#FF7A2F] text-[10px] font-semibold gap-0.5">
                <span>去兑换</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Top Selling Sec (Double Columns Grid) */}
          <div className="px-4 flex flex-col gap-2.5">
            <div className="flex justify-between items-center px-0.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#333333]">特选臻品</h3>
              <button 
                onClick={() => { setSelectedCategory('all'); setPageId('list'); }} 
                className="text-xs text-[#999999] hover:text-[#FF7A2F] font-medium flex items-center gap-0.5 scale-95"
              >
                <span>查看全部</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {products.slice(0, 4).map((p) => (
                <div 
                  id={`home-prod-${p.id}`}
                  key={p.id}
                  onClick={() => {
                    setCurrentProduct(p);
                    setPageId('detail');
                  }}
                  className="bg-white rounded-[8px] border border-[#F5F5F5] shadow-sm shadow-black/[0.015] overflow-hidden cursor-pointer flex flex-col group active:opacity-95 transition-all"
                >
                  <div className="aspect-square w-full relative">
                    <ProductImage type={p.image} className="w-full h-full" />
                  </div>
                  <div className="p-3 flex flex-col gap-1 flex-1 bg-white">
                    <h4 className="text-xs font-medium text-[#333333] line-clamp-1 group-hover:text-[#FF7A2F] transition-colors">{p.title}</h4>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-xs font-bold text-[#FF7A2F]">¥{p.price}</span>
                      {p.originalPrice && (
                        <span className="text-[9px] text-[#999999] line-through">¥{p.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // Page 2: 商品分类页 (Categories Page)
    // -------------------------------------------------------------
    case 'categories':
      return (
        <div className="flex h-[calc(100vh-140px)] animate-fade-in overflow-hidden border-t border-[#F5F5F5]">
          {/* Left Navigation bar */}
          <div className="w-20 bg-[#F5F5F5] h-full overflow-y-auto no-scrollbar flex flex-col">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  id={`cat-side-${cat.id}`}
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full py-4 text-xs font-medium transition-all text-center relative ${
                    isActive 
                      ? 'bg-white text-[#FF7A2F]' 
                      : 'text-[#666666]'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#FF7A2F] rounded-r-[4px]" />
                  )}
                  {cat.name.replace('全部商品', '全部分类')}
                </button>
              );
            })}
          </div>

          {/* Right products grid list */}
          <div className="flex-1 bg-white h-full overflow-y-auto no-scrollbar p-3.5">
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-xs font-bold text-[#333333]">{activeCategoryName}</h3>
              <span className="text-[10px] text-[#999999]">共 {filteredProducts.length} 款好物</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <ShoppingBag className="w-8 h-8 text-[#CCCCCC] mb-2" />
                <span className="text-xs text-[#999999]">此分类暂无商品</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {filteredProducts.map((p) => (
                  <div
                    id={`cat-prod-item-${p.id}`}
                    key={p.id}
                    onClick={() => {
                      setCurrentProduct(p);
                      setPageId('detail');
                    }}
                    className="flex flex-col gap-1.5 p-1.5 rounded-[8px] bg-[#FFFFFF] border border-[#F5F5F5] shadow-xs cursor-pointer active:bg-slate-50 transition-all"
                  >
                    <div className="aspect-square w-full rounded-[6px] overflow-hidden">
                      <ProductImage type={p.image} className="w-full h-full" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-medium text-[#333333] line-clamp-1">{p.title}</h4>
                      <div className="flex items-baseline justify-between mt-0.5">
                        <span className="text-[10px] font-bold text-[#FF7A2F]">¥{p.price}</span>
                        <span className="text-[8px] text-[#999999] scale-90">{p.sales}件已售</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // Page 3: 商品列表页 (Products List Page)
    // -------------------------------------------------------------
    case 'list':
      return (
        <div className="flex flex-col gap-2 pb-16 animate-fade-in text-[#333333]">
          {/* Header search bar */}
          <div className="px-4 py-1.5 flex gap-2 items-center bg-white border-b border-[#F5F5F5]">
            <div className="flex-1 h-9 bg-[#F5F5F5] rounded-[8px] flex items-center px-3 gap-2 text-xs">
              <Search className="w-4 h-4 text-[#999999]" />
              <input 
                type="text" 
                placeholder="搜索店内商品..."
                value={tempSearch}
                onChange={(e) => setTempSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSearchQuery(tempSearch);
                    if (tempSearch.trim() && !searchHistory.includes(tempSearch)) {
                      setSearchHistory(prev => [tempSearch, ...prev.slice(0, 5)]);
                    }
                  }
                }}
                className="w-full bg-transparent border-none outline-none text-[#333333] text-xs"
              />
            </div>
            {searchQuery && (
              <button 
                onClick={() => { setSearchQuery(''); setTempSearch(''); }}
                className="text-xs text-[#FF7A2F] font-medium shrink-0"
              >
                清除
              </button>
            )}
          </div>

          {/* Sticky Sorting bar */}
          <div className="flex bg-white py-2 px-4 justify-between border-b border-[#F5F5F5] font-sans">
            <button 
              onClick={() => setSelectedSort('sales')}
              className={`text-xs font-semibold ${selectedSort === 'sales' ? 'text-[#FF7A2F]' : 'text-[#666666]'}`}
            >
              销量优先
            </button>
            <button 
              onClick={() => setSelectedSort('price_asc')}
              className={`text-xs font-semibold ${selectedSort === 'price_asc' ? 'text-[#FF7A2F]' : 'text-[#666666]'}`}
            >
              价格由低到高
            </button>
            <button 
              onClick={() => setSelectedSort('price_desc')}
              className={`text-xs font-semibold ${selectedSort === 'price_desc' ? 'text-[#FF7A2F]' : 'text-[#666666]'}`}
            >
              价格由高到低
            </button>
          </div>

          {/* List display */}
          <div className="px-4 mt-2 flex flex-col gap-3">
            {sortedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[8px] p-6 border border-[#F5F5F5]">
                <ShoppingBag className="w-12 h-12 text-[#CCCCCC] mb-3" />
                <p className="text-xs text-[#999999] mb-4">没有匹配的商品，换个关键词试试吧</p>
                <button 
                  onClick={() => { setSearchQuery(''); setTempSearch(''); }} 
                  className="px-4 py-2 border border-[#FF7A2F] text-[#FF7A2F] text-xs rounded-[8px] font-medium"
                >
                  查看全部商品
                </button>
              </div>
            ) : (
              sortedProducts.map((p) => (
                <div
                  id={`list-prod-item-${p.id}`}
                  key={p.id}
                  onClick={() => {
                    setCurrentProduct(p);
                    setPageId('detail');
                  }}
                  className="bg-white rounded-[8px] border border-[#F5F5F5] shadow-sm shadow-black/[0.01] p-3 flex gap-3 cursor-pointer active:opacity-95 transition-all"
                >
                  <div className="w-20 h-20 shrink-0">
                    <ProductImage type={p.image} className="w-full h-full" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <h4 className="text-xs font-medium text-[#333333] line-clamp-1">{p.title}</h4>
                      <p className="text-[10px] text-[#999999] line-clamp-1 mt-0.5">{p.description}</p>
                      
                      {/* Tags */}
                      <div className="flex gap-1.5 mt-1.5 flex-wrap">
                        {p.tags?.slice(0, 2).map((tg, idx) => (
                          <span key={idx} className="bg-[#F5F5F5] text-[#999999] text-[8px] px-1 rounded-[4px]">{tg}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between mt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs font-bold text-[#FF7A2F]">¥{p.price}</span>
                        {p.originalPrice && <span className="text-[8px] text-[#999999] line-through">¥{p.originalPrice}</span>}
                      </div>
                      <span className="text-[10px] text-[#999999]">{p.sales}件已售</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // Page 4: 商品详情页 (Product Detail Page)
    // -------------------------------------------------------------
    case 'detail':
      return (
        <div className="flex flex-col gap-3 pb-20 animate-fade-in text-[#333333] relative">
          {/* Back top bar inside simulator */}
          <div className="px-4 py-2 flex items-center justify-between border-b border-[#F5F5F5] bg-white">
            <button 
              onClick={() => setPageId('categories')} 
              className="flex items-center gap-1 text-xs text-[#666666] font-semibold active:text-[#FF7A2F] transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>分类</span>
            </button>
            <h3 className="text-xs font-bold text-[#333333] max-w-[60%] line-clamp-1">商品详情</h3>
            <div className="w-10"></div>
          </div>

          {/* Feature Spec Preview Banner */}
          <div className="bg-[#FFFFFF] p-2">
            <div className="aspect-square max-w-[85%] mx-auto relative rounded-[8px] border border-[#F5F5F5] bg-[#FBFBFB] shadow-xs">
              <ProductImage type={currentProduct.image} className="w-full h-full" />
            </div>
          </div>

          {/* Pricing & Titles Header */}
          <div className="bg-[#FFFFFF] p-4 flex flex-col gap-2 rounded-[8px] mx-4 border border-[#F5F5F5] shadow-xs">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-[#FF7A2F]">¥{currentProduct.price}</span>
              {currentProduct.originalPrice && (
                <span className="text-xs text-[#999999] line-through font-normal">原价 ¥{currentProduct.originalPrice}</span>
              )}
            </div>

            <h1 className="text-sm font-semibold text-[#333333] leading-relaxed">{currentProduct.title}</h1>
            <p className="text-[11px] text-[#999999] leading-relaxed">{currentProduct.description}</p>
          </div>

          {/* Specs / Options Card */}
          <div className="bg-[#FFFFFF] p-4 rounded-[8px] mx-4 border border-[#F5F5F5] shadow-xs flex flex-col gap-2">
            <h3 className="text-xs font-bold text-[#333333]">规格选项</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {currentProduct.specs?.map((sp, idx) => (
                <div 
                  key={idx} 
                  className={`text-[10px] px-3 py-1.5 rounded-[8px] cursor-pointer transition-all border ${
                    idx === 0 
                      ? 'border-[#FF7A2F] bg-[#FF7A2F]/10 text-[#FF7A2F] font-semibold' 
                      : 'border-[#E5E5E5] text-[#666666] bg-white'
                  }`}
                >
                  {sp}
                </div>
              ))}
            </div>
          </div>

          {/* Core Info details tab */}
          <div className="bg-[#FFFFFF] p-4 rounded-[8px] mx-4 border border-[#F5F5F5] shadow-xs flex flex-col gap-2 mb-4">
            <h3 className="text-xs font-bold text-[#333333]">产品基本参数</h3>
            <div className="flex flex-col gap-2 mt-1 text-[10px] text-[#666666]">
              <div className="flex justify-between pb-1.5 border-b border-[#FBFBFB]">
                <span className="text-[#999999]">功能</span>
                <span>智能恒温设计，简便操控</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#FBFBFB]">
                <span className="text-[#999999]">材质</span>
                <span>食品安全保障级材质/精工木料</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#FBFBFB]">
                <span className="text-[#999999]">保修保障</span>
                <span>支持七天无理由退换，一年保修</span>
              </div>
            </div>
          </div>

          {/* WeChat bottom bar navigation block inside detail screen */}
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-white border-t border-[#F5F5F5] px-4 flex items-center justify-between z-10">
            <div className="flex gap-4">
              <button 
                onClick={() => setPageId('home')} 
                className="flex flex-col items-center gap-0.5 text-[#666666] active:text-[#FF7A2F]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="text-[9px] scale-90">店铺首页</span>
              </button>
              <button 
                onClick={() => setPageId('cart')} 
                className="flex flex-col items-center gap-0.5 text-[#666666] active:text-[#FF7A2F] relative"
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-[9px] scale-90">我的购物车</span>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#FF7A2F] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cart.reduce((s, item) => s + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
            
            <div className="flex gap-2">
              <button 
                id="add-to-cart-btn"
                onClick={() => addToCart(currentProduct, currentProduct.specs?.[0])}
                className="h-9 px-4 border border-[#FF7A2F] text-[#FF7A2F] rounded-[8px] text-[11px] font-semibold cursor-pointer active:bg-orange-50 transition-all"
              >
                加入购物车
              </button>
              <button 
                id="buy-now-btn"
                onClick={() => {
                  addToCart(currentProduct, currentProduct.specs?.[0]);
                  setPageId('checkout');
                }}
                className="h-9 px-5 bg-[#FF7A2F] text-[#FFFFFF] rounded-[8px] text-[11px] font-semibold cursor-pointer active:opacity-90 transition-all"
              >
                立即购买
              </button>
            </div>
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // Page 5: 搜索页 (Search Page)
    // -------------------------------------------------------------
    case 'search':
      return (
        <div className="flex flex-col gap-4 pb-16 animate-fade-in text-[#333333]">
          {/* Header query component */}
          <div className="px-4 py-2 flex gap-3 items-center bg-white border-b border-[#F5F5F5]">
            <div className="flex-1 h-9 bg-[#F5F5F5] rounded-[8px] flex items-center px-3 gap-2 text-xs">
              <Search className="w-4 h-4 text-[#999999]" />
              <input 
                id="search-input-field"
                type="text" 
                placeholder="搜索店内商品..."
                value={tempSearch}
                onChange={(e) => setTempSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSearchQuery(tempSearch);
                    if (tempSearch.trim() && !searchHistory.includes(tempSearch)) {
                      setSearchHistory(prev => [tempSearch, ...prev.slice(0, 5)]);
                    }
                    setPageId('list');
                  }
                }}
                className="w-full bg-transparent border-none outline-none text-[#333333] text-xs"
              />
            </div>
            <button 
              onClick={() => {
                if (tempSearch.trim()) {
                  setSearchQuery(tempSearch);
                  if (!searchHistory.includes(tempSearch)) {
                    setSearchHistory(prev => [tempSearch, ...prev.slice(0, 5)]);
                  }
                  setPageId('list');
                } else {
                  setPageId('home');
                }
              }}
              className="text-xs text-[#FF7A2F] font-semibold"
            >
              搜索
            </button>
          </div>

          {/* Historical Queries list */}
          <div className="px-4 flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-[#333333]">历史搜索</h3>
              {searchHistory.length > 0 && (
                <button 
                  onClick={() => setSearchHistory([])} 
                  className="text-[10px] text-[#999999] hover:text-[#FF7A2F]"
                >
                  清除记录
                </button>
              )}
            </div>

            {searchHistory.length === 0 ? (
              <p className="text-[11px] text-[#999999] italic">无搜索历史记录</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((h, i) => (
                  <button
                    id={`search-history-tag-${i}`}
                    key={i}
                    onClick={() => {
                      setTempSearch(h);
                      setSearchQuery(h);
                      setPageId('list');
                    }}
                    className="bg-[#F5F5F5] text-xs px-3 py-1.5 rounded-[8px] text-[#666666] active:bg-[#EEEEEE] transition-all"
                  >
                    {h}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hot product categories list */}
          <div className="px-4 flex flex-col gap-2.5 mt-2">
            <h3 className="text-xs font-bold text-[#333333]">热门推荐</h3>
            <div className="flex flex-wrap gap-2">
              {['飞天茅台', '五粮液', '白熊小麦', '威士忌', '精酿原浆', '野格'].map((hot, idx) => (
                <button
                  id={`hot-tag-${idx}`}
                  key={idx}
                  onClick={() => {
                    setTempSearch(hot);
                    setSearchQuery(hot);
                    setPageId('list');
                  }}
                  className="bg-white border border-[#E5E5E5] text-xs px-3 py-1.5 rounded-[8px] text-[#333333] active:border-[#FF7A2F] active:text-[#FF7A2F] transition-all"
                >
                  {hot}
                </button>
              ))}
            </div>
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // Page 6: 购物车页 (Shopping Cart Page)
    // -------------------------------------------------------------
    case 'cart':
      return (
        <div className="flex flex-col gap-3 pb-24 animate-fade-in text-[#333333] h-[calc(100vh-140px)] overflow-y-auto no-scrollbar relative">
          <div className="px-4 py-2 bg-white flex justify-between items-center border-b border-[#F5F5F5]">
            <h2 className="text-xs font-bold text-[#333333]">我的购物车</h2>
            <span className="text-[10px] text-[#999999]">共 {cart.length} 件加购好物</span>
          </div>

          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white rounded-[8px] m-4 border border-[#F5F5F5] h-[60%]">
              <ShoppingBag className="w-12 h-12 text-[#CCCCCC] mb-3" />
              <h3 className="text-xs font-bold text-[#333333] mb-1">您的购物车空空如也</h3>
              <p className="text-[10px] text-[#999999] mb-4">去选择几款精美好物装满它吧</p>
              <button 
                onClick={() => setPageId('home')} 
                className="px-5 py-2 bg-[#FF7A2F] text-white text-[11px] rounded-[8px] font-semibold active:opacity-90"
              >
                回到首页
              </button>
            </div>
          ) : (
            <div className="px-4 flex flex-col gap-3">
              {cart.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-[8px] border border-[#F5F5F5] shadow-xs p-3 flex gap-3 items-center"
                >
                  {/* Checkbox */}
                  <button 
                    id={`cart-item-check-${idx}`}
                    onClick={() => toggleCartCheck(idx)}
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      item.checked 
                        ? 'bg-[#FF7A2F] border-[#FF7A2F] text-white' 
                        : 'border-[#CCCCCC] bg-white'
                    }`}
                  >
                    {item.checked && <Check className="w-3.5 h-3.5" />}
                  </button>

                  {/* Thumbnail */}
                  <div className="w-16 h-16 shrink-0 bg-[#FBFBFB] rounded-[6px] overflow-hidden">
                    <ProductImage type={item.product.image} className="w-full h-full" />
                  </div>

                  {/* Main info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-16">
                    <div>
                      <h4 className="text-xs font-semibold text-[#333333] truncate">{item.product.title}</h4>
                      <span className="text-[9px] text-[#999999] bg-[#F5F5F5] px-1.5 py-0.5 rounded-[4px] mt-0.5 inline-block">
                        规格: {item.selectedSpec}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#FF7A2F]">¥{item.product.price}</span>
                      
                      {/* Stepper component */}
                      <div className="flex items-center border border-[#E5E5E5] rounded-[8px] overflow-hidden">
                        <button 
                          onClick={() => updateCartQty(idx, -1)}
                          className="w-6 h-6 flex items-center justify-center bg-[#FBFBFB] active:bg-[#EEEEEE] text-[#333333] text-xs font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-[10px] font-bold text-[#333333] bg-white">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQty(idx, 1)}
                          className="w-6 h-6 flex items-center justify-center bg-[#FBFBFB] active:bg-[#EEEEEE] text-[#333333] text-xs font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Trash Icon */}
                  <button 
                    id={`cart-delete-${idx}`}
                    onClick={() => deleteCartItem(idx)}
                    className="p-1.5 text-[#999999] hover:text-red-500 active:scale-95 transition-all shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Total Block */}
          {cart.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-white border-t border-[#F5F5F5] px-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleAllCartCheck}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    cart.every(item => item.checked) 
                      ? 'bg-[#FF7A2F] border-[#FF7A2F] text-white' 
                      : 'border-[#CCCCCC] bg-white'
                  }`}
                >
                  {cart.every(item => item.checked) && <Check className="w-3.5 h-3.5" />}
                </button>
                <span className="text-xs text-[#666666]">全选</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[10px] text-[#999999]">合计:</p>
                  <p className="text-xs font-bold text-[#FF7A2F]">
                    ¥{cart.filter(item => item.checked).reduce((sum, item) => sum + item.product.price * item.quantity, 0)}
                  </p>
                </div>

                <button 
                  id="checkout-trigger-btn"
                  onClick={createOrderFromCart}
                  className="h-10 px-5 bg-[#FF7A2F] text-white font-semibold text-[11px] rounded-[8px] active:opacity-90 transition-all flex items-center justify-center"
                >
                  去结算 ({cart.filter(item => item.checked).reduce((sum, item) => sum + item.quantity, 0)})
                </button>
              </div>
            </div>
          )}
        </div>
      );

    // -------------------------------------------------------------
    // Page 7: 订单确认页 (Checkout Confirmation Page)
    // -------------------------------------------------------------
    case 'checkout':
      const checkedCartItems = cart.filter(item => item.checked);
      const subtotal = checkedCartItems.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
      const deliveryFee = 0; // free post as configured
      const grandTotal = subtotal + deliveryFee;

      return (
        <div className="flex flex-col gap-3 pb-20 animate-fade-in text-[#333333] relative h-[calc(100vh-140px)] overflow-y-auto no-scrollbar">
          {/* Header */}
          <div className="px-4 py-2 bg-white flex items-center justify-between border-b border-[#F5F5F5]">
            <button 
              onClick={() => setPageId('cart')}
              className="flex items-center text-[#666666] text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4 mr-0.5" />
              <span>购物车</span>
            </button>
            <h2 className="text-xs font-bold text-[#333333]">确认订单</h2>
            <div className="w-10"></div>
          </div>

          {/* Address Management Selection Block */}
          <div className="px-4">
            <div 
              id="checkout-address-section"
              onClick={() => setPageId('address_manage')}
              className="bg-white rounded-[8px] border border-[#F5F5F5] shadow-xs p-4 flex items-center justify-between cursor-pointer active:opacity-85 transition-all"
            >
              {selectedAddress ? (
                <div className="flex gap-3 items-start flex-1 mr-2">
                  <MapPin className="w-4 h-4 text-[#FF7A2F] mt-1 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#333333]">{selectedAddress.name}</span>
                      <span className="text-xs font-semibold text-[#333333]">{selectedAddress.phone}</span>
                      {selectedAddress.isDefault && (
                        <span className="bg-[#FF7A2F]/10 text-[#FF7A2F] text-[8px] px-1 rounded-[4px]">默认</span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#999999] mt-1">
                      {selectedAddress.province}{selectedAddress.city}{selectedAddress.district}{selectedAddress.detail}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-[#FF7A2F] font-semibold flex-1">
                  <MapPinned className="w-4 h-4" />
                  <span>添加/选择收货地址</span>
                </div>
              )}
              <ChevronRight className="w-4 h-4 text-[#999999] shrink-0" />
            </div>
          </div>

          {/* Products Summary Card */}
          <div className="px-4 flex flex-col gap-2">
            <div className="bg-white rounded-[8px] border border-[#F5F5F5] shadow-xs p-3">
              <h3 className="text-xs font-bold text-[#333333] mb-3">商品清单</h3>
              
              <div className="flex flex-col gap-3">
                {checkedCartItems.map((item, id) => (
                  <div key={id} className="flex gap-3 items-center border-b border-[#FBFBFB] pb-3 last:border-0 last:pb-0">
                    <div className="w-12 h-12 bg-[#FBFBFB] rounded-[6px] overflow-hidden shrink-0">
                      <ProductImage type={item.product.image} className="w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[11px] font-semibold text-[#333333] truncate">{item.product.title}</h4>
                      <p className="text-[9px] text-[#999999] mt-0.5">规格: {item.selectedSpec}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-[#333333]">¥{item.product.price}</p>
                      <p className="text-[9px] text-[#999999]">x{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Money Totals Breakdown */}
          <div className="px-4">
            <div className="bg-white rounded-[8px] border border-[#F5F5F5] shadow-xs p-3.5 flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#666666]">商品总额</span>
                <span className="font-semibold text-[#333333]">¥{subtotal}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#666666]">运费</span>
                <span className="text-[#FF7A2F] font-semibold">免运费</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#666666]">配送优惠</span>
                <span className="text-[#999999]">- ¥0</span>
              </div>
              <div className="border-t border-[#F5F5F5] pt-3 flex justify-between items-center">
                <span className="text-xs font-bold text-[#333333]">合计支付</span>
                <span className="text-sm font-extrabold text-[#FF7A2F]">¥{grandTotal}</span>
              </div>
            </div>
          </div>

          {/* WeChat bottom bar execution block inside confirmation detail view */}
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-white border-t border-[#F5F5F5] px-4 flex items-center justify-between z-10">
            <div>
              <span className="text-[10px] text-[#999999]">实付款:</span>
              <span className="text-sm font-bold text-[#FF7A2F] ml-1">¥{grandTotal}</span>
            </div>

            <button 
              id="submit-order-btn"
              onClick={() => {
                if (!selectedAddress) {
                  setPageId('address_manage');
                  return;
                }
                // Order created successfully
                setPageId('payment_select');
              }}
              className="h-10 px-6 bg-[#FF7A2F] text-white font-semibold text-[11px] rounded-[8px] active:opacity-90 transition-all flex items-center justify-center cursor-pointer"
            >
              提交订单
            </button>
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // Page 8: 支付选择页 (Payment Selection Page)
    // -------------------------------------------------------------
    case 'payment_select':
      const amountToPay = activeOrder ? activeOrder.totalPrice : 327; // defaulted mock order

      return (
        <div className="flex flex-col gap-4 pb-16 animate-fade-in text-[#333333] h-[calc(100vh-140px)] overflow-y-auto no-scrollbar relative">
          {/* Title Area */}
          <div className="px-4 py-2 mt-2 bg-white rounded-[8px] mx-4 border border-[#F5F5F5] p-6 text-center flex flex-col gap-1 shadow-xs">
            <span className="text-[10px] text-[#999999]">支付倒计时 14:59</span>
            <h4 className="text-[11px] text-[#666666] mt-2">应付金额</h4>
            <h1 className="text-xl font-black text-[#FF7A2F]">¥{amountToPay}</h1>
            <p className="text-[10px] text-[#999999] mt-1">订单编号: WX20260529011245</p>
          </div>

          {/* Payment Option Selection list */}
          <div className="px-4 flex flex-col gap-2">
            <h3 className="text-xs font-bold text-[#333333] px-1">选择支付方式</h3>
            
            <div className="bg-white rounded-[8px] border border-[#F5F5F5] shadow-xs overflow-hidden">
              {/* WeChat Pay option - recommended with green */}
              <div 
                id="pay-method-wechat"
                className="p-4 flex items-center justify-between border-b border-[#F5F5F5] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-[#09BB07]/10 flex items-center justify-center rounded-full">
                    <CheckCircle className="w-4 h-4 text-[#09BB07]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#333333]">微信支付</h4>
                    <span className="text-[8px] bg-[#09BB07]/10 text-[#09BB07] px-1.5 py-0.5 rounded-[4px] mt-0.5 inline-block font-medium">推荐使用</span>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-[#FF7A2F] text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card option */}
              <div className="p-4 flex items-center justify-between border-b border-[#F5F5F5] opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-[#FF7A2F]/10 flex items-center justify-center rounded-full">
                    <CreditCard className="w-4 h-4 text-[#FF7A2F]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#333333]">信用卡 / 储蓄卡</h4>
                    <p className="text-[9px] text-[#999999]">仅支持微信绑定的银行卡</p>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full border border-gray-300"></div>
              </div>

              {/* Apple Pay or other optional stuff */}
              <div className="p-4 flex items-center justify-between opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-amber-500/10 flex items-center justify-center rounded-full">
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#333333]">找寻微信好友代付</h4>
                    <p className="text-[9px] text-[#999999]">生成付款海报发群聊</p>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full border border-gray-300"></div>
              </div>
            </div>
          </div>

          {/* Secure prompt */}
          <div className="px-4 text-center mt-4">
            <p className="text-[9px] text-[#999999] flex items-center justify-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
              微信支付官方防欺诈加密通道保障，请安全录入付款。
            </p>
          </div>

          {/* Bottom Execution Triggers for simulator */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-[#F5F5F5] px-4 flex items-center justify-between z-10 gap-3">
            <button
              id="payment-fail-simulator"
              onClick={() => completePayment(false)}
              className="flex-1 h-10 border border-[#E5E5E5] text-[#666666] font-semibold text-xs rounded-[8px] cursor-pointer hover:bg-red-50 hover:text-red-500 active:scale-95 transition-all text-center"
            >
              模拟支付失败
            </button>
            <button
              id="payment-success-simulator"
              onClick={() => completePayment(true)}
              className="flex-1 h-10 bg-[#FF7A2F] text-white font-bold text-xs rounded-[8px] cursor-pointer hover:bg-orange-600 active:scale-95 transition-all text-center"
            >
              模拟支付成功
            </button>
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // Page 9: 支付成功/失败页 (Payment Result Page)
    // -------------------------------------------------------------
    case 'payment_result':
      const isSuccess = activeOrder?.status === 'completed';

      return (
        <div className="flex flex-col gap-4 pb-16 animate-fade-in text-[#333333] justify-center items-center py-12 px-6">
          {isSuccess ? (
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 bg-emerald-150 rounded-full flex items-center justify-center text-emerald-500 animate-bounce scale-110">
                <CheckCircle className="w-12 h-12 fill-white" />
              </div>
              <h2 className="text-sm font-bold text-emerald-600 mt-2">支付完成</h2>
              <p className="text-[11px] text-[#999999] px-6">您的订单已经进入系统的备货流水。发货后短信将同步运单详情。</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                <XCircle className="w-12 h-12 fill-white" />
              </div>
              <h2 className="text-sm font-bold text-red-500 mt-2">支付未成功</h2>
              <p className="text-[11px] text-[#999999] px-6">款项尚未划入账户，由于网络波动、用户取消或银行卡限额等可能异常所致。</p>
            </div>
          )}

          {/* Details list item inside page */}
          <div className="w-full bg-white rounded-[8px] border border-[#F5F5F5] p-4 flex flex-col gap-2 mt-4 text-[10px] text-[#666666] shadow-xs">
            <div className="flex justify-between pb-1.5 border-b border-[#FBFBFB]">
              <span>商户全称</span>
              <span>极简生活馆 MinStore</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-[#FBFBFB]">
              <span>流水编号</span>
              <span>TRADE_ID_928139412</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-[#FBFBFB]">
              <span>交易时间</span>
              <span>2026-05-29 00:37</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="font-bold">成交总额</span>
              <span className="font-bold text-[#FF7A2F]">¥{activeOrder?.totalPrice || 327}</span>
            </div>
          </div>

          {/* Trigger choices */}
          <div className="w-full flex flex-col gap-2 mt-6">
            <button 
              id="return-home-btn"
              onClick={() => setPageId('home')}
              className="w-full py-2.5 bg-[#FF7A2F] text-white text-[11px] font-bold rounded-[8px] text-center active:opacity-95"
            >
              返回首页继续逛
            </button>
            <button 
              id="view-orders-btn"
              onClick={() => setPageId('orders')}
              className="w-full py-2.5 border border-[#E5E5E5] text-xs font-semibold rounded-[8px] text-center bg-white text-[#666666] active:bg-[#F5F5F5]"
            >
              查看我的订单记录
            </button>
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // Page 10: 收货地址管理页 (Address Management Page)
    // -------------------------------------------------------------
    case 'address_manage':
      return (
        <div className="flex flex-col gap-3 pb-20 animate-fade-in text-[#333333] relative h-[calc(100vh-140px)] overflow-y-auto no-scrollbar">
          {/* Header */}
          <div className="px-4 py-2 bg-white flex items-center justify-between border-b border-[#F5F5F5]">
            <button 
              onClick={() => setPageId('checkout')}
              className="flex items-center text-[#666666] text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4 mr-0.5" />
              <span>确认订单</span>
            </button>
            <h2 className="text-xs font-bold text-[#333333]">收货地址</h2>
            <div className="w-10"></div>
          </div>

          {showAddAddressForm ? (
            /* Direct subcomponent for adding addresses */
            <form onSubmit={handleAddAddressSubmit} className="bg-white p-4 rounded-[8px] mx-4 border border-[#F5F5F5] flex flex-col gap-3 shadow-xs animate-fade-in">
              <h3 className="text-xs font-bold text-[#333333] border-b border-[#F5F5F5] pb-2">添加新地址</h3>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-[#999999]">收货人姓名</label>
                <input 
                  id="addr-input-name"
                  type="text" 
                  required
                  placeholder="请输入姓名"
                  value={newAddrName}
                  onChange={(e) => setNewAddrName(e.target.value)}
                  className="w-full border border-[#E5E5E5] text-xs rounded-[8px] px-3 h-9 outline-none focus:border-[#FF7A2F]" 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-[#999999]">手机号码</label>
                <input 
                  id="addr-input-phone"
                  type="text" 
                  required
                  placeholder="请输入手机号"
                  value={newAddrPhone}
                  onChange={(e) => setNewAddrPhone(e.target.value)}
                  className="w-full border border-[#E5E5E5] text-xs rounded-[8px] px-3 h-9 outline-none focus:border-[#FF7A2F]" 
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-[#999999]">省</span>
                  <select 
                    value={newAddrProv} 
                    onChange={(e) => setNewAddrProv(e.target.value)}
                    className="border border-[#E5E5E5] text-xs rounded-[8px] p-1.5 outline-none"
                  >
                    <option value="上海市">上海市</option>
                    <option value="浙江省">浙江省</option>
                    <option value="江苏省">江苏省</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-[#999999]">市</span>
                  <select 
                    value={newAddrCity} 
                    onChange={(e) => setNewAddrCity(e.target.value)}
                    className="border border-[#E5E5E5] text-xs rounded-[8px] p-1.5 outline-none"
                  >
                    <option value="上海市">上海市</option>
                    <option value="杭州市">杭州市</option>
                    <option value="南京市">南京市</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-[#999999]">区/县</span>
                  <select 
                    value={newAddrDist} 
                    onChange={(e) => setNewAddrDist(e.target.value)}
                    className="border border-[#E5E5E5] text-xs rounded-[8px] p-1.5 outline-none"
                  >
                    <option value="静安区">静安区</option>
                    <option value="西湖区">西湖区</option>
                    <option value="玄武区">玄武区</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-[#999999]">详细地址</label>
                <textarea 
                  id="addr-input-detail"
                  required
                  placeholder="请输入街道、小区名、楼牌号等"
                  value={newAddrDetail}
                  onChange={(e) => setNewAddrDetail(e.target.value)}
                  className="w-full border border-[#E5E5E5] text-xs rounded-[8px] p-2 h-16 outline-none resize-none focus:border-[#FF7A2F]" 
                />
              </div>

              <div className="flex gap-2.5 mt-2">
                <button
                  type="button"
                  onClick={() => setShowAddAddressForm(false)}
                  className="flex-1 py-2 text-xs border border-[#E5E5E5] rounded-[8px] text-[#666666]"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs bg-[#FF7A2F] text-white rounded-[8px] font-bold"
                >
                  保存地址
                </button>
              </div>
            </form>
          ) : (
            <div className="px-4 flex flex-col gap-3">
              {addresses.map((addr) => (
                <div 
                  id={`addr-card-${addr.id}`}
                  key={addr.id}
                  onClick={() => {
                    setSelectedAddress(addr);
                    setPageId('checkout');
                  }}
                  className="bg-white rounded-[8px] border border-[#F5F5F5] p-3.5 flex flex-col gap-2.5 shadow-sm cursor-pointer group active:border-[#FF7A2F]/40 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <span className="text-xs font-bold text-[#333333]">{addr.name}</span>
                      <span className="text-xs text-[#333333]">{addr.phone}</span>
                    </div>

                    <div className="flex gap-1.5">
                      {addr.isDefault && (
                        <span className="bg-[#FF7A2F]/10 text-[#FF7A2F] text-[8px] px-1.5 rounded-[4px] font-medium scale-90">默认地址</span>
                      )}
                    </div>
                  </div>

                  <p className="text-[10px] text-[#999999] leading-relaxed">
                    {addr.province} {addr.city} {addr.district} {addr.detail}
                  </p>

                  <div className="flex justify-between items-center border-t border-[#FBFBFB] pt-2 mt-1">
                    <button 
                      id={`addr-default-trigger-${addr.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDefaultAddress(addr.id);
                      }}
                      className="text-[9px] text-[#FF7A2F] flex items-center gap-1 active:opacity-80 transition-all font-semibold"
                    >
                      {addr.isDefault ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>已设为默认</span>
                        </>
                      ) : (
                        <span>设为默认地址</span>
                      )}
                    </button>

                    <div className="flex gap-2.5">
                      <button
                        id={`addr-del-${addr.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteAddress(addr.id);
                        }}
                        className="text-[9px] text-red-500 flex items-center gap-1 active:opacity-85"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>删除</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Fixed bottom add address component */}
          {!showAddAddressForm && (
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <button 
                id="add-address-trigger-btn"
                onClick={() => setShowAddAddressForm(true)}
                className="w-full h-11 bg-[#FF7A2F] rounded-[8px] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/10 active:opacity-90"
              >
                <Plus className="w-4 h-4" />
                <span>新增收货地址</span>
              </button>
            </div>
          )}
        </div>
      );

    // -------------------------------------------------------------
    // Page 11: 积分商城首页 (Points Mall Home Page)
    // -------------------------------------------------------------
    case 'points_home':
      return (
        <div className="flex flex-col gap-4 pb-16 animate-fade-in text-[#333333]">
          {/* Top Brand Banner */}
          <div className="px-4">
            <div className="w-full bg-[#FFFFFF] rounded-[8px] border border-[#F5F5F5] shadow-xs p-5 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-[#999999]">CURRENT COINS</span>
                <h1 className="text-xl font-black text-[#FF7A2F] mt-1 flex items-baseline gap-1">
                  <span>{userPoints}</span>
                  <span className="text-[10px] text-[#999999] font-normal">积分</span>
                </h1>
                <p className="text-[9px] text-[#999999] mt-2">绿色消费，集存日常点滴积分</p>
              </div>

              <button 
                id="points-history-trigger-btn"
                onClick={() => setPageId('points_history')}
                className="px-3 py-1.5 border border-[#E5E5E5] rounded-[8px] text-[10px] text-[#666666] flex items-center gap-1 active:bg-[#F5F5F5] font-semibold"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>兑换记录</span>
              </button>
            </div>
          </div>

          {/* Quick instructions indicator for simplicity */}
          <div className="px-4 text-[10px] text-[#999999] flex justify-between bg-white/60 p-2 rounded-[8px] mx-4 border border-[#F5F5F5]">
            <span>1. 选取心仪物品</span>
            <span>2. 扣除对应积分</span>
            <span>3. 自付超轻少量款项</span>
          </div>

          {/* Product Cards grid */}
          <div className="px-4 flex flex-col gap-2.5">
            <h3 className="text-xs font-bold text-[#333333] px-0.5">精品好礼免费兑换</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {pointsProducts.map((p) => (
                <div 
                  id={`points-prod-${p.id}`}
                  key={p.id}
                  onClick={() => {
                    setCurrentPointsProduct(p);
                    setPageId('points_detail');
                  }}
                  className="bg-white rounded-[8px] border border-[#F5F5F5] shadow-sm overflow-hidden cursor-pointer flex flex-col group active:opacity-95 transition-all"
                >
                  <div className="aspect-square w-full relative">
                    <ProductImage type={p.image} className="w-full h-full" />
                    {p.cashPrice === 0 && (
                      <span className="absolute top-2 left-2 bg-[#09BB07] text-white text-[8px] rounded-[4px] px-1.5 py-0.5 font-semibold">
                        免现流通
                      </span>
                    )}
                  </div>
                  <div className="p-3 flex flex-col gap-1 bg-white">
                    <h4 className="text-xs font-semibold text-[#333333] line-clamp-1">{p.title}</h4>
                    <p className="text-[10px] text-[#FF7A2F] font-extrabold mt-1">
                      {p.points}积分
                      {p.cashPrice !== undefined && p.cashPrice > 0 && ` + ¥${p.cashPrice}`}
                    </p>
                    <p className="text-[9px] text-[#999999] line-through mt-0.5">价值 ¥{p.originalPrice}</p>
                    <button className="w-full h-7 bg-[#FF7A2F]/10 text-[#FF7A2F] rounded-[8px] text-[9px] font-bold mt-2 hover:bg-[#FF7A2F] hover:text-white transition-all">
                      立即兑换
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // Page 12: 积分商品详情页 (Points Product Detail Page)
    // -------------------------------------------------------------
    case 'points_detail':
      const isRedeemable = userPoints >= currentPointsProduct.points;

      return (
        <div className="flex flex-col gap-3 pb-20 animate-fade-in text-[#333333] relative h-[calc(100vh-140px)] overflow-y-auto no-scrollbar">
          {/* Top category navigation inside simulator */}
          <div className="px-4 py-2 flex items-center justify-between border-b border-[#F5F5F5] bg-white">
            <button 
              onClick={() => setPageId('points_home')} 
              className="flex items-center gap-1 text-xs text-[#666666] font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>积分商城</span>
            </button>
            <h3 className="text-xs font-bold text-[#333333]">积分兑换详情</h3>
            <div className="w-10"></div>
          </div>

          <div className="bg-[#FFFFFF] p-2">
            <div className="aspect-square max-w-[80%] mx-auto relative rounded-[8px] border border-[#F5F5F5] bg-[#FBFBFB]">
              <ProductImage type={currentPointsProduct.image} className="w-full h-full" />
            </div>
          </div>

          {/* Main Info */}
          <div className="bg-[#FFFFFF] p-4 flex flex-col gap-2 rounded-[8px] mx-4 border border-[#F5F5F5] shadow-xs">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-[#FF7A2F]">
                {currentPointsProduct.points} 积分
                {currentPointsProduct.cashPrice !== undefined && currentPointsProduct.cashPrice > 0 && ` + ¥${currentPointsProduct.cashPrice}`}
              </span>
              <span className="text-[10px] text-[#999999] line-through">零售价值 ¥{currentPointsProduct.originalPrice}</span>
            </div>

            <h1 className="text-sm font-semibold text-[#333333] mt-1 leading-relaxed">{currentPointsProduct.title}</h1>
            <p className="text-[11px] text-[#999999] leading-relaxed">{currentPointsProduct.description}</p>
            
            <div className="flex justify-between items-center text-[10px] text-[#999999] border-t border-[#F5F5F5] pt-2.5 mt-2">
              <span>库存: {currentPointsProduct.stock}件</span>
              <span>限兑: 1件/人</span>
              <span>发货地: 上海仓库</span>
            </div>
          </div>

          {/* User Score balance note */}
          <div className="bg-[#FFFFFF] p-3.5 rounded-[8px] mx-4 border border-[#F5F5F5] shadow-xs flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF7A2F]"></span>
              <span className="text-[#666666]">我的可用积分</span>
            </div>
            <span className="font-extrabold text-[#FF7A2F]">{userPoints}积分</span>
          </div>

          {/* Quick warning */}
          <div className="px-4 text-[9px] text-[#999999] text-center my-2 max-w-[90%] mx-auto">
            积分兑换属于专享回馈活动。除质量问题外，积分商品一经兑换不予退换。
          </div>

          {/* WeChat bottom bar navigation block inside detail screen */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <button 
              id="redeem-final-trigger"
              disabled={!isRedeemable}
              onClick={() => {
                redeemPoints(currentPointsProduct);
                setPageId('points_history');
              }}
              className={`w-full h-11 rounded-[8px] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all ${
                isRedeemable 
                  ? 'bg-[#FF7A2F] text-white shadow-orange-500/10 cursor-pointer active:opacity-90' 
                  : 'bg-gray-200 text-[#999999] cursor-not-allowed shadow-none'
              }`}
            >
              {isRedeemable ? '立即扣除积分并换取' : '您的积分有些不足，快去攒积分吧'}
            </button>
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // Page 13: 积分兑换记录页 (Points Redemption History Page)
    // -------------------------------------------------------------
    case 'points_history':
      return (
        <div className="flex flex-col gap-3 pb-16 animate-fade-in text-[#333333] h-[calc(100vh-140px)] overflow-y-auto no-scrollbar">
          {/* Header */}
          <div className="px-4 py-2 bg-white flex items-center justify-between border-b border-[#F5F5F5]">
            <button 
              onClick={() => setPageId('points_home')}
              className="flex items-center text-[#666666] text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4 mr-0.5" />
              <span>积分商城</span>
            </button>
            <h2 className="text-xs font-bold text-[#333333]">兑换记录</h2>
            <div className="w-10"></div>
          </div>

          <div className="px-4 flex flex-col gap-3">
            {pointsHistory.map((log) => (
              <div 
                key={log.id} 
                className="bg-white rounded-[8px] border border-[#F5F5F5] shadow-xs p-4 flex flex-col gap-2.5"
              >
                <div className="flex justify-between items-center border-b border-[#FBFBFB] pb-2">
                  <span className="text-[10px] text-[#999999] hover:text-[#333333]">兑换码: {log.code}</span>
                  <span className={`text-[10px] font-semibold ${
                    log.status === 'completed' ? 'text-emerald-500' : 'text-[#FF7A2F]'
                  }`}>
                    {log.status === 'completed' ? '已发放/已送达' : '备货配送中'}
                  </span>
                </div>

                <div className="flex items-center gap-3 py-1">
                  <div className="w-10 h-10 shrink-0 bg-[#FBFBFB] rounded-[6px] border border-gray-100 p-0.5">
                    {/* Choose corresponding icon */}
                    {log.productTitle.includes('帆布袋') && <ProductImage type="bag" />}
                    {log.productTitle.includes('餐匙') && <ProductImage type="spoon" />}
                    {log.productTitle.includes('书签') && <ProductImage type="bookmark" />}
                    {log.productTitle.includes('玻璃杯') && <ProductImage type="glass" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#333333] line-clamp-1">{log.productTitle}</h4>
                    <p className="text-[10px] text-[#999999] mt-0.5">兑换时间: {log.date}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-[#FBFBFB] pt-2.5">
                  <span className="text-[10px] text-[#999999]">消耗积分</span>
                  <span className="text-xs font-bold text-[#FF7A2F]">
                    {log.pointsSpent}积分
                    {log.cashSpent !== undefined && log.cashSpent > 0 && ` + ¥${log.cashSpent}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // Page 14: 个人中心首页 (Profile/User Center Page)
    // -------------------------------------------------------------
    case 'profile':
      const pendingPayNum = orders.filter(o => o.status === 'pending_pay').length;
      const completedNum = orders.filter(o => o.status === 'completed').length;

      return (
        <div className="flex flex-col gap-4 pb-16 animate-fade-in text-[#333333]">
          {/* Avatar Area styled with the Sleek Interface Orange backdrop cover */}
          <div className="bg-[#FF7A2F] pt-8 px-5 pb-5 rounded-b-[24px] relative flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white rounded-full border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                  <User className="w-7 h-7 text-[#FF7A2F]" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center gap-1.5 animate-fade-in">
                    <span>李知白</span>
                    <span className="text-[8px] tracking-wider text-xs font-bold text-[#FF7A2F] bg-white px-1.5 py-0.5 rounded-[4px]">SILVER VIP</span>
                  </h2>
                  <p className="text-[10px] text-white/80 mt-0.5">静态体验款 | 绑定号: zhibai</p>
                </div>
              </div>

              <button 
                id="profile-settings-btn"
                onClick={() => setPageId('settings')}
                className="p-1.5 bg-white/10 rounded-full text-white active:bg-white/20 transition-all cursor-pointer"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

            {/* Float Stats metrics banner from Sleek Interface Design */}
            <div className="flex justify-around bg-white rounded-[12px] p-3 shadow-md border border-[#F5F5F5] mx-1 mt-1">
              <div className="text-center cursor-pointer" onClick={() => alert("收藏夹: 12 款极简极佳好礼")}>
                <p className="font-bold text-[13px] text-[#333333]">12</p>
                <p className="text-[9px] text-[#999999] mt-0.5">收藏</p>
              </div>
              <div className="h-6 w-[1px] bg-[#F5F5F5] self-center"></div>
              <div className="text-center cursor-pointer" onClick={() => alert("我的足迹: 5 次深度好物查验")}>
                <p className="font-bold text-[13px] text-[#333333]">5</p>
                <p className="text-[9px] text-[#999999] mt-0.5">足迹</p>
              </div>
              <div className="h-6 w-[1px] bg-[#F5F5F5] self-center"></div>
              <div className="text-center cursor-pointer" onClick={() => alert("可用特惠卡券: 2 张（享包邮特许）")}>
                <p className="font-bold text-[13px] text-[#333333]">2</p>
                <p className="text-[9px] text-[#999999] mt-0.5">卡券</p>
              </div>
            </div>
          </div>

          {/* User points balance direct details box */}
          <div className="px-4">
            <div 
              onClick={() => setPageId('points_home')}
              className="bg-white p-3.5 rounded-[12px] border border-[#F5F5F5] flex justify-between items-center cursor-pointer active:opacity-95 shadow-sm transition-all"
            >
              <div>
                <span className="text-[9px] text-[#999999] block">MEMBER COINS BALANCE</span>
                <span className="text-sm font-black text-[#FF7A2F] mt-0.5 block">{userPoints} 可用积分</span>
              </div>
              <span className="text-[10px] text-[#FF7A2F] font-bold bg-[#FF7A2F]/10 px-2 py-1 rounded-[6px]">兑换好物 &gt;</span>
            </div>
          </div>

          {/* Core Order Status Tabs Container */}
          <div className="px-4">
            <div className="bg-white rounded-[8px] border border-[#F5F5F5] p-3.5 flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-[#F5F5F5] pb-2.5">
                <h3 className="text-xs font-bold text-[#333333]">我的消费订单</h3>
                <button 
                  onClick={() => setPageId('orders')} 
                  className="text-[10px] text-[#999999] hover:text-[#FF7A2F] flex items-center gap-0.5"
                >
                  <span>全部订单</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Order quick state icons */}
              <div className="grid grid-cols-4 gap-1 text-center py-1">
                <button 
                  onClick={() => setPageId('orders')}
                  className="flex flex-col items-center gap-1 cursor-pointer relative"
                >
                  <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-[#FF7A2F]" />
                  </div>
                  <span className="text-[10px] text-[#666666]">待付款</span>
                  {pendingPayNum > 0 && (
                    <span className="absolute top-0 right-3 bg-[#FF7A2F] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {pendingPayNum}
                    </span>
                  )}
                </button>

                <button 
                  onClick={() => setPageId('orders')}
                  className="flex flex-col items-center gap-1 cursor-pointer relative"
                >
                  <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                    <Clock className="w-4 h-4 text-[#FF7A2F]" />
                  </div>
                  <span className="text-[10px] text-[#666666]">待发货</span>
                </button>

                <button 
                  onClick={() => setPageId('orders')}
                  className="flex flex-col items-center gap-1 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-[#FF7A2F]" />
                  </div>
                  <span className="text-[10px] text-[#666666]">待收货</span>
                </button>

                <button 
                  onClick={() => setPageId('orders')}
                  className="flex flex-col items-center gap-1 cursor-pointer relative"
                >
                  <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-[#FF7A2F]" />
                  </div>
                  <span className="text-[10px] text-[#666666]">已完成</span>
                  {completedNum > 0 && (
                    <span className="absolute top-0 right-3 bg-emerald-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {completedNum}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick list items for utilities */}
          <div className="px-4">
            <div className="bg-white rounded-[8px] border border-[#F5F5F5] overflow-hidden shadow-xs flex flex-col">
              <div 
                id="profile-addr-section"
                onClick={() => setPageId('address_manage')}
                className="p-3.5 flex items-center justify-between border-b border-[#F5F5F5] cursor-pointer hover:bg-slate-50 active:bg-slate-100 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <MapPinned className="w-4 h-4 text-[#FF7A2F]" />
                  <span className="text-xs text-[#333333] font-medium">收货地址管理</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#999999]" />
              </div>

              <div 
                onClick={() => setPageId('points_home')}
                className="p-3.5 flex items-center justify-between border-b border-[#F5F5F5] cursor-pointer hover:bg-slate-50 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Gift className="w-4 h-4 text-[#FF7A2F]" />
                  <span className="text-xs text-[#333333] font-medium">我的专属积分商城</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] text-[#FF7A2F] font-bold">新礼物</span>
                  <ChevronRight className="w-4 h-4 text-[#999999]" />
                </div>
              </div>

              <div 
                onClick={() => setPageId('settings')}
                className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4 text-[#FF7A2F]" />
                  <span className="text-xs text-[#333333] font-medium">设置中心</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#999999]" />
              </div>
            </div>
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // Page 15: 全部订单列表页 (Orders List Page)
    // -------------------------------------------------------------
    case 'orders':
      const [orderActiveTab, setOrderActiveTab] = useState<'all' | 'pending_pay' | 'completed'>('all');

      const renderedOrders = orders.filter(o => {
        if (orderActiveTab === 'all') return true;
        return o.status === orderActiveTab;
      });

      return (
        <div className="flex flex-col gap-3 pb-16 animate-fade-in text-[#333333] h-[calc(100vh-140px)] overflow-y-auto no-scrollbar">
          {/* Header Back Button */}
          <div className="px-4 py-2 bg-white flex items-center justify-between border-b border-[#F5F5F5]">
            <button 
              onClick={() => setPageId('profile')}
              className="flex items-center text-[#666666] text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4 mr-0.5" />
              <span>个人中心</span>
            </button>
            <h2 className="text-xs font-bold text-[#333333]">全部订单</h2>
            <div className="w-10"></div>
          </div>

          {/* Sticky Tab switcher */}
          <div className="flex bg-white py-2 justify-around border-b border-[#F5F5F5] shrink-0 font-sans">
            <button 
              onClick={() => setOrderActiveTab('all')}
              className={`text-xs pb-1 px-1 font-semibold ${
                orderActiveTab === 'all' 
                  ? 'text-[#FF7A2F] border-b-2 border-[#FF7A2F]' 
                  : 'text-[#666666]'
              }`}
            >
              全部
            </button>
            <button 
              onClick={() => setOrderActiveTab('pending_pay')}
              className={`text-xs pb-1 px-1 font-semibold ${
                orderActiveTab === 'pending_pay' 
                  ? 'text-[#FF7A2F] border-b-2 border-[#FF7A2F]' 
                  : 'text-[#666666]'
              }`}
            >
              待付款
            </button>
            <button 
              onClick={() => setOrderActiveTab('completed')}
              className={`text-xs pb-1 px-1 font-semibold ${
                orderActiveTab === 'completed' 
                  ? 'text-[#FF7A2F] border-b-2 border-[#FF7A2F]' 
                  : 'text-[#666666]'
              }`}
            >
              已付款/已完成
            </button>
          </div>

          {/* Render List */}
          <div className="px-4 flex flex-col gap-3">
            {renderedOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-[8px] border border-slate-100">
                <FileText className="w-10 h-10 text-gray-300 mb-2" />
                <span className="text-xs text-[#999999]">暂无相关订单</span>
              </div>
            ) : (
              renderedOrders.map((o) => (
                <div 
                  key={o.id} 
                  className="bg-white rounded-[8px] border border-[#F5F5F5] shadow-xs p-3.5 flex flex-col gap-3"
                >
                  {/* Order Number header row */}
                  <div className="flex justify-between items-center border-b border-[#FBFBFB] pb-2">
                    <span className="text-[10px] text-[#999999]">编号: {o.orderNumber}</span>
                    <span className={`text-[10px] font-bold ${
                      o.status === 'completed' ? 'text-emerald-500' : 'text-[#FF7A2F]'
                    }`}>
                      {o.status === 'completed' ? '交易已完成' : '买家待付款'}
                    </span>
                  </div>

                  {/* Products embedded and listed inside order layout card */}
                  <div className="flex flex-col gap-2.5">
                    {o.items.map((it, idx) => (
                      <div key={idx} className="flex gap-3 items-center">
                        <div className="w-10 h-10 shrink-0 bg-[#FBFBFB] rounded-[6px] border border-gray-100 p-0.5">
                          <ProductImage type={it.product.image} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[11px] font-semibold text-[#333333] truncate">{it.product.title}</h4>
                          <span className="text-[8.5px] text-[#999999]">规格: {it.selectedSpec}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs font-bold text-[#333333]">¥{it.product.price}</p>
                          <p className="text-[9.5px] text-[#999999]">x{it.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary & Buttons actions */}
                  <div className="border-t border-[#FBFBFB] pt-3 flex justify-between items-center mt-1">
                    <p className="text-[10px] text-[#999999]">
                      共 {o.items.reduce((sum, item) => sum + item.quantity, 0)} 件商品 合计: 
                      <span className="text-xs font-bold text-[#FF7A2F] ml-1">¥{o.totalPrice}</span>
                    </p>

                    <div className="flex gap-2">
                      {o.status === 'pending_pay' ? (
                        <>
                          <button
                            id={`order-cancel-${o.id}`}
                            onClick={() => cancelOrder(o.id)}
                            className="px-3 py-1.5 border border-[#E5E5E5] rounded-[8px] text-[10px] text-[#666666] active:bg-gray-100 shrink-0"
                          >
                            取消订单
                          </button>
                          <button
                            id={`order-pay-${o.id}`}
                            onClick={() => {
                              // Proceed back to payments screen
                              setPageId('payment_select');
                            }}
                            className="px-3.5 py-1.5 bg-[#FF7A2F] text-white rounded-[8px] text-[10px] font-semibold active:opacity-90 shrink-0"
                          >
                            立即付款
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            // Re-buy details
                            setPageId('home');
                          }}
                          className="px-3.5 py-1.5 border border-[#FF7A2F] text-[#FF7A2F] rounded-[8px] text-[10px] font-semibold active:bg-orange-50 shrink-0"
                        >
                          再次购买
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );

    // -------------------------------------------------------------
    // Page 16: 系统设置页 (System Settings Page)
    // -------------------------------------------------------------
    case 'settings':
      return (
        <div className="flex flex-col gap-3 pb-16 animate-fade-in text-[#333333]">
          {/* Header */}
          <div className="px-4 py-2 bg-white flex items-center justify-between border-b border-[#F5F5F5]">
            <button 
              onClick={() => setPageId('profile')}
              className="flex items-center text-[#666666] text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4 mr-0.5" />
              <span>返回个人中心</span>
            </button>
            <h2 className="text-xs font-bold text-[#333333]">系统设置</h2>
            <div className="w-10"></div>
          </div>

          <div className="px-4 flex flex-col gap-3.5">
            {/* Account List cards group */}
            <div className="bg-white rounded-[8px] border border-[#F5F5F5] overflow-hidden shadow-xs flex flex-col">
              <div className="p-3.5 flex items-center justify-between border-b border-[#F5F5F5]">
                <span className="text-xs text-[#333333] font-medium">账户与安全保障</span>
                <ChevronRight className="w-4 h-4 text-[#999999]" />
              </div>

              <div className="p-3.5 flex items-center justify-between border-b border-[#F5F5F5]">
                <span className="text-xs text-[#333333] font-medium font-sans">当前版本</span>
                <span className="text-[10px] text-[#999999] font-semibold">v1.2.0极简版</span>
              </div>

              <div 
                onClick={() => {
                  alert("微信缓存已成功清理。释放空间 4.8MB");
                }}
                className="p-3.5 flex items-center justify-between border-b border-[#F5F5F5] cursor-pointer hover:bg-slate-50 transition-all"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-[#333333] font-medium">清理缓存数据</span>
                  <span className="text-[9px] text-[#999999] mt-0.5">清扫图片及预加载静态数据</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-emerald-500 font-semibold">4.8 MB</span>
                  <ChevronRight className="w-4 h-4 text-[#999999]" />
                </div>
              </div>

              <div className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-all">
                <span className="text-xs text-[#333333] font-medium">服务协议、隐私保护条例</span>
                <ChevronRight className="w-4 h-4 text-[#999999]" />
              </div>
            </div>

            {/* Support section info */}
            <div className="bg-white rounded-[8px] border border-[#F5F5F5] p-4 flex flex-col gap-2 shadow-xs text-center">
              <h3 className="text-xs font-bold text-[#333333]">极简生活馆 MinStore</h3>
              <p className="text-[10px] text-[#999999] px-6">我们倡导精挑细选的生活理念，追求在繁杂时代里给您带来干净、清爽、优质的至简生活方式体验。</p>
            </div>

            {/* Logout block button */}
            <button 
              id="logout-btn"
              onClick={() => {
                alert("微信小程序仿真注销。");
              }}
              className="w-full py-3 border border-red-500 text-red-500 rounded-[8px] text-xs font-semibold text-center mt-4 bg-white hover:bg-red-50 active:scale-95 transition-all cursor-pointer"
            >
              注销并解绑微信关联
            </button>
          </div>
        </div>
      );

    default:
      return <div>页面未找到</div>;
  }
};

// -------------------------------------------------------------
// Component: Shimmer Loading Skeletons
// -------------------------------------------------------------
const LoadingSkeleton: React.FC<{ type: PageId }> = ({ type }) => {
  return (
    <div className="p-4 flex flex-col gap-4 animate-pulse">
      {/* Top title skeleton bar */}
      <div className="flex justify-between items-center mb-1">
        <div className="h-5 w-24 bg-gray-200 rounded-[8px]"></div>
        <div className="h-4 w-12 bg-gray-200 rounded-[8px]"></div>
      </div>

      {type === 'home' || type === 'categories' ? (
        <>
          {/* Banner Skeleton */}
          <div className="w-full aspect-[21/9] bg-gray-200 rounded-[8px]"></div>
          
          {/* Categories skeleton grid */}
          <div className="grid grid-cols-5 gap-3 mt-1.5">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-[8px] bg-gray-200"></div>
                <div className="h-2 w-8 bg-gray-200 rounded-[4px]"></div>
              </div>
            ))}
          </div>

          {/* Dual blocks skeleton */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[1, 2].map(i => (
              <div key={i} className="flex flex-col gap-2 pb-3 bg-white border border-gray-100 rounded-[8px] p-2">
                <div className="aspect-square bg-gray-200 rounded-[6px]"></div>
                <div className="h-3 w-3/4 bg-gray-200 rounded-[4px] mt-1"></div>
                <div className="h-3 w-1/3 bg-gray-200 rounded-[4px]"></div>
              </div>
            ))}
          </div>
        </>
      ) : type === 'detail' || type === 'points_detail' ? (
        <>
          <div className="aspect-square max-w-[80%] mx-auto bg-gray-200 rounded-[8px]"></div>
          <div className="h-5 w-full bg-gray-200 rounded-[8px] mt-3"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded-[8px]"></div>
          <div className="h-3.5 w-1/3 bg-gray-200 rounded-[8px] mt-2"></div>
          
          <div className="h-16 w-full bg-gray-100 rounded-[8px] mt-4"></div>
          <div className="h-12 w-full bg-gray-100 rounded-[8px]"></div>
        </>
      ) : (
        /* Generic detailed loading rows */
        <div className="flex flex-col gap-3 mt-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white p-3.5 border border-gray-150 rounded-[8px] flex gap-3.5 items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-[8px] shrink-0"></div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-3 w-2/3 bg-gray-200 rounded-[4px]"></div>
                <div className="h-2.5 w-1/2 bg-gray-200 rounded-[4px]"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading micro badge indicator */}
      <div className="text-center mt-6 text-[10px] text-[#999999] tracking-widest font-mono uppercase">
        Loading Assets...
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Component: Elegant Empty Data States
// -------------------------------------------------------------
interface EmptyProps {
  type: PageId;
  setPageId: (id: PageId) => void;
  setUserPoints?: React.Dispatch<React.SetStateAction<number>>;
}

const EmptyDataView: React.FC<EmptyProps> = ({ type, setPageId, setUserPoints }) => {
  return (
    <div className="p-8 py-16 flex flex-col items-center justify-center text-center animate-fade-in text-[#333333] h-full">
      {/* Icon based on page type */}
      {type === 'cart' ? (
        <>
          <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-7 h-7 text-[#999999]" />
          </div>
          <h3 className="text-xs font-bold text-[#333333] mb-1">您的购物车空空如也</h3>
          <p className="text-[10px] text-[#999999] max-w-[180px] leading-relaxed mb-6">暂无挑选的极简物件。我们的商品全部包邮且限时八折，快去看看吧。</p>
          <button 
            id="empty-view-cart-btn"
            onClick={() => setPageId('home')}
            className="px-5 py-2.5 bg-[#FF7A2F] text-white text-[11px] font-bold rounded-[8px] hover:opacity-95 transition-all"
          >
            去首页逛逛
          </button>
        </>
      ) : type === 'points_history' ? (
        <>
          <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mb-4">
            <Gift className="w-7 h-7 text-[#999999]" />
          </div>
          <h3 className="text-xs font-bold text-[#333333] mb-1">暂无积分兑换记录</h3>
          <p className="text-[10px] text-[#999999] max-w-[180px] leading-relaxed mb-6">您还未曾在积分专区兑换过好礼。绿色日常签到、分享都可以赚积分哦。</p>
          <div className="flex gap-2">
            <button 
              id="empty-earn-points-btn"
              onClick={() => {
                if (setUserPoints) {
                  setUserPoints(p => p + 500);
                  alert("绿色低碳签到：成功赠送 500 积分奖励！");
                }
              }}
              className="px-4 py-2 border border-[#FF7A2F] text-[#FF7A2F] text-[10px] font-semibold rounded-[8px]"
            >
              签到赚500积分
            </button>
            <button 
              onClick={() => setPageId('points_home')}
              className="px-4 py-2 bg-[#FF7A2F] text-white text-[10px] font-semibold rounded-[8px]"
            >
              积分专区
            </button>
          </div>
        </>
      ) : type === 'orders' ? (
        <>
          <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mb-4">
            <FileText className="w-7 h-7 text-[#999999]" />
          </div>
          <h3 className="text-xs font-bold text-[#333333] mb-1">暂无极物购买订单</h3>
          <p className="text-[10px] text-[#999999] max-w-[180px] leading-relaxed mb-6">您在本馆尚未买入任何商品。首单用户支持退换运费全免。</p>
          <button 
            onClick={() => setPageId('home')}
            className="px-5 py-2.5 bg-[#FF7A2F] text-white text-[11px] font-semibold rounded-[8px]"
          >
            开启探索之旅
          </button>
        </>
      ) : (
        /* Standard Fallback Empty state */
        <>
          <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mb-4">
            <ShieldAlert className="w-7 h-7 text-[#999999]" />
          </div>
          <h3 className="text-xs font-bold text-[#333333] mb-1">内容空数据状态</h3>
          <p className="text-[10px] text-[#999999] mb-6">正在研发设计，页面内容当前处于留空排期状态。</p>
          <button 
            onClick={() => setPageId('home')}
            className="px-5 py-2.5 border border-[#FF7A2F] text-[#FF7A2F] text-[11px] font-semibold rounded-[8px]"
          >
            返回商铺首页
          </button>
        </>
      )}
    </div>
  );
};
