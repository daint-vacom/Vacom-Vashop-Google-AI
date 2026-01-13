
import React, { useState } from 'react';
import { Modal } from '../../components/Modal';

interface Integration {
  id: string;
  name: string;
  platform: 'KiotViet';
  clientId: string;
  secretKey: string;
  connectionName: string;
}

const PLATFORMS = [
  {
    id: 'KiotViet',
    name: 'KiotViet',
    logo: 'assets/kiot-viet.png',
    description: 'Nền tảng quản lý bán hàng phổ biến nhất Việt Nam.'
  }
];

export const ThirdPartyIntegration: React.FC<{ onAddTrigger: boolean; resetTrigger: () => void }> = ({ onAddTrigger, resetTrigger }) => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Chi nhánh Quận 1',
      platform: 'KiotViet',
      clientId: 'KV-99283-ID',
      secretKey: '********',
      connectionName: 'Cửa hàng thời trang Q1'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectingPlatform, setIsSelectingPlatform] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Integration>>({ platform: 'KiotViet' });

  React.useEffect(() => {
    if (onAddTrigger) {
      handleAddNew();
      resetTrigger();
    }
  }, [onAddTrigger]);

  const handleAddNew = () => {
    setEditingId(null);
    setIsSelectingPlatform(true);
    setFormData({ platform: 'KiotViet', name: '', connectionName: '', clientId: '', secretKey: '' });
    setIsModalOpen(true);
  };

  const handleSelectPlatform = (platformId: string) => {
    setIsSelectingPlatform(false);
  };

  const handleEdit = (item: Integration) => {
    setEditingId(item.id);
    setIsSelectingPlatform(false);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa tích hợp này?')) {
      setIntegrations(integrations.filter(i => i.id !== id));
      setIsModalOpen(false);
    }
  };

  const handleSave = () => {
    if (editingId) {
      setIntegrations(integrations.map(i => i.id === editingId ? (formData as Integration) : i));
    } else {
      setIntegrations([...integrations, { ...formData, id: Date.now().toString() } as Integration]);
    }
    setIsModalOpen(false);
  };

  const kiotVietLogo = 'assets/kiot-viet.png';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 p-5 rounded-2xl hover:shadow-md transition-shadow group relative">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center p-2 shadow-sm overflow-hidden">
                  <img src={kiotVietLogo} alt="KiotViet" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-xs text-red-600 font-semibold uppercase tracking-wider">{item.platform}</p>
                </div>
              </div>
              <button 
                onClick={() => handleEdit(item)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Tên kết nối:</span>
                <span className="text-gray-800 font-medium">{item.connectionName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Client ID:</span>
                <span className="text-gray-800 font-mono text-xs">{item.clientId}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={isSelectingPlatform ? 'Chọn nền tảng tích hợp' : (editingId ? 'Cấu hình tích hợp' : 'Thiết lập KiotViet')}
      >
        {isSelectingPlatform ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PLATFORMS.map((platform) => (
              <button
                key={platform.id}
                onClick={() => handleSelectPlatform(platform.id)}
                className="group p-5 border border-gray-200 rounded-2xl hover:border-red-500 hover:bg-red-50/30 transition-all text-left flex flex-col items-center text-center sm:items-start sm:text-left"
              >
                <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-3 shadow-sm mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                  <img src={platform.logo} alt={platform.name} className="w-full h-full object-contain" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{platform.name}</h4>
                <p className="text-xs text-gray-500 line-clamp-2">{platform.description}</p>
                <div className="mt-4 text-red-600 text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Tiếp tục
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
              <div className="w-10 h-10 bg-white border border-gray-100 rounded-lg p-1.5 overflow-hidden">
                <img src={kiotVietLogo} alt="KiotViet" className="w-full h-full object-contain" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Kết nối KiotViet</h4>
                <p className="text-xs text-gray-500">Cấu hình thông tin API để đồng bộ hóa đơn.</p>
              </div>
              {!editingId && (
                <button 
                  onClick={() => setIsSelectingPlatform(true)}
                  className="ml-auto text-xs text-red-600 font-bold hover:underline"
                >
                  Thay đổi nền tảng
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tên tích hợp</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-gray-900"
                  value={formData.name || ''}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Client ID</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-gray-900 font-mono"
                  value={formData.clientId || ''}
                  onChange={e => setFormData({...formData, clientId: e.target.value})}
                />
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-100 space-y-3">
              <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-bold transition-all active:scale-[0.98] border border-gray-200 flex items-center justify-center gap-2">
                Kiểm tra kết nối
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={handleSave}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-100 transition-all active:scale-[0.98]"
                >
                  Lưu cấu hình
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
