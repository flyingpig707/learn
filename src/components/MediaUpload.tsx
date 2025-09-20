import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Play, Pause, Volume2, FileVideo, FileAudio, AlertCircle } from 'lucide-react';

interface MediaFile {
  id: string;
  file: File;
  url: string;
  type: 'video' | 'audio';
  duration?: number;
  size: number;
  uploadProgress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
}

interface MediaUploadProps {
  accept?: string;
  maxSize?: number; // MB
  maxFiles?: number;
  onUpload?: (files: MediaFile[]) => Promise<void>;
  onRemove?: (fileId: string) => void;
  className?: string;
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  accept = "video/*,audio/*",
  maxSize = 100, // 100MB
  maxFiles = 5,
  onUpload,
  onRemove,
  className = ""
}) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

  const handleFiles = useCallback((fileList: FileList) => {
    const newFiles: MediaFile[] = [];
    
    Array.from(fileList).forEach((file) => {
      // 检查文件大小
      if (file.size > maxSize * 1024 * 1024) {
        alert(`文件 ${file.name} 超过 ${maxSize}MB 限制`);
        return;
      }

      // 检查文件类型
      const isVideo = file.type.startsWith('video/');
      const isAudio = file.type.startsWith('audio/');
      
      if (!isVideo && !isAudio) {
        alert(`文件 ${file.name} 不是支持的媒体格式`);
        return;
      }

      const mediaFile: MediaFile = {
        id: Date.now() + Math.random().toString(),
        file,
        url: URL.createObjectURL(file),
        type: isVideo ? 'video' : 'audio',
        size: file.size,
        uploadProgress: 0,
        status: 'pending'
      };

      newFiles.push(mediaFile);
    });

    setFiles(prev => {
      const combined = [...prev, ...newFiles];
      if (combined.length > maxFiles) {
        alert(`最多只能上传 ${maxFiles} 个文件`);
        return prev;
      }
      return combined;
    });

    // 自动开始上传
    if (newFiles.length > 0 && onUpload) {
      uploadFiles(newFiles);
    }
  }, [maxSize, maxFiles, onUpload]);

  const uploadFiles = async (filesToUpload: MediaFile[]) => {
    for (const file of filesToUpload) {
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, status: 'uploading' } : f
      ));

      try {
        // 模拟上传进度
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, uploadProgress: progress } : f
          ));
        }

        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'completed' } : f
        ));

        if (onUpload) {
          await onUpload([file]);
        }
      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'error' } : f
        ));
      }
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const removeFile = (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (file) {
      URL.revokeObjectURL(file.url);
      setFiles(prev => prev.filter(f => f.id !== fileId));
      if (onRemove) {
        onRemove(fileId);
      }
    }
  };

  const togglePlay = (fileId: string, type: 'video' | 'audio') => {
    if (type === 'audio') {
      const audio = audioRefs.current[fileId];
      if (audio) {
        if (playingId === fileId) {
          audio.pause();
          setPlayingId(null);
        } else {
          // 暂停其他音频
          Object.values(audioRefs.current).forEach(a => a.pause());
          audio.play();
          setPlayingId(fileId);
        }
      }
    } else {
      const video = videoRefs.current[fileId];
      if (video) {
        if (playingId === fileId) {
          video.pause();
          setPlayingId(null);
        } else {
          video.play();
          setPlayingId(fileId);
        }
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`w-full ${className}`}>
      {/* 上传区域 */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          拖拽文件到此处或点击上传
        </p>
        <p className="text-sm text-gray-500">
          支持视频和音频文件，最大 {maxSize}MB，最多 {maxFiles} 个文件
        </p>
      </div>

      {/* 文件列表 */}
      {files.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">已上传文件</h3>
          {files.map((file) => (
            <div key={file.id} className="bg-white border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex-shrink-0">
                    {file.type === 'video' ? (
                      <FileVideo className="h-8 w-8 text-blue-500" />
                    ) : (
                      <FileAudio className="h-8 w-8 text-green-500" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(file.size)} • {file.type}
                    </p>
                    
                    {/* 上传进度 */}
                    {file.status === 'uploading' && (
                      <div className="mt-2">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${file.uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          上传中... {file.uploadProgress}%
                        </p>
                      </div>
                    )}
                    
                    {/* 错误状态 */}
                    {file.status === 'error' && (
                      <div className="mt-2 flex items-center text-red-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span className="text-xs">上传失败</span>
                      </div>
                    )}
                    
                    {/* 媒体预览 */}
                    {file.status === 'completed' && (
                      <div className="mt-3">
                        {file.type === 'video' ? (
                          <video
                            ref={(el) => {
                              if (el) videoRefs.current[file.id] = el;
                            }}
                            src={file.url}
                            className="w-full max-w-xs h-32 object-cover rounded"
                            controls
                            onPlay={() => setPlayingId(file.id)}
                            onPause={() => setPlayingId(null)}
                          />
                        ) : (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => togglePlay(file.id, 'audio')}
                              className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
                            >
                              {playingId === file.id ? (
                                <Pause className="h-4 w-4 text-green-600" />
                              ) : (
                                <Play className="h-4 w-4 text-green-600" />
                              )}
                            </button>
                            <Volume2 className="h-4 w-4 text-gray-400" />
                            <audio
                              ref={(el) => {
                                if (el) audioRefs.current[file.id] = el;
                              }}
                              src={file.url}
                              onEnded={() => setPlayingId(null)}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => removeFile(file.id)}
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaUpload;