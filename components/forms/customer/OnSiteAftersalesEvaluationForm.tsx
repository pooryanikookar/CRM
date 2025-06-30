
import React, { useState } from 'react';
import type { OnSiteAftersalesEvaluation } from '../../../types';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { ShieldCheck } from 'lucide-react';
import { LeadSearch } from '../../LeadSearch';

interface OnSiteAftersalesEvaluationFormProps {
  onSave: (data: { onSiteAftersalesEvaluation: OnSiteAftersalesEvaluation }) => void;
  leadData: { fullName: string } | null;
  onLeadSelect: (lead: any) => void;
}

export const OnSiteAftersalesEvaluationForm: React.FC<OnSiteAftersalesEvaluationFormProps> = ({ onSave, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState<Omit<OnSiteAftersalesEvaluation, 'id' | 'customerName'>>({
        visitDate: new Date().toISOString().split('T')[0],
        serviceType: '',
        technician: '',
        serviceRating: 3,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: id === 'serviceRating' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!leadData) {
            alert("لطفا یک مشتری را انتخاب کنید.");
            return;
        }
        const newEvaluation: OnSiteAftersalesEvaluation = {
            ...formData,
            id: `OSAE-${Date.now()}`,
            customerName: leadData.fullName,
        };
        onSave({ onSiteAftersalesEvaluation: newEvaluation });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ارزیابی کیفیت خدمات پس از فروش حضوری (2-8)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">سنجش کیفیت خدمات حضوری ارائه شده به مشتریان.</p>
            </div>
            
            <LeadSearch onLeadSelect={onLeadSelect} />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="customerName" label="مشتری" value={leadData?.fullName || 'یک مشتری انتخاب کنید'} disabled />
                    <Input id="serviceType" label="نوع خدمت ارائه شده" value={formData.serviceType} onChange={handleChange} required placeholder="مثال: نصب، تعمیر، آموزش" />
                    <Input id="technician" label="نام تکنیسین/کارشناس" value={formData.technician} onChange={handleChange} required />
                    <Input id="visitDate" label="تاریخ مراجعه" type="date" value={formData.visitDate} onChange={handleChange} required />
                </div>
                
                <div className="mt-6">
                    <label htmlFor="serviceRating" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">امتیاز به کیفیت خدمات (۱ تا ۵)</label>
                    <input id="serviceRating" type="range" min="1" max="5" value={formData.serviceRating} onChange={handleChange} className="w-full" />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!leadData}>
                        <span className="ml-2">ثبت ارزیابی</span>
                        <ShieldCheck size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
