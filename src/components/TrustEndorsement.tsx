import React, { useState } from 'react';
import { 
  ExternalLink, 
  Play,
  ChevronRight,
  Star
} from 'lucide-react';

// 定义数据类型
interface Partner {
  name: string;
  type: 'industry' | 'government' | 'academic' | 'international';
}

interface Expert {
  name: string;
  title: string;
  affiliation: string;
}

interface SuccessStory {
  name: string;
  description: string;
  videoUrl: string;
}

interface TrustEndorsementProps {
  data: {
    partners: Partner[];
    experts: Expert[];
    successStories: SuccessStory[];
  };
}

const TrustEndorsement: React.FC<TrustEndorsementProps> = ({ data }) => {
  // 状态管理
  const [activeTab, setActiveTab] = useState('partners');
  
  // 合作伙伴类型标签
  const partnerTypes = [
    { id: 'all', name: '全部' },
    { id: 'industry', name: '行业协会' },
    { id: 'government', name: '政府机构' },
    { id: 'academic', name: '学术机构' },
    { id: 'international', name: '国际组织' }
  ];
  
  // 状态管理 - 合作伙伴过滤
  const [partnerFilter, setPartnerFilter] = useState('all');
  
  // 过滤合作伙伴
  const filteredPartners = partnerFilter === 'all'
    ? data.partners
    : data.partners.filter(partner => partner.type === partnerFilter);
  
  return (
    <div className="max-w-5xl mx-auto">
      {/* 标签页导航 */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
            activeTab === 'partners'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('partners')}
        >
          合作机构
        </button>
        <button
          className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
            activeTab === 'experts'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('experts')}
        >
          专家团队
        </button>
        <button
          className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
            activeTab === 'cases'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('cases')}
        >
          成功案例
        </button>
      </div>
      
      {/* 合作机构 */}
      {activeTab === 'partners' && (
        <div>
          <div className="flex flex-wrap justify-between items-center mb-8">
            <h5 className="text-xl font-bold text-gray-800">合作机构与认证</h5>
            
            {/* 合作伙伴过滤 */}
            <div className="flex space-x-2 mt-4 sm:mt-0">
              {partnerTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setPartnerFilter(type.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    partnerFilter === type.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* 合作伙伴列表 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredPartners.map((partner, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-center transition-all hover:shadow-md hover:border-gray-300"
              >
                <div className="w-full h-16 flex items-center justify-center bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium text-center text-sm">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* 查看更多 */}
          <div className="text-center mt-10">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              查看全部合作机构
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      )}
      
      {/* 专家团队 */}
      {activeTab === 'experts' && (
        <div>
          <h5 className="text-xl font-bold text-gray-800 mb-8">专家导师团</h5>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.experts.map((expert, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all hover:shadow-md"
              >
                <div className="p-6">
                  {/* 专家头像占位 */}
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-400 text-2xl font-bold">
                      {expert.name.charAt(0)}
                    </span>
                  </div>
                  
                  <h6 className="text-center text-lg font-bold text-gray-800 mb-1">
                    {expert.name}
                  </h6>
                  <p className="text-center text-blue-600 text-sm mb-3">
                    {expert.title}
                  </p>
                  <p className="text-center text-gray-500 text-sm mb-4">
                    {expert.affiliation}
                  </p>
                  
                  <div className="flex justify-center space-x-3">
                    <button className="text-xs px-3 py-1 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors">
                      查看详情
                    </button>
                    <button className="text-xs px-3 py-1 border border-blue-600 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
                      预约咨询
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 查看更多 */}
          <div className="text-center mt-10">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              查看全部专家
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      )}
      
      {/* 成功案例 */}
      {activeTab === 'cases' && (
        <div>
          <h5 className="text-xl font-bold text-gray-800 mb-8">成功案例</h5>
          
          <div className="space-y-6">
            {data.successStories.map((story, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all hover:shadow-md"
              >
                <div className="md:flex">
                  {/* 视频缩略图 */}
                  <div className="md:w-1/3 relative bg-gray-100 h-48 md:h-auto">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  
                  {/* 案例内容 */}
                  <div className="p-6 md:w-2/3">
                    <h6 className="text-lg font-bold text-gray-800 mb-2">{story.name}</h6>
                    <p className="text-gray-600 text-sm mb-4">{story.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <div className="flex items-center mr-4">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="ml-1">5.0</span>
                      </div>
                      <span>128人已学习</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                        查看完整案例
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </button>
                      
                      <button className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                        申请类似方案
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 查看更多 */}
          <div className="text-center mt-10">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              查看全部案例
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrustEndorsement;