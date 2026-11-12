import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  PackageCheck,
  CircleDollarSign,
  Bot,
  Sparkles,
  Store,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/sales', label: 'Sales Analytics', icon: TrendingUp },
  { path: '/inventory', label: 'AI Inventory', icon: PackageCheck },
  { path: '/finance', label: 'Profit & Cash Flow', icon: CircleDollarSign },
  { path: '/advisor', label: 'AI Advisor', icon: Bot, isAi: true },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-paytm-navy text-white flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-paytm-blue border border-paytm-cyan/30 flex items-center justify-center text-paytm-cyan shadow-inner">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white">SETU</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-paytm-cyan text-paytm-navy">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Merchant Growth Copilot</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Business Modules
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-paytm-cyan text-paytm-navy font-semibold shadow-sm'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.isAi && (
                  <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-sky-400/20 text-sky-200">
                    <Sparkles className="w-3 h-3 text-amber-300" /> PRO
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Hackathon Badge Footer */}
        <div className="p-4 mx-4 mb-4 rounded-xl bg-white/5 border border-white/10 text-xs">
          <p className="font-semibold text-slate-200">Paytm Build for India</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Hyderabad Finale Hackathon</p>
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>Team SETU</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
        </div>
      </aside>
    </>
  );
};

