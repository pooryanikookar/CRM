
import React, { useState } from 'react';
import type { CompetitorAnalysis } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Swords } from 'lucide-react';

interface CompetitorAnalysisFormProps {
  onSave: (data: { competitorAnalysis: CompetitorAnalysis }) => void;
}

export const CompetitorAnalysisForm: React.FC<CompetitorAnalysisFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<CompetitorAnalysis, 'id'>>({
        analysisDate: new Date().toISOString().split('T')[0],
        competitorName: '',
        products: '',
        pricing: '',
        strengths: '',
        weaknesses: '',
        strategy: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newAnalysis: CompetitorAnalysis = {
            ...formData,
            id: `COMP-${Date.now()}`,
        };
        onSave({ competitorAnalysis: newAnalysis });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ثبت تحلیل رقبا (7-2)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">تحلیل و بررسی سیستماتیک عملکرد و استراتژی‌های رقبا.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="competitorName" label="نام رقیب" value={formData.competitorName} onChange={handleChange} required />
                    <Input id="analysisDate" label="تاریخ تحلیل" type="date" value={formData.analysisDate} disabled />
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="products" 
                        label="محصولات/خدمات کلیدی رقیب" 
                        value={formData.products} 
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="pricing" 
                        label="استراتژی قیمت‌گذاری" 
                        value={formData.pricing} 
                        onChange={handleChange}
                    />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-4">
                    <Textarea 
                        id="strengths" 
                        label="نقاط قوت" 
                        value={formData.strengths} 
                        onChange={handleChange}
                    />
                     <Textarea 
                        id="weaknesses" 
                        label="نقاط ضعف" 
                        value={formData.weaknesses} 
                        onChange={handleChange}
                    />
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="strategy" 
                        label="استراتژی مشاهده شده و اقدامات اخیر" 
                        value={formData.strategy} 
                        onChange={handleChange}
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت تحلیل و ارسال</span>
                        <Swords size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
