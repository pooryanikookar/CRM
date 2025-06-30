
import React, { useState } from 'react';
import type { StoreInventoryCheck } from '../../../types';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { ClipboardCheck, PlusCircle, Trash2 } from 'lucide-react';
import { SALE_BRANCHES } from '../../../constants';

interface StoreInventoryCheckFormProps {
  onSave: (data: { storeInventoryCheck: StoreInventoryCheck }) => void;
}

export const StoreInventoryCheckForm: React.FC<StoreInventoryCheckFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<StoreInventoryCheck, 'id' | 'checkedItems'>>({
        checkDate: new Date().toISOString().split('T')[0],
        branchName: SALE_BRANCHES[0],
    });
    const [items, setItems] = useState([{ itemName: '', systemQty: 0, physicalQty: 0 }]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

     const handleItemChange = (index: number, field: 'itemName' | 'systemQty' | 'physicalQty', value: string) => {
        const newItems = [...items];
        (newItems[index] as any)[field] = (field === 'itemName') ? value : Number(value);
        setItems(newItems);
    };

    const addItem = () => {
        setItems(prev => [...prev, { itemName: '', systemQty: 0, physicalQty: 0 }]);
    };

    const removeItem = (index: number) => {
        setItems(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newCheck: StoreInventoryCheck = {
            ...formData,
            id: `SIC-${Date.now()}`,
            checkedItems: items,
        };
        onSave({ storeInventoryCheck: newCheck });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم کنترل موجودی در نقطه فروش (2-11)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">بررسی و ثبت موجودی فیزیکی کالا در فروشگاه‌ها و شعب.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Select id="branchName" label="شعبه/نقطه فروش" value={formData.branchName} onChange={handleChange}>
                        {SALE_BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                    </Select>
                    <Input id="checkDate" label="تاریخ کنترل" type="date" value={formData.checkDate} onChange={handleChange} required />
                </div>
                
                <div className="mt-6 space-y-4">
                     <h3 className="text-lg font-semibold text-gray-800 dark:text-white">اقلام شمارش شده</h3>
                    {items.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-8 gap-4 items-end">
                           <div className="md:col-span-3">
                             <Input label="نام کالا" id={`itemName-${index}`} value={item.itemName} onChange={e => handleItemChange(index, 'itemName', e.target.value)} />
                           </div>
                           <div className="md:col-span-2">
                            <Input label="موجودی سیستم" type="number" id={`systemQty-${index}`} value={item.systemQty} onChange={e => handleItemChange(index, 'systemQty', e.target.value)} />
                           </div>
                           <div className="md:col-span-2">
                             <Input label="موجودی فیزیکی" type="number" id={`physicalQty-${index}`} value={item.physicalQty} onChange={e => handleItemChange(index, 'physicalQty', e.target.value)} />
                            </div>
                           <div className="md:col-span-1">
                             {items.length > 1 && <Button type="button" variant="danger" size="sm" onClick={() => removeItem(index)}><Trash2 size={16}/></Button>}
                           </div>
                        </div>
                    ))}
                    <Button type="button" variant="ghost" onClick={addItem}><PlusCircle size={16} className="ml-2"/>افزودن کالا</Button>
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت گزارش کنترل موجودی</span>
                        <ClipboardCheck size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
