
import React, { useState } from 'react';
import { ThirdPartyIntegration } from './ThirdPartyIntegration';

type SettingTab = 'Cài đặt chung' | 'Hiển thị & Làm tròn' | 'Hóa đơn' | 'Tích hợp bên thứ 3';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingTab>('Tích hợp bên thứ 3');
  const [addTrigger, setAddTrigger] = useState(false);

  const tabs: SettingTab[] = ['Cài đặt chung', 'Hiển thị & Làm tròn', 'Hóa đơn', 'Tích hợp bên thứ 3'];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
          <p className="text-gray-500">Tùy chỉnh cấu hình hệ thống và tài khoản.</p>
        </div>
        {activeTab === 'Tích hợp bên thứ 3' && (
          <button 
            onClick={() => setAddTrigger(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-bold shadow-lg shadow-red-100 flex items-center gap-2 transition-all active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Thêm mới
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <nav className="space-y-1 bg-white p-2 rounded-2xl border border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-100' 
                  : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </aside>

        <section className="lg:col-span-3">
          <div className="bg-gray-50 rounded-2xl">
            {activeTab === 'Tích hợp bên thứ 3' ? (
              <ThirdPartyIntegration onAddTrigger={addTrigger} resetTrigger={() => setAddTrigger(false)} />
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                 <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Tính năng đang phát triển</h3>
                <p className="text-gray-500 mt-2">Nội dung cho "{activeTab}" sẽ sớm được cập nhật.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
