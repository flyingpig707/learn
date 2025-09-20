import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  
  // 处理滚动时导航栏样式变化
  const [scrolled, setScrolled] = React.useState(false);
  
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className={`font-bold text-xl ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                AI+人才培训平台
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="#" 
              className={`font-medium transition-colors hover:text-blue-600 ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              首页
            </Link>
            <div className="relative group">
              <button
                className={`flex items-center font-medium transition-colors hover:text-blue-600 ${
                  scrolled ? 'text-gray-700' : 'text-white'
                }`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                培训体系
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50">
                  <Link 
                    to="#" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    九段高手课程体系
                  </Link>
                  <Link 
                    to="#" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    行业垂直应用课程
                  </Link>
                  <Link 
                    to="#" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    企业定制培训
                  </Link>
                </div>
              )}
            </div>
            <Link 
              to="#" 
              className={`font-medium transition-colors hover:text-blue-600 ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              能力测评
            </Link>
            <Link 
              to="#" 
              className={`font-medium transition-colors hover:text-blue-600 ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              证书认证
            </Link>
            <Link 
              to="#" 
              className={`font-medium transition-colors hover:text-blue-600 ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              关于我们
            </Link>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-medium transition-all transform hover:scale-105">
              立即咨询
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white'
              } hover:bg-gray-100 focus:outline-none`}
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-600"
            >
              首页
            </Link>
            <div>
              <button
                className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>培训体系</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="pl-4 space-y-1">
                  <Link
                    to="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    九段高手课程体系
                  </Link>
                  <Link
                    to="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    行业垂直应用课程
                  </Link>
                  <Link
                    to="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    企业定制培训
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-600"
            >
              能力测评
            </Link>
            <Link
              to="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-600"
            >
              证书认证
            </Link>
            <Link
              to="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-600"
            >
              关于我们
            </Link>
            <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-medium">
              立即咨询
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;