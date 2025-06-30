import React, { useState } from 'react';
import type { ReturnedGoods } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input, Textarea } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { ArrowLeftRight } from 'lucide-react';
import { SupplierSearch } from '../../../SupplierSearch';

interface ReturnedGoodsFormProps {
  onSave: (data: { returnedGoods: ReturnedGoods }) => void;
  selectedSupplier: string | null;
  onSupplierSelect: (supplierName: string) => void;
}

export const ReturnedGoodsForm: React.FC<ReturnedGoodsFormProps> = ({ onSave, selectedSupplier, onSupplierSelect }) => {
    const [formData, setFormData] = useState<Omit<ReturnedGoods, 'id' | 'supplier'>>({
        returnDate: new Date().toISOString().split('T')[0],
        itemName: '',
        quantity: 1,
        reason: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: id === 'quantity' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!selectedSupplier) {
            alert("لطفاً یک تامین‌کننده را انتخاب کنید.");
            return;
        }
        const newReturn: ReturnedGoods = {
            ...formData,
            id: `RG-${Date.now()}`,
            supplier: selectedSupplier,
        };
        onSave({ returnedGoods: newReturn });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم برگشت یا اصلاح کالای تامین‌شده (3-3-5)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">مدیریت فرآیند مرجوعی کالا به تامین‌کننده به دلیل نقص یا مغایرت.</p>
            </div>

            <SupplierSearch selectedSupplier={selectedSupplier} onSupplierSelect={onSupplierSelect} />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="itemName" label="نام کالا/کد کالا" value={formData.itemName} onChange={handleChange} required />
                    <Input id="quantity" label="تعداد/مقدار مرجوعی" type="number" min="1" value={formData.quantity} onChange={handleChange} required />
                    <Input id="returnDate" label="تاریخ برگشت" type="date" value={formData.returnDate} onChange={handleChange} disabled />
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="reason" 
                        label="علت برگشت" 
                        value={formData.reason} 
                        onChange={handleChange}
                        placeholder="دلیل دقیق برگشت کالا را شرح دهید (مثال: آسیب فیزیکی، مغایرت فنی...)."
                        required
                    />
                </div>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!selectedSupplier}>
                        <span className="ml-2">ثبت درخواست برگشت</span>
                        <ArrowLeftRight size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};