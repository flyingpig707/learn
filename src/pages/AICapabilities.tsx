import React, { useState } from 'react';

interface Capability {
  id: string;
  name: string;
  description: string;
  category: string;
  level: number;
  maxLevel: number;
  icon: string;
  skills: string[];
}

const AICapabilities: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const capabilities: Capability[] = [
    {
      id: '1',
      name: '机器学习基础',
      description: '掌握机器学习的核心概念和基础算法',
      category: '基础技能',
      level: 3,
      maxLevel: 5,
      icon: '🤖',
      skills: ['监督学习', '无监督学习', '特征工程', '模型评估']
    },
    {
      id: '2',
      name: '深度学习',
      description: '神经网络和深度学习框架的应用能力',
      category: '核心技能',
      level: 2,
      maxLevel: 5,
      icon: '🧠',
      skills: ['神经网络', 'CNN', 'RNN', 'Transformer']
    },
    {
      id: '3',
      name: '自然语言处理',
      description: '文本处理和语言理解技术',
      category: '应用技能',
      level: 2,
      maxLevel: 5,
      icon: '💬',
      skills: ['文本预处理', '情感分析', '命名实体识别', '机器翻译']
    },
    {
      id: '4',
      name: '计算机视觉',
      description: '图像识别和视觉理解能力',
      category: '应用技能',
      level: 1,
      maxLevel: 5,
      icon: '👁️',
      skills: ['图像分类', '目标检测', '图像分割', '人脸识别']
    },
    {
      id: '5',
      name: '数据分析',
      description: '数据处理和统计分析技能',
      category: '基础技能',
      level: 4,
      maxLevel: 5,
      icon: '📊',
      skills: ['数据清洗', '统计分析', '数据可视化', 'SQL查询']
    },
    {
      id: '6',
      name: 'Python编程',
      description: 'Python语言和相关库的使用',
      category: '工具技能',
      level: 4,
      maxLevel: 5,
      icon: '🐍',
      skills: ['基础语法', 'NumPy', 'Pandas', 'Scikit-learn']
    }
  ];

  const categories = ['all', '基础技能', '核心技能', '应用技能', '工具技能'];

  const filteredCapabilities = selectedCategory === 'all' 
    ? capabilities 
    : capabilities.filter(cap => cap.category === selectedCategory);

  const getLevelColor = (level: number, maxLevel: number) => {
    const percentage = (level / maxLevel) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    if (percentage >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getLevelText = (level: number) => {
    if (level >= 4) return '精通';
    if (level >= 3) return '熟练';
    if (level >= 2) return '了解';
    if (level >= 1) return '入门';
    return '未学习';
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI能力图谱</h1>
        <p className="text-gray-600">查看和提升您的AI技能水平</p>
      </div>

      {/* 分类筛选 */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? '全部' : category}
            </button>
          ))}
        </div>
      </div>

      {/* 能力概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredCapabilities.map((capability) => (
          <div key={capability.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{capability.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{capability.name}</h3>
                  <span className="text-sm text-gray-500">{capability.category}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 text-sm">{capability.description}</p>
              
              {/* 技能等级 */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">技能等级</span>
                  <span className="text-sm font-medium text-gray-900">
                    {getLevelText(capability.level)} ({capability.level}/{capability.maxLevel})
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getLevelColor(capability.level, capability.maxLevel)}`}
                    style={{ width: `${(capability.level / capability.maxLevel) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* 技能标签 */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">相关技能</p>
                <div className="flex flex-wrap gap-1">
                  {capability.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  提升技能
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  详情
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 技能统计 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">技能统计</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {capabilities.filter(c => c.level >= 4).length}
            </div>
            <div className="text-sm text-gray-600">精通技能</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {capabilities.filter(c => c.level >= 3).length}
            </div>
            <div className="text-sm text-gray-600">熟练技能</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {capabilities.filter(c => c.level >= 2).length}
            </div>
            <div className="text-sm text-gray-600">了解技能</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {capabilities.filter(c => c.level >= 1).length}
            </div>
            <div className="text-sm text-gray-600">入门技能</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICapabilities;