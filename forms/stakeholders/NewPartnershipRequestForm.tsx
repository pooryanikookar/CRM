import React, { useState } from 'react';
import type { NewPartnershipRequest } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Handshake } from 'lucide-react';

interface NewPartnershipRequestFormProps {
  onSave: (data: { newPartnershipRequest: NewPartnershipRequest }) => void;
}

export const NewPartnershipRequestForm: React.FC<NewPartnershipRequestFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<NewPartnershipRequest, 'id'>>({
        requestDate: new Date().toISOString().split('T')[0],
        potentialPartner: '',
        partnershipArea: '',
        synergyDescription: '',
        contactPerson: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRequest: NewPartnershipRequest = {
            ...formData,
            id: `NPR-${Date.now()}`,
        };
        onSave({ newPartnershipRequest: newRequest });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم درخواست پارتنرشیپ جدید (6-2)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">بررسی و ثبت درخواست‌های همکاری و مشارکت جدید از طرف شرکت‌های دیگر.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="potentialPartner" label="نام شریک بالقوه" value={formData.potentialPartner} onChange={handleChange} required />
                    <Input id="contactPerson" label="فرد رابط در آن شرکت" value={formData.contactPerson} onChange={handleChange} required />
                    <Input id="partnershipArea" label="حوزه همکاری پیشنهادی" value={formData.partnershipArea} onChange={handleChange} required placeholder="مثال: فروش مشترک، توسعه فنی، بازاریابی" />
                    <Input id="requestDate" label="تاریخ درخواست" type="date" value={formData.requestDate} disabled />
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="synergyDescription" 
                        label="شرح هم‌افزایی و دلایل همکاری" 
                        value={formData.synergyDescription} 
                        onChange={handleChange}
                        required
                        placeholder="توضیح دهید این همکاری چگونه برای هر دو طرف سودمند خواهد بود."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت درخواست و ارسال برای ارزیابی</span>
                        <Handshake size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};