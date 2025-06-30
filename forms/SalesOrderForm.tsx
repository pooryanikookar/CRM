import React, { useState, useEffect } from 'react';
import type { LeadData } from '../../types';
import { Card } from '../ui/Card';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { LeadSearch } from '../LeadSearch';

interface SalesOrderFormProps {
  onNextStep: (data: Partial<LeadData>) => void;
  leadData: LeadData | null;
  onLeadSelect: (lead: LeadData) => void;
}

export const SalesOrderForm: React.FC<SalesOrderFormProps> = ({ onNextStep, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState({
        orderDate: leadData?.orderDate || new Date().toISOString().split('T')[0],
        finalPaymentTerms: leadData?.finalPaymentTerms || leadData?.paymentTerms || 'نقدی',
        finalDeliveryTerms: leadData?.finalDeliveryTerms || leadData?.deliveryTerms || 'تحویل درب انبار',
        contractNotes: leadData?.contractNotes || ''
    });

    useEffect(() => {
        setFormData({
            orderDate: leadData?.orderDate || new Date().toISOString().split('T')[0],
            finalPaymentTerms: leadData?.finalPaymentTerms || leadData?.paymentTerms || 'نقدی',
            finalDeliveryTerms: leadData?.finalDeliveryTerms || leadData?.deliveryTerms || 'تحویل درب انبار',
            contractNotes: leadData?.contractNotes || ''
        });
    }, [leadData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const salesOrderId = leadData?.salesOrderId || `SO-${Date.now()}`;
        onNextStep({ ...formData, salesOrderId });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ثبت سفارش فروش / درخواست قرارداد (MKT-06)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">جمع‌آوری و ثبت رسمی اطلاعات سفارش پذیرفته‌شده جهت آغاز فرآیند صدور قرارداد.</p>
            </div>

            <LeadSearch onLeadSelect={onLeadSelect} />

            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700">
                <h3 className="font-bold text-lg mb-2 text-green-800 dark:text-green-300 flex items-center"><CheckCircle className="ml-2" size={22}/>پیش‌فاکتور تایید شده</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">نام مشتری:</span> {leadData?.fullName || '---'}</div>
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">شناسه پیش‌فاکتور:</span> {leadData?.quotationId || '---'}</div>
                     <div><span className="font-semibold text-gray-600 dark:text-gray-400">مبلغ نهایی:</span> {leadData?.totalPrice?.toLocaleString('fa-IR') || '---'} ریال</div>
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">پاسخ مشتری:</span> <span className="text-green-600 dark:text-green-400 font-semibold">{leadData?.quotationResponse}</span></div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
                   <Input id="salesOrderId" label="شماره سفارش فروش" value={leadData?.salesOrderId || "در حال ایجاد..."} disabled/>
                   <Input id="customerName" label="نام مشتری" value={leadData?.fullName || ''} disabled/>
                   <Input id="orderDate" label="تاریخ ثبت سفارش" type="date" value={formData.orderDate} onChange={handleChange} required />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-4">
                    <Input id="finalPaymentTerms" label="شرایط پرداخت نهایی" value={formData.finalPaymentTerms} onChange={handleChange} />
                    <Input id="finalDeliveryTerms" label="مدت و شرایط تحویل نهایی" value={formData.finalDeliveryTerms} onChange={handleChange} />
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="contractNotes" 
                        label="اظهارنظر و نکات قرارداد" 
                        value={formData.contractNotes} 
                        onChange={handleChange}
                        placeholder="نکات مهم حقوقی، فنی یا مالی جهت درج در قرارداد را وارد نمایید..."
                    />
                 </div>

                <div className="mt-6 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت نهایی و ارجاع به واحد حقوقی</span>
                        <ArrowLeft size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};