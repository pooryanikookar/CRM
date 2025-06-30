import React, { useState } from 'react';
import type { InvoiceRequest } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { FileText } from 'lucide-react';
import { LeadSearch } from '../../../LeadSearch';

interface InvoiceRequestFormProps {
  onSave: (data: { invoiceRequest: InvoiceRequest }) => void;
  leadData: { leadId: string; fullName: string; potentialCustomerId?: string; proformaInvoiceId?: string; totalPrice?: number } | null;
  onLeadSelect: (lead: any) => void;
}

export const InvoiceRequestForm: React.FC<InvoiceRequestFormProps> = ({ onSave, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState<Omit<InvoiceRequest, 'id' | 'requestDate' | 'customerId' | 'amount'>>({
        proformaInvoiceId: leadData?.proformaInvoiceId || '',
    });
    
    React.useEffect(() => {
        setFormData({ proformaInvoiceId: leadData?.proformaInvoiceId || ''});
    }, [leadData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!leadData) {
            alert("لطفاً ابتدا یک مشتری/پیش‌فاکتور را انتخاب کنید.");
            return;
        }
        const newRequest: InvoiceRequest = {
            ...formData,
            id: `INVREQ-${Date.now()}`,
            requestDate: new Date().toISOString().split('T')[0],
            customerId: leadData.potentialCustomerId || leadData.leadId,
            amount: leadData.totalPrice || 0,
        };
        onSave({ invoiceRequest: newRequest });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم درخواست صدور فاکتور (3-1-4)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ارسال درخواست رسمی به واحد حسابداری جهت صدور فاکتور فروش نهایی.</p>
            </div>
            
            <LeadSearch onLeadSelect={onLeadSelect} />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="customerName" label="مشتری" value={leadData?.fullName || ''} disabled />
                    <Input id="proformaInvoiceId" label="شماره پیش‌فاکتور مرتبط" value={formData.proformaInvoiceId} onChange={handleChange} required />
                    <Input id="amount" label="مبلغ نهایی فاکتور (ریال)" value={leadData?.totalPrice?.toLocaleString('fa-IR') || '0'} disabled />
                </div>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!leadData}>
                        <span className="ml-2">درخواست صدور فاکتور</span>
                        <FileText size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
