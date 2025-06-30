import React, { useState } from 'react';
import type { B2COrder } from '../../../types';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { User, PlusCircle, Trash2 } from 'lucide-react';
import { B2C_ORDER_STATUSES } from '../../../constants';

interface B2COrderFormProps {
  onSave: (data: { b2cOrder: B2COrder }) => void;
}

export const B2COrderForm: React.FC<B2COrderFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<B2COrder, 'id' | 'items' | 'totalAmount'>>({
        orderDate: new Date().toISOString().split('T')[0],
        customerId: '',
        status: B2C_ORDER_STATUSES[0],
    });
    const [items, setItems] = useState([{ product: '', quantity: 1, price: 0 }]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleItemChange = (index: number, field: 'product' | 'quantity' | 'price', value: string) => {
        const newItems = [...items];
        (newItems[index] as any)[field] = (field === 'product') ? value : Number(value);
        setItems(newItems);
    };
    
    const addItem = () => setItems(prev => [...prev, { product: '', quantity: 1, price: 0 }]);
    const removeItem = (index: number) => setItems(prev => prev.filter((_, i) => i !== index));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        const newOrder: B2COrder = {
            ...formData,
            id: `B2C-ORD-${Date.now()}`,
            items,
            totalAmount,
        };
        onSave({ b2cOrder: newOrder });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ثبت درخواست خرید اینترنتی/خرد (B2C) (8-3)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت و پیگیری سفارشات خرده‌فروشی از کانال‌های آنلاین یا فروش مستقیم.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="customerId" label="شناسه مشتری/ایمیل" value={formData.customerId} onChange={handleChange} required />
                    <Select id="status" label="وضعیت سفارش" value={formData.status} onChange={handleChange}>
                        {B2C_ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                </div>
                 <div className="mt-6 space-y-4">
                     <h3 className="text-lg font-semibold text-gray-800 dark:text-white">اقلام سفارش</h3>
                    {items.map((item, index) => (
                         <div key={index} className="grid grid-cols-1 md:grid-cols-8 gap-4 items-end">
                           <div className="md:col-span-4"><Input label="" placeholder="نام محصول/کد" id={`product-${index}`} value={item.product} onChange={e => handleItemChange(index, 'product', e.target.value)} /></div>
                           <div className="md:col-span-2"><Input label="" placeholder="تعداد" type="number" id={`quantity-${index}`} value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} /></div>
                           <div className="md:col-span-2"><Input label="" placeholder="قیمت واحد" type="number" id={`price-${index}`} value={item.price} onChange={e => handleItemChange(index, 'price', e.target.value)} /></div>
                           <div className="md:col-span-1">{items.length > 1 && <Button type="button" variant="danger" size="sm" onClick={() => removeItem(index)}><Trash2 size={16}/></Button>}</div>
                        </div>
                    ))}
                    <Button type="button" variant="ghost" onClick={addItem}><PlusCircle size={16} className="ml-2"/>افزودن ردیف</Button>
                </div>
                <div className="mt-8 flex justify-end">
                    <Button type="submit"><span className="ml-2">ثبت سفارش</span><User size={18} /></Button>
                </div>
            </form>
        </Card>
    );
};
