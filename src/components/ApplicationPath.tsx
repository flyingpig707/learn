import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  ExternalLink,
  FileText
} from 'lucide-react';

// 定义数据类型
interface CaseStudy {
  name: string;
  industry: string;
}

interface Application {
  name: string;
  applications: string[];
  caseStudies: CaseStudy[];
}

interface Level {
  name: string;
  description: string;
  scenarios: Application[];
}

interface ApplicationPathProps {
  data: {
    title: string;
    levels: Level[];
  };
}

const ApplicationPath: React.FC<ApplicationPathProps> = ({ data }) => {
  // 状态管理
  const [activeLevel, setActiveLevel] = useState(0);
  const [expandedScenarios, setExpandedScenarios] = useState<number[]>([0]);
  
  // 切换场景展开/折叠
  const toggleScenario = (index: number) => {
    setExpandedScenarios(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">{data.title}</h3>
      
      <div className="relative">
        {/* 连接线 */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 transform -translate-x-1/2"></div>
        
        {/* 层级列表 */}
        <div className="space-y-10">
          {data.levels.map((level, levelIndex) => (
            <div key={levelIndex} className="relative pl-12">
              {/* 层级指示器 */}
              <div 
                className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center transform -translate-x-1/2 cursor-pointer transition-all z-10 ${
                  activeLevel === levelIndex 
                    ? 'bg-blue-600 text-white shadow-md scale-110' 
                    : 'bg-white border-2 border-blue-200 text-blue-600 hover:border-blue-400'
                }`}
                onClick={() => setActiveLevel(levelIndex)}
              >
                {levelIndex + 1}
              </div>
              
              {/* 层级内容 */}
              <div className={`transition-all duration-300 ${
                activeLevel === levelIndex 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-70 hover:opacity-90'
              }`}>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{level.name}</h4>
                <p className="text-gray-600 mb-6">{level.description}</p>
                
                {/* 场景列表 */}
                <div className="space-y-4 ml-4">
                  {level.scenarios.map((scenario, scenarioIndex) => (
                    <div 
                      key={scenarioIndex} 
                      className="border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-md"
                    >
                      {/* 场景标题栏 */}
                      <div 
                        className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
                        onClick={() => toggleScenario(scenarioIndex)}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                            {scenarioIndex + 1}
                          </div>
                          <h5 className="font-semibold text-gray-800">{scenario.name}</h5>
                        </div>
                        {expandedScenarios.includes(scenarioIndex) ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      
                      {/* 场景内容 */}
                      {expandedScenarios.includes(scenarioIndex) && (
                        <div className="p-4 bg-white">
                          {/* 应用列表 */}
                          <div className="mb-6">
                            <h6 className="font-medium text-gray-700 mb-3">核心应用:</h6>
                            <ul className="space-y-2">
                              {scenario.applications.map((app, appIndex) => (
                                <li key={appIndex} className="flex items-start">
                                  <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                    <span className="text-xs font-medium">{appIndex + 1}</span>
                                  </div>
                                  <span className="text-gray-700">{app}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {/* 案例研究 */}
                          <div>
                            <h6 className="font-medium text-gray-700 mb-3">案例研究:</h6>
                            <div className="space-y-3">
                              {scenario.caseStudies.map((caseStudy, caseIndex) => (
                                <div key={caseIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center">
                                    <FileText className="h-4 w-4 text-blue-600 mr-2" />
                                    <span className="text-gray-700 text-sm">{caseStudy.name}</span>
                                  </div>
                                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                                    {caseStudy.industry}行业
                                  </span>
                                </div>
                              ))}
                            </div>
                            
                            {/* 查看更多按钮 */}
                            <div className="mt-4 text-right">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center ml-auto">
                                查看该场景完整解决方案
                                <ExternalLink className="h-4 w-4 ml-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 了解更多按钮 */}
      <div className="text-center mt-12">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105">
          获取完整应用落地指南
        </button>
      </div>
    </div>
  );
};

export default ApplicationPath;