import React, { useState } from 'react';
import type { CommissionReport } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Select } from '../../../ui/Select';
import { Calculator } from 'lucide-react';
import { EmployeeSearch } from '../../../EmployeeSearch';
import { COMMISSION_STATUSES } from '../../../../constants';

interface CommissionReportFormProps {
  onSave: (data: { commissionReport: CommissionReport }) => void;
  selectedEmployee: string | null;
  onEmployeeSelect: (name: string) => void;
}

export const CommissionReportForm: React.FC<CommissionReportFormProps> = ({ onSave, selectedEmployee, onEmployeeSelect }) => {
    const [formData, setFormData] = useState<Omit<CommissionReport, 'id' | 'salespersonName'>>({
        reportPeriod: '',
        totalSales: 0,
        commissionRate: 0,
        commissionAmount: 0,
        status: COMMISSION_STATUSES[0],
    });

    React.useEffect(() => {
      const { totalSales, commissionRate } = formData;
      const amount = (totalSales * commissionRate) / 100;
      setFormData(prev => ({...prev, commissionAmount: amount}));
    }, [formData.totalSales, formData.commissionRate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        const isNumeric = ['totalSales', 'commissionRate'].includes(id);
        setFormData((prev) => ({ ...prev, [id]: isNumeric ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!selectedEmployee) {
            alert("لطفاً یک فروشنده را انتخاب کنید.");
            return;
        }
        const newReport: CommissionReport = {
            ...formData,
            id: `COMM-${Date.now()}`,
            salespersonName: selectedEmployee,
        };
        onSave({ commissionReport: newReport });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم گزارش کمیسیون/پورسانت (3-1-6)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">محاسبه، ثبت و تایید عملکرد کمیسیونی پرسنل فروش و نمایندگان.</p>
            </div>

            <EmployeeSearch selectedEmployee={selectedEmployee} onEmployeeSelect={onEmployeeSelect} />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="reportPeriod" label="دوره گزارش (مثلا: بهار ۱۴۰۴)" value={formData.reportPeriod} onChange={handleChange} required />
                    <Input id="totalSales" label="مبلغ پایه فروش (ریال)" type="number" value={formData.totalSales} onChange={handleChange} required />
                    <Input id="commissionRate" label="درصد کمیسیون (%)" type="number" value={formData.commissionRate} onChange={handleChange} required />
                    <Input id="commissionAmount" label="مبلغ کمیسیون محاسبه‌شده (ریال)" type="number" value={formData.commissionAmount} disabled />
                    <Select id="status" label="وضعیت تایید کمیسیون" value={formData.status} onChange={handleChange}>
                        {COMMISSION_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                </div>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!selectedEmployee}>
                        <span className="ml-2">ثبت گزارش و ارجاع به مالی</span>
                        <Calculator size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
