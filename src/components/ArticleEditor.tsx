import React, { useState, useRef, useCallback } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link, 
  Image, 
  Save, 
  Eye, 
  Upload,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Code,
  Undo,
  Redo
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  tags: string[];
  category: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  author: string;
  coverImage?: string;
}

interface ArticleEditorProps {
  article?: Article;
  onSave?: (article: Partial<Article>) => Promise<void>;
  onPublish?: (article: Partial<Article>) => Promise<void>;
  onPreview?: (content: string) => void;
  className?: string;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({
  article,
  onSave,
  onPublish,
  onPreview,
  className = ""
}) => {
  const [title, setTitle] = useState(article?.title || '');
  const [content, setContent] = useState(article?.content || '');
  const [summary, setSummary] = useState(article?.summary || '');
  const [tags, setTags] = useState<string[]>(article?.tags || []);
  const [category, setCategory] = useState(article?.category || '');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>(article?.status || 'draft');
  const [coverImage, setCoverImage] = useState(article?.coverImage || '');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');
  
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'AI技术',
    '机器学习',
    '深度学习',
    '自然语言处理',
    '计算机视觉',
    '数据科学',
    '编程教程',
    '行业应用',
    '其他'
  ];

  // 富文本编辑功能
  const insertText = useCallback((before: string, after: string = '') => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = before + selectedText + after;
    
    const newContent = content.substring(0, start) + newText + content.substring(end);
    setContent(newContent);
    
    // 重新设置光标位置
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  }, [content]);

  const formatText = (type: string) => {
    switch (type) {
      case 'bold':
        insertText('**', '**');
        break;
      case 'italic':
        insertText('*', '*');
        break;
      case 'underline':
        insertText('<u>', '</u>');
        break;
      case 'code':
        insertText('`', '`');
        break;
      case 'quote':
        insertText('\n> ', '');
        break;
      case 'ul':
        insertText('\n- ', '');
        break;
      case 'ol':
        insertText('\n1. ', '');
        break;
      case 'h1':
        insertText('\n# ', '');
        break;
      case 'h2':
        insertText('\n## ', '');
        break;
      case 'h3':
        insertText('\n### ', '');
        break;
      case 'link':
        insertText('[', '](url)');
        break;
      case 'image':
        insertText('![alt](', ')');
        break;
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 这里应该上传到服务器，现在只是创建本地URL
      const url = URL.createObjectURL(file);
      insertText(`![${file.name}](${url})`);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const articleData: Partial<Article> = {
        title,
        content,
        summary,
        tags,
        category,
        status,
        coverImage,
        updatedAt: new Date()
      };
      
      if (onSave) {
        await onSave(articleData);
      }
    } catch (error) {
      console.error('保存失败:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsSaving(true);
    try {
      const articleData: Partial<Article> = {
        title,
        content,
        summary,
        tags,
        category,
        status: 'published',
        coverImage,
        updatedAt: new Date()
      };
      
      if (onPublish) {
        await onPublish(articleData);
      }
      setStatus('published');
    } catch (error) {
      console.error('发布失败:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    setIsPreview(!isPreview);
    if (onPreview && !isPreview) {
      onPreview(content);
    }
  };

  // 简单的Markdown渲染（实际项目中应使用专业的Markdown解析器）
  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className={`max-w-6xl mx-auto bg-white rounded-lg shadow-lg ${className}`}>
      {/* 头部工具栏 */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {article ? '编辑文章' : '创建新文章'}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePreview}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isPreview 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Eye className="h-4 w-4 mr-1 inline" />
              预览
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 text-sm font-medium transition-colors"
            >
              <Save className="h-4 w-4 mr-1 inline" />
              {isSaving ? '保存中...' : '保存草稿'}
            </button>
            <button
              onClick={handlePublish}
              disabled={isSaving || !title.trim() || !content.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm font-medium transition-colors"
            >
              <Upload className="h-4 w-4 mr-1 inline" />
              发布
            </button>
          </div>
        </div>

        {/* 格式化工具栏 */}
        {!isPreview && (
          <div className="flex items-center space-x-1 p-2 bg-gray-50 rounded-md">
            <button
              onClick={() => formatText('bold')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
              title="粗体"
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              onClick={() => formatText('italic')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
              title="斜体"
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              onClick={() => formatText('underline')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
              title="下划线"
            >
              <Underline className="h-4 w-4" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1" />
            <button
              onClick={() => formatText('h1')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded text-sm font-bold"
              title="标题1"
            >
              H1
            </button>
            <button
              onClick={() => formatText('h2')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded text-sm font-bold"
              title="标题2"
            >
              H2
            </button>
            <button
              onClick={() => formatText('h3')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded text-sm font-bold"
              title="标题3"
            >
              H3
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1" />
            <button
              onClick={() => formatText('ul')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
              title="无序列表"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => formatText('ol')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
              title="有序列表"
            >
              <ListOrdered className="h-4 w-4" />
            </button>
            <button
              onClick={() => formatText('quote')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
              title="引用"
            >
              <Quote className="h-4 w-4" />
            </button>
            <button
              onClick={() => formatText('code')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
              title="代码"
            >
              <Code className="h-4 w-4" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1" />
            <button
              onClick={() => formatText('link')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
              title="链接"
            >
              <Link className="h-4 w-4" />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
              title="插入图片"
            >
              <Image className="h-4 w-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        )}
      </div>

      <div className="flex">
        {/* 左侧编辑区域 */}
        <div className={`${isPreview ? 'w-1/2' : 'w-full'} p-6`}>
          {/* 文章标题 */}
          <input
            type="text"
            placeholder="请输入文章标题..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-bold border-none outline-none placeholder-gray-400 mb-4"
          />

          {/* 文章摘要 */}
          <textarea
            placeholder="请输入文章摘要..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-md p-3 mb-4 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* 文章内容 */}
          <textarea
            ref={editorRef}
            placeholder="开始写作..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-96 border border-gray-300 rounded-md p-4 font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* 文章元信息 */}
          <div className="mt-6 space-y-4">
            {/* 分类选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分类
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">选择分类</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 标签管理 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                标签
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="添加标签..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={addTag}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                  添加
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* 封面图片 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                封面图片URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* 右侧预览区域 */}
        {isPreview && (
          <div className="w-1/2 border-l border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">预览</h3>
            <div className="prose max-w-none">
              <h1 className="text-2xl font-bold mb-4">{title || '未命名文章'}</h1>
              {summary && (
                <div className="text-gray-600 italic mb-6 p-3 bg-gray-50 rounded">
                  {summary}
                </div>
              )}
              <div
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(content || '暂无内容')
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleEditor;