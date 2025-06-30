import React, { useState } from 'react';
import type { CoMarketingRequest } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Handshake } from 'lucide-react';

interface CoMarketingFormProps {
  onSave: (data: { coMarketingRequest: CoMarketingRequest }) => void;
}

export const CoMarketingForm: React.FC<CoMarketingFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<CoMarketingRequest, 'id'>>({
        partnerName: '',
        campaignName: '',
        objectives: '',
        budgetSplit: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRequest: CoMarketingRequest = {
            ...formData,
            id: `CO-MKT-${Date.now()}`,
        };
        onSave({ coMarketingRequest: newRequest });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم درخواست تبلیغات مشترک/مشارکتی (5-6)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">مدیریت و برنامه‌ریزی کمپین‌های مشترک (Co-Branding/Co-Marketing) با شرکای تجاری.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="partnerName" label="نام شریک تجاری" value={formData.partnerName} onChange={handleChange} required />
                    <Input id="campaignName" label="عنوان کمپین مشترک" value={formData.campaignName} onChange={handleChange} required />
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="objectives" 
                        label="اهداف مشترک کمپین" 
                        value={formData.objectives} 
                        onChange={handleChange}
                        required
                        placeholder="اهداف اصلی کمپین از دید هر دو طرف را شرح دهید."
                    />
                </div>
                 <div className="mt-4">
                    <Input 
                        id="budgetSplit" 
                        label="پیشنهاد تقسیم بودجه و وظایف" 
                        value={formData.budgetSplit} 
                        onChange={handleChange}
                        placeholder="مثال: ۵۰-۵۰، مسئولیت تولید محتوا با ما، انتشار با شریک"
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ارسال پیشنهاد همکاری</span>
                        <Handshake size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};