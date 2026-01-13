
import React from 'react';

interface OrderListPageProps {
  onGoToSync?: () => void;
}

export const OrderListPage: React.FC<OrderListPageProps> = ({ onGoToSync }) => {
  const orders = [
    {
      date: '13/01/2026',
      code: 'DH2601000022',
      customer: 'ACE TAX',
      total: '0',
      status: 'Hoàn thành',
      method: 'Tiền mặt'
    },
    {
      date: '13/01/2026',
      code: 'DH2601000021',
      customer: 'CHI NHÁNH CÔNG TY CỔ PHẦN VACOM',
      total: '598.800',
      status: 'Hoàn thành',
      method: 'Tiền mặt'
    },
    {
      date: '12/01/2026',
      code: 'DH2601000019',
      customer: 'Khách lẻ không cung cấp',
      total: '150.000',
      status: 'Hoàn thành',
      method: 'Tiền mặt'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Đơn hàng</h1>
        <div className="flex gap-3">
          <button 
            onClick={onGoToSync}
            className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Đồng bộ đơn hàng
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Nhận Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Thêm (F4)
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6 bg-gray-50/50 p-4 rounded-xl border border-gray-50">
        <div className="relative flex-1 min-w-[240px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input type="text" placeholder="Tìm kiếm nhanh" className="block w-full pl-10 pr-3 py-2.5 bg-white border border-red-400 rounded-lg text-sm focus:ring-red-500 focus:border-red-500 outline-none" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Từ ngày</span>
          <input type="date" className="px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm outline-none" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Đến ngày</span>
          <input type="date" className="px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm outline-none" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Trạng thái</span>
          <select className="bg-white border border-gray-300 rounded-lg text-sm py-2.5 pl-3 pr-10 outline-none min-w-[120px]">
            <option></option>
            <option>Hoàn thành</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 font-semibold uppercase tracking-wider text-[11px] border-b border-gray-200">
              <th className="px-4 py-3 border-r border-gray-200 text-center w-32">NGÀY CHỨNG TỪ</th>
              <th className="px-4 py-3 border-r border-gray-200 text-center w-40">SỐ CHỨNG TỪ</th>
              <th className="px-4 py-3 border-r border-gray-200">TÊN KHÁCH HÀNG</th>
              <th className="px-4 py-3 border-r border-gray-200 text-right w-40">TỔNG THANH TOÁN</th>
              <th className="px-4 py-3 border-r border-gray-200 text-center w-32">TRẠNG THÁI</th>
              <th className="px-4 py-3 border-r border-gray-200 text-center w-40">HÌNH THỨC THANH TOÁN</th>
              <th className="px-4 py-3 text-center w-32">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-6 border-r border-gray-200 text-center text-gray-600">{order.date}</td>
                <td className="px-4 py-6 border-r border-gray-200 text-center">
                  <div className="font-bold text-gray-800">{order.code}</div>
                  <div className="inline-block mt-1 px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-bold rounded">Đã xuất hóa đơn</div>
                </td>
                <td className="px-4 py-6 border-r border-gray-200 text-gray-600 font-medium">{order.customer}</td>
                <td className="px-4 py-6 border-r border-gray-200 text-right text-gray-800 font-medium">{order.total}</td>
                <td className="px-4 py-6 border-r border-gray-200 text-center">
                  <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">{order.status}</span>
                </td>
                <td className="px-4 py-6 border-r border-gray-200 text-center text-gray-600">{order.method}</td>
                <td className="px-4 py-6 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="text-red-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                    <button className="text-gray-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
