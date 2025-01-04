import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PlatformButtonProps {
  name: string;
  icon: LucideIcon;
  isSelected: boolean;
  onClick: () => void;
}

export default function PlatformButton({ name, icon: Icon, isSelected, onClick }: PlatformButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      type="button"
      className={`p-4 rounded-lg ${
        isSelected
          ? 'bg-purple-600 text-white'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      } transition-colors flex flex-col items-center justify-center space-y-2`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-sm">{name}</span>
    </motion.button>
  );
}