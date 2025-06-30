import React, { useState } from 'react';
import type { DiscrepancyReport } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input, Textarea } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Select } from '../../../ui/Select';
import { AlertTriangle } from 'lucide-react';
import { DISCREPANCY_TYPES } from '../../../../constants';

interface DiscrepancyReportFormProps {
  onSave: (data: { discrepancyReport: DiscrepancyReport }) => void;
}

export const DiscrepancyReportForm: React.FC<DiscrepancyReportFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<DiscrepancyReport, 'id'>>({
        reportDate: new Date().toISOString().split('T')[0],
        itemCode: '',
        discrepancyType: 'کسری',
        quantity: 1,
        notes: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: id === 'quantity' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReport: DiscrepancyReport = {
            ...formData,
            id: `DISC-${Date.now()}`,
        };
        onSave({ discrepancyReport: newReport });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم گزارش مغایرت یا خسارت کالای انبار (3-4-5)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت هرگونه مغایرت تعدادی، آسیب‌دیدگی یا اشتباه در کالاهای موجود در انبار.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="itemCode" label="نام یا کد کالای دارای مغایرت" value={formData.itemCode} onChange={handleChange} required />
                    <Select id="discrepancyType" label="نوع مغایرت" value={formData.discrepancyType} onChange={handleChange}>
                        {DISCREPANCY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </Select>
                     <Input id="quantity" label="تعداد/مقدار مغایرت" type="number" value={formData.quantity} onChange={handleChange} required />
                     <Input id="reportDate" label="تاریخ گزارش" type="date" value={formData.reportDate} disabled />
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="notes" 
                        label="جزئیات و شواهد" 
                        value={formData.notes} 
                        onChange={handleChange}
                        placeholder="شرح دقیق حادثه، شماره سریال، عکس‌های مربوطه و..."
                    />
                </div>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit" variant="danger">
                        <span className="ml-2">ثبت گزارش</span>
                        <AlertTriangle size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};