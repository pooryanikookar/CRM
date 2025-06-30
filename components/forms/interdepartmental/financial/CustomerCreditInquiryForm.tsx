import React, { useState } from 'react';
import type { CustomerCreditInquiry } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input, Textarea } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { LeadSearch } from '../../../LeadSearch';
import { CreditCard } from 'lucide-react';

interface CustomerCreditInquiryFormProps {
  onSave: (data: { customerCreditInquiry: CustomerCreditInquiry }) => void;
  leadData: { leadId: string; fullName: string; potentialCustomerId?: string; } | null;
  onLeadSelect: (lead: any) => void;
}

export const CustomerCreditInquiryForm: React.FC<CustomerCreditInquiryFormProps> = ({ onSave, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState<Omit<CustomerCreditInquiry, 'id' | 'requestDate' | 'customerId' | 'status'>>({
        requestReason: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!leadData) {
            alert("لطفاً ابتدا یک مشتری را انتخاب کنید.");
            return;
        }
        const newRequest: CustomerCreditInquiry = {
            ...formData,
            id: `CCI-${Date.now()}`,
            requestDate: new Date().toISOString().split('T')[0],
            customerId: leadData.potentialCustomerId || leadData.leadId,
            status: 'در انتظار پاسخ',
        };
        onSave({ customerCreditInquiry: newRequest });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم استعلام اعتبار مشتری (3-1-1)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ارسال درخواست رسمی به واحد مالی برای بررسی و تایید اعتبار مشتریان.</p>
            </div>
            
            <LeadSearch onLeadSelect={onLeadSelect} />
            
            {leadData && (
                 <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border dark:border-gray-600">
                    <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">مشتری انتخاب‌شده</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div><span className="font-semibold text-gray-600 dark:text-gray-400">نام:</span> {leadData.fullName}</div>
                        <div><span className="font-semibold text-gray-600 dark:text-gray-400">شناسه:</span> {leadData.potentialCustomerId || leadData.leadId}</div>
                    </div>
                 </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <Textarea 
                        id="requestReason" 
                        label="علت استعلام" 
                        value={formData.requestReason} 
                        onChange={handleChange}
                        required
                        placeholder="مثال: اولین خرید، افزایش سقف اعتبار، درخواست خرید چکی..."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!leadData}>
                        <span className="ml-2">ارسال به واحد مالی</span>
                        <CreditCard size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
