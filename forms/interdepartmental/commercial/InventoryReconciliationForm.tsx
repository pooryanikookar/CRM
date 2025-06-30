import React, { useState } from 'react';
import type { InventoryReconciliation } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input, Textarea } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Scale } from 'lucide-react';

interface InventoryReconciliationFormProps {
  onSave: (data: { inventoryReconciliation: InventoryReconciliation }) => void;
}

export const InventoryReconciliationForm: React.FC<InventoryReconciliationFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<InventoryReconciliation, 'id'>>({
        reportDate: new Date().toISOString().split('T')[0],
        itemCode: '',
        systemQuantity: 0,
        physicalQuantity: 0,
        discrepancyReason: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const isNumeric = ['systemQuantity', 'physicalQuantity'].includes(id);
        setFormData((prev) => ({ ...prev, [id]: isNumeric ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReport: InventoryReconciliation = {
            ...formData,
            id: `REC-${Date.now()}`,
        };
        onSave({ inventoryReconciliation: newReport });
    };

    const discrepancy = formData.physicalQuantity - formData.systemQuantity;

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم گزارش تطبیق موجودی و تامین (3-3-3)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">مقایسه موجودی فیزیکی انبار با سوابق سیستمی و ثبت مغایرت‌ها.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="itemCode" label="کد کالا" value={formData.itemCode} onChange={handleChange} required />
                    <Input id="reportDate" label="تاریخ گزارش" type="date" value={formData.reportDate} disabled />
                    <Input id="systemQuantity" label="موجودی سیستم" type="number" value={formData.systemQuantity} onChange={handleChange} required />
                    <Input id="physicalQuantity" label="موجودی شمارش شده" type="number" value={formData.physicalQuantity} onChange={handleChange} required />
                </div>
                 <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                     <span className="font-semibold">میزان مغایرت: </span>
                     <span className={discrepancy === 0 ? 'text-green-600' : 'text-red-600'}>{discrepancy}</span>
                </div>
                <div className="mt-4">
                     <Textarea id="discrepancyReason" label="شرح علت مغایرت" value={formData.discrepancyReason} onChange={handleChange} placeholder="مثال: خطای ثبت، آسیب‌دیدگی، سرقت..." />
                </div>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت گزارش</span>
                        <Scale size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};