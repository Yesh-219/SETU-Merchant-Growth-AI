import React from 'react';
import { Menu, Bell, ShieldCheck, UserCheck } from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';

interface NavbarProps {
  onMenuToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const { activeMerchant } = useMerchant();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b border-slate-200/80">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-sm font-bold text-slate-800">{activeMerchant.businessName}</h2>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{activeMerchant.businessType}</span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Paytm Verified
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Backend health status badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>SETU API Connected</span>
        </div>

        {/* Notifications Icon */}
        <button
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100"
          title="Alerts & Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
        </button>

        {/* Merchant Avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-paytm-light text-paytm-blue font-bold text-xs flex items-center justify-center">
            <UserCheck className="w-4 h-4 text-paytm-blue" />
          </div>
          <div className="hidden md:block text-left text-xs">
            <p className="font-semibold text-slate-800 leading-tight">{activeMerchant.name}</p>
            <p className="text-slate-400 text-[11px]">Merchant Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
};

