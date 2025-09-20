import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  BookOpen, 
  Award,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Clock,
  Calendar,
  BarChart3
} from 'lucide-react';

// 定义数据类型
type Industry = 'manufacturing' | 'healthcare' | 'finance' | 'retail' | 'education' | 'other';
type Role = 'technical' | 'business' | 'executive';
type Experience = 'beginner' | 'intermediate' | 'advanced';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  courses: number;
  certification: string;
  color: string;
}

const LearningPathEngine: React.FC = () => {
  // 状态管理
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    industry: 'other' as Industry,
    role: 'business' as Role,
    experience: 'beginner' as Experience,
    goals: ['application'] as string[]
  });
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  
  // 行业选项
  const industries = [
    { id: 'manufacturing', name: '制造业' },
    { id: 'healthcare', name: '医疗健康' },
    { id: 'finance', name: '金融服务' },
    { id: 'retail', name: '零售电商' },
    { id: 'education', name: '教育培训' },
    { id: 'other', name: '其他行业' }
  ];
  
  // 角色选项
  const roles = [
    { id: 'technical', name: '技术人员' },
    { id: 'business', name: '业务人员' },
    { id: 'executive', name: '管理人员' }
  ];
  
  // 经验选项
  const experiences = [
    { id: 'beginner', name: '初学者 (0-1年)' },
    { id: 'intermediate', name: '中级 (1-3年)' },
    { id: 'advanced', name: '高级 (3年以上)' }
  ];
  
  // 目标选项
  const goals = [
    { id: 'application', name: 'AI应用落地', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'development', name: 'AI开发能力', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'leadership', name: 'AI领导力', icon: <Award className="h-5 w-5" /> }
  ];
  
  // 处理表单变更
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => {
        const goals = prev.goals as string[];
        return {
          ...prev,
          goals: checked 
            ? [...goals, value] 
            : goals.filter(g => g !== value)
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // 生成推荐路径
  const generateRecommendations = () => {
    // 根据表单数据生成个性化推荐
    let recs: Recommendation[] = [];
    
    // 基础路径
    if (formData.experience === 'beginner') {
      recs.push({
        id: 'path-1',
        title: 'AI应用入门路径',
        description: '掌握AI基础概念和常用工具，能够独立完成简单AI辅助任务',
        duration: '2个月',
        level: '初级',
        courses: 5,
        certification: 'AI应用初级证书',
        color: '#3B82F6'
      });
    } else if (formData.experience === 'intermediate') {
      recs.push({
        id: 'path-1',
        title: 'AI应用进阶路径',
        description: '深入学习行业特定AI解决方案，提升AI应用深度和广度',
        duration: '3个月',
        level: '中级',
        courses: 7,
        certification: 'AI应用中级证书',
        color: '#8B5CF6'
      });
    } else {
      recs.push({
        id: 'path-1',
        title: 'AI战略专家路径',
        description: '掌握AI战略规划和落地能力，推动组织AI转型和创新',
        duration: '4个月',
        level: '高级',
        courses: 9,
        certification: 'AI战略规划师证书',
        color: '#EC4899'
      });
    }
    
    // 行业特定路径
    if (formData.industry !== 'other') {
      const industryName = industries.find(i => i.id === formData.industry)?.name || '行业';
      recs.push({
        id: 'path-2',
        title: `${industryName}AI应用专家路径`,
        description: `专注于${industryName}领域的AI应用场景和最佳实践`,
        duration: '3个月',
        level: formData.experience === 'beginner' ? '初级到中级' : '中级到高级',
        courses: 6,
        certification: `${industryName}AI应用专家证书`,
        color: '#10B981'
      });
    }
    
    // 角色特定路径
    const roleName = roles.find(r => r.id === formData.role)?.name || '角色';
    recs.push({
      id: 'path-3',
      title: `${roleName}AI能力提升路径`,
      description: `针对${roleName}日常工作场景的AI技能提升方案`,
      duration: '2.5个月',
      level: formData.experience === 'beginner' ? '初级到中级' : '中级到高级',
      courses: 5,
      certification: `${roleName}AI能力认证`,
      color: '#F59E0B'
    });
    
    setRecommendations(recs);
    setStep(3);
  };
  
  // 下一步
  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      generateRecommendations();
    }
  };
  
  // 返回上一步
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };
  
  // 重置
  const handleReset = () => {
    setStep(1);
    setFormData({
      industry: 'other',
      role: 'business',
      experience: 'beginner',
      goals: ['application']
    });
    setRecommendations([]);
  };
  
  // 渲染步骤指示器
  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center w-full max-w-md">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step > s 
                  ? 'bg-blue-600 text-white' 
                  : step === s 
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100' 
                    : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
              </div>
              <span className={`text-xs mt-2 font-medium ${
                step >= s ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {s === 1 ? '基本信息' : s === 2 ? '学习目标' : '推荐路径'}
              </span>
            </div>
            {s < 3 && (
              <div className={`flex-1 h-1 mx-2 ${
                step > s ? 'bg-blue-600' : 'bg-gray-200'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* 步骤指示器 */}
      {renderStepIndicator()}
      
      {/* 表单步骤 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        {step === 1 && (
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-6">请告诉我们您的基本信息</h4>
            
            <div className="space-y-6">
              {/* 行业选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Briefcase className="inline-block h-4 w-4 mr-1" />
                  您所在的行业
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {industries.map(industry => (
                    <div key={industry.id} className="relative">
                      <input
                        type="radio"
                        id={`industry-${industry.id}`}
                        name="industry"
                        value={industry.id}
                        checked={formData.industry === industry.id}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <label
                        htmlFor={`industry-${industry.id}`}
                        className={`block p-4 rounded-lg border text-center cursor-pointer transition-all peer-checked:border-blue-600 peer-checked:bg-blue-50 ${
                          formData.industry === industry.id 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {industry.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 角色选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <User className="inline-block h-4 w-4 mr-1" />
                  您的职业角色
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {roles.map(role => (
                    <div key={role.id} className="relative">
                      <input
                        type="radio"
                        id={`role-${role.id}`}
                        name="role"
                        value={role.id}
                        checked={formData.role === role.id}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <label
                        htmlFor={`role-${role.id}`}
                        className={`block p-4 rounded-lg border text-center cursor-pointer transition-all peer-checked:border-blue-600 peer-checked:bg-blue-50 ${
                          formData.role === role.id 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {role.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 经验选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <BookOpen className="inline-block h-4 w-4 mr-1" />
                  您的AI相关经验
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {experiences.map(exp => (
                    <div key={exp.id} className="relative">
                      <input
                        type="radio"
                        id={`exp-${exp.id}`}
                        name="experience"
                        value={exp.id}
                        checked={formData.experience === exp.id}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <label
                        htmlFor={`exp-${exp.id}`}
                        className={`block p-4 rounded-lg border text-center cursor-pointer transition-all peer-checked:border-blue-600 peer-checked:bg-blue-50 ${
                          formData.experience === exp.id 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {exp.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-6">您的学习目标是什么？</h4>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-500 mb-4">
                选择您希望提升的AI能力方向（可多选）
              </p>
              
              <div className="space-y-3">
                {goals.map(goal => (
                  <div key={goal.id} className="relative">
                    <input
                      type="checkbox"
                      id={`goal-${goal.id}`}
                      name="goals"
                      value={goal.id}
                      checked={formData.goals.includes(goal.id)}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <label
                      htmlFor={`goal-${goal.id}`}
                      className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${
                        formData.goals.includes(goal.id)
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center mr-3 ${
                        formData.goals.includes(goal.id)
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-gray-300'
                      }`}>
                        {formData.goals.includes(goal.id) && (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {goal.id === 'application' && 'AI应用落地能力'}
                          {goal.id === 'development' && 'AI开发实现能力'}
                          {goal.id === 'leadership' && 'AI战略领导能力'}
                        </div>
                        <div className="text-sm text-gray-500 mt-0.5">
                          {goal.id === 'application' && '掌握AI工具应用和场景落地能力'}
                          {goal.id === 'development' && '提升AI模型开发和系统构建能力'}
                          {goal.id === 'leadership' && '培养AI战略思维和团队领导能力'}
                        </div>
                      </div>
                      <div className="ml-auto text-gray-400">
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-6">为您推荐的学习路径</h4>
            
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <div 
                  key={rec.id}
                  className="border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-md"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <div 
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: rec.color }}
                          ></div>
                          <h5 className="text-lg font-bold text-gray-800">{rec.title}</h5>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{rec.description}</p>
                        
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                          <div className="flex items-center text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>学习周期: {rec.duration}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <BookOpen className="h-4 w-4 mr-1" />
                            <span>课程数量: {rec.courses}门</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Award className="h-4 w-4 mr-1" />
                            <span>难度级别: {rec.level}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 px-3 py-1.5 rounded-full text-xs font-medium text-gray-700">
                        {rec.certification}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>最近更新: 2025年9月</span>
                      </div>
                      
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                        查看详细路径 <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h5 className="text-sm font-medium text-gray-700 mb-3">
                <BarChart3 className="inline-block h-4 w-4 mr-1" />
                个性化学习建议
              </h5>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
                <p className="mb-2">
                  根据您的行业、角色和经验，我们建议您优先学习：
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>
                    {recommendations.length > 0 && recommendations[0].title}
                  </li>
                  {recommendations.length > 1 && (
                    <li>{recommendations[1].title}</li>
                  )}
                  <li>
                    定期参加行业AI应用案例分享会，拓展实践视野
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 导航按钮 */}
      <div className="mt-6 flex justify-between">
        {step > 1 && step < 3 && (
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            上一步
          </button>
        )}
        
        {step < 3 && (
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            {step === 1 ? '下一步' : '生成学习路径'}
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        )}
        
        {step === 3 && (
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            重新选择
          </button>
        )}
      </div>
    </div>
  );
};

export default LearningPathEngine;