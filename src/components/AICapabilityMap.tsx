import React, { useState, useRef, useEffect } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RefreshCw,
  Info,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const AICapabilityMap: React.FC = () => {
  // 状态管理
  const [zoom, setZoom] = useState(1);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  // 能力地图数据
  const capabilityData = {
    categories: [
      { id: 'technical', name: '技术层' },
      { id: 'application', name: '应用层' },
      { id: 'strategy', name: '战略层' }
    ],
    levels: [
      { id: 'beginner', name: '初级' },
      { id: 'intermediate', name: '中级' },
      { id: 'advanced', name: '高级' }
    ],
    nodes: [
      // 技术层 - 初级
      { 
        id: 'tech-b-1', 
        name: '算法基础', 
        category: 'technical', 
        level: 'beginner',
        description: '了解基本AI算法原理与应用场景，掌握算法选择的基本原则。',
        x: 150, y: 150 
      },
      { 
        id: 'tech-b-2', 
        name: '数据基础', 
        category: 'technical', 
        level: 'beginner',
        description: '掌握数据类型、数据结构基础，了解数据质量评估方法。',
        x: 250, y: 180 
      },
      { 
        id: 'tech-b-3', 
        name: '编程入门', 
        category: 'technical', 
        level: 'beginner',
        description: '掌握至少一种编程语言基础，能够编写简单程序。',
        x: 350, y: 150 
      },
      
      // 技术层 - 中级
      { 
        id: 'tech-i-1', 
        name: '机器学习应用', 
        category: 'technical', 
        level: 'intermediate',
        description: '掌握常用机器学习模型的应用方法，能够使用框架构建模型。',
        x: 150, y: 300 
      },
      { 
        id: 'tech-i-2', 
        name: '深度学习基础', 
        category: 'technical', 
        level: 'intermediate',
        description: '了解深度学习基本原理，能够使用预训练模型进行迁移学习。',
        x: 250, y: 330 
      },
      { 
        id: 'tech-i-3', 
        name: '数据工程实践', 
        category: 'technical', 
        level: 'intermediate',
        description: '掌握数据采集、清洗、特征工程的实践方法和工具使用。',
        x: 350, y: 300 
      },
      
      // 技术层 - 高级
      { 
        id: 'tech-a-1', 
        name: '模型优化', 
        category: 'technical', 
        level: 'advanced',
        description: '掌握模型性能优化技术，包括参数调优、结构优化等方法。',
        x: 150, y: 450 
      },
      { 
        id: 'tech-a-2', 
        name: '大规模训练', 
        category: 'technical', 
        level: 'advanced',
        description: '掌握分布式训练技术，能够处理大规模数据集和复杂模型训练。',
        x: 250, y: 480 
      },
      { 
        id: 'tech-a-3', 
        name: '前沿技术跟踪', 
        category: 'technical', 
        level: 'advanced',
        description: '能够跟踪和评估最新AI技术进展，并评估其商业应用潜力。',
        x: 350, y: 450 
      },
      
      // 应用层 - 初级
      { 
        id: 'app-b-1', 
        name: '工具使用', 
        category: 'application', 
        level: 'beginner',
        description: '熟练使用主流AI工具，能够独立完成基本AI辅助任务。',
        x: 550, y: 150 
      },
      { 
        id: 'app-b-2', 
        name: 'prompt设计', 
        category: 'application', 
        level: 'beginner',
        description: '掌握基础prompt设计原则，能够编写有效提示词获取所需结果。',
        x: 650, y: 180 
      },
      { 
        id: 'app-b-3', 
        name: '内容生成', 
        category: 'application', 
        level: 'beginner',
        description: '使用AI工具生成文本、图像等内容，满足基本工作需求。',
        x: 750, y: 150 
      },
      
      // 应用层 - 中级
      { 
        id: 'app-i-1', 
        name: '流程自动化', 
        category: 'application', 
        level: 'intermediate',
        description: '设计并实现基于AI的业务流程自动化解决方案，提升工作效率。',
        x: 550, y: 300 
      },
      { 
        id: 'app-i-2', 
        name: '数据分析应用', 
        category: 'application', 
        level: 'intermediate',description: '使用AI工具进行数据分析，提取业务洞察并支持决策。',
        x: 650, y: 330 
      },
      { 
        id: 'app-i-3', 
        name: '行业解决方案', 
        category: 'application', 
        level: 'intermediate',
        description: '理解并应用行业特定AI解决方案，解决实际业务问题。',
        x: 750, y: 300 
      },
      
      // 应用层 - 高级
      { 
        id: 'app-a-1', 
        name: '系统集成', 
        category: 'application', 
        level: 'advanced',
        description: '将AI能力集成到现有业务系统，实现端到端智能解决方案。',
        x: 550, y: 450 
      },
      { 
        id: 'app-a-2', 
        name: '定制开发', 
        category: 'application', 
        level: 'advanced',
        description: '根据业务需求定制开发AI应用，解决复杂业务问题。',
        x: 650, y: 480 
      },
      { 
        id: 'app-a-3', 
        name: '效果评估', 
        category: 'application', 
        level: 'advanced',
        description: '建立AI应用效果评估体系，持续优化AI解决方案。',
        x: 750, y: 450 
      },
      
      // 战略层 - 初级
      { 
        id: 'strat-b-1', 
        name: '趋势理解', 
        category: 'strategy', 
        level: 'beginner',
        description: '理解AI发展趋势和基本商业价值，能够识别潜在应用场景。',
        x: 950, y: 150 
      },
      { 
        id: 'strat-b-2', 
        name: '需求分析', 
        category: 'strategy', 
        level: 'beginner',
        description: '分析业务需求，识别适合AI解决的问题和机会。',
        x: 1050, y: 180 
      },
      { 
        id: 'strat-b-3', 
        name: '基础规划', 
        category: 'strategy', 
        level: 'beginner',
        description: '制定简单的AI应用规划，包括目标、资源需求和实施步骤。',
        x: 1150, y: 150 
      },
      
      // 战略层 - 中级
      { 
        id: 'strat-i-1', 
        name: '路线图设计', 
        category: 'strategy', 
        level: 'intermediate',
        description: '设计企业AI转型路线图，明确阶段目标和关键里程碑。',
        x: 950, y: 300 
      },
      { 
        id: 'strat-i-2', 
        name: '资源配置', 
        category: 'strategy', 
        level: 'intermediate',
        description: '合理配置AI项目资源，包括人才、技术和预算规划。',
        x: 1050, y: 330 
      },
      { 
        id: 'strat-i-3', 
        name: '变革管理', 
        category: 'strategy', 
        level: 'intermediate',
        description: '管理AI转型过程中的组织变革，确保顺利实施和采纳。',
        x: 1150, y: 300 
      },
      
      // 战略层 - 高级
      { 
        id: 'strat-a-1', 
        name: '战略规划', 
        category: 'strategy', 
        level: 'advanced',
        description: '制定企业级AI战略，将AI融入核心业务战略和创新体系。',
        x: 950, y: 450 
      },
      { 
        id: 'strat-a-2', 
        name: '生态构建', 
        category: 'strategy', 
        level: 'advanced',
        description: '构建AI创新生态系统，整合内外部资源推动持续创新。',
        x: 1050, y: 480 
      },
      { 
        id: 'strat-a-3', 
        name: '伦理治理', 
        category: 'strategy', 
        level: 'advanced',
        description: '建立AI伦理框架和治理机制，确保AI应用合规和负责任使用。',
        x: 1150, y: 450 
      }
    ],
    connections: [
      // 技术层内部连接
      { from: 'tech-b-1', to: 'tech-i-1' },
      { from: 'tech-b-2', to: 'tech-i-2' },
      { from: 'tech-b-3', to: 'tech-i-3' },
      { from: 'tech-i-1', to: 'tech-a-1' },
      { from: 'tech-i-2', to: 'tech-a-2' },
      { from: 'tech-i-3', to: 'tech-a-3' },
      
      // 应用层内部连接
      { from: 'app-b-1', to: 'app-i-1' },
      { from: 'app-b-2', to: 'app-i-2' },
      { from: 'app-b-3', to: 'app-i-3' },
      { from: 'app-i-1', to: 'app-a-1' },
      { from: 'app-i-2', to: 'app-a-2' },
      { from: 'app-i-3', to: 'app-a-3' },
      
      // 战略层内部连接
      { from: 'strat-b-1', to: 'strat-i-1' },
      { from: 'strat-b-2', to: 'strat-i-2' },
      { from: 'strat-b-3', to: 'strat-i-3' },
      { from: 'strat-i-1', to: 'strat-a-1' },
      { from: 'strat-i-2', to: 'strat-a-2' },
      { from: 'strat-i-3', to: 'strat-a-3' },
      
      // 跨层连接
      { from: 'tech-i-1', to: 'app-i-1' },
      { from: 'tech-i-2', to: 'app-i-2' },
      { from: 'app-i-3', to: 'strat-i-1' },
      { from: 'app-a-1', to: 'strat-i-3' },
      { from: 'tech-a-3', to: 'strat-i-1' }
    ]
  };
  
  // 缩放控制
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleReset = () => setZoom(1);
  
  // 过滤节点
  const filteredNodes = activeCategory === 'all'
    ? capabilityData.nodes
    : capabilityData.nodes.filter(node => node.category === activeCategory);
  
  // 找到节点数据
  const getNodeData = (id: string) => {
    return capabilityData.nodes.find(node => node.id === id) || null;
  };
  
  // 连接线生成
  const renderConnections = () => {
    return capabilityData.connections.map((conn, index) => {
      const fromNode = getNodeData(conn.from);
      const toNode = getNodeData(conn.to);
      
      if (!fromNode || !toNode) return null;
      
      // 检查节点是否应该显示
      const fromVisible = activeCategory === 'all' || fromNode.category === activeCategory;
      const toVisible = activeCategory === 'all' || toNode.category === activeCategory;
      
      if (!fromVisible || !toVisible) return null;
      
      // 计算线条路径
      const pathData = `M ${fromNode.x} ${fromNode.y} C ${(fromNode.x + toNode.x) / 2} ${fromNode.y}, ${(fromNode.x + toNode.x) / 2} ${toNode.y}, ${toNode.x} ${toNode.y}`;
      
      return (
        <path
          key={index}
          d={pathData}
          stroke="#CBD5E1"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray={fromNode.category !== toNode.category ? "5,5" : "none"}
          className="pointer-events-none"
        />
      );
    });
  };
  
  // 节点点击处理
  const handleNodeClick = (id: string) => {
    setSelectedNode(id === selectedNode ? null : id);
  };
  
  // 层级颜色映射
  const getLevelColor = (level: string) => {
    switch(level) {
      case 'beginner': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'intermediate': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'advanced': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // 添加滚轮缩放功能
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    };
    
    const mapElement = mapRef.current;
    if (mapElement) {
      mapElement.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (mapElement) {
        mapElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
      {/* 控制面板 */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleZoomIn} 
            className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            title="放大"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button 
            onClick={handleZoomOut} 
            className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            title="缩小"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button 
            onClick={handleReset} 
            className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            title="重置"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          
          <span className="text-sm text-gray-500 mx-2">缩放: {Math.round(zoom * 100)}%</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              activeCategory === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            全部
          </button>
          {capabilityData.categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                activeCategory === category.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* 能力地图容器 */}
      <div 
        ref={mapRef}
        className="relative overflow-hidden bg-gray-50 rounded-lg border border-gray-200 h-[550px] cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      >
        {/* 缩放容器 */}
        <div 
          className="absolute transition-transform duration-200 ease-out"
          style={{ 
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            top: '50%',
            left: '50%',
            width: '1300px',
            height: '550px',
            marginLeft: '-650px',
            marginTop: '-275px'
          }}
        >
          {/* 连接线 */}
          <svg width="1300" height="550" className="absolute top-0 left-0 pointer-events-none">
            {renderConnections()}
          </svg>
          
          {/* 层级标签 */}
          <div className="absolute top-20 left-20 text-gray-400 font-medium text-lg">初级</div>
          <div className="absolute top-170 left-20 text-gray-400 font-medium text-lg">中级</div>
          <div className="absolute top-320 left-20 text-gray-400 font-medium text-lg">高级</div>
          
          {/* 类别标签 */}
          <div className="absolute top-20 left-200 text-gray-400 font-medium text-lg">技术层</div>
          <div className="absolute top-20 left-650 text-gray-400 font-medium text-lg">应用层</div>
          <div className="absolute top-20 left-1050 text-gray-400 font-medium text-lg">战略层</div>
          
          {/* 节点 */}
          {filteredNodes.map(node => (
            <div
              key={node.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-lg border transition-all cursor-pointer ${
                selectedNode === node.id 
                  ? 'shadow-lg scale-110 z-20' 
                  : 'hover:shadow-md hover:scale-105 z-10'
              } ${getLevelColor(node.level)}`}
              style={{ left: node.x, top: node.y }}
              onClick={() => handleNodeClick(node.id)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{node.name}</span>
                <Info className="h-3.5 w-3.5 ml-2 text-gray-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 节点详情 */}
      {selectedNode && (
        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-gray-800 flex items-center">
                {getNodeData(selectedNode)?.name}
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                  getNodeData(selectedNode)?.level === 'beginner' 
                    ? 'bg-blue-100 text-blue-800' 
                    : getNodeData(selectedNode)?.level === 'intermediate'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {capabilityData.levels.find(l => l.id === getNodeData(selectedNode)?.level)?.name}
                </span>
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">
                  {capabilityData.categories.find(c => c.id === getNodeData(selectedNode)?.category)?.name}
                </span>
              </h4>
              <p className="text-gray-600 mt-2 text-sm">
                {getNodeData(selectedNode)?.description}
              </p>
            </div>
            <button 
              className="text-gray-400 hover:text-gray-600 ml-4"
              onClick={() => setSelectedNode(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              查看相关课程 <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      )}
      
      {/* 底部说明 */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>交互式AI能力地图 | 点击节点查看详情 | 拖动可移动地图 | 滚轮可缩放</p>
        <button className="text-blue-600 hover:text-blue-800 mt-1 flex items-center mx-auto">
          查看完整能力发展指南 <ExternalLink className="h-3.5 w-3.5 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default AICapabilityMap;