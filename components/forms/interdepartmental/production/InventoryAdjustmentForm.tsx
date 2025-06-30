import React, { useState } from 'react';
import type { InventoryAdjustment } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input, Textarea } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Select } from '../../../ui/Select';
import { SlidersHorizontal } from 'lucide-react';
import { INVENTORY_ADJUSTMENT_REASONS } from '../../../../constants';

interface InventoryAdjustmentFormProps {
  onSave: (data: { inventoryAdjustment: InventoryAdjustment }) => void;
}

export const InventoryAdjustmentForm: React.FC<InventoryAdjustmentFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<InventoryAdjustment, 'id'>>({
        adjustmentDate: new Date().toISOString().split('T')[0],
        itemCode: '',
        reason: INVENTORY_ADJUSTMENT_REASONS[0],
        quantityChange: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: id === 'quantityChange' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newAdjustment: InventoryAdjustment = {
            ...formData,
            id: `ADJ-${Date.now()}`,
        };
        onSave({ inventoryAdjustment: newAdjustment });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم درخواست اصلاح موجودی (3-4-6)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت ورود اقلام جدید یا اصلاح دستی موجودی کالا در انبار.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="itemCode" label="نام یا کد کالا" value={formData.itemCode} onChange={handleChange} required />
                     <Input id="quantityChange" label="تعداد تغییر (مثبت یا منفی)" type="number" value={formData.quantityChange} onChange={handleChange} required />
                    <Select id="reason" label="علت اصلاح" value={formData.reason} onChange={handleChange}>
                        {INVENTORY_ADJUSTMENT_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                    </Select>
                    <Input id="adjustmentDate" label="تاریخ اصلاح" type="date" value={formData.adjustmentDate} disabled />
                </div>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت اصلاحیه</span>
                        <SlidersHorizontal size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};