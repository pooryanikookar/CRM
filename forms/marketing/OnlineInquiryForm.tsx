
import React, { useState } from 'react';
import type { OnlineInquiry } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { MessageCircleQuestion } from 'lucide-react';
import { ONLINE_INQUIRY_CHANNELS, ONLINE_INQUIRY_STATUSES } from '../../../constants';

interface OnlineInquiryFormProps {
  onSave: (data: { onlineInquiry: OnlineInquiry }) => void;
}

export const OnlineInquiryForm: React.FC<OnlineInquiryFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<OnlineInquiry, 'id' | 'date'>>({
        channel: ONLINE_INQUIRY_CHANNELS[0],
        customerName: '',
        inquiryText: '',
        assignedTo: 'تیم پشتیبانی',
        status: ONLINE_INQUIRY_STATUSES[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newInquiry: OnlineInquiry = {
            ...formData,
            id: `INQ-${Date.now()}`,
            date: new Date().toISOString(),
        };
        onSave({ onlineInquiry: newInquiry });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ارتباط با مشتریان مجازی (4-4)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت و پیگیری درخواست‌ها و پیام‌های دریافتی از کانال‌های آنلاین.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="customerName" label="نام مشتری/فرستنده" value={formData.customerName} onChange={handleChange} required />
                    <Select id="channel" label="کانال ارتباطی" value={formData.channel} onChange={handleChange}>
                        {ONLINE_INQUIRY_CHANNELS.map(c => <option key={c} value={c}>{c}</option>)}
                    </Select>
                    <Input id="assignedTo" label="ارجاع به" value={formData.assignedTo} onChange={handleChange} />
                    <Select id="status" label="وضعیت رسیدگی" value={formData.status} onChange={handleChange}>
                        {ONLINE_INQUIRY_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="inquiryText" 
                        label="متن کامل پیام/درخواست" 
                        value={formData.inquiryText} 
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="محتوای پیام دریافتی از مشتری را اینجا وارد کنید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت و ارجاع</span>
                        <MessageCircleQuestion size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
