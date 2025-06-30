import React, { useState } from 'react';
import type { PromoItemDistribution } from '../../../types';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Gift } from 'lucide-react';

interface PromoItemDistributionFormProps {
  onSave: (data: { promoItemDistribution: PromoItemDistribution }) => void;
}

export const PromoItemDistributionForm: React.FC<PromoItemDistributionFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<PromoItemDistribution, 'id'>>({
        eventName: '',
        itemName: '',
        quantity: 1,
        recipientType: 'مشتریان',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: id === 'quantity' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newDistribution: PromoItemDistribution = {
            ...formData,
            id: `PROMO-${Date.now()}`,
        };
        onSave({ promoItemDistribution: newDistribution });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم گزارش توزیع اقلام تبلیغاتی (2-7)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">گزارش توزیع هدایا، بروشورها و سایر اقلام تبلیغاتی در رویدادها.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="eventName" label="نام رویداد/محل توزیع" value={formData.eventName} onChange={handleChange} required />
                    <Input id="itemName" label="نام قلم تبلیغاتی" value={formData.itemName} onChange={handleChange} required />
                    <Input id="quantity" label="تعداد توزیع شده" type="number" min="1" value={formData.quantity} onChange={handleChange} required />
                    <Input id="recipientType" label="نوع دریافت کننده" value={formData.recipientType} onChange={handleChange} placeholder="مثال: مشتریان، شرکا، بازدیدکنندگان عمومی" />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت گزارش</span>
                        <Gift size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};