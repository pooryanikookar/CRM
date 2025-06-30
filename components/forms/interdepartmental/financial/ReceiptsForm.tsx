import React, { useState } from 'react';
import type { Receipt } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Select } from '../../../ui/Select';
import { CircleDollarSign } from 'lucide-react';
import { LeadSearch } from '../../../LeadSearch';
import { RECEIPT_METHODS } from '../../../../constants';

interface ReceiptsFormProps {
  onSave: (data: { receipt: Receipt }) => void;
  leadData: { leadId: string; fullName: string; potentialCustomerId?: string } | null;
  onLeadSelect: (lead: any) => void;
}

export const ReceiptsForm: React.FC<ReceiptsFormProps> = ({ onSave, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState<Omit<Receipt, 'id' | 'receiptDate' | 'customerId'>>({
        amount: 0,
        paymentMethod: RECEIPT_METHODS[0],
        referenceId: '',
        invoiceId: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: id === 'amount' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!leadData) {
            alert("لطفاً ابتدا یک مشتری را انتخاب کنید.");
            return;
        }
        const newReceipt: Receipt = {
            ...formData,
            id: `RCPT-${Date.now()}`,
            receiptDate: new Date().toISOString().split('T')[0],
            customerId: leadData.potentialCustomerId || leadData.leadId,
        };
        onSave({ receipt: newReceipt });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم وصول وجه (3-1-3)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت و تایید وجه دریافت شده از مشتری و اطلاع‌رسانی به واحد مالی.</p>
            </div>

            <LeadSearch onLeadSelect={onLeadSelect} />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="customerName" label="مشتری" value={leadData?.fullName || ''} disabled />
                    <Input id="amount" label="مبلغ دریافتی (ریال)" type="number" value={formData.amount} onChange={handleChange} required />
                    <Select id="paymentMethod" label="روش پرداخت" value={formData.paymentMethod} onChange={handleChange}>
                        {RECEIPT_METHODS.map(method => <option key={method} value={method}>{method}</option>)}
                    </Select>
                    <Input id="referenceId" label="شماره مرجع (چک، فیش، تراکنش)" value={formData.referenceId} onChange={handleChange} required />
                    <Input id="invoiceId" label="شماره فاکتور مرتبط (اختیاری)" value={formData.invoiceId} onChange={handleChange} />
                </div>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!leadData}>
                        <span className="ml-2">ثبت وصول</span>
                        <CircleDollarSign size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
