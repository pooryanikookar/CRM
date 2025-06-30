
import React, { useState } from 'react';
import type { CampaignRequest } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Flag } from 'lucide-react';

interface CampaignRequestFormProps {
  onSave: (data: { campaignRequest: CampaignRequest }) => void;
}

export const CampaignRequestForm: React.FC<CampaignRequestFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<CampaignRequest, 'id'>>({
        requestDate: new Date().toISOString().split('T')[0],
        campaignName: '',
        goals: '',
        targetAudience: '',
        budget: 0,
        timeline: '',
        requester: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: id === 'budget' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRequest: CampaignRequest = {
            ...formData,
            id: `CREQ-${Date.now()}`,
        };
        onSave({ campaignRequest: newRequest });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ثبت درخواست اجرای کمپین (5-1)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت درخواست رسمی برای اجرای یک کمپین تبلیغاتی یا بازاریابی.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="campaignName" label="نام کمپین پیشنهادی" value={formData.campaignName} onChange={handleChange} required />
                    <Input id="requester" label="واحد/فرد درخواست‌دهنده" value={formData.requester} onChange={handleChange} required />
                    <Input id="budget" label="بودجه پیشنهادی (ریال)" type="number" value={formData.budget} onChange={handleChange} />
                    <Input id="timeline" label="بازه زمانی پیشنهادی" value={formData.timeline} onChange={handleChange} placeholder="مثال: فصل بهار ۱۴۰۴"/>
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="goals" 
                        label="اهداف اصلی کمپین" 
                        value={formData.goals} 
                        onChange={handleChange}
                        required
                        placeholder="اهداف کیفی و کمی کمپین را شرح دهید (مثال: افزایش ۲۰٪ فروش محصول X)."
                    />
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="targetAudience" 
                        label="مخاطبین هدف" 
                        value={formData.targetAudience} 
                        onChange={handleChange}
                        required
                        placeholder="توصیف دقیق گروه مخاطبین هدف کمپین."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ارسال درخواست برای بررسی</span>
                        <Flag size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
