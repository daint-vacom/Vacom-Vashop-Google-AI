
import React from 'react';
import { AppView, SidebarItem } from '../types';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen }) => {
  const items: SidebarItem[] = [
    {
      id: AppView.ORDERS,
      label: 'Danh sách đơn hàng',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 17.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      )
    },
    {
      id: AppView.SETTINGS,
      label: 'Cài đặt',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.128 1.41-.513M5.106 5.766l1.515.551m12.756 4.639 1.515.551M7.658 4.146l1.907.694m11.235 4.088 1.907.694m-2.422 3.938-1.907-.694m-11.235-4.088-1.907-.694M18.894 18.234l-1.515-.551M5.106 13.595l-1.515-.551m11.235 6.259-1.41.513M4.5 12H3m1.5 0h7.5" />
        </svg>
      )
    }
  ];

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-30 h-screen sticky top-0`}>
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        {isOpen && <span className="font-bold text-xl tracking-tight text-gray-800">InvoicePro</span>}
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
              currentView === item.id 
                ? 'bg-red-50 text-red-700 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <div className={`${currentView === item.id ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
              {item.icon}
            </div>
            {isOpen && <span className="font-medium whitespace-nowrap">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        {isOpen ? (
          <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
            <img src="https://picsum.photos/40/40" alt="Avatar" className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@invoicepro.com</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <img src="https://picsum.photos/40/40" alt="Avatar" className="w-10 h-10 rounded-full" />
          </div>
        )}
      </div>
    </aside>
  );
};
