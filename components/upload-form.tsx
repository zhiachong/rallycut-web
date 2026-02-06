'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, FileVideo, X } from 'lucide-react';
import { useState, useCallback } from 'react';

interface UploadFormProps {
  onSubmit: (file: File, email: string) => void;
  isLoading?: boolean;
}

export function UploadForm({ onSubmit, isLoading }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('video/')) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file && email) {
      onSubmit(file, email);
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
    <section id="upload" className="py-24 bg-gradient-to-b from-zinc-900 to-zinc-950">
      <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Upload Your Match
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Start your free trial and get AI-powered highlights in minutes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 h-12"
            />
          </div>

          {/* File Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-xl p-8 text-center transition-colors
              ${isDragging 
                ? 'border-green-500 bg-green-500/10' 
                : 'border-zinc-700 bg-zinc-900/50 hover:border-zinc-600'
              }
            `}
          >
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <FileVideo className="h-8 w-8 text-green-500" />
                <div className="text-left">
                  <p className="text-white font-medium">{file.name}</p>
                  <p className="text-zinc-500 text-sm">{formatFileSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="p-1 hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-zinc-400" />
                </button>
              </div>
            ) : (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                  <Upload className="h-8 w-8 text-zinc-400" />
                </div>
                <p className="text-white font-medium mb-2">
                  Drop your video here or click to browse
                </p>
                <p className="text-zinc-500 text-sm">
                  Supports MP4, MOV, AVI up to 10GB
                </p>
              </>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            disabled={!file || !email || isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 py-6 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              'Start Free Trial'
            )}
          </Button>

          <p className="text-center text-xs text-zinc-500">
            By uploading, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </div>
    </section>
  );
}
