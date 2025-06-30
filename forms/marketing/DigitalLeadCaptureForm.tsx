
import React, { useState } from 'react';
import type { DigitalLead } from '../../../types';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { DownloadCloud } from 'lucide-react';
import { DIGITAL_LEAD_SOURCES } from '../../../constants';

interface DigitalLeadCaptureFormProps {
  onSave: (data: { digitalLead: DigitalLead }) => void;
}

export const DigitalLeadCaptureForm: React.FC<DigitalLeadCaptureFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<DigitalLead, 'id'>>({
        captureDate: new Date().toISOString().split('T')[0],
        source: DIGITAL_LEAD_SOURCES[0],
        name: '',
        email: '',
        interest: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newLead: DigitalLead = {
            ...formData,
            id: `DLEAD-${Date.now()}`,
        };
        onSave({ digitalLead: newLead });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ثبت لید دیجیتال (4-6)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">جمع‌آوری و ثبت سرنخ‌های ورودی از کانال‌های دیجیتال.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="name" label="نام سرنخ" value={formData.name} onChange={handleChange} required />
                    <Input id="email" label="ایمیل" type="email" value={formData.email} onChange={handleChange} required />
                    <Select id="source" label="منبع سرنخ" value={formData.source} onChange={handleChange}>
                        {DIGITAL_LEAD_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                    <Input id="captureDate" label="تاریخ ثبت" type="date" value={formData.captureDate} onChange={handleChange} required />
                </div>
                
                <div className="mt-4">
                    <Input 
                        id="interest" 
                        label="علاقه‌مندی/محصول" 
                        value={formData.interest} 
                        onChange={handleChange}
                        placeholder="مثال: دانلود کتاب الکترونیکی X، درخواست دموی محصول Y"
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت لید و ارسال اعلان</span>
                        <DownloadCloud size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
