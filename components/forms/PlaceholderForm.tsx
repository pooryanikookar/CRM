import React from 'react';
import { Card } from '../ui/Card';
import type { WorkflowStep } from '../../types';
import { Construction } from 'lucide-react';

interface PlaceholderFormProps {
  step: WorkflowStep;
}

export const PlaceholderForm: React.FC<PlaceholderFormProps> = ({ step }) => {
  return (
    <Card>
      <div className="text-center p-10 flex flex-col items-center justify-center min-h-[400px]">
        <Construction className="w-16 h-16 text-yellow-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">{step.title}</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">{step.description}</p>
        <p className="mt-4 text-md text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/50 px-4 py-2 rounded-lg">
          این فرم در حال حاضر یک نمونه اولیه است. فیلدهای کامل و منطق تجاری آن به زودی اضافه خواهند شد.
        </p>
      </div>
    </Card>
  );
};
