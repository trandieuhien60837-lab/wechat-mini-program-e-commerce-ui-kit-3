import React, { useEffect, useState } from 'react';
import { PageId } from '../types';
import { Home, Grid, ShoppingCart, User, Battery, Wifi, Signal } from 'lucide-react';

interface WeChatFrameProps {
  children: React.ReactNode;
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  title: string;
}

export const WeChatFrame: React.FC<WeChatFrameProps> = ({
  children,
  currentPage,
  setCurrentPage,
  title,
}) => {
  const [timeStr, setTimeStr] = useState('08:42');

  // Handle ticking clock matching mobile frame spec
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Is bottom nav active on this page?
  const isBottomNavActive = ['home', 'categories', 'cart', 'profile'].includes(currentPage);

  return (
    <div id="wechat-frame-container" className="relative w-[365px] h-[720px] bg-white rounded-[32px] border-[6px] border-[#333333] shadow-2xl flex flex-col overflow-hidden select-none">
      
      {/* 1. Mobile Status Bar (Top notch & Network Icons) */}
      <div className="h-6 w-full bg-[#FFFFFF] flex items-center justify-between px-6 shrink-0 relative z-20">
        <span className="text-[10px] font-bold text-[#333333] tracking-tight">{timeStr}</span>
        
        {/* Sleek Dynamic Island / Speaker notch */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-20 h-2 bg-[#333333] rounded-full"></div>
        
        <div className="flex items-center gap-1.5 text-[#333333]">
          <Signal className="w-2.5 h-2.5" />
          <span className="text-[7.5px] font-mono scale-90">5G</span>
          <Wifi className="w-2.5 h-2.5" />
          <div className="flex gap-1 items-center">
            <div className="w-3 h-3 bg-black rounded-full scale-[0.6]"></div>
            <div className="w-4 h-2 bg-black rounded-sm scale-[0.6]"></div>
          </div>
        </div>
      </div>

      {/* 2. WeChat Custom Title Bar & Capsule Controls */}
      <div className="h-11 w-full bg-[#FFFFFF] border-b border-[#F5F5F5] flex items-center justify-between px-4 shrink-0 relative z-20">
        {/* WeChat Small Close/Home indicator */}
        <div className="flex items-center gap-1 w-16">
          <span className="text-[10px] font-bold text-[#333333] truncate">{title}</span>
        </div>

        {/* Center Title or Brand */}
        <div className="text-[11px] font-bold text-[#333333] max-w-[40%] truncate">
          {title === '极简生活馆' ? '极简生活馆 MinStore' : title}
        </div>

        {/* WeChat Signature Capsule controls */}
        <div className="h-7 border border-[#E5E5E5] rounded-full bg-slate-50/10 backdrop-blur-xs flex items-center px-2 py-1 gap-2.5 shrink-0">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#333333]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#333333]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#333333]"></span>
          </div>
          <div className="w-[1px] h-3 bg-[#E5E5E5]"></div>
          <button 
            id="wechat-capsule-close"
            onClick={() => setCurrentPage('home')}
            className="w-3.5 h-3.5 rounded-full border border-[#333333] flex items-center justify-center pointer-events-auto cursor-pointer"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#333333]"></div>
          </button>
        </div>
      </div>

      {/* 3. Main Simulated Application Canvas */}
      <div className="flex-1 bg-[#FBFBFB] overflow-y-auto no-scrollbar relative flex flex-col">
        {children}
      </div>

      {/* 4. WeChat Standard Bottom Navigation Bar (首页、分类、购物车、个人中心) */}
      {isBottomNavActive && (
        <div 
          id="wechat-bottom-navigation-bar" 
          className="absolute bottom-0 left-0 right-0 h-[52px] bg-white border-t border-[#F5F5F5] flex items-center justify-around z-30 px-2.5 pb-1"
        >
          {/* Tab 1: 首页 */}
          <button
            id="wechat-bottom-tab-home"
            onClick={() => setCurrentPage('home')}
            className={`flex flex-col items-center gap-0.5 cursor-pointer flex-1 transition-all ${
              currentPage === 'home' ? 'text-[#FF7A2F]' : 'text-[#999999]'
            }`}
          >
            <Home className="w-[18px] h-[18px]" />
            <span className="text-[9px] font-medium leading-none">首页</span>
          </button>

          {/* Tab 2: 分类 */}
          <button
            id="wechat-bottom-tab-categories"
            onClick={() => setCurrentPage('categories')}
            className={`flex flex-col items-center gap-0.5 cursor-pointer flex-1 transition-all ${
              currentPage === 'categories' ? 'text-[#FF7A2F]' : 'text-[#999999]'
            }`}
          >
            <Grid className="w-[18px] h-[18px]" />
            <span className="text-[9px] font-medium leading-none">分类</span>
          </button>

          {/* Tab 3: 购物车 */}
          <button
            id="wechat-bottom-tab-cart"
            onClick={() => setCurrentPage('cart')}
            className={`flex flex-col items-center gap-0.5 cursor-pointer flex-1 transition-all ${
              currentPage === 'cart' ? 'text-[#FF7A2F]' : 'text-[#999999]'
            }`}
          >
            <ShoppingCart className="w-[18px] h-[18px]" />
            <span className="text-[9px] font-medium leading-none">购物车</span>
          </button>

          {/* Tab 4: 个人中心 */}
          <button
            id="wechat-bottom-tab-profile"
            onClick={() => setCurrentPage('profile')}
            className={`flex flex-col items-center gap-0.5 cursor-pointer flex-1 transition-all ${
              currentPage === 'profile' ? 'text-[#FF7A2F]' : 'text-[#999999]'
            }`}
          >
            <User className="w-[18px] h-[18px]" />
            <span className="text-[9px] font-medium leading-none">个人</span>
          </button>
        </div>
      )}
    </div>
  );
};
