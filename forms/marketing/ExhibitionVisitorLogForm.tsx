import React, { useState } from 'react';
import type { ExhibitionVisitorLog } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { UserCheck } from 'lucide-react';

interface ExhibitionVisitorLogFormProps {
  onSave: (data: { exhibitionVisitorLog: ExhibitionVisitorLog }) => void;
}

export const ExhibitionVisitorLogForm: React.FC<ExhibitionVisitorLogFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<ExhibitionVisitorLog, 'id'>>({
        eventName: '',
        visitorName: '',
        company: '',
        phone: '',
        email: '',
        interestLevel: 3,
        notes: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: id === 'interestLevel' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newLog: ExhibitionVisitorLog = {
            ...formData,
            id: `VISITOR-${Date.now()}`,
        };
        onSave({ exhibitionVisitorLog: newLog });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ثبت بازدیدکننده نمایشگاه/رویداد (2-1)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت اطلاعات بازدیدکنندگان از غرفه جهت پیگیری‌های بعدی فروش.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="eventName" label="نام نمایشگاه/رویداد" value={formData.eventName} onChange={handleChange} required />
                    <Input id="visitorName" label="نام و نام خانوادگی بازدیدکننده" value={formData.visitorName} onChange={handleChange} required />
                    <Input id="company" label="نام شرکت/سازمان" value={formData.company} onChange={handleChange} />
                    <Input id="phone" label="شماره تماس" type="tel" value={formData.phone} onChange={handleChange} required />
                    <Input id="email" label="ایمیل" type="email" value={formData.email} onChange={handleChange} />
                </div>

                 <div className="mt-4">
                    <label htmlFor="interestLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">سطح علاقه‌مندی (۱ تا ۵)</label>
                    <input id="interestLevel" type="range" min="1" max="5" value={formData.interestLevel} onChange={handleChange} className="w-full" />
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="notes" 
                        label="یادداشت‌ها و نکات کلیدی" 
                        value={formData.notes} 
                        onChange={handleChange}
                        placeholder="نکات مهم گفتگو، محصول مورد علاقه و سایر جزئیات را وارد کنید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت بازدیدکننده و ارسال به تیم فروش</span>
                        <UserCheck size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};