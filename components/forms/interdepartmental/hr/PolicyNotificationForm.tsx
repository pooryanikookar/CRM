
import React, { useState } from 'react';
import type { PolicyNotification } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input, Textarea } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { FileBadge } from 'lucide-react';
import { EMPLOYEE_LIST } from '../../../../constants';
import { Select } from '../../../ui/Select';


interface PolicyNotificationFormProps {
  onSave: (data: { policyNotification: PolicyNotification }) => void;
}

export const PolicyNotificationForm: React.FC<PolicyNotificationFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<PolicyNotification, 'id'>>({
        effectiveDate: new Date().toISOString().split('T')[0],
        policyTitle: '',
        summary: '',
        audience: 'همه پرسنل',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newNotification: PolicyNotification = {
            ...formData,
            id: `POL-${Date.now()}`,
        };
        onSave({ policyNotification: newNotification });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ابلاغ آیین‌نامه یا دستورالعمل جدید (3-2-3)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ابلاغ سیاست‌ها، رویه‌ها و دستورالعمل‌های جدید به پرسنل.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="policyTitle" label="عنوان آیین‌نامه/دستورالعمل" value={formData.policyTitle} onChange={handleChange} required />
                     <Input id="effectiveDate" label="تاریخ اجرا" type="date" value={formData.effectiveDate} onChange={handleChange} required />
                     <Select id="audience" label="مخاطبین ابلاغ" value={formData.audience} onChange={handleChange}>
                         <option value="همه پرسنل">همه پرسنل</option>
                         <option value="تیم فروش">تیم فروش</option>
                         <option value="تیم پشتیبانی">تیم پشتیبانی</option>
                         <option value="مدیران">مدیران</option>
                     </Select>
                     <Input id="policyFile" label="فایل کامل آیین‌نامه (اختیاری)" type="file" />

                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="summary" 
                        label="خلاصه و نکات کلیدی" 
                        value={formData.summary} 
                        onChange={handleChange}
                        required
                        placeholder="تغییرات اصلی و نکات مهم آیین‌نامه جدید را به طور خلاصه شرح دهید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت و ابلاغ</span>
                        <FileBadge size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
