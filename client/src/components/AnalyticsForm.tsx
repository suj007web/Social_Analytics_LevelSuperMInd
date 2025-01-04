import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Instagram, Twitter, Facebook } from 'lucide-react';
import PlatformButton from './PlatformButton';
import FormInput from './FormInput';
import ResultModal from './ResultModal';
import { analyzeSocialPost } from '../services/langflowClient';
import { formatErrorMessage } from '../utils/errorHandling';
import type { ApiError } from '../services/types';

interface FormData {
  platform: string;
  postType: string;  
  message: string;
  targetAudience: string;
}

export default function AnalyticsForm() {
  const [formData, setFormData] = useState<FormData>({
    platform: '',
    postType: '',
    message: '',
    targetAudience: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.platform) {
      setAnalysisResult('Please select a platform');
      setIsModalOpen(true);
      return;
    }

    if (!formData.message.trim()) {
      setAnalysisResult('Please enter a message');
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    setIsModalOpen(true);

    try {
     
      const result = await analyzeSocialPost(
        formData.message,
        formData.platform,
        formData.postType || 'Not specified',
        formData.targetAudience || 'Not specified',
      );
      console.log(result);
      setAnalysisResult(result);
    } catch (error) {
      const errorMessage = formatErrorMessage(error as ApiError);
      setAnalysisResult(`Analysis failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePostType = (type: string) => {
    setFormData(prev => {
      const currentTypes = prev.postType ? prev.postType.split(', ') : [];
      const isSelected = currentTypes.includes(type);
      
      let newPostType: string;
      if (isSelected) {
        newPostType = currentTypes.filter(t => t !== type).join(', ');
      } else {
        newPostType = prev.postType ? `${prev.postType}, ${type}` : type;
      }
      
      return {
        ...prev,
        postType: newPostType
      };
    });
  };

  const platforms = [
    { name: 'Instagram', icon: Instagram },
    { name: 'Twitter', icon: Twitter },
    { name: 'Facebook', icon: Facebook },
  ];

  const postTypes = [
    'Image Post',
    'Video',
    'Story',
    'Reel',
    'Carousel',
    'Poll'
  ];

  const isTypeSelected = (type: string) => {
    return formData.postType.split(', ').includes(type);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto p-8 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-xl"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="flex items-center justify-center mb-8 space-x-2"
      >
        <Sparkles className="w-6 h-6 text-purple-400" />
        <h1 className="text-2xl font-bold text-white">Social Media Analytics</h1>
      </motion.div>
      <p className="text-gray-200 mb-4">Download Dataset from here: <a href="/CorrectedRealisticSocialMediaPerformanceAnalysis.csv" className="text-purple-400 hover:text-purple-300 underline">Social Media Analytics Dataset</a></p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Select Platform
          </label>
          <div className="grid grid-cols-3 gap-4">
            {platforms.map((platform) => (
              <PlatformButton
                key={platform.name}
                name={platform.name}
                icon={platform.icon}
                isSelected={formData.platform === platform.name}
                onClick={() => setFormData({ ...formData, platform: platform.name })}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Post Types (Select multiple)
          </label>
          <div className="flex flex-wrap gap-2">
            {postTypes.map((type) => (
              <label
                key={type}
                className={`
                  cursor-pointer inline-flex items-center px-3 py-1 rounded-full text-sm
                  transition-colors duration-200
                  ${isTypeSelected(type)
                    ? 'bg-purple-600 text-white ring-2 ring-purple-400 ring-offset-2 ring-offset-gray-900' 
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}
                `}
              >
                <input
                  type="checkbox"
                  checked={isTypeSelected(type)}
                  onChange={() => togglePostType(type)}
                  className="hidden"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <FormInput
          label="Question"
          value={formData.message}
          onChange={(value) => setFormData({ ...formData, message: value })}
          placeholder="Ask Question..."
          multiline
        />

        <FormInput
          label="Target Audience"
          value={formData.targetAudience}
          onChange={(value) => setFormData({ ...formData, targetAudience: value })}
          placeholder="e.g., Tech enthusiasts, age 25-34"
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium flex items-center justify-center space-x-2 hover:from-purple-700 hover:to-indigo-700 transition-colors"
        >
          <span>Analyze</span>
          <Send className="w-4 h-4" />
        </motion.button>
      </form>

      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        result={analysisResult}
        isLoading={isLoading}
      />
    </motion.div>
  );
}