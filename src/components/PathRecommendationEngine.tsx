import React from 'react';
import { 
  BookOpen, 
  Award,
  Clock,
  Calendar,
  BarChart3,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export type Industry = 'manufacturing' | 'healthcare' | 'finance' | 'retail' | 'education' | 'other';
export type Role = 'technical' | 'business' | 'executive';
export type Experience = 'beginner' | 'intermediate' | 'advanced';

export interface FormData {
  industry: Industry;
  role: Role;
  experience: Experience;
  goals: string[];
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  courses: number;
  certification: string;
  color: string;
}

interface PathRecommendationEngineProps {
  formData: FormData;
  onSelectPath?: (pathId: string) => void;
}

// 行业选项
export const industries = [
  { id: 'manufacturing', name: '制造业' },
  { id: 'healthcare', name: '医疗健康' },
  { id: 'finance', name: '金融服务' },
  { id: 'retail', name: '零售电商' },
  { id: 'education', name: '教育培训' },
  { id: 'other', name: '其他' }
];

// 角色选项
export const roles = [
  { id: 'technical', name: '技术人员' },
  { id: 'business', name: '业务人员' },
  { id: 'executive', name: '管理人员' }
];

// 经验选项
export const experiences = [
  { id: 'beginner', name: '初学者 (0-1年)' },
  { id: 'intermediate', name: '中级 (1-3年)' },
  { id: 'advanced', name: '高级 (3年以上)' }
];

// 目标选项
export const goals = [
  { id: 'application', name: 'AI应用落地', icon: <BookOpen className="h-5 w-5" /> },
  { id: 'development', name: 'AI开发能力', icon: <BarChart3 className="h-5 w-5" /> },
  { id: 'leadership', name: 'AI领导力', icon: <Award className="h-5 w-5" /> }
];

// 生成推荐路径的核心逻辑
export const generateRecommendations = (formData: FormData): Recommendation[] => {
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
  if (formData.role === 'technical') {
    recs.push({
      id: 'path-3',
      title: 'AI技术开发路径',
      description: '深入学习AI算法和技术实现，具备独立开发AI应用的能力',
      duration: '4个月',
      level: '中级到高级',
      courses: 8,
      certification: 'AI技术开发工程师证书',
      color: '#F59E0B'
    });
  } else if (formData.role === 'business') {
    recs.push({
      id: 'path-3',
      title: 'AI商业应用路径',
      description: '掌握AI商业化应用和项目管理，推动AI在业务中的落地',
      duration: '3个月',
      level: '中级',
      courses: 6,
      certification: 'AI商业应用专家证书',
      color: '#EF4444'
    });
  } else if (formData.role === 'executive') {
    recs.push({
      id: 'path-3',
      title: 'AI领导力路径',
      description: '培养AI时代的领导力和战略思维，引领组织数字化转型',
      duration: '2个月',
      level: '高级',
      courses: 4,
      certification: 'AI领导力认证',
      color: '#8B5CF6'
    });
  }
  
  // 目标导向路径
  if (formData.goals.includes('application')) {
    recs.push({
      id: 'path-4',
      title: 'AI应用实战路径',
      description: '通过真实项目实践，掌握AI应用的完整开发流程',
      duration: '3个月',
      level: '实战型',
      courses: 5,
      certification: 'AI应用实战专家证书',
      color: '#06B6D4'
    });
  }
  
  return recs.slice(0, 3); // 最多返回3个推荐
};

const PathRecommendationEngine: React.FC<PathRecommendationEngineProps> = ({
  formData,
  onSelectPath
}) => {
  const recommendations = generateRecommendations(formData);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          为您推荐的学习路径
        </h3>
        <p className="text-gray-600">
          基于您的背景和目标，我们为您精心挑选了以下学习路径
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {recommendations.map((rec, index) => (
          <div
            key={rec.id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* 路径头部 */}
            <div 
              className="h-2"
              style={{ backgroundColor: rec.color }}
            />
            
            <div className="p-6">
              {/* 推荐标签 */}
              {index === 0 && (
                <div className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-3">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  最佳匹配
                </div>
              )}
              
              {/* 路径标题 */}
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {rec.title}
              </h4>
              
              {/* 路径描述 */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {rec.description}
              </p>
              
              {/* 路径信息 */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  学习周期：{rec.duration}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  难度等级：{rec.level}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <BookOpen className="h-4 w-4 mr-2" />
                  课程数量：{rec.courses}门
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Award className="h-4 w-4 mr-2" />
                  获得证书：{rec.certification}
                </div>
              </div>
              
              {/* 选择按钮 */}
              <button
                onClick={() => onSelectPath?.(rec.id)}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center group"
              >
                选择此路径
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 自定义路径选项 */}
      <div className="bg-gray-50 rounded-xl p-6 text-center">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          没有找到合适的路径？
        </h4>
        <p className="text-gray-600 mb-4">
          我们可以根据您的具体需求定制专属学习路径
        </p>
        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
          定制专属路径
        </button>
      </div>
    </div>
  );
};

export default PathRecommendationEngine;