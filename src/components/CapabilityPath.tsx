import React from 'react';
import { BookOpen, Award, CheckCircle } from 'lucide-react';

// 定义数据类型
interface Course {
  name: string;
  type: 'theory' | 'practice';
}

interface Stage {
  level: string;
  name: string;
  capability: string;
  courses: Course[];
  certification: string;
  color: string;
}

interface CapabilityPathProps {
  data: {
    title: string;
    stages: Stage[];
  };
}

const CapabilityPath: React.FC<CapabilityPathProps> = ({ data }) => {
  // 处理长名称的截断函数
  const truncateText = (text: string, maxLength: number = 18) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  return (
    <div className="overflow-x-auto pb-6">
      <div className="min-w-[900px]">
        <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">{data.title}</h3>
        
        {/* 阶段导航器 */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2 space-x-2">
          {data.stages.map((stage, index) => (
            <button
              key={stage.level}
              className={`px-3 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                index === 0 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {stage.level}: {truncateText(stage.name)}
            </button>
          ))}
        </div>
        
        {/* 阶段详情展示 */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          {data.stages.map((stage, index) => (
            <div 
              key={stage.level} 
              className={`mb-8 last:mb-0 transition-all duration-500 ${
                index === 0 ? 'opacity-100' : 'opacity-50 hover:opacity-80'
              }`}
            >
              <div className="flex items-center mb-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mr-3"
                  style={{ backgroundColor: stage.color }}
                >
                  {stage.level}
                </div>
                <h4 className="text-xl font-bold text-gray-800">{stage.name}</h4>
                <div className="ml-auto flex items-center text-sm text-gray-500">
                  <Award className="h-4 w-4 mr-1" />
                  <span>{stage.certification}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h5 className="font-semibold text-gray-700 mb-2">核心能力目标:</h5>
                <p className="text-gray-600 pl-14">{stage.capability}</p>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-700 mb-3">课程模块:</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pl-14">
                  {stage.courses.map((course, courseIndex) => (
                    <div key={courseIndex} className="flex items-center text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 ${
                        course.type === 'theory' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      }`}>
                        <BookOpen className="h-3 w-3" />
                      </div>
                      <span className="text-gray-700">{course.name}</span>
                    </div>
                  ))}
                  {stage.courses.length < 3 && (
                    // 添加空占位符以保持布局一致
                    Array(3 - stage.courses.length).fill(0).map((_, i) => (
                      <div key={`empty-${i}`} className="flex items-center text-sm text-gray-300 pl-7">
                        <span>—</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              {index < data.stages.length - 1 && (
                <div className="mt-6 flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* 查看完整路径按钮 */}
          <div className="text-center mt-10">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105">
              查看完整九段能力提升路径
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapabilityPath;