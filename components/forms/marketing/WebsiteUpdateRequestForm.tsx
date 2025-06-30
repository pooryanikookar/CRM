
import React, { useState } from 'react';
import type { WebsiteUpdateRequest } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { Wrench } from 'lucide-react';
import { WEBSITE_UPDATE_AREAS, WEBSITE_UPDATE_PRIORITIES } from '../../../constants';

interface WebsiteUpdateRequestFormProps {
  onSave: (data: { websiteUpdateRequest: WebsiteUpdateRequest }) => void;
}

export const WebsiteUpdateRequestForm: React.FC<WebsiteUpdateRequestFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<WebsiteUpdateRequest, 'id'>>({
        requestDate: new Date().toISOString().split('T')[0],
        requester: '',
        area: WEBSITE_UPDATE_AREAS[0],
        description: '',
        priority: 'متوسط',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRequest: WebsiteUpdateRequest = {
            ...formData,
            id: `WUR-${Date.now()}`,
        };
        onSave({ websiteUpdateRequest: newRequest });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم درخواست ارتقا یا اصلاح وب‌سایت (4-8)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ارسال درخواست برای بهبود، رفع اشکال یا افزودن ویژگی جدید به وب‌سایت.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="requester" label="نام درخواست‌دهنده" value={formData.requester} onChange={handleChange} required />
                    <Input id="requestDate" label="تاریخ درخواست" type="date" value={formData.requestDate} disabled />
                    <Select id="area" label="بخش مورد نظر" value={formData.area} onChange={handleChange}>
                        {WEBSITE_UPDATE_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                    </Select>
                    <Select id="priority" label="اولویت" value={formData.priority} onChange={handleChange}>
                        {WEBSITE_UPDATE_PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                    </Select>
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="description" 
                        label="شرح کامل درخواست" 
                        value={formData.description} 
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="لطفاً جزئیات کامل تغییر مورد نظر، دلیل آن و نتیجه دلخواه را شرح دهید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ارسال درخواست به تیم فنی</span>
                        <Wrench size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
