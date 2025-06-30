
import React from 'react';
import { Card } from '../../ui/Card';
import type { WorkflowStep } from '../../../types';
import { Construction } from 'lucide-react';

interface PlaceholderFormProps {
  step: WorkflowStep;
}

export const DigitalAdEffectivenessForm: React.FC<PlaceholderFormProps> = ({ step }) => {
  return (
    <Card>
      <div className="text-center p-10 flex flex-col items-center justify-center min-h-[400px]">
        <Construction className="w-16 h-16 text-yellow-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">{step.title}</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">{step.description}</p>
        <p className="mt-4 text-md text-gray-600 dark:text-gray-300">
          این فرم برای ثبت و تحلیل دقیق نتایج کمپین‌های تبلیغات دیجیتال (مانند CTR, CPC, ROI) استفاده می‌شود.
        </p>
      </div>
    </Card>
  );
};
