import React, { useState } from 'react';
import type { WarehouseReservation } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Archive } from 'lucide-react';

interface WarehouseReservationFormProps {
  onSave: (data: { warehouseReservation: WarehouseReservation }) => void;
}

export const WarehouseReservationForm: React.FC<WarehouseReservationFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<WarehouseReservation, 'id'>>({
        reservationDate: new Date().toISOString().split('T')[0],
        itemName: '',
        quantity: 1,
        orderId: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: id === 'quantity' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReservation: WarehouseReservation = {
            ...formData,
            id: `RES-${Date.now()}`,
        };
        onSave({ warehouseReservation: newReservation });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم درخواست تخصیص یا رزرو موجودی انبار (3-4-2)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">رزرو کردن موجودی کالا در انبار برای یک سفارش یا پروژه مشخص.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="itemName" label="نام کالا/کد کالا جهت رزرو" value={formData.itemName} onChange={handleChange} required />
                    <Input id="quantity" label="تعداد/مقدار مورد نیاز" type="number" min="1" value={formData.quantity} onChange={handleChange} required />
                    <Input id="orderId" label="شماره سفارش/پروژه مرتبط" value={formData.orderId} onChange={handleChange} required />
                    <Input id="reservationDate" label="تاریخ رزرو" type="date" value={formData.reservationDate} onChange={handleChange} disabled />
                </div>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت درخواست رزرو</span>
                        <Archive size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};