
import React, { useState } from 'react';
import type { MarketingStrategyReview } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Target } from 'lucide-react';

interface MarketingStrategyReviewFormProps {
  onSave: (data: { marketingStrategyReview: MarketingStrategyReview }) => void;
}

export const MarketingStrategyReviewForm: React.FC<MarketingStrategyReviewFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<MarketingStrategyReview, 'id'>>({
        reviewDate: new Date().toISOString().split('T')[0],
        period: '',
        summary: '',
        performanceVsGoals: '',
        swot: '',
        recommendations: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReview: MarketingStrategyReview = {
            ...formData,
            id: `SREV-${Date.now()}`,
        };
        onSave({ marketingStrategyReview: newReview });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم گزارش بررسی و بازنگری استراتژی بازاریابی (7-6)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ارزیابی دوره‌ای استراتژی کلان بازاریابی و ارائه پیشنهادات برای بهبود.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="period" label="دوره مورد بررسی" value={formData.period} onChange={handleChange} required placeholder="مثال: سه‌ماهه اول ۱۴۰۴"/>
                    <Input id="reviewDate" label="تاریخ بازنگری" type="date" value={formData.reviewDate} disabled />
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="summary" 
                        label="خلاصه استراتژی فعلی" 
                        value={formData.summary} 
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="performanceVsGoals" 
                        label="ارزیابی عملکرد در برابر اهداف" 
                        value={formData.performanceVsGoals} 
                        onChange={handleChange}
                        required
                    />
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="swot" 
                        label="تحلیل SWOT (قوت، ضعف، فرصت، تهدید)" 
                        value={formData.swot} 
                        onChange={handleChange}
                    />
                 </div>
                 <div className="mt-4">
                    <Textarea 
                        id="recommendations" 
                        label="پیشنهادات برای دوره بعد" 
                        value={formData.recommendations} 
                        onChange={handleChange}
                        required
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت گزارش و ارجاع به کمیته راهبردی</span>
                        <Target size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
