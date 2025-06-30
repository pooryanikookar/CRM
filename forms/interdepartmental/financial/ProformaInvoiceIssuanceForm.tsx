import React, { useState } from 'react';
import type { ProformaInvoiceRequest } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { FilePlus } from 'lucide-react';
import { LeadSearch } from '../../../LeadSearch';

interface ProformaInvoiceIssuanceFormProps {
  onSave: (data: { proformaInvoiceRequest: ProformaInvoiceRequest }) => void;
  leadData: { leadId: string; fullName: string; potentialCustomerId?: string; quotationId?: string; } | null;
  onLeadSelect: (lead: any) => void;
}

export const ProformaInvoiceIssuanceForm: React.FC<ProformaInvoiceIssuanceFormProps> = ({ onSave, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState<Omit<ProformaInvoiceRequest, 'id' | 'requestDate' | 'customerId' | 'status'>>({
        relatedQuoteId: leadData?.quotationId || '',
    });

    React.useEffect(() => {
        setFormData({ relatedQuoteId: leadData?.quotationId || '' });
    }, [leadData]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!leadData) {
            alert("لطفاً ابتدا یک مشتری/سفارش را انتخاب کنید.");
            return;
        }
        const newRequest: ProformaInvoiceRequest = {
            ...formData,
            id: `PFI-${Date.now()}`,
            requestDate: new Date().toISOString().split('T')[0],
            customerId: leadData.potentialCustomerId || leadData.leadId,
            status: 'درخواست صادر شد',
        };
        onSave({ proformaInvoiceRequest: newRequest });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم درخواست صدور پیش‌فاکتور (3-1-2)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ارسال درخواست رسمی برای صدور پیش‌فاکتور (Proforma) به واحد فروش.</p>
            </div>
            
            <LeadSearch onLeadSelect={onLeadSelect} />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="customerName" label="مشتری" value={leadData?.fullName || ''} disabled />
                    <Input id="relatedQuoteId" label="شماره پیشنهاد قیمت مرتبط" value={formData.relatedQuoteId} onChange={handleChange} required />
                </div>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!leadData}>
                        <span className="ml-2">درخواست صدور</span>
                        <FilePlus size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
