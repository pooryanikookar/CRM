import React, { useState } from 'react';
import type { SalesIncentiveEffectiveness } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { TrendingUp } from 'lucide-react';
import { INCENTIVE_PROGRAM_TYPES } from '../../../constants';

interface SalesIncentiveEffectivenessFormProps {
  onSave: (data: { salesIncentiveEffectiveness: SalesIncentiveEffectiveness }) => void;
}

export const SalesIncentiveEffectivenessForm: React.FC<SalesIncentiveEffectivenessFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<SalesIncentiveEffectiveness, 'id' | 'roi'>>({
        reportDate: new Date().toISOString().split('T')[0],
        programName: INCENTIVE_PROGRAM_TYPES[0],
        cost: 0,
        salesIncrease: 0,
        feedback: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const isNumeric = ['cost', 'salesIncrease'].includes(id);
        setFormData((prev) => ({ ...prev, [id]: isNumeric ? Number(value) : value }));
    };
    
    const calculateROI = () => {
        if (formData.cost === 0) return 0;
        return ((formData.salesIncrease - formData.cost) / formData.cost) * 100;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReport: SalesIncentiveEffectiveness = {
            ...formData,
            id: `SIE-${Date.now()}`,
            roi: calculateROI(),
        };
        onSave({ salesIncentiveEffectiveness: newReport });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم گزارش اثربخشی برنامه‌های انگیزشی (7-5)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">سنجش نتایج و بازدهی برنامه‌های تشویقی و انگیزشی تیم فروش.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Select id="programName" label="نام برنامه انگیزشی" value={formData.programName} onChange={handleChange}>
                        {INCENTIVE_PROGRAM_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
                    </Select>
                    <Input id="reportDate" label="تاریخ گزارش" type="date" value={formData.reportDate} disabled />
                    <Input id="cost" label="هزینه کل برنامه (ریال)" type="number" value={formData.cost} onChange={handleChange} required />
                    <Input id="salesIncrease" label="افزایش فروش حاصل شده (ریال)" type="number" value={formData.salesIncrease} onChange={handleChange} required />
                </div>
                 <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                     <span className="font-semibold">بازگشت سرمایه (ROI): </span>
                     <span className={calculateROI() >= 0 ? 'text-green-600' : 'text-red-600'}>{calculateROI().toFixed(2)}%</span>
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="feedback" 
                        label="خلاصه بازخورد کیفی از تیم فروش" 
                        value={formData.feedback} 
                        onChange={handleChange}
                        placeholder="نظرات تیم در مورد تاثیر برنامه بر انگیزه و عملکردشان را وارد کنید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت گزارش</span>
                        <TrendingUp size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
