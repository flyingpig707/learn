import React from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  Target,
  PlayCircle
} from 'lucide-react';

// 定义数据类型
interface ProductItem {
  name: string;
  description: string;
  duration: string;
  targetAudience: string;
  format: string;
}

interface ProductCategory {
  category: string;
  items: ProductItem[];
}

interface OrganizationUpgradePathProps {
  data: {
    title: string;
    products: ProductCategory[];
  };
}

const OrganizationUpgradePath: React.FC<OrganizationUpgradePathProps> = ({ data }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">{data.title}</h3>
      
      {/* 产品类别选项卡 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {data.products.map((category, index) => (
          <div 
            key={index}
            className={`p-6 rounded-xl transition-all cursor-pointer transform hover:scale-105 ${
              index === 0 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white border border-gray-200 text-gray-700 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              {index === 0 && <Calendar className="h-10 w-10 mb-4 text-white" />}
              {index === 1 && <Users className="h-10 w-10 mb-4 text-blue-600" />}
              {index === 2 && <PlayCircle className="h-10 w-10 mb-4 text-blue-600" />}
              
              <h4 className="text-xl font-bold mb-2">{category.category}</h4>
              <p className={`text-sm ${index === 0 ? 'text-blue-100' : 'text-gray-500'}`}>
                {category.items.length}个产品
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* 产品列表 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {data.products[0].items.map((item, index) => (
          <div 
            key={index} 
            className={`p-6 transition-all hover:bg-gray-50 ${
              index < data.products[0].items.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center">
              {/* 产品信息 */}
              <div className="md:flex-1 mb-4 md:mb-0 md:mr-8">
                <h5 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h5>
                <p className="text-gray-600">{item.description}</p>
              </div>
              
              {/* 产品详情 */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-auto">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>时长</span>
                  </div>
                  <div className="font-medium text-gray-800">{item.duration}</div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <Users className="h-4 w-4 mr-1" />
                    <span>对象</span>
                  </div>
                  <div className="font-medium text-gray-800 text-sm">{item.targetAudience}</div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <Target className="h-4 w-4 mr-1" />
                    <span>形式</span>
                  </div>
                  <div className="font-medium text-gray-800">{item.format}</div>
                </div>
              </div>
              
              {/* 操作按钮 */}
              <div className="mt-4 md:mt-0 md:ml-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                  了解详情
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 查看更多按钮 */}
      <div className="text-center mt-10">
        <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full font-medium transition-colors">
          查看全部组织赋能产品
        </button>
      </div>
    </div>
  );
};

export default OrganizationUpgradePath;