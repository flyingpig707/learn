import React from 'react';
import { 
  User, 
  Building, 
  Building2 
} from 'lucide-react';

// 定义角色类型
type UserRole = 'learner' | 'organization' | 'government';

interface RoleSelectorProps {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ activeRole, setActiveRole }) => {
  // 角色数据
  const roles = [
    {
      id: 'learner',
      name: '学习者',
      description: '个人能力提升与职业发展',
      icon: <User className="h-8 w-8 mb-3" />
    },
    {
      id: 'organization',
      name: '培训单位',
      description: '企业人才培养与组织升级',
      icon: <Building className="h-8 w-8 mb-3" />
    },
    {
      id: 'government',
      name: '政府部门',
      description: '区域人才发展与政策落地',
  icon: <Building2 className="h-8 w-8 mb-3" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {roles.map((role) => (
        <div
          key={role.id}
          className={`relative rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col items-center text-center overflow-hidden group ${
            activeRole === role.id 
              ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg transform scale-105' 
              : 'bg-white border border-gray-200 text-gray-700 hover:shadow-md'
          }`}
          onClick={() => setActiveRole(role.id as UserRole)}
        >
          {/* 装饰元素 */}
          {activeRole === role.id && (
            <div className="absolute top-0 right-0 w-20 h-20">
              <div className="absolute transform rotate-45 bg-orange-500 text-white text-xs font-bold py-1 right-[-35px] top-[30px] w-[170px] text-center">
                当前选择
              </div>
            </div>
          )}
          
          {/* 角色图标 */}
          <div className={`p-3 rounded-full transition-all ${
            activeRole === role.id 
              ? 'bg-white/20' 
              : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
          }`}>
            {role.icon}
          </div>
          
          {/* 角色名称 */}
          <h3 className="text-xl font-bold mb-2">{role.name}</h3>
          
          {/* 角色描述 */}
          <p className={`transition-opacity ${
            activeRole === role.id ? 'text-blue-100' : 'text-gray-500'
          }`}>
            {role.description}
          </p>
          
          {/* 了解更多按钮 */}
          <button className={`mt-4 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeRole === role.id 
              ? 'bg-white text-blue-600 hover:bg-blue-50' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
            了解更多
          </button>
        </div>
      ))}
    </div>
  );
};

export default RoleSelector;