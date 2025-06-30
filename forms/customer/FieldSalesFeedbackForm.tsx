
import React, { useState } from 'react';
import type { FieldSalesFeedback } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { MessageSquareQuote } from 'lucide-react';
import { LeadSearch } from '../../LeadSearch';

interface FieldSalesFeedbackFormProps {
  onSave: (data: { fieldSalesFeedback: FieldSalesFeedback }) => void;
  leadData: {fullName: string} | null;
  onLeadSelect: (lead: any) => void;
}

export const FieldSalesFeedbackForm: React.FC<FieldSalesFeedbackFormProps> = ({ onSave, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState<Omit<FieldSalesFeedback, 'id' | 'customerName'>>({
        visitDate: new Date().toISOString().split('T')[0],
        feedback: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!leadData) {
            alert("لطفا یک مشتری را انتخاب کنید.");
            return;
        }
        const newFeedback: FieldSalesFeedback = {
            ...formData,
            id: `FSF-${Date.now()}`,
            customerName: leadData.fullName,
        };
        onSave({ fieldSalesFeedback: newFeedback });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم بازخورد نماینده فروش حضوری (2-4)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت بازخوردهای میدانی از ویزیتورها و نمایندگان فروش.</p>
            </div>
            
            <LeadSearch onLeadSelect={onLeadSelect} />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="customerName" label="مشتری بازدید شده" value={leadData?.fullName || 'یک مشتری انتخاب کنید'} disabled />
                    <Input id="visitDate" label="تاریخ بازدید" type="date" value={formData.visitDate} onChange={handleChange} required />
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="feedback" 
                        label="بازخورد، مشکلات یا فرصت‌های مشاهده شده" 
                        value={formData.feedback} 
                        onChange={handleChange}
                        required
                        placeholder="مشاهدات خود را از وضعیت بازار، رقبا، و نظرات مشتری به طور کامل شرح دهید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!leadData}>
                        <span className="ml-2">ثبت بازخورد</span>
                        <MessageSquareQuote size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
