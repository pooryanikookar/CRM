import React, { useState } from 'react';
import type { AgentPerformanceEvaluation } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { BarChartHorizontal } from 'lucide-react';
import { AgentSearch } from '../../AgentSearch';

interface AgentPerformanceEvaluationFormProps {
  onSave: (data: { agentPerformanceEvaluation: AgentPerformanceEvaluation }) => void;
}

export const AgentPerformanceEvaluationForm: React.FC<AgentPerformanceEvaluationFormProps> = ({ onSave }) => {
    const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
    const [formData, setFormData] = useState<Omit<AgentPerformanceEvaluation, 'id' | 'agentName'>>({
        evaluationDate: new Date().toISOString().split('T')[0],
        period: '',
        salesVolume: 0,
        customerSatisfaction: 3,
        compliance: '',
        recommendation: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const isNumeric = ['salesVolume', 'customerSatisfaction'].includes(id);
        setFormData((prev) => ({ ...prev, [id]: isNumeric ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!selectedAgent) {
            alert("لطفاً یک نماینده را برای ارزیابی انتخاب کنید.");
            return;
        }
        const newEvaluation: AgentPerformanceEvaluation = {
            ...formData,
            id: `APERF-${Date.now()}`,
            agentName: selectedAgent,
        };
        onSave({ agentPerformanceEvaluation: newEvaluation });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ارزیابی عملکرد نمایندگان/همکاران (6-3)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">سنجش و ثبت عملکرد دوره‌ای نمایندگان فروش و شرکای تجاری.</p>
            </div>

            <AgentSearch label="نماینده/همکار مورد ارزیابی" selectedAgent={selectedAgent} onAgentSelect={setSelectedAgent} />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="period" label="دوره ارزیابی" value={formData.period} onChange={handleChange} required placeholder="مثال: بهار ۱۴۰۴"/>
                    <Input id="salesVolume" label="حجم فروش در دوره (ریال)" type="number" value={formData.salesVolume} onChange={handleChange} />
                </div>
                 <div className="mt-4">
                     <label htmlFor="customerSatisfaction" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">امتیاز رضایت مشتریان (۱ تا ۵)</label>
                     <input
                        id="customerSatisfaction"
                        type="range"
                        min="1"
                        max="5"
                        value={formData.customerSatisfaction}
                        onChange={handleChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="compliance" 
                        label="میزان تطابق با سیاست‌های شرکت" 
                        value={formData.compliance} 
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="recommendation" 
                        label="توصیه برای ادامه همکاری (یا بهبود)" 
                        value={formData.recommendation} 
                        onChange={handleChange}
                        required
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!selectedAgent}>
                        <span className="ml-2">ثبت ارزیابی</span>
                        <BarChartHorizontal size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};