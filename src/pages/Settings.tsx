import React, { useState } from 'react';

interface SettingsData {
  general: {
    language: string;
    theme: string;
    timezone: string;
    autoSave: boolean;
  };
  notifications: {
    email: boolean;
    push: boolean;
    studyReminders: boolean;
    weeklyReport: boolean;
    newContent: boolean;
  };
  privacy: {
    profileVisibility: string;
    showProgress: boolean;
    allowAnalytics: boolean;
    shareData: boolean;
  };
  learning: {
    dailyGoal: number;
    difficulty: string;
    autoPlay: boolean;
    showHints: boolean;
    trackTime: boolean;
  };
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'privacy' | 'learning'>('general');
  const [settings, setSettings] = useState<SettingsData>({
    general: {
      language: 'zh-CN',
      theme: 'light',
      timezone: 'Asia/Shanghai',
      autoSave: true
    },
    notifications: {
      email: true,
      push: false,
      studyReminders: true,
      weeklyReport: true,
      newContent: false
    },
    privacy: {
      profileVisibility: 'public',
      showProgress: true,
      allowAnalytics: true,
      shareData: false
    },
    learning: {
      dailyGoal: 60,
      difficulty: 'intermediate',
      autoPlay: false,
      showHints: true,
      trackTime: true
    }
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (category: keyof SettingsData, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    // 这里应该调用API保存设置
    console.log('保存设置:', settings);
    setHasChanges(false);
    // 显示成功消息
    alert('设置已保存');
  };

  const resetSettings = () => {
    if (confirm('确定要重置所有设置吗？')) {
      // 重置为默认值
      setSettings({
        general: {
          language: 'zh-CN',
          theme: 'light',
          timezone: 'Asia/Shanghai',
          autoSave: true
        },
        notifications: {
          email: true,
          push: false,
          studyReminders: true,
          weeklyReport: true,
          newContent: false
        },
        privacy: {
          profileVisibility: 'public',
          showProgress: true,
          allowAnalytics: true,
          shareData: false
        },
        learning: {
          dailyGoal: 60,
          difficulty: 'intermediate',
          autoPlay: false,
          showHints: true,
          trackTime: true
        }
      });
      setHasChanges(true);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">设置</h1>
        <p className="text-gray-600">个性化您的学习体验</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 侧边栏导航 */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {[
              { key: 'general', label: '常规设置', icon: '⚙️' },
              { key: 'notifications', label: '通知设置', icon: '🔔' },
              { key: 'privacy', label: '隐私设置', icon: '🔒' },
              { key: 'learning', label: '学习设置', icon: '📚' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === tab.key
                    ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-500'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl mr-3">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* 设置内容 */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* 常规设置 */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">常规设置</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">语言</label>
                  <select
                    value={settings.general.language}
                    onChange={(e) => updateSetting('general', 'language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="zh-CN">中文(简体)</option>
                    <option value="zh-TW">中文(繁体)</option>
                    <option value="en-US">English</option>
                    <option value="ja-JP">日本語</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">主题</label>
                  <select
                    value={settings.general.theme}
                    onChange={(e) => updateSetting('general', 'theme', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="light">浅色主题</option>
                    <option value="dark">深色主题</option>
                    <option value="auto">跟随系统</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">时区</label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Asia/Shanghai">北京时间 (UTC+8)</option>
                    <option value="Asia/Tokyo">东京时间 (UTC+9)</option>
                    <option value="America/New_York">纽约时间 (UTC-5)</option>
                    <option value="Europe/London">伦敦时间 (UTC+0)</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoSave"
                    checked={settings.general.autoSave}
                    onChange={(e) => updateSetting('general', 'autoSave', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="autoSave" className="ml-2 text-sm text-gray-700">
                    自动保存学习进度
                  </label>
                </div>
              </div>
            )}

            {/* 通知设置 */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">通知设置</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">邮件通知</label>
                      <p className="text-xs text-gray-500">接收重要更新和学习提醒</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.email}
                      onChange={(e) => updateSetting('notifications', 'email', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">推送通知</label>
                      <p className="text-xs text-gray-500">浏览器推送通知</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.push}
                      onChange={(e) => updateSetting('notifications', 'push', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">学习提醒</label>
                      <p className="text-xs text-gray-500">每日学习时间提醒</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.studyReminders}
                      onChange={(e) => updateSetting('notifications', 'studyReminders', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">周报</label>
                      <p className="text-xs text-gray-500">每周学习进度报告</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.weeklyReport}
                      onChange={(e) => updateSetting('notifications', 'weeklyReport', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">新内容通知</label>
                      <p className="text-xs text-gray-500">新课程和文章发布通知</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.newContent}
                      onChange={(e) => updateSetting('notifications', 'newContent', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 隐私设置 */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">隐私设置</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">个人资料可见性</label>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => updateSetting('privacy', 'profileVisibility', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="public">公开</option>
                    <option value="friends">仅好友可见</option>
                    <option value="private">私密</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">显示学习进度</label>
                      <p className="text-xs text-gray-500">允许其他用户查看您的学习进度</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.privacy.showProgress}
                      onChange={(e) => updateSetting('privacy', 'showProgress', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">允许数据分析</label>
                      <p className="text-xs text-gray-500">帮助我们改进产品体验</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.privacy.allowAnalytics}
                      onChange={(e) => updateSetting('privacy', 'allowAnalytics', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">共享学习数据</label>
                      <p className="text-xs text-gray-500">与教育机构共享匿名学习数据</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.privacy.shareData}
                      onChange={(e) => updateSetting('privacy', 'shareData', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 学习设置 */}
            {activeTab === 'learning' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">学习设置</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    每日学习目标 ({settings.learning.dailyGoal} 分钟)
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="240"
                    step="15"
                    value={settings.learning.dailyGoal}
                    onChange={(e) => updateSetting('learning', 'dailyGoal', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>15分钟</span>
                    <span>240分钟</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">默认难度级别</label>
                  <select
                    value={settings.learning.difficulty}
                    onChange={(e) => updateSetting('learning', 'difficulty', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="beginner">初级</option>
                    <option value="intermediate">中级</option>
                    <option value="advanced">高级</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">自动播放视频</label>
                      <p className="text-xs text-gray-500">课程视频自动播放</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.learning.autoPlay}
                      onChange={(e) => updateSetting('learning', 'autoPlay', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">显示提示</label>
                      <p className="text-xs text-gray-500">在练习中显示提示信息</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.learning.showHints}
                      onChange={(e) => updateSetting('learning', 'showHints', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">跟踪学习时间</label>
                      <p className="text-xs text-gray-500">记录详细的学习时间统计</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.learning.trackTime}
                      onChange={(e) => updateSetting('learning', 'trackTime', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 操作按钮 */}
            <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
              <button
                onClick={resetSettings}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                重置设置
              </button>
              <div className="space-x-3">
                <button
                  onClick={() => setHasChanges(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={!hasChanges}
                >
                  取消
                </button>
                <button
                  onClick={saveSettings}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    hasChanges
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!hasChanges}
                >
                  保存设置
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;