import React, { useState } from 'react';
import type { EventReport } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Presentation } from 'lucide-react';

interface EventReportFormProps {
  onSave: (data: { eventReport: EventReport }) => void;
}

export const EventReportForm: React.FC<EventReportFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<EventReport, 'id'>>({
        eventName: '',
        eventDate: new Date().toISOString().split('T')[0],
        totalAttendees: 0,
        leadsGenerated: 0,
        totalCost: 0,
        summary: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const isNumeric = ['totalAttendees', 'leadsGenerated', 'totalCost'].includes(id);
        setFormData((prev) => ({ ...prev, [id]: isNumeric ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReport: EventReport = {
            ...formData,
            id: `EVT-REP-${Date.now()}`,
        };
        onSave({ eventReport: newReport });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم گزارش برگزاری رویداد/نمایشگاه (2-3)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت گزارش عملکرد و نتایج کلیدی رویدادهای برگزار شده.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="eventName" label="نام رویداد/نمایشگاه" value={formData.eventName} onChange={handleChange} required />
                    <Input id="eventDate" label="تاریخ برگزاری" type="date" value={formData.eventDate} onChange={handleChange} required />
                    <Input id="totalAttendees" label="تعداد کل بازدیدکنندگان/شرکت‌کنندگان" type="number" value={formData.totalAttendees} onChange={handleChange} />
                    <Input id="leadsGenerated" label="تعداد سرنخ‌های ثبت شده" type="number" value={formData.leadsGenerated} onChange={handleChange} />
                    <Input id="totalCost" label="هزینه کل برگزاری (ریال)" type="number" value={formData.totalCost} onChange={handleChange} />
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="summary" 
                        label="خلاصه، نتایج و درس‌آموخته‌ها" 
                        value={formData.summary} 
                        onChange={handleChange}
                        required
                        placeholder="نقاط قوت، ضعف، بازخوردها و پیشنهادات برای رویدادهای آتی را شرح دهید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت گزارش</span>
                        <Presentation size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};