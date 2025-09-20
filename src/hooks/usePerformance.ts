import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

// 防抖Hook
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// 节流Hook
export const useThrottle = <T>(value: T, limit: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
};

// 懒加载Hook
export const useLazyLoad = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// 虚拟滚动Hook
export const useVirtualScroll = <T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );

    return {
      startIndex,
      endIndex,
      items: items.slice(startIndex, endIndex),
      totalHeight: items.length * itemHeight,
      offsetY: startIndex * itemHeight,
    };
  }, [items, itemHeight, containerHeight, scrollTop]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return { visibleItems, handleScroll };
};

// 缓存Hook
export const useCache = <T>(key: string, fetcher: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const cache = useRef<Map<string, T>>(new Map());

  const fetchData = useCallback(async () => {
    if (cache.current.has(key)) {
      setData(cache.current.get(key)!);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      cache.current.set(key, result);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [key, fetcher]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const invalidateCache = useCallback(() => {
    cache.current.delete(key);
    fetchData();
  }, [key, fetchData]);

  return { data, loading, error, refetch: fetchData, invalidate: invalidateCache };
};

// 性能监控Hook
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<{
    renderTime: number;
    memoryUsage: number;
    fps: number;
  }>({
    renderTime: 0,
    memoryUsage: 0,
    fps: 0,
  });

  useEffect(() => {
    const startTime = performance.now();
    let frameCount = 0;
    let lastTime = startTime;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
        
        setMetrics(prev => ({
          ...prev,
          fps,
          renderTime: currentTime - startTime,
          memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
        }));
      }
      
      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }, []);

  return metrics;
};

// 内存泄漏检测hook
export const useMemoryLeak = (componentName: string) => {
  const mountTime = useRef<number>(0);
  const timers = useRef<Set<NodeJS.Timeout>>(new Set());
  const listeners = useRef<Set<() => void>>(new Set());

  useEffect(() => {
    mountTime.current = Date.now();

    return () => {
      // 清理定时器
      timers.current.forEach(timer => clearTimeout(timer));
      timers.current.clear();

      // 清理事件监听器
      listeners.current.forEach(cleanup => cleanup());
      listeners.current.clear();

      const unmountTime = Date.now();
      const lifeTime = unmountTime - mountTime.current;
      
      console.log(`${componentName} lifecycle: ${lifeTime}ms`);
    };
  }, [componentName]);

  const addTimer = useCallback((timer: NodeJS.Timeout) => {
    timers.current.add(timer);
    return () => {
      clearTimeout(timer);
      timers.current.delete(timer);
    };
  }, []);

  const addListener = useCallback((cleanup: () => void) => {
    listeners.current.add(cleanup);
    return () => {
      cleanup();
      listeners.current.delete(cleanup);
    };
  }, []);

  return {
    addTimer,
    addListener,
  };
};

// 批量更新Hook
export const useBatchUpdate = <T>() => {
  const [updates, setUpdates] = useState<T[]>([]);
  const timeoutRef = useRef<number>();

  const addUpdate = useCallback((update: T) => {
    setUpdates(prev => [...prev, update]);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = window.setTimeout(() => {
      setUpdates([]);
    }, 100);
  }, []);

  const clearUpdates = useCallback(() => {
    setUpdates([]);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return { updates, addUpdate, clearUpdates };
};

// 组件可见性hook
export const useVisibility = (ref: React.RefObject<Element>) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref]);

  return isVisible;
};

// 预加载hook
export const usePreload = (urls: string[]) => {
  const [loadedUrls, setLoadedUrls] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const preloadImage = useCallback((url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = url;
    });
  }, []);

  const preloadAll = useCallback(async () => {
    setLoading(true);
    
    try {
      await Promise.all(
        urls.map(async (url) => {
          if (!loadedUrls.has(url)) {
            await preloadImage(url);
            setLoadedUrls(prev => new Set([...prev, url]));
          }
        })
      );
    } catch (error) {
      console.error('Preload failed:', error);
    } finally {
      setLoading(false);
    }
  }, [urls, loadedUrls, preloadImage]);

  useEffect(() => {
    if (urls.length > 0) {
      preloadAll();
    }
  }, [urls, preloadAll]);

  return {
    loadedUrls,
    loading,
    preloadAll,
  };
};