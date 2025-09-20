import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">仪表板</h1>
        <p className="text-gray-600">欢迎回到您的学习中心</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              📚
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">学习路径</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              ✅
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">已完成</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              ⏱️
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">学习时长</p>
              <p className="text-2xl font-bold text-gray-900">24h</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              🏆
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">成就</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* 最近活动 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">最近学习</h2>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
                AI
              </div>
              <div className="ml-3 flex-1">
                <p className="font-medium text-gray-900">人工智能基础</p>
                <p className="text-sm text-gray-600">进度: 75%</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-semibold">
                ML
              </div>
              <div className="ml-3 flex-1">
                <p className="font-medium text-gray-900">机器学习入门</p>
                <p className="text-sm text-gray-600">进度: 45%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">推荐课程</h2>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-semibold">
                DL
              </div>
              <div className="ml-3 flex-1">
                <p className="font-medium text-gray-900">深度学习进阶</p>
                <p className="text-sm text-gray-600">适合您的学习路径</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-semibold">
                NLP
              </div>
              <div className="ml-3 flex-1">
                <p className="font-medium text-gray-900">自然语言处理</p>
                <p className="text-sm text-gray-600">热门课程</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;