import React, { useState } from 'react';
import type { B2GTender } from '../../../types';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { Gavel } from 'lucide-react';
import { TENDER_STATUSES } from '../../../constants';

interface B2GTenderFormProps {
  onSave: (data: { b2gTender: B2GTender }) => void;
}

export const B2GTenderForm: React.FC<B2GTenderFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<B2GTender, 'id'>>({
        submissionDate: new Date().toISOString().split('T')[0],
        tenderTitle: '',
        governmentEntity: '',
        status: TENDER_STATUSES[0],
        submissionDocsUrl: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTender: B2GTender = {
            ...formData,
            id: `B2G-${Date.now()}`,
        };
        onSave({ b2gTender: newTender });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم شرکت در مناقصه/مزایده دولتی (B2G) (8-4)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">مدیریت فرآیند تهیه و ارسال اسناد برای شرکت در مناقصات دولتی.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="tenderTitle" label="عنوان مناقصه/مزایده" value={formData.tenderTitle} onChange={handleChange} required />
                    <Input id="governmentEntity" label="سازمان دولتی برگزارکننده" value={formData.governmentEntity} onChange={handleChange} required />
                    <Input id="submissionDate" label="آخرین مهلت ارسال" type="date" value={formData.submissionDate} onChange={handleChange} required />
                     <Select id="status" label="وضعیت" value={formData.status} onChange={handleChange}>
                        {TENDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                </div>
                 <div className="mt-4">
                    <Input id="submissionDocsUrl" label="لینک یا فایل اسناد ارسالی" value={formData.submissionDocsUrl} onChange={handleChange} placeholder="لینک به فایل‌های بارگذاری شده یا مستندات"/>
                </div>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت اطلاعات</span>
                        <Gavel size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
