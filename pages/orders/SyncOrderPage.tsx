
import React, { useState } from 'react';
import { Modal } from '../../components/Modal';

interface SyncOrderPageProps {
  onBack: () => void;
}

export const SyncOrderPage: React.FC<SyncOrderPageProps> = ({ onBack }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const mockTempOrders = [
    { id: '1', date: '14/01/2026', code: 'KV_ORDER_001', customer: 'Nguyễn Văn A', total: '1.200.000', platform: 'KiotViet' },
    { id: '2', date: '14/01/2026', code: 'KV_ORDER_002', customer: 'Trần Thị B', total: '450.000', platform: 'KiotViet' },
    { id: '3', date: '13/01/2026', code: 'KV_ORDER_003', customer: 'Lê Văn C', total: '980.000', platform: 'KiotViet' },
  ];

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIds(e.target.checked ? mockTempOrders.map(o => o.id) : []);
  };

  const startSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsSyncModalOpen(false);
      showToast('Đồng bộ dữ liệu thành công!');
    }, 2000);
  };

  const handleFetchOrders = () => {
    if (selectedIds.length === 0) return;
    showToast(`Đã lưu thành công ${selectedIds.length} hóa đơn!`);
    setSelectedIds([]);
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-screen relative">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-8 z-50 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-4 flex items-center gap-3">
          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-bold">{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Đơn hàng tạm</h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsSyncModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors shadow-lg shadow-red-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Đồng bộ
          </button>
          <button 
            disabled={selectedIds.length === 0}
            onClick={handleFetchOrders}
            className={`flex items-center gap-2 px-4 py-2 border border-red-500 rounded-lg font-medium transition-colors ${selectedIds.length > 0 ? 'text-red-500 hover:bg-red-50' : 'text-gray-300 border-gray-200 cursor-not-allowed'}`}
          >
            Lấy {selectedIds.length} hóa đơn
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
        <div className="relative flex-1 min-w-[240px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input type="text" placeholder="Tìm mã đơn, khách hàng..." className="block w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Nền tảng</span>
          <select className="bg-white border border-gray-300 rounded-lg text-sm py-2.5 pl-3 pr-10 outline-none min-w-[150px] focus:border-red-500 focus:ring-1 focus:ring-red-500">
            <option value="">Tất cả</option>
            <option value="kiotviet">KiotViet</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 font-semibold uppercase tracking-wider text-[11px] border-b border-gray-200">
              <th className="px-4 py-3 w-10 text-center">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500 w-4 h-4 bg-white cursor-pointer" 
                  onChange={handleSelectAll}
                  checked={selectedIds.length === mockTempOrders.length}
                />
              </th>
              <th className="px-4 py-3 border-r border-gray-200 text-center w-32">NGÀY ĐƠN</th>
              <th className="px-4 py-3 border-r border-gray-200 text-center w-40">MÃ ĐƠN TẠM</th>
              <th className="px-4 py-3 border-r border-gray-200">TÊN KHÁCH HÀNG</th>
              <th className="px-4 py-3 border-r border-gray-200 text-right w-40">TỔNG TIỀN</th>
              <th className="px-4 py-3 border-r border-gray-200 text-center w-32">NỀN TẢNG</th>
              <th className="px-4 py-3 text-center w-32">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {mockTempOrders.map((order) => (
              <tr key={order.id} className={`hover:bg-gray-50 transition-colors ${selectedIds.includes(order.id) ? 'bg-red-50/40' : ''}`}>
                <td className="px-4 py-6 text-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500 w-4 h-4 bg-white cursor-pointer" 
                    checked={selectedIds.includes(order.id)}
                    onChange={() => handleToggleSelect(order.id)}
                  />
                </td>
                <td className="px-4 py-6 border-r border-gray-200 text-center text-gray-600">{order.date}</td>
                <td className="px-4 py-6 border-r border-gray-200 text-center font-bold text-gray-800">{order.code}</td>
                <td className="px-4 py-6 border-r border-gray-200 text-gray-600 font-medium">{order.customer}</td>
                <td className="px-4 py-6 border-r border-gray-200 text-right text-gray-800 font-bold">{order.total}</td>
                <td className="px-4 py-6 border-r border-gray-200 text-center">
                  <span className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-bold uppercase tracking-tight">{order.platform}</span>
                </td>
                <td className="px-4 py-6 text-center">
                  <div className="flex justify-center gap-3">
                    <button className="text-green-500 hover:scale-110 transition-transform p-1 hover:bg-green-50 rounded">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button className="text-gray-400 hover:text-red-600 transition-colors p-1 hover:bg-red-50 rounded">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sync Modal */}
      <Modal 
        isOpen={isSyncModalOpen} 
        onClose={() => !isSyncing && setIsSyncModalOpen(false)} 
        title="Đồng bộ đơn hàng từ bên thứ 3"
      >
        <div className="space-y-6">
          {isSyncing ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 border-4 border-red-100 border-t-red-600 rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-bold text-gray-900">Đang đồng bộ dữ liệu...</p>
              <p className="text-gray-500 text-sm mt-1">Vui lòng không đóng cửa sổ này</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Nền tảng tích hợp</label>
                  <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500 text-gray-900">
                    <option>KiotViet (Chi nhánh Quận 1)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Từ ngày</label>
                    <input type="date" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500 text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Đến ngày</label>
                    <input type="date" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500 text-gray-900" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-6 border-t border-gray-100">
                <button onClick={() => setIsSyncModalOpen(false)} className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors">Hủy</button>
                <button onClick={startSync} className="flex-[2] py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-100 transition-all hover:bg-red-700 active:scale-95">Bắt đầu đồng bộ</button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};
