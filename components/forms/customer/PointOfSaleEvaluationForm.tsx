
import React, { useState } from 'react';
import type { PointOfSaleEvaluation } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { Store } from 'lucide-react';
import { SALE_BRANCHES } from '../../../constants';

interface PointOfSaleEvaluationFormProps {
  onSave: (data: { pointOfSaleEvaluation: PointOfSaleEvaluation }) => void;
}

export const PointOfSaleEvaluationForm: React.FC<PointOfSaleEvaluationFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<PointOfSaleEvaluation, 'id'>>({
        branchName: SALE_BRANCHES[0],
        evaluationDate: new Date().toISOString().split('T')[0],
        appearance: 3,
        serviceQuality: 3,
        comments: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const isNumeric = ['appearance', 'serviceQuality'].includes(id);
        setFormData((prev) => ({ ...prev, [id]: isNumeric ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newEvaluation: PointOfSaleEvaluation = {
            ...formData,
            id: `POSE-${Date.now()}`,
        };
        onSave({ pointOfSaleEvaluation: newEvaluation });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ارزیابی محل فروش/شعبه (2-5)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">سنجش دوره‌ای عملکرد و رعایت استانداردها در شعب و نقاط فروش.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Select id="branchName" label="نام شعبه/محل فروش" value={formData.branchName} onChange={handleChange}>
                        {SALE_BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                    </Select>
                    <Input id="evaluationDate" label="تاریخ ارزیابی" type="date" value={formData.evaluationDate} onChange={handleChange} required />
                </div>
                
                <div className="mt-6">
                    <label htmlFor="appearance" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">امتیاز به وضعیت ظاهری و چیدمان (۱ تا ۵)</label>
                    <input id="appearance" type="range" min="1" max="5" value={formData.appearance} onChange={handleChange} className="w-full" />
                </div>
                <div className="mt-6">
                    <label htmlFor="serviceQuality" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">امتیاز به کیفیت خدمات و برخورد پرسنل (۱ تا ۵)</label>
                    <input id="serviceQuality" type="range" min="1" max="5" value={formData.serviceQuality} onChange={handleChange} className="w-full" />
                </div>

                <div className="mt-6">
                    <Textarea 
                        id="comments" 
                        label="توضیحات، نقاط قوت و ضعف" 
                        value={formData.comments} 
                        onChange={handleChange}
                        required
                        placeholder="مشاهدات خود را در مورد شعبه به تفصیل شرح دهید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت ارزیابی</span>
                        <Store size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
