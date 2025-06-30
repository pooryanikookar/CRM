
import React, { useState } from 'react';
import type { MarketAssessmentReport } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { AreaChart } from 'lucide-react';

interface MarketAssessmentReportFormProps {
  onSave: (data: { marketAssessment: MarketAssessmentReport }) => void;
}

export const MarketAssessmentReportForm: React.FC<MarketAssessmentReportFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<MarketAssessmentReport, 'id'>>({
        reportDate: new Date().toISOString().split('T')[0],
        targetMarket: '',
        summary: '',
        opportunities: '',
        threats: '',
        recommendations: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReport: MarketAssessmentReport = {
            ...formData,
            id: `MAR-${Date.now()}`,
        };
        onSave({ marketAssessment: newReport });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ثبت گزارش ارزیابی بازار (7-1)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">تحلیل و ارزیابی وضعیت بازار برای تصمیم‌گیری‌های استراتژیک.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="targetMarket" label="بازار هدف مورد تحلیل" value={formData.targetMarket} onChange={handleChange} required />
                    <Input id="reportDate" label="تاریخ گزارش" type="date" value={formData.reportDate} disabled />
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="summary" 
                        label="خلاصه یافته‌های کلیدی" 
                        value={formData.summary} 
                        onChange={handleChange}
                        required
                        placeholder="مهم‌ترین نتایج و یافته‌های تحلیل بازار را به صورت خلاصه بیان کنید."
                    />
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="opportunities" 
                        label="فرصت‌های اصلی" 
                        value={formData.opportunities} 
                        onChange={handleChange}
                        placeholder="فرصت‌های رشد، بازارهای جدید، نیازهای پاسخ داده نشده و..."
                    />
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="threats" 
                        label="تهدیدهای اصلی" 
                        value={formData.threats} 
                        onChange={handleChange}
                        placeholder="رقبای جدید، تغییرات تکنولوژی، قوانین جدید و..."
                    />
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="recommendations" 
                        label="پیشنهادات و اقدامات بعدی" 
                        value={formData.recommendations} 
                        onChange={handleChange}
                        required
                        placeholder="بر اساس یافته‌ها، چه اقداماتی پیشنهاد می‌شود؟"
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت گزارش و ارسال به مدیریت</span>
                        <AreaChart size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
