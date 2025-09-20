import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoleSelector from '@/components/RoleSelector';
import CapabilityPath from '@/components/CapabilityPath';
import ApplicationPath from '@/components/ApplicationPath';
import OrganizationUpgradePath from '@/components/OrganizationUpgradePath';
import AICapabilityMap from '@/components/AICapabilityMap';
import LearningPathEngine from '@/components/LearningPathEngine';
import CertificateCenter from '@/components/CertificateCenter';
import TrustEndorsement from '@/components/TrustEndorsement';
import { 
  capabilityData, 
  applicationData, 
  organizationData,
  certificateData,
  trustData 
} from '@/mocks/data';

// 定义角色类型
type UserRole = 'learner' | 'organization' | 'government';

export default function Home() {
  // 状态管理
  const [activeRole, setActiveRole] = useState<UserRole>('learner');
  const [activePath, setActivePath] = useState('capability');
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 导航栏 */}
      <Navbar />
      
      {/* 主内容区 */}
      <main className="flex-grow">
        {/* 首屏区域 - 角色选择 */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">AI+应用人才培训体系</h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              从入门到专家的全方位AI应用能力提升路径，助力个人与组织数字化转型
            </p>
            
            {/* 角色选择器 */}
            <RoleSelector activeRole={activeRole} setActiveRole={setActiveRole} />
            
            {/* 角色特定内容 */}
            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl max-w-3xl mx-auto">
              {activeRole === 'learner' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">学习者入口</h2>
                  <p className="mb-6">10分钟生成AI能力雷达图，开启个性化学习之旅</p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105">
                    开始能力测评
                  </button>
                </div>
              )}
              
              {activeRole === 'organization' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">培训单位入口</h2>
                  <p className="mb-6">定制企业AI人才培养方案，提升组织创新能力</p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105">
                    企业需求诊断
                  </button>
                </div>
              )}
              
              {activeRole === 'government' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">政府部门入口</h2>
                  <p className="mb-6">区域AI人才发展规划与政策适配工具</p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105">
                    下载人才白皮书
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* 核心培训路径区 */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">核心培训路径</h2>
            
            {/* 路径选择器 */}
            <div className="flex justify-center mb-12 space-x-4 flex-wrap">
              <button
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activePath === 'capability' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setActivePath('capability')}
              >
                AI应用能力提升路径
              </button>
              <button
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activePath === 'application' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setActivePath('application')}
              >
                场景应用落地路径
              </button>
              <button
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activePath === 'organization' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setActivePath('organization')}
              >
                组织升级赋能路径
              </button>
            </div>
            
            {/* 路径内容展示 */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              {activePath === 'capability' && (
                <CapabilityPath data={capabilityData} />
              )}
              
              {activePath === 'application' && (
                <ApplicationPath data={applicationData} />
              )}
              
              {activePath === 'organization' && (
                <OrganizationUpgradePath data={organizationData} />
              )}
            </div>
          </div>
        </section>
        
        {/* AI能力地图 */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">AI能力地图</h2>
            <AICapabilityMap />
          </div>
        </section>
        
        {/* 学习路径引擎 */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">个性化学习路径</h2>
            <LearningPathEngine />
          </div>
        </section>
        
        {/* 证书与认证中心 */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">证书与认证中心</h2>
            <CertificateCenter data={certificateData} />
          </div>
        </section>
        
        {/* 信任背书区 */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">信任背书</h2>
            <TrustEndorsement data={trustData} />
          </div>
        </section>
      </main>
      
      {/* 页脚 */}
      <Footer />
    </div>
  );
}