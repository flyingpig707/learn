import React, { useState } from 'react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  modules: number;
  progress: number;
  category: string;
}

const LearningPaths: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const learningPaths: LearningPath[] = [
    {
      id: '1',
      title: 'AI基础入门',
      description: '从零开始学习人工智能的基础概念和核心技术',
      level: 'beginner',
      duration: '4周',
      modules: 12,
      progress: 75,
      category: 'AI基础'
    },
    {
      id: '2',
      title: '机器学习实战',
      description: '通过实际项目学习机器学习算法和应用',
      level: 'intermediate',
      duration: '6周',
      modules: 18,
      progress: 45,
      category: '机器学习'
    },
    {
      id: '3',
      title: '深度学习进阶',
      description: '深入学习神经网络和深度学习框架',
      level: 'advanced',
      duration: '8周',
      modules: 24,
      progress: 0,
      category: '深度学习'
    },
    {
      id: '4',
      title: '自然语言处理',
      description: '学习NLP技术和语言模型应用',
      level: 'intermediate',
      duration: '5周',
      modules: 15,
      progress: 20,
      category: 'NLP'
    }
  ];

  const categories = ['all', 'AI基础', '机器学习', '深度学习', 'NLP'];

  const filteredPaths = selectedCategory === 'all' 
    ? learningPaths 
    : learningPaths.filter(path => path.category === selectedCategory);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return '初级';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return level;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">学习路径</h1>
        <p className="text-gray-600">选择适合您的学习路径，系统化提升AI技能</p>
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

      {/* 学习路径网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPaths.map((path) => (
          <div key={path.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{path.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(path.level)}`}>
                  {getLevelText(path.level)}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{path.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>📅 {path.duration}</span>
                <span>📚 {path.modules} 模块</span>
              </div>

              {/* 进度条 */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">学习进度</span>
                  <span className="font-medium">{path.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${path.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2">
                {path.progress > 0 ? (
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    继续学习
                  </button>
                ) : (
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    开始学习
                  </button>
                )}
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  详情
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPaths.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无学习路径</h3>
          <p className="text-gray-600">该分类下暂时没有可用的学习路径</p>
        </div>
      )}
    </div>
  );
};

export default LearningPaths;