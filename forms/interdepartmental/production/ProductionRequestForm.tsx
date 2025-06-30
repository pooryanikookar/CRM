import React, { useState } from 'react';
import type { ProductionRequest } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Factory } from 'lucide-react';

interface ProductionRequestFormProps {
  onSave: (data: { productionRequest: ProductionRequest }) => void;
  leadData: { salesOrderId?: string } | null;
}

export const ProductionRequestForm: React.FC<ProductionRequestFormProps> = ({ onSave, leadData }) => {
    const [formData, setFormData] = useState<Omit<ProductionRequest, 'id'>>({
        requestDate: new Date().toISOString().split('T')[0],
        productName: '',
        quantity: 1,
        orderId: leadData?.salesOrderId || '',
        deadline: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: id === 'quantity' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRequest: ProductionRequest = {
            ...formData,
            id: `PROD-${Date.now()}`,
        };
        onSave({ productionRequest: newRequest });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم درخواست تولید/آماده‌سازی کالا (3-4-1)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ارسال درخواست رسمی از فروش به واحد تولید جهت ساخت یا آماده‌سازی کالا.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="productName" label="نام محصول/کد کالا" value={formData.productName} onChange={handleChange} required />
                    <Input id="quantity" label="تعداد/مقدار مورد نیاز" type="number" min="1" value={formData.quantity} onChange={handleChange} required />
                    <Input id="orderId" label="شماره سفارش مرتبط" value={formData.orderId} onChange={handleChange} placeholder="در صورت وجود وارد کنید"/>
                    <Input id="deadline" label="تاریخ تحویل مورد انتظار" type="date" value={formData.deadline} onChange={handleChange} required />
                </div>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ارسال درخواست به تولید</span>
                        <Factory size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};