import React, { useState } from 'react';
import { 
  FileText, 
  Award, 
  ShieldCheck,
  Download,
  ExternalLink,
  ChevronRight,
  Search
} from 'lucide-react';

// 定义数据类型
interface Certificate {
  name: string;
  requirements: string;
}

interface CertificateCategory {
  category: string;
  description: string;
  certificates: Certificate[];
}

interface CertificateCenterProps {
  data: {
    types: CertificateCategory[];
  };
}

const CertificateCenter: React.FC<CertificateCenterProps> = ({ data }) => {
  // 状态管理
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  // 过滤证书
  const filteredCertificates = data.types[activeCategory].certificates.filter(cert =>
    cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.requirements.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h4 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">证书与认证体系</h4>
        
        {/* 搜索框 */}
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder="搜索证书..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* 侧边分类导航 */}
          <div className="md:w-64 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="p-4">
              <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                证书类型
              </h5>
              <nav className="space-y-1">
                {data.types.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveCategory(index);
                      setSearchQuery('');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-colors ${
                      activeCategory === index
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      {index === 0 && <FileText className="h-5 w-5 mr-3" />}
                      {index === 1 && <Award className="h-5 w-5 mr-3" />}
                      {index === 2 && <ShieldCheck className="h-5 w-5 mr-3" />}
                      <span>{category.category}</span>
                    </div>
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                      {category.certificates.length}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          {/* 证书列表 */}
          <div className="flex-1 p-6">
            <div className="mb-6">
              <h5 className="text-lg font-bold text-gray-800 mb-2">
                {data.types[activeCategory].category}
              </h5>
              <p className="text-gray-600 text-sm">
                {data.types[activeCategory].description}
              </p>
            </div>
            
            {filteredCertificates.length > 0 ? (
              <div className="space-y-4">
                {filteredCertificates.map((cert, index) => (
                  <div 
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-md"
                  >
                    <div className="p-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h6 className="text-base font-bold text-gray-800 mb-1">{cert.name}</h6>
                          <p className="text-gray-600 text-sm">{cert.requirements}</p>
                        </div>
                        
                        <div className="mt-4 md:mt-0 flex space-x-3">
                          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 transition-colors">
                            <Download className="h-4 w-4 mr-1.5" />
                            申请指南
                          </button>
                          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                            查看详情
                            <ChevronRight className="h-4 w-4 ml-1.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h6 className="text-lg font-medium text-gray-900 mb-1">未找到证书</h6>
                <p className="text-gray-500 max-w-md mx-auto">
                  没有找到符合搜索条件的证书，请尝试其他关键词或浏览全部证书。
                </p>
                <button 
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => setSearchQuery('')}
                >
                  清除搜索条件
                </button>
              </div>
            )}
            
            {/* 底部说明 */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-500">
              <p className="mb-3">
                <ShieldCheck className="inline-block h-4 w-4 mr-1 text-blue-600" />
                所有证书均由AI人才培训联盟认证，具有行业广泛认可度
              </p>
              <p>
                <ExternalLink className="inline-block h-4 w-4 mr-1 text-blue-600" />
                <a href="#" className="text-blue-600 hover:text-blue-800">查看证书验证系统</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCenter;