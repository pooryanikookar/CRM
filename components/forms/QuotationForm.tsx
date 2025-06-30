import React, { useState, useEffect } from 'react';
import type { LeadData, QuoteItem } from '../../types';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ArrowLeft, PlusCircle, Trash2 } from 'lucide-react';
import { LeadSearch } from '../LeadSearch';

interface QuotationFormProps {
  onNextStep: (data: Partial<LeadData>) => void;
  leadData: LeadData | null;
  onLeadSelect: (lead: LeadData) => void;
}

export const QuotationForm: React.FC<QuotationFormProps> = ({ onNextStep, leadData, onLeadSelect }) => {
    const [quotationDate, setQuotationDate] = useState(leadData?.quotationDate || new Date().toISOString().split('T')[0]);
    const [items, setItems] = useState<QuoteItem[]>(leadData?.quoteItems || [
        { id: 'item-1', description: leadData?.areaOfNeed || '', quantity: 1, unitPrice: leadData?.announcedBudget || 0, total: leadData?.announcedBudget || 0 }
    ]);
    const [discount, setDiscount] = useState(leadData?.discount || 0);
    const [tax, setTax] = useState(leadData?.tax || 0);
    const [validityPeriod, setValidityPeriod] = useState(leadData?.validityPeriod || '15 روز');
    const [paymentTerms, setPaymentTerms] = useState(leadData?.paymentTerms || 'نقدی');
    const [deliveryTerms, setDeliveryTerms] = useState(leadData?.deliveryTerms || 'تحویل درب انبار');

    useEffect(() => {
        setQuotationDate(leadData?.quotationDate || new Date().toISOString().split('T')[0]);
        setItems(leadData?.quoteItems || [
            { id: 'item-1', description: leadData?.areaOfNeed || '', quantity: 1, unitPrice: leadData?.announcedBudget || 0, total: leadData?.announcedBudget || 0 }
        ]);
        setDiscount(leadData?.discount || 0);
        setTax(leadData?.tax || 0);
        setValidityPeriod(leadData?.validityPeriod || '15 روز');
        setPaymentTerms(leadData?.paymentTerms || 'نقدی');
        setDeliveryTerms(leadData?.deliveryTerms || 'تحویل درب انبار');
    }, [leadData]);


    const subTotal = items.reduce((acc, item) => acc + item.total, 0);
    const totalTax = (subTotal - discount) * (tax / 100);
    const totalPrice = subTotal - discount + totalTax;

    const handleItemChange = (index: number, field: keyof Omit<QuoteItem, 'id' | 'total'>, value: string | number) => {
        const newItems = [...items];
        const item = { ...newItems[index] };
        
        if (field === 'quantity' || field === 'unitPrice') {
            (item[field] as number) = Number(value) || 0;
        } else if (field === 'description') {
            item[field] = String(value);
        }

        item.total = item.quantity * item.unitPrice;
        newItems[index] = item;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { id: `item-${Date.now()}`, description: '', quantity: 1, unitPrice: 0, total: 0 }]);
    };

    const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const quotationData = {
            quotationId: leadData?.quotationId || `QT-${Date.now()}`,
            quotationDate,
            quoteItems: items,
            subTotal,
            discount,
            tax,
            totalPrice,
            validityPeriod,
            paymentTerms,
            deliveryTerms,
        };
        onNextStep(quotationData);
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم صدور پیش‌فاکتور (MKT-04)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ارائه پیشنهاد قیمت فنی و مالی به مشتری.</p>
            </div>

            <LeadSearch onLeadSelect={onLeadSelect} />

             <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border dark:border-gray-600">
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">خلاصه نیازسنجی</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">نام:</span> {leadData?.fullName || '---'}</div>
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">حوزه نیاز:</span> {leadData?.areaOfNeed || '---'}</div>
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">بودجه:</span> {leadData?.announcedBudget?.toLocaleString('fa-IR') || '---'}</div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 mb-6">
                   <Input id="quotationId" label="شماره پیش‌فاکتور" value={leadData?.quotationId || "در حال ایجاد..."} disabled/>
                   <Input id="customerName" label="نام مشتری" value={leadData?.fullName || ''} disabled/>
                   <Input id="quotationDate" label="تاریخ صدور" type="date" value={quotationDate} onChange={e => setQuotationDate(e.target.value)} required />
                </div>
                
                {/* Items Table */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">اقلام پیش‌فاکتور</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-right">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th className="p-2">شرح کالا/خدمت</th>
                                    <th className="p-2 w-24">تعداد</th>
                                    <th className="p-2 w-40">قیمت واحد (ریال)</th>
                                    <th className="p-2 w-40">جمع کل (ریال)</th>
                                    <th className="p-2 w-12"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={item.id} className="border-b dark:border-gray-700">
                                        <td className="p-1"><Input id={`desc-${index}`} label="" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} /></td>
                                        <td className="p-1"><Input id={`qty-${index}`} label="" type="number" min="1" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} /></td>
                                        <td className="p-1"><Input id={`price-${index}`} label="" type="number" value={item.unitPrice} onChange={e => handleItemChange(index, 'unitPrice', e.target.value)} /></td>
                                        <td className="p-2">{item.total.toLocaleString('fa-IR')}</td>
                                        <td className="p-1 text-center">
                                            {items.length > 1 && <Button type="button" variant="danger" size="sm" onClick={() => removeItem(index)}><Trash2 size={16}/></Button>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Button type="button" variant="ghost" className="mt-2" onClick={addItem}><PlusCircle size={16} className="ml-2"/> افزودن ردیف</Button>
                </div>

                {/* Totals */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 items-start">
                    <div className="col-span-2 md:col-span-2"></div>
                    <div className="col-span-2 md:col-span-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <span>جمع جزء (ریال):</span>
                            <span className="font-semibold">{subTotal.toLocaleString('fa-IR')}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                             <label htmlFor="discount">تخفیف (ریال):</label>
                            <Input id="discount" label="" type="number" className="max-w-[120px]" value={discount} onChange={e => setDiscount(Number(e.target.value))} />
                        </div>
                         <div className="flex justify-between items-center mb-2">
                             <label htmlFor="tax">مالیات (%):</label>
                            <Input id="tax" label="" type="number" className="max-w-[120px]" value={tax} onChange={e => setTax(Number(e.target.value))} />
                        </div>
                        <hr className="my-2 dark:border-gray-600"/>
                        <div className="flex justify-between items-center font-bold text-lg text-indigo-600 dark:text-indigo-400">
                            <span>مبلغ نهایی (ریال):</span>
                            <span>{totalPrice.toLocaleString('fa-IR')}</span>
                        </div>
                    </div>
                </div>
                
                 {/* Terms */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 mt-6">
                    <Input id="validityPeriod" label="مدت اعتبار پیشنهاد" value={validityPeriod} onChange={e => setValidityPeriod(e.target.value)} />
                    <Input id="paymentTerms" label="شرایط پرداخت" value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} />
                    <Input id="deliveryTerms" label="شرایط تحویل" value={deliveryTerms} onChange={e => setDeliveryTerms(e.target.value)} />
                </div>


                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ارسال پیشنهاد و رفتن به مرحله بعد</span>
                        <ArrowLeft size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};