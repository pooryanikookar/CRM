
import React, { useState } from 'react';
import type { SalesPeriodicReport } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { PieChart } from 'lucide-react';
import { REPORT_PERIODS } from '../../../constants';

interface SalesPeriodicReportFormProps {
  onSave: (data: { salesPeriodicReport: SalesPeriodicReport }) => void;
}

export const SalesPeriodicReportForm: React.FC<SalesPeriodicReportFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<SalesPeriodicReport, 'id'>>({
        period: REPORT_PERIODS[0],
        totalSales: 0,
        topCustomers: '',
        analysis: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: id === 'totalSales' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReport: SalesPeriodicReport = {
            ...formData,
            id: `SPR-${Date.now()}`,
        };
        onSave({ salesPeriodicReport: newReport });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم گزارش فروش دوره‌ای (1-17)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">تهیه و تحلیل گزارش عملکرد فروش به صورت ماهانه، فصلی یا سالانه.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Select id="period" label="دوره گزارش" value={formData.period} onChange={handleChange}>
                        {REPORT_PERIODS.map(p => <option key={p} value={p}>{p}</option>)}
                    </Select>
                    <Input id="totalSales" label="جمع کل فروش (ریال)" type="number" value={formData.totalSales} onChange={handleChange} required />
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="topCustomers" 
                        label="مشتریان برتر یا محصولات پرفروش" 
                        value={formData.topCustomers} 
                        onChange={handleChange}
                        placeholder="نام مشتریان یا محصولاتی که بیشترین سهم را در فروش داشته‌اند، لیست کنید."
                    />
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="analysis" 
                        label="تحلیل کیفی و کمی (نقاط قوت و ضعف)" 
                        value={formData.analysis} 
                        onChange={handleChange}
                        required
                        placeholder="دلایل رشد یا افت فروش، فرصت‌ها و تهدیدهای مشاهده شده را تحلیل کنید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت گزارش و ارسال به مدیریت</span>
                        <PieChart size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
