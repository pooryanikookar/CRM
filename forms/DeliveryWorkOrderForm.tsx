import React, { useState, useEffect } from 'react';
import type { LeadData } from '../../types';
import { Card } from '../ui/Card';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import { ArrowLeft, CheckCircle, Truck } from 'lucide-react';
import { LeadSearch } from '../LeadSearch';

interface DeliveryWorkOrderFormProps {
  onNextStep: (data: Partial<LeadData>) => void;
  leadData: LeadData | null;
  onLeadSelect: (lead: LeadData) => void;
}

export const DeliveryWorkOrderForm: React.FC<DeliveryWorkOrderFormProps> = ({ onNextStep, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState({
        deliveryDate: leadData?.deliveryDate || new Date().toISOString().split('T')[0],
        deliveryAddress: leadData?.deliveryAddress || leadData?.fullAddress || '',
        deliveryTermsDetails: leadData?.deliveryTermsDetails || leadData?.finalDeliveryTerms || ''
    });

    useEffect(() => {
        setFormData({
            deliveryDate: leadData?.deliveryDate || new Date().toISOString().split('T')[0],
            deliveryAddress: leadData?.deliveryAddress || leadData?.fullAddress || '',
            deliveryTermsDetails: leadData?.deliveryTermsDetails || leadData?.finalDeliveryTerms || ''
        });
    }, [leadData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const deliveryOrderId = leadData?.deliveryOrderId || `DO-${Date.now()}`;
        onNextStep({ ...formData, deliveryOrderId });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم دستور تحویل کالا/خدمت (MKT-08)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">صدور دستور رسمی برای تحویل، ارسال یا انجام خدمت بر اساس قرارداد.</p>
            </div>

            <LeadSearch onLeadSelect={onLeadSelect} />

            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                <h3 className="font-bold text-lg mb-2 text-blue-800 dark:text-blue-300 flex items-center"><CheckCircle className="ml-2" size={22}/>خلاصه قرارداد نهایی</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">نام مشتری:</span> {leadData?.fullName || '---'}</div>
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">شناسه قرارداد:</span> {leadData?.contractId || '---'}</div>
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">تاریخ قرارداد:</span> {leadData?.contractDate || '---'}</div>
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">مبلغ:</span> {leadData?.totalPrice?.toLocaleString('fa-IR') || '---'} ریال</div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                   <Input id="deliveryOrderId" label="شماره دستور تحویل (سیستمی)" value={leadData?.deliveryOrderId || "در حال ایجاد..."} disabled/>
                   <Input id="deliveryDate" label="تاریخ تحویل برنامه‌ریزی شده" type="date" value={formData.deliveryDate} onChange={handleChange} required />
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="deliveryAddress" 
                        label="آدرس کامل و دقیق محل تحویل" 
                        value={formData.deliveryAddress} 
                        onChange={handleChange}
                        required
                        placeholder="آدرس دقیق را جهت هماهنگی لجستیک وارد نمایید..."
                    />
                 </div>
                 <div className="mt-4">
                    <Textarea 
                        id="deliveryTermsDetails" 
                        label="شرایط و جزئیات تحویل" 
                        value={formData.deliveryTermsDetails} 
                        onChange={handleChange}
                        placeholder="نکات خاص مانند نیاز به هماهنگی قبلی، تحویل در طبقه خاص، و..."
                    />
                 </div>

                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">صدور دستور و ابلاغ به واحد عملیات</span>
                        <Truck size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
