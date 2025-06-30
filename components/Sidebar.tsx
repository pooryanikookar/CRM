import React from 'react';
import type { WorkflowStep, WorkflowCategory } from '../types';
import { Check, Dot, GitBranch, Lock } from 'lucide-react';

interface SidebarProps {
  currentStep: WorkflowStep;
  onStepClick: (step: WorkflowStep) => void;
  steps: WorkflowStep[];
  activeCategory: WorkflowCategory;
  completedAcquisitionSteps: Set<string>;
  completedMarketingSteps: Set<string>;
  completedInterDepartmentalSteps: Set<string>;
  completedEvaluationSteps: Set<string>;
  completedCustomerManagementSteps: Set<string>;
}

const colors = [
    'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',
    'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-200',
    'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
    'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200',
    'bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-200',
    'bg-lime-100 text-lime-800 dark:bg-lime-900/60 dark:text-lime-200',
    'bg-pink-100 text-pink-800 dark:bg-pink-900/60 dark:text-pink-200',
    'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/60 dark:text-cyan-200',
];

const getColorForId = (id: string): string => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
};


export const Sidebar: React.FC<SidebarProps> = ({ currentStep, onStepClick, steps, activeCategory, completedAcquisitionSteps, completedMarketingSteps, completedInterDepartmentalSteps, completedEvaluationSteps, completedCustomerManagementSteps }) => {
  
  const filteredSteps = steps.filter(step => step.category === activeCategory);

  const completedSteps = activeCategory === 'marketing_automation' 
    ? completedMarketingSteps 
    : activeCategory === 'inter_departmental_automation'
        ? completedInterDepartmentalSteps
        : activeCategory === 'stakeholders_evaluation'
            ? completedEvaluationSteps
            : activeCategory === 'customer_management'
                ? completedCustomerManagementSteps
                : activeCategory === 'acquisition_sales'
                    ? completedAcquisitionSteps
                    : new Set<string>();

  return (
    <aside className="w-72 flex-shrink-0 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
        <div className="w-72 h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 flex-shrink-0">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center whitespace-nowrap">
                    <GitBranch className="mr-2 text-indigo-500" />
                    شریان فروش
                </h2>
            </div>
            <nav className="p-4 overflow-y-auto flex-grow">
                <ul>
                    {filteredSteps.map((step, index) => {
                      const isActive = step.id === currentStep.id;
                      const isStarter = !!step.isStarter;
                      const showSeparator = isStarter && index > 0;

                      let isLocked = false;
                      const isCompleted = completedSteps.has(step.id);
                      
                      if (step.prerequisite) {
                          const prerequisiteCategorySteps = activeCategory === 'marketing_automation' 
                              ? completedMarketingSteps 
                              : activeCategory === 'inter_departmental_automation'
                                  ? completedInterDepartmentalSteps
                                  : activeCategory === 'stakeholders_evaluation'
                                    ? completedEvaluationSteps
                                    : new Set<string>(); 

                          if (!prerequisiteCategorySteps.has(step.prerequisite)) {
                              // isLocked = true; // This can be enabled for more complex locking
                          }
                      }
                      
                      const isButtonDisabled = isLocked;
                      const showCheckmark = isCompleted;

                      return (
                        <React.Fragment key={step.id}>
                            {showSeparator && (
                                <hr className="my-4 mx-2 border-dashed border-gray-300 dark:border-gray-600" />
                            )}
                            <li className="mb-2">
                                <button
                                    onClick={() => onStepClick(step)}
                                    disabled={isButtonDisabled}
                                    className={`w-full text-right flex items-center p-2 rounded-lg transition-colors ${
                                      isActive
                                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    } ${isButtonDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                                >
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 ml-3 flex-shrink-0">
                                      {isLocked ? <Lock className="w-4 h-4 text-gray-500" /> : showCheckmark ? <Check className="w-4 h-4 text-green-500"/> : <Dot className={`w-4 h-4 ${isActive ? 'text-indigo-500' : 'text-gray-400'}`}/> }
                                    </div>
                                    <div className="flex flex-col overflow-hidden flex-1">
                                      <div className="flex items-center justify-between">
                                        <span className={`font-semibold whitespace-nowrap overflow-ellipsis overflow-hidden ${isActive ? '' : 'text-sm'}`}>{step.title}</span>
                                        {isStarter && (
                                          <span className={`text-xs font-bold mr-2 px-2.5 py-1 rounded-full whitespace-nowrap ${getColorForId(step.id)}`}>
                                            شروع
                                          </span>
                                        )}
                                      </div>
                                      <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap overflow-ellipsis overflow-hidden text-right">{step.description}</span>
                                    </div>
                                </button>
                            </li>
                        </React.Fragment>
                      );
                    })}
                </ul>
            </nav>
        </div>
    </aside>
  );
};