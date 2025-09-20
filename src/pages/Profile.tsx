import React, { useState } from 'react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  bio: string;
  location: string;
  joinDate: string;
  stats: {
    coursesCompleted: number;
    articlesRead: number;
    skillsLearned: number;
    studyHours: number;
  };
  badges: Array<{
    id: string;
    name: string;
    icon: string;
    description: string;
    earnedDate: string;
  }>;
  recentActivity: Array<{
    id: string;
    type: string;
    title: string;
    date: string;
    progress?: number;
  }>;
}

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'settings'>('overview');
  const [isEditing, setIsEditing] = useState(false);

  const userProfile: UserProfile = {
    id: '1',
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: '👤',
    title: 'AI学习者',
    bio: '热爱人工智能技术，致力于通过持续学习提升自己的技术能力。专注于机器学习和深度学习领域的研究与实践。',
    location: '北京, 中国',
    joinDate: '2023-01-15',
    stats: {
      coursesCompleted: 12,
      articlesRead: 156,
      skillsLearned: 8,
      studyHours: 240
    },
    badges: [
      {
        id: '1',
        name: '初学者',
        icon: '🌱',
        description: '完成第一个学习路径',
        earnedDate: '2023-02-01'
      },
      {
        id: '2',
        name: '阅读达人',
        icon: '📚',
        description: '阅读100篇技术文章',
        earnedDate: '2023-06-15'
      },
      {
        id: '3',
        name: '坚持学习',
        icon: '🔥',
        description: '连续学习30天',
        earnedDate: '2023-08-20'
      },
      {
        id: '4',
        name: '技能专家',
        icon: '🎯',
        description: '掌握5项核心技能',
        earnedDate: '2023-10-10'
      }
    ],
    recentActivity: [
      {
        id: '1',
        type: 'course',
        title: '完成《深度学习基础》课程',
        date: '2023-12-01',
        progress: 100
      },
      {
        id: '2',
        type: 'article',
        title: '阅读《Transformer架构详解》',
        date: '2023-11-28'
      },
      {
        id: '3',
        type: 'skill',
        title: '学习新技能：自然语言处理',
        date: '2023-11-25',
        progress: 75
      },
      {
        id: '4',
        type: 'badge',
        title: '获得"技能专家"徽章',
        date: '2023-11-20'
      }
    ]
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course': return '📖';
      case 'article': return '📄';
      case 'skill': return '🎯';
      case 'badge': return '🏆';
      default: return '📌';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  return (
    <div className="p-6">
      {/* 个人信息头部 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="text-6xl mr-6">{userProfile.avatar}</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
              <p className="text-gray-600 mb-2">{userProfile.title}</p>
              <p className="text-sm text-gray-500 mb-2">📍 {userProfile.location}</p>
              <p className="text-sm text-gray-500">加入时间: {formatDate(userProfile.joinDate)}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditing ? '保存' : '编辑资料'}
          </button>
        </div>
        
        {userProfile.bio && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-700">{userProfile.bio}</p>
          </div>
        )}
      </div>

      {/* 统计数据 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{userProfile.stats.coursesCompleted}</div>
          <div className="text-sm text-gray-600">完成课程</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{userProfile.stats.articlesRead}</div>
          <div className="text-sm text-gray-600">阅读文章</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{userProfile.stats.skillsLearned}</div>
          <div className="text-sm text-gray-600">掌握技能</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{userProfile.stats.studyHours}</div>
          <div className="text-sm text-gray-600">学习时长(小时)</div>
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'overview', label: '概览' },
              { key: 'activity', label: '最近活动' },
              { key: 'settings', label: '设置' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 标签页内容 */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 徽章展示 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">获得徽章</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {userProfile.badges.map((badge) => (
                <div key={badge.id} className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h3 className="font-medium text-gray-900 mb-1">{badge.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                  <p className="text-xs text-gray-500">{formatDate(badge.earnedDate)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">最近活动</h2>
          <div className="space-y-4">
            {userProfile.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl mr-4">{getActivityIcon(activity.type)}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                  {activity.progress !== undefined && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">进度</span>
                        <span className="text-gray-900">{activity.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${activity.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">账户设置</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">邮箱地址</label>
              <input
                type="email"
                value={userProfile.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">个人简介</label>
              <textarea
                value={userProfile.bio}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">所在地区</label>
              <input
                type="text"
                value={userProfile.location}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                readOnly={!isEditing}
              />
            </div>
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">通知设置</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">邮件通知</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">学习提醒</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">推送通知</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;