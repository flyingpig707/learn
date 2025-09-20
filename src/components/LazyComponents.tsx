import React, { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

// 加载中组件
const LoadingSpinner = ({ message = '加载中...' }: { message?: string }) => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-6 h-6 animate-spin mr-2" />
    <span className="text-gray-600">{message}</span>
  </div>
);

// 错误边界组件
class LazyErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy component loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center p-8 text-red-600">
          <span>组件加载失败，请刷新页面重试</span>
        </div>
      );
    }

    return this.props.children;
  }
}

// 懒加载包装器
export const withLazyLoading = <P extends object>(
  importFunc: () => Promise<{ default: React.ComponentType<P> }>,
  loadingMessage?: string,
  errorFallback?: React.ReactNode
) => {
  const LazyComponent = lazy(importFunc);

  return React.forwardRef<any, P>((props, ref) => (
    <LazyErrorBoundary fallback={errorFallback}>
      <Suspense fallback={<LoadingSpinner message={loadingMessage} />}>
        <LazyComponent {...props} ref={ref} />
      </Suspense>
    </LazyErrorBoundary>
  ));
};

// 预定义的懒加载组件
export const LazyLearningPathEngine = withLazyLoading(
  () => import('./LearningPathEngine'),
  '正在加载学习路径引擎...'
);

export const LazyAICapabilityMap = withLazyLoading(
  () => import('./AICapabilityMap'),
  '正在加载AI能力地图...'
);

export const LazyArticleEditor = withLazyLoading(
  () => import('./ArticleEditor'),
  '正在加载文章编辑器...'
);

export const LazyMediaUpload = withLazyLoading(
  () => import('./MediaUpload'),
  '正在加载媒体上传组件...'
);

export const LazyPathRecommendationEngine = withLazyLoading(
  () => import('./PathRecommendationEngine'),
  '正在加载路径推荐引擎...'
);

export const LazyFormSteps = withLazyLoading(
  () => import('./FormSteps'),
  '正在加载表单步骤...'
);

// 路由级别的懒加载组件
export const LazyHome = withLazyLoading(
  () => import('../pages/Home'),
  '正在加载首页...'
);

export const LazyDashboard = withLazyLoading(
  () => import('../pages/Dashboard'),
  '正在加载仪表板...'
);

export const LazyLearningPaths = withLazyLoading(
  () => import('../pages/LearningPaths'),
  '正在加载学习路径...'
);

export const LazyAICapabilities = withLazyLoading(
  () => import('../pages/AICapabilities'),
  '正在加载AI能力...'
);

export const LazyProfile = withLazyLoading(
  () => import('../pages/Profile'),
  '正在加载个人资料...'
);

// 条件懒加载组件
export const ConditionalLazyComponent = ({
  condition,
  component: Component,
  fallback,
  ...props
}: {
  condition: boolean;
  component: React.ComponentType<any>;
  fallback?: React.ReactNode;
  [key: string]: any;
}) => {
  if (!condition) {
    return fallback || null;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component {...props} />
    </Suspense>
  );
};

// 延迟加载组件（基于时间）
export const DelayedLazyComponent = ({
  delay = 0,
  component: Component,
  ...props
}: {
  delay?: number;
  component: React.ComponentType<any>;
  [key: string]: any;
}) => {
  const [shouldRender, setShouldRender] = React.useState(delay === 0);

  React.useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!shouldRender) {
    return <LoadingSpinner message="准备加载..." />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component {...props} />
    </Suspense>
  );
};

// 可见性懒加载组件
export const VisibilityLazyComponent = ({
  component: Component,
  threshold = 0.1,
  rootMargin = '50px',
  ...props
}: {
  component: React.ComponentType<any>;
  threshold?: number;
  rootMargin?: string;
  [key: string]: any;
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element || hasLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div ref={ref} className="min-h-[200px]">
      {isVisible ? (
        <Suspense fallback={<LoadingSpinner />}>
          <Component {...props} />
        </Suspense>
      ) : (
        <div className="flex items-center justify-center h-48">
          <span className="text-gray-400">滚动到此处加载内容</span>
        </div>
      )}
    </div>
  );
};

// 批量懒加载管理器
export const LazyComponentManager = ({
  components,
  maxConcurrent = 3,
}: {
  components: Array<{
    id: string;
    component: React.ComponentType<any>;
    props?: any;
    priority?: number;
  }>;
  maxConcurrent?: number;
}) => {
  const [loadedComponents, setLoadedComponents] = React.useState<Set<string>>(new Set());
  const [loadingComponents, setLoadingComponents] = React.useState<Set<string>>(new Set());

  // 按优先级排序
  const sortedComponents = React.useMemo(() => {
    return [...components].sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }, [components]);

  const loadNextComponent = React.useCallback(() => {
    const nextComponent = sortedComponents.find(
      comp => !loadedComponents.has(comp.id) && !loadingComponents.has(comp.id)
    );

    if (nextComponent && loadingComponents.size < maxConcurrent) {
      setLoadingComponents(prev => new Set([...prev, nextComponent.id]));
      
      // 模拟异步加载
      setTimeout(() => {
        setLoadedComponents(prev => new Set([...prev, nextComponent.id]));
        setLoadingComponents(prev => {
          const newSet = new Set(prev);
          newSet.delete(nextComponent.id);
          return newSet;
        });
      }, 100);
    }
  }, [sortedComponents, loadedComponents, loadingComponents, maxConcurrent]);

  React.useEffect(() => {
    loadNextComponent();
  }, [loadNextComponent]);

  React.useEffect(() => {
    if (loadingComponents.size < maxConcurrent) {
      loadNextComponent();
    }
  }, [loadingComponents.size, maxConcurrent, loadNextComponent]);

  return (
    <div className="space-y-4">
      {sortedComponents.map(({ id, component: Component, props = {} }) => (
        <div key={id}>
          {loadedComponents.has(id) ? (
            <Suspense fallback={<LoadingSpinner />}>
              <Component {...props} />
            </Suspense>
          ) : loadingComponents.has(id) ? (
            <LoadingSpinner message={`正在加载 ${id}...`} />
          ) : (
            <div className="h-20 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-gray-500">等待加载 {id}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default {
  withLazyLoading,
  LazyLearningPathEngine,
  LazyAICapabilityMap,
  LazyArticleEditor,
  LazyMediaUpload,
  LazyPathRecommendationEngine,
  LazyFormSteps,
  ConditionalLazyComponent,
  DelayedLazyComponent,
  VisibilityLazyComponent,
  LazyComponentManager,
};