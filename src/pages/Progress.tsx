import React, { useState } from 'react';

interface ProgressData {
  id: string;
  title: string;
  category: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  timeSpent: number;
  lastAccessed: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'not_started' | 'in_progress' | 'completed' | 'paused';
}

interface SkillProgress {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  xp: number;
  nextLevelXp: number;
  category: string;
}

const Progress: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'skills' | 'achievements'>('courses');

  const courseProgress: ProgressData[] = [
    {
      id: '1',
      title: '机器学习基础',
      category: '基础课程',
      progress: 85,
      totalLessons: 20,
      completedLessons: 17,
      timeSpent: 45,
      lastAccessed: '2023-12-01',
      difficulty: 'beginner',
      status: 'in_progress'
    },
    {
      id: '2',
      title: '深度学习进阶',
      category: '进阶课程',
      progress: 60,
      totalLessons: 15,
      completedLessons: 9,
      timeSpent: 32,
      lastAccessed: '2023-11-28',
      difficulty: 'advanced',
      status: 'in_progress'
    },
    {
      id: '3',
      title: 'Python数据分析',
      category: '工具课程',
      progress: 100,
      totalLessons: 12,
      completedLessons: 12,
      timeSpent: 28,
      lastAccessed: '2023-11-15',
      difficulty: 'intermediate',
      status: 'completed'
    },
    {
      id: '4',
      title: '自然语言处理',
      category: '应用课程',
      progress: 25,
      totalLessons: 18,
      completedLessons: 4,
      timeSpent: 12,
      lastAccessed: '2023-11-20',
      difficulty: 'advanced',
      status: 'in_progress'
    }
  ];

  const skillProgress: SkillProgress[] = [
    {
      id: '1',
      name: 'Python编程',
      level: 4,
      maxLevel: 5,
      xp: 850,
      nextLevelXp: 1000,
      category: '编程语言'
    },
    {
      id: '2',
      name: '机器学习',
      level: 3,
      maxLevel: 5,
      xp: 620,
      nextLevelXp: 800,
      category: '核心技能'
    },
    {
      id: '3',
      name: '数据可视化',
      level: 3,
      maxLevel: 5,
      xp: 480,
      nextLevelXp: 600,
      category: '数据分析'
    },
    {
      id: '4',
      name: '深度学习',
      level: 2,
      maxLevel: 5,
      xp: 280,
      nextLevelXp: 400,
      category: '核心技能'
    }
  ];

  const achievements = [
    {
      id: '1',
      name: '学习新手',
      description: '完成第一个课程',
      icon: '🌱',
      earned: true,
      earnedDate: '2023-10-15'
    },
    {
      id: '2',
      name: '坚持学习',
      description: '连续学习7天',
      icon: '🔥',
      earned: true,
      earnedDate: '2023-10-22'
    },
    {
      id: '3',
      name: '技能大师',
      description: '达到技能等级4',
      icon: '🎯',
      earned: true,
      earnedDate: '2023-11-10'
    },
    {
      id: '4',
      name: '学习达人',
      description: '完成10个课程',
      icon: '📚',
      earned: false,
      earnedDate: null
    },
    {
      id: '5',
      name: '专家级别',
      description: '达到技能等级5',
      icon: '👑',
      earned: false,
      earnedDate: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'in_progress': return '进行中';
      case 'paused': return '已暂停';
      default: return '未开始';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600';
      case 'intermediate': return 'text-yellow-600';
      case 'advanced': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '初级';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return '未知';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">学习进度</h1>
        <p className="text-gray-600">跟踪您的学习进展和技能发展</p>
      </div>

      {/* 总体统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">📚</div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {courseProgress.filter(c => c.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">完成课程</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">⏱️</div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {courseProgress.reduce((total, course) => total + course.timeSpent, 0)}
              </div>
              <div className="text-sm text-gray-600">学习时长(小时)</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🎯</div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {skillProgress.filter(s => s.level >= 3).length}
              </div>
              <div className="text-sm text-gray-600">掌握技能</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🏆</div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {achievements.filter(a => a.earned).length}
              </div>
              <div className="text-sm text-gray-600">获得成就</div>
            </div>
          </div>
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'courses', label: '课程进度' },
              { key: 'skills', label: '技能发展' },
              { key: 'achievements', label: '成就徽章' }
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

      {/* 课程进度 */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          {courseProgress.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{course.category}</span>
                    <span className={getDifficultyColor(course.difficulty)}>
                      {getDifficultyText(course.difficulty)}
                    </span>
                    <span>最后学习: {formatDate(course.lastAccessed)}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                  {getStatusText(course.status)}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">课程进度</span>
                  <span className="text-sm font-medium text-gray-900">
                    {course.completedLessons}/{course.totalLessons} 课时 ({course.progress}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>学习时长: {course.timeSpent} 小时</span>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  继续学习
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 技能发展 */}
      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillProgress.map((skill) => (
            <div key={skill.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
                  <p className="text-sm text-gray-600">{skill.category}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">等级 {skill.level}</div>
                  <div className="text-xs text-gray-500">最高等级 {skill.maxLevel}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">经验值</span>
                  <span className="text-sm font-medium text-gray-900">
                    {skill.xp}/{skill.nextLevelXp} XP
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(skill.xp / skill.nextLevelXp) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                还需 {skill.nextLevelXp - skill.xp} XP 升级到等级 {skill.level + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 成就徽章 */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`bg-white rounded-lg shadow-md p-6 ${
                achievement.earned ? 'border-l-4 border-green-500' : 'opacity-60'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
                
                {achievement.earned ? (
                  <div className="text-sm text-green-600 font-medium">
                    ✅ 已获得 - {achievement.earnedDate && formatDate(achievement.earnedDate)}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    🔒 未解锁
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Progress;