import React, { useState } from 'react';
import type { AccountClearance } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Textarea } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { UserCheck } from 'lucide-react';
import { LeadSearch } from '../../../LeadSearch';

interface AccountClearanceFormProps {
  onSave: (data: { accountClearance: AccountClearance }) => void;
  leadData: { leadId: string; fullName: string; potentialCustomerId?: string } | null;
  onLeadSelect: (lead: any) => void;
}

export const AccountClearanceReportForm: React.FC<AccountClearanceFormProps> = ({ onSave, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState<Omit<AccountClearance, 'id' | 'clearanceDate' | 'customerId'>>({
        notes: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!leadData) {
            alert("لطفاً ابتدا یک مشتری را انتخاب کنید.");
            return;
        }
        const newReport: AccountClearance = {
            ...formData,
            id: `CLR-${Date.now()}`,
            clearanceDate: new Date().toISOString().split('T')[0],
            customerId: leadData.potentialCustomerId || leadData.leadId,
        };
        onSave({ accountClearance: newReport });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم گزارش تسویه حساب (3-1-5)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">تایید نهایی تسویه حساب کامل مشتری و بستن پرونده مالی.</p>
            </div>

            <LeadSearch onLeadSelect={onLeadSelect} />
            
            {leadData && (
                 <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700">
                    <h3 className="font-bold text-lg mb-2 text-green-800 dark:text-green-300">مشتری انتخاب‌شده برای تسویه</h3>
                    <p>{leadData.fullName} (شناسه: {leadData.potentialCustomerId || leadData.leadId})</p>
                 </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <Textarea 
                        id="notes" 
                        label="یادداشت‌های تکمیلی" 
                        value={formData.notes} 
                        onChange={handleChange}
                        placeholder="در صورت وجود، نکات مربوط به اسناد بایگانی مالی یا پایان اعتبار فاکتور را ذکر کنید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!leadData}>
                        <span className="ml-2">تایید تسویه و ارسال گواهی</span>
                        <UserCheck size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
