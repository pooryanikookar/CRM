
import React, { useState } from 'react';
import type { CampaignEffectiveness } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { BarChart3 } from 'lucide-react';

interface CampaignEffectivenessFormProps {
  onSave: (data: { campaignEffectiveness: CampaignEffectiveness }) => void;
  marketingData: { campaignRequests: {id: string, campaignName: string}[] };
}

export const CampaignEffectivenessForm: React.FC<CampaignEffectivenessFormProps> = ({ onSave, marketingData }) => {
    const [formData, setFormData] = useState<Omit<CampaignEffectiveness, 'id'>>({
        reportDate: new Date().toISOString().split('T')[0],
        campaignName: marketingData?.campaignRequests?.[0]?.campaignName || '',
        kpiSummary: '',
        analysis: '',
        recommendations: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReport: CampaignEffectiveness = {
            ...formData,
            id: `CEFF-${Date.now()}`,
        };
        onSave({ campaignEffectiveness: newReport });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم گزارش اثربخشی کمپین (5-4)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ارزیابی و گزارش نتایج نهایی کمپین‌های اجرا شده.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                     <Select id="campaignName" label="کمپین مرتبط" value={formData.campaignName} onChange={handleChange}>
                        <option value="">یک کمپین را انتخاب کنید</option>
                         {marketingData.campaignRequests.map(req => <option key={req.id} value={req.campaignName}>{req.campaignName}</option>)}
                    </Select>
                    <Input id="reportDate" label="تاریخ تهیه گزارش" type="date" value={formData.reportDate} disabled />
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="kpiSummary" 
                        label="خلاصه شاخص‌های کلیدی عملکرد (KPIs)" 
                        value={formData.kpiSummary} 
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="نتایج کمی را به صورت خلاصه وارد کنید (مثال: تعداد لید: ۵۰، نرخ تبدیل: ۵٪، بازگشت سرمایه: ۳۰٪)."
                    />
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="analysis" 
                        label="تحلیل نتایج و دلایل موفقیت/شکست" 
                        value={formData.analysis} 
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="تحلیل کیفی نتایج، نقاط قوت، نقاط ضعف و دلایل اصلی عملکرد را شرح دهید."
                    />
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="recommendations" 
                        label="درس‌آموخته‌ها و پیشنهادات برای کمپین‌های آتی" 
                        value={formData.recommendations} 
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder="چه اقداماتی برای بهبود در کمپین‌های آینده پیشنهاد می‌شود؟"
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت گزارش و ارسال به مدیریت</span>
                        <BarChart3 size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
