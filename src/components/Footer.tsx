import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* 关于我们 */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="font-bold text-xl text-white">AI+人才培训平台</span>
            </div>
            <p className="text-gray-400 mb-6">
              致力于培养面向未来的AI+应用人才，构建完整的AI人才培养生态体系，助力个人与组织数字化转型。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-6">快速链接</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">首页</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">培训体系</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">能力测评</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">证书认证</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">企业合作</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">关于我们</Link></li>
            </ul>
          </div>
          
          {/* 培训体系 */}
          <div>
            <h3 className="text-lg font-semibold mb-6">培训体系</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">九段高手课程体系</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">通用AI应用培训</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">行业垂直应用培训</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">企业定制培训</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">组织升级赋能计划</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">师资力量</Link></li>
            </ul>
          </div>
          
          {/* 联系我们 */}
          <div>
            <h3 className="text-lg font-semibold mb-6">联系我们</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">北京市海淀区中关村科技园区8号楼</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">400-123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">contact@ai-training.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                订阅资讯
              </button>
            </div>
          </div>
        </div>
        
        <hr className="border-gray-800 mb-8" />
        
        {/* 版权信息 */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AI+人才培训平台. 保留所有权利.
          </p>
          <div className="flex space-x-6">
            <Link to="#" className="text-gray-500 hover:text-gray-400 text-sm">隐私政策</Link>
            <Link to="#" className="text-gray-500 hover:text-gray-400 text-sm">服务条款</Link>
            <Link to="#" className="text-gray-500 hover:text-gray-400 text-sm">Cookie政策</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;