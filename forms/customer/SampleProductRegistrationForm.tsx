
import React, { useState } from 'react';
import type { SampleProductRegistration } from '../../../types';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { Box } from 'lucide-react';
import { SAMPLE_STATUSES } from '../../../constants';
import { LeadSearch } from '../../LeadSearch';

interface SampleProductRegistrationFormProps {
  onSave: (data: { sampleProductRegistration: SampleProductRegistration }) => void;
  leadData: { fullName: string } | null;
  onLeadSelect: (lead: any) => void;
}

export const SampleProductRegistrationForm: React.FC<SampleProductRegistrationFormProps> = ({ onSave, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState<Omit<SampleProductRegistration, 'id' | 'customerName'>>({
        requestDate: new Date().toISOString().split('T')[0],
        productName: '',
        status: 'ارسال شده',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        if (id === 'status') {
            setFormData((prev) => ({ ...prev, status: value as SampleProductRegistration['status'] }));
        } else {
            setFormData((prev) => ({ ...prev, [id]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!leadData) {
            alert("لطفا یک مشتری را انتخاب کنید.");
            return;
        }
        const newRegistration: SampleProductRegistration = {
            ...formData,
            id: `SAMPLE-${Date.now()}`,
            customerName: leadData.fullName,
        };
        onSave({ sampleProductRegistration: newRegistration });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ثبت نمونه محصول (2-6)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">مدیریت فرآیند ارسال نمونه محصول به مشتریان و پیگیری بازخورد.</p>
            </div>
            
            <LeadSearch onLeadSelect={onLeadSelect} />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="customerName" label="دریافت کننده نمونه" value={leadData?.fullName || 'یک مشتری انتخاب کنید'} disabled />
                    <Input id="productName" label="نام محصول نمونه" value={formData.productName} onChange={handleChange} required />
                    <Input id="requestDate" label="تاریخ ارسال/درخواست" type="date" value={formData.requestDate} onChange={handleChange} />
                    <Select id="status" label="وضعیت" value={formData.status} onChange={handleChange}>
                        {SAMPLE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!leadData}>
                        <span className="ml-2">ثبت و ارسال به انبار</span>
                        <Box size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
