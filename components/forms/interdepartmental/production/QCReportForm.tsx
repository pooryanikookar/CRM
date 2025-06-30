import React, { useState } from 'react';
import type { QCReport } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input, Textarea } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Select } from '../../../ui/Select';
import { BadgeCheck } from 'lucide-react';
import { QC_STATUSES } from '../../../../constants';

interface QCReportFormProps {
  onSave: (data: { qcReport: QCReport }) => void;
}

export const QCReportForm: React.FC<QCReportFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<QCReport, 'id'>>({
        reportDate: new Date().toISOString().split('T')[0],
        productName: '',
        batchNumber: '',
        status: 'قبول',
        notes: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReport: QCReport = {
            ...formData,
            id: `QC-${Date.now()}`,
        };
        onSave({ qcReport: newReport });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم گزارش تولید و کنترل کیفیت (3-4-3)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت نتایج بازرسی‌ها و تست‌های کنترل کیفیت محصولات تولیدی.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="productName" label="نام محصول/کد کالا" value={formData.productName} onChange={handleChange} required />
                    <Input id="batchNumber" label="شماره بچ/سری ساخت" value={formData.batchNumber} onChange={handleChange} required />
                    <Select id="status" label="نتیجه نهایی کنترل کیفیت" value={formData.status} onChange={handleChange}>
                        {QC_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                     <Input id="reportDate" label="تاریخ گزارش" type="date" value={formData.reportDate} disabled />
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="notes" 
                        label="یادداشت‌ها و جزئیات تست" 
                        value={formData.notes} 
                        onChange={handleChange}
                        placeholder="در صورت وجود هرگونه عدم تطابق یا نکته خاص، در این بخش ثبت نمایید..."
                    />
                </div>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت گزارش QC</span>
                        <BadgeCheck size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};