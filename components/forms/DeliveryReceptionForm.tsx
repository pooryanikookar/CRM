
import React, { useState, useEffect } from 'react';
import type { LeadData } from '../../types';
import { Card } from '../ui/Card';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { ArrowLeft, CheckCircle, ClipboardCheck, Truck } from 'lucide-react';
import { LeadSearch } from '../LeadSearch';
import { RECEPTION_STATUSES } from '../../constants';


interface DeliveryReceptionFormProps {
  onNextStep: (data: Partial<LeadData>) => void;
  leadData: LeadData | null;
  onLeadSelect: (lead: LeadData) => void;
}

export const DeliveryReceptionForm: React.FC<DeliveryReceptionFormProps> = ({ onNextStep, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState({
        receptionDate: leadData?.receptionDate || new Date().toISOString().split('T')[0],
        receptionStatus: leadData?.receptionStatus || RECEPTION_STATUSES[0],
        receptionNotes: leadData?.receptionNotes || ''
    });

    useEffect(() => {
        setFormData({
            receptionDate: leadData?.receptionDate || new Date().toISOString().split('T')[0],
            receptionStatus: leadData?.receptionStatus || RECEPTION_STATUSES[0],
            receptionNotes: leadData?.receptionNotes || ''
        });
    }, [leadData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const receptionReportId = leadData?.receptionReportId || `REC-${Date.now()}`;
        onNextStep({ ...formData, receptionReportId });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم گزارش تحویل و صورتجلسه دریافت (MKT-09)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت و تایید رسمی تحویل کالا/خدمت به مشتری و مستندسازی ایرادات احتمالی.</p>
            </div>

            <LeadSearch onLeadSelect={onLeadSelect} />

            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border dark:border-gray-600">
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white flex items-center"><Truck className="ml-2" size={22}/>خلاصه دستور تحویل</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">نام مشتری:</span> {leadData?.fullName || '---'}</div>
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">شناسه دستور:</span> {leadData?.deliveryOrderId || '---'}</div>
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">تاریخ برنامه‌ریزی:</span> {leadData?.deliveryDate || '---'}</div>
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">آدرس:</span> {leadData?.deliveryAddress || '---'}</div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                   <Input id="receptionReportId" label="شماره گزارش تحویل (سیستمی)" value={leadData?.receptionReportId || "در حال ایجاد..."} disabled/>
                   <Input id="receptionDate" label="تاریخ و ساعت دقیق تحویل" type="datetime-local" value={formData.receptionDate} onChange={handleChange} required />
                </div>
                 <div className="mt-4">
                     <Select id="receptionStatus" label="وضعیت اقلام هنگام تحویل" value={formData.receptionStatus} onChange={handleChange}>
                        {RECEPTION_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                 </div>
                 <div className="mt-4">
                    <Textarea 
                        id="receptionNotes" 
                        label="توضیحات تکمیلی / گزارش مشکلات" 
                        value={formData.receptionNotes} 
                        onChange={handleChange}
                        placeholder="در صورت وجود هرگونه مغایرت، ایراد یا نکته خاص، در این بخش ثبت نمایید..."
                    />
                 </div>
                 <div className="mt-6 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">تایید نهایی تحویل و ابلاغ به واحد مالی</span>
                        <ClipboardCheck size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
