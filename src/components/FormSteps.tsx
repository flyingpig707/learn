import React from 'react';
import { User, Briefcase, BookOpen, Award } from 'lucide-react';
import { FormData, industries, roles, experiences, goals } from './PathRecommendationEngine';

interface FormStepsProps {
  currentStep: number;
  formData: FormData;
  onFormChange: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const FormSteps: React.FC<FormStepsProps> = ({
  currentStep,
  formData,
  onFormChange,
  onNext,
  onPrev
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const goals = formData.goals as string[];
      onFormChange({
        goals: checked 
          ? [...goals, value] 
          : goals.filter(g => g !== value)
      });
    } else {
      onFormChange({
        [name]: value
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                告诉我们您的行业背景
              </h3>
              <p className="text-gray-600">
                选择您所在的行业，我们将为您推荐相关的AI应用场景
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {industries.map((industry) => (
                <label
                  key={industry.id}
                  className={`relative flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                    formData.industry === industry.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="industry"
                    value={industry.id}
                    checked={formData.industry === industry.id}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {industry.name}
                  </span>
                  {formData.industry === industry.id && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </label>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Briefcase className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                您的职业角色是什么？
              </h3>
              <p className="text-gray-600">
                不同角色需要不同的AI技能，选择最符合您当前情况的选项
              </p>
            </div>
            
            <div className="space-y-3">
              {roles.map((role) => (
                <label
                  key={role.id}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                    formData.role === role.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.id}
                    checked={formData.role === role.id}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {role.name}
                  </span>
                  {formData.role === role.id && (
                    <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                您的AI相关经验如何？
              </h3>
              <p className="text-gray-600">
                我们会根据您的经验水平推荐合适难度的学习内容
              </p>
            </div>
            
            <div className="space-y-3">
              {experiences.map((exp) => (
                <label
                  key={exp.id}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                    formData.experience === exp.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="experience"
                    value={exp.id}
                    checked={formData.experience === exp.id}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {exp.name}
                  </span>
                  {formData.experience === exp.id && (
                    <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </label>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                您希望达成什么目标？
              </h3>
              <p className="text-gray-600">
                可以选择多个目标，我们会为您制定综合的学习计划
              </p>
            </div>
            
            <div className="grid gap-4">
              {goals.map((goal) => (
                <label
                  key={goal.id}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                    formData.goals.includes(goal.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    name="goals"
                    value={goal.id}
                    checked={formData.goals.includes(goal.id)}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className="text-blue-600 mr-3">
                      {goal.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {goal.name}
                    </span>
                  </div>
                  {formData.goals.includes(goal.id) && (
                    <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {renderStep()}
      
      {/* 导航按钮 */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          disabled={currentStep === 1}
          className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          上一步
        </button>
        
        <button
          onClick={onNext}
          disabled={
            (currentStep === 1 && !formData.industry) ||
            (currentStep === 2 && !formData.role) ||
            (currentStep === 3 && !formData.experience) ||
            (currentStep === 4 && formData.goals.length === 0)
          }
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {currentStep === 4 ? '生成推荐' : '下一步'}
        </button>
      </div>
    </div>
  );
};

export default FormSteps;