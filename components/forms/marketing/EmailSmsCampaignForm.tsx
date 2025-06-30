
import React, { useState } from 'react';
import type { EmailSmsCampaign } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { Send } from 'lucide-react';
import { CAMPAIGN_MESSAGE_TYPES } from '../../../constants';

interface EmailSmsCampaignFormProps {
  onSave: (data: { emailSmsCampaign: EmailSmsCampaign }) => void;
}

export const EmailSmsCampaignForm: React.FC<EmailSmsCampaignFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<EmailSmsCampaign, 'id'>>({
        type: 'ایمیل',
        subject: '',
        targetListId: '',
        content: '',
        sendDate: new Date().toISOString().split('T')[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newCampaign: EmailSmsCampaign = {
            ...formData,
            id: `ESC-${Date.now()}`,
        };
        onSave({ emailSmsCampaign: newCampaign });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم درخواست کمپین ایمیلی/پیامکی (4-10)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ایجاد، مدیریت و ارسال کمپین‌های مبتنی بر ایمیل و پیامک.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Select id="type" label="نوع کمپین" value={formData.type} onChange={handleChange}>
                        {CAMPAIGN_MESSAGE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </Select>
                    <Input id="sendDate" label="تاریخ ارسال برنامه‌ریزی شده" type="date" value={formData.sendDate} onChange={handleChange} required />
                </div>
                 <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="subject" label="موضوع (برای ایمیل) / سرتیتر (برای پیامک)" value={formData.subject} onChange={handleChange} required />
                    <Input id="targetListId" label="شناسه لیست مخاطبین" value={formData.targetListId} onChange={handleChange} placeholder="مثال: مشتریان وفادار، سرنخ‌های نمایشگاه" required />
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="content" 
                        label="متن کامل پیام/ایمیل" 
                        value={formData.content} 
                        onChange={handleChange}
                        required
                        rows={8}
                        placeholder="محتوای اصلی پیام خود را اینجا وارد کنید. برای لینک‌ها از فرمت کامل http://... استفاده کنید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">درخواست ارسال و تولید اعلان</span>
                        <Send size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
