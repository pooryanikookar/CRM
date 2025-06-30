import React, { useState } from 'react';
import type { ReleaseRequest } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Truck } from 'lucide-react';

interface ReleaseRequestFormProps {
  onSave: (data: { releaseRequest: ReleaseRequest }) => void;
}

export const ReleaseRequestForm: React.FC<ReleaseRequestFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<ReleaseRequest, 'id' | 'items'>>({
        requestDate: new Date().toISOString().split('T')[0],
        orderId: '',
        destination: '',
    });
     const [items, setItems] = useState([{ name: '', quantity: 1 }]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleItemChange = (index: number, field: 'name' | 'quantity', value: string) => {
        const newItems = [...items];
        (newItems[index] as any)[field] = field === 'quantity' ? Number(value) : value;
        setItems(newItems);
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRequest: ReleaseRequest = {
            ...formData,
            id: `REL-${Date.now()}`,
            items,
        };
        onSave({ releaseRequest: newRequest });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم درخواست خروج یا تحویل کالا از انبار (3-4-4)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">صدور دستور رسمی (حواله) برای خروج کالا از انبار جهت تحویل به مشتری.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="orderId" label="شماره سفارش مرتبط" value={formData.orderId} onChange={handleChange} required />
                    <Input id="destination" label="مقصد تحویل" value={formData.destination} onChange={handleChange} required placeholder="نام مشتری یا آدرس" />
                </div>
                 <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">اقلام درخواستی</h3>
                    {items.map((item, index) => (
                        <div key={index} className="flex gap-4 mb-2">
                             <Input id={`itemName-${index}`} label="" placeholder="نام کالا" value={item.name} onChange={e => handleItemChange(index, 'name', e.target.value)} />
                             <Input id={`itemQty-${index}`} label="" placeholder="تعداد" type="number" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} />
                        </div>
                    ))}
                 </div>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">صدور حواله خروج</span>
                        <Truck size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};