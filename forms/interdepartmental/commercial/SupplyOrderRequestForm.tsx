import React, { useState } from 'react';
import type { SupplyOrderRequest } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { PackagePlus } from 'lucide-react';
import { SupplierSearch } from '../../../SupplierSearch';

interface SupplyOrderRequestFormProps {
  onSave: (data: { supplyOrderRequest: SupplyOrderRequest }) => void;
  selectedSupplier: string | null;
  onSupplierSelect: (supplierName: string) => void;
}

export const SupplyOrderRequestForm: React.FC<SupplyOrderRequestFormProps> = ({ onSave, selectedSupplier, onSupplierSelect }) => {
    const [formData, setFormData] = useState<Omit<SupplyOrderRequest, 'id' | 'supplier'>>({
        orderDate: new Date().toISOString().split('T')[0],
        itemName: '',
        quantity: 1,
        deliveryDate: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: id === 'quantity' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!selectedSupplier) {
            alert("لطفاً یک تامین‌کننده را انتخاب کنید.");
            return;
        }
        const newOrder: SupplyOrderRequest = {
            ...formData,
            id: `SOR-${Date.now()}`,
            supplier: selectedSupplier,
        };
        onSave({ supplyOrderRequest: newOrder });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ثبت سفارش تامین کالا (3-3-2)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ایجاد سفارش خرید رسمی برای تامین‌کننده منتخب.</p>
            </div>

            <SupplierSearch selectedSupplier={selectedSupplier} onSupplierSelect={onSupplierSelect} />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="itemName" label="نام کالا/خدمت" value={formData.itemName} onChange={handleChange} required />
                    <Input id="quantity" label="تعداد/مقدار" type="number" min="1" value={formData.quantity} onChange={handleChange} required />
                    <Input id="orderDate" label="تاریخ سفارش" type="date" value={formData.orderDate} onChange={handleChange} disabled />
                    <Input id="deliveryDate" label="تاریخ تحویل مورد انتظار" type="date" value={formData.deliveryDate} onChange={handleChange} required />
                </div>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!selectedSupplier}>
                        <span className="ml-2">ثبت سفارش و ارسال</span>
                        <PackagePlus size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};