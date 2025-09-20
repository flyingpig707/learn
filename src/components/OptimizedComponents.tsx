import { memo, useMemo, useCallback, useState, useEffect } from 'react';

// 优化的卡片组件
interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
  onClick?: () => void;
  className?: string;
}

export const OptimizedCard = memo<CardProps>(({ 
  title, 
  description, 
  imageUrl, 
  onClick, 
  className = '' 
}) => {
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  const cardContent = useMemo(() => (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${className}`}>
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-4"
          loading="lazy"
        />
      )}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  ), [title, description, imageUrl, className]);

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {cardContent}
    </div>
  );
});

OptimizedCard.displayName = 'OptimizedCard';

// 优化的列表组件
interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  status?: 'active' | 'completed' | 'pending';
}

interface OptimizedListProps {
  items: ListItem[];
  onItemClick?: (item: ListItem) => void;
  renderItem?: (item: ListItem) => JSX.Element;
  className?: string;
}

export const OptimizedList = memo<OptimizedListProps>(({ 
  items, 
  onItemClick, 
  renderItem,
  className = '' 
}) => {
  const handleItemClick = useCallback((item: ListItem) => {
    onItemClick?.(item);
  }, [onItemClick]);

  const defaultRenderItem = useCallback((item: ListItem) => (
    <div 
      key={item.id}
      className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50"
      onClick={() => handleItemClick(item)}
    >
      <div>
        <h4 className="font-medium">{item.title}</h4>
        {item.subtitle && (
          <p className="text-sm text-gray-500">{item.subtitle}</p>
        )}
      </div>
      {item.status && (
        <span className={`px-2 py-1 rounded-full text-xs ${
          item.status === 'completed' ? 'bg-green-100 text-green-800' :
          item.status === 'active' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {item.status}
        </span>
      )}
    </div>
  ), [handleItemClick]);

  const listContent = useMemo(() => (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      {items.map(item => 
        renderItem ? renderItem(item) : defaultRenderItem(item)
      )}
    </div>
  ), [items, renderItem, defaultRenderItem, className]);

  return listContent;
});

OptimizedList.displayName = 'OptimizedList';

// 优化的表格组件
interface TableColumn<T> {
  key: keyof T;
  title: string;
  render?: (value: any, record: T) => JSX.Element | string;
  width?: string;
  sortable?: boolean;
}

interface OptimizedTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (record: T) => void;
  className?: string;
  loading?: boolean;
}

export const OptimizedTable = memo(<T extends { id: string | number }>({
  data,
  columns,
  onRowClick,
  className = '',
  loading = false
}: OptimizedTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  const handleSort = useCallback((key: keyof T) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleRowClick = useCallback((record: T) => {
    onRowClick?.(record);
  }, [onRowClick]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                }`}
                style={{ width: column.width }}
                onClick={column.sortable ? () => handleSort(column.key) : undefined}
              >
                <div className="flex items-center">
                  {column.title}
                  {column.sortable && sortConfig.key === column.key && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((record) => (
            <tr
              key={record.id}
              className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
              onClick={() => handleRowClick(record)}
            >
              {columns.map((column) => (
                <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap">
                  {column.render 
                    ? column.render(record[column.key], record)
                    : String(record[column.key])
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

OptimizedTable.displayName = 'OptimizedTable';

// 优化的搜索组件
interface OptimizedSearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceMs?: number;
  className?: string;
}

export const OptimizedSearch = memo<OptimizedSearchProps>(({
  placeholder = '搜索...',
  onSearch,
  debounceMs = 300,
  className = ''
}) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useMemo(() => {
    let timeoutId: number;
    return (searchQuery: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        onSearch(searchQuery);
      }, debounceMs);
    };
  }, [onSearch, debounceMs]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    onSearch('');
  }, [onSearch]);

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  );
});

OptimizedSearch.displayName = 'OptimizedSearch';

// 优化的分页组件
interface OptimizedPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showSizeChanger?: boolean;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  className?: string;
}

export const OptimizedPagination = memo<OptimizedPaginationProps>(({
  currentPage,
  totalPages,
  onPageChange,
  showSizeChanger = false,
  pageSize = 10,
  onPageSizeChange,
  className = ''
}) => {
  const handlePageChange = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  }, [currentPage, totalPages, onPageChange]);

  const handlePageSizeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    onPageSizeChange?.(newSize);
  }, [onPageSizeChange]);

  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          上一页
        </button>

        {pageNumbers.map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 border rounded ${
              page === currentPage
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          下一页
        </button>
      </div>

      {showSizeChanger && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">每页显示</span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-gray-600">条</span>
        </div>
      )}
    </div>
  );
});

OptimizedPagination.displayName = 'OptimizedPagination';

// 虚拟滚动列表组件
interface VirtualScrollListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => JSX.Element;
  className?: string;
}

export const VirtualScrollList = memo(<T extends { id: string | number }>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className = ''
}: VirtualScrollListProps<T>) => {
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

  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: visibleItems.totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${visibleItems.offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.items.map((item, index) =>
            renderItem(item, visibleItems.startIndex + index)
          )}
        </div>
      </div>
    </div>
  );
});

VirtualScrollList.displayName = 'VirtualScrollList';

export default {
  OptimizedCard,
  OptimizedList,
  OptimizedTable,
  OptimizedSearch,
  OptimizedPagination,
  VirtualScrollList,
};