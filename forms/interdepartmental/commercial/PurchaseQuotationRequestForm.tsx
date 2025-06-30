import React, { useState } from 'react';
import type { PurchaseQuotationRequest } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Select } from '../../../ui/Select';
import { ShoppingCart } from 'lucide-react';
import { SupplierSearch } from '../../../SupplierSearch';
import { EMPLOYEE_LIST } from '../../../../constants';

interface PurchaseQuotationRequestFormProps {
  onSave: (data: { purchaseQuotationRequest: PurchaseQuotationRequest }) => void;
  selectedSupplier: string | null;
  onSupplierSelect: (supplierName: string) => void;
}

export const PurchaseQuotationRequestForm: React.FC<PurchaseQuotationRequestFormProps> = ({ onSave, selectedSupplier, onSupplierSelect }) => {
    const [formData, setFormData] = useState<Omit<PurchaseQuotationRequest, 'id' | 'supplier'>>({
        itemName: '',
        deadline: new Date().toISOString().split('T')[0],
        requester: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!selectedSupplier) {
            alert("لطفاً یک تامین‌کننده را انتخاب کنید.");
            return;
        }
        const newRequest: PurchaseQuotationRequest = {
            ...formData,
            id: `PQR-${Date.now()}`,
            supplier: selectedSupplier,
        };
        onSave({ purchaseQuotationRequest: newRequest });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم درخواست استعلام قیمت خرید (3-3-1)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ارسال درخواست رسمی به دپارتمان خرید برای استعلام قیمت از تامین‌کنندگان.</p>
            </div>

            <SupplierSearch selectedSupplier={selectedSupplier} onSupplierSelect={onSupplierSelect} />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="itemName" label="نام کالا/خدمت مورد نیاز" value={formData.itemName} onChange={handleChange} required />
                    <Input id="deadline" label="مهلت دریافت پیشنهاد" type="date" value={formData.deadline} onChange={handleChange} required />
                    <Select id="requester" label="واحد درخواست‌دهنده" value={formData.requester} onChange={handleChange}>
                      <option value="">انتخاب کنید</option>
                      {EMPLOYEE_LIST.map(e => <option key={e} value={e}>{e}</option>)}
                    </Select>
                </div>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!selectedSupplier}>
                        <span className="ml-2">ارسال درخواست</span>
                        <ShoppingCart size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};