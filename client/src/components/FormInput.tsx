import React from 'react';
import { motion } from 'framer-motion';

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
}

export default function FormInput({ label, value, onChange, placeholder, multiline }: FormInputProps) {
  const InputComponent = multiline ? 'textarea' : 'input';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-2"
    >
      <label className="block text-sm font-medium text-gray-200">
        {label}
      </label>
      <InputComponent
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none ${
          multiline ? 'h-32' : ''
        }`}
        placeholder={placeholder}
      />
    </motion.div>
  );
}