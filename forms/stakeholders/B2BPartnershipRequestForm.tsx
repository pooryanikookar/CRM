import React, { useState } from 'react';
import type { B2BPartnershipRequest } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { Building2 } from 'lucide-react';
import { PARTNERSHIP_TYPES } from '../../../constants';

interface B2BPartnershipRequestFormProps {
  onSave: (data: { b2bPartnershipRequest: B2BPartnershipRequest }) => void;
}

export const B2BPartnershipRequestForm: React.FC<B2BPartnershipRequestFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<B2BPartnershipRequest, 'id'>>({
        requestDate: new Date().toISOString().split('T')[0],
        partnerName: '',
        industry: '',
        partnershipType: PARTNERSHIP_TYPES[0],
        justification: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRequest: B2BPartnershipRequest = {
            ...formData,
            id: `B2B-REQ-${Date.now()}`,
        };
        onSave({ b2bPartnershipRequest: newRequest });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ثبت درخواست همکاری سازمانی (B2B) (8-1)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت و ارزیابی اولیه درخواست‌های همکاری از طرف سایر سازمان‌ها.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="partnerName" label="نام سازمان متقاضی" value={formData.partnerName} onChange={handleChange} required />
                    <Input id="industry" label="صنعت" value={formData.industry} onChange={handleChange} placeholder="مثال: فناوری اطلاعات، تولیدی، خدمات" />
                     <Select id="partnershipType" label="نوع همکاری پیشنهادی" value={formData.partnershipType} onChange={handleChange}>
                        {PARTNERSHIP_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
                    </Select>
                     <Input id="requestDate" label="تاریخ درخواست" type="date" value={formData.requestDate} disabled />
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="justification" 
                        label="شرح توجیهی و مزایای همکاری" 
                        value={formData.justification} 
                        onChange={handleChange}
                        required
                        placeholder="دلایل استراتژیک و مزایای متقابل این همکاری را شرح دهید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ارسال برای بررسی</span>
                        <Building2 size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
