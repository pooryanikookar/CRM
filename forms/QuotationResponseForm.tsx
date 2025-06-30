import React, { useState, useEffect } from 'react';
import type { LeadData } from '../../types';
import { Card } from '../ui/Card';
import { Input, Textarea } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { QUOTATION_RESPONSE_STATUSES } from '../../constants';
import { ArrowLeft, FileText } from 'lucide-react';
import { LeadSearch } from '../LeadSearch';

interface QuotationResponseFormProps {
  onNextStep: (data: Partial<LeadData>) => void;
  leadData: LeadData | null;
  onLeadSelect: (lead: LeadData) => void;
}

export const QuotationResponseForm: React.FC<QuotationResponseFormProps> = ({ onNextStep, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState({
        responseDate: leadData?.responseDate || new Date().toISOString().split('T')[0],
        quotationResponse: leadData?.quotationResponse || QUOTATION_RESPONSE_STATUSES[0],
        responseNotes: leadData?.responseNotes || '',
    });

    useEffect(() => {
        setFormData({
            responseDate: leadData?.responseDate || new Date().toISOString().split('T')[0],
            quotationResponse: leadData?.quotationResponse || QUOTATION_RESPONSE_STATUSES[0],
            responseNotes: leadData?.responseNotes || '',
        });
    }, [leadData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNextStep(formData);
    };

    const isRejection = formData.quotationResponse === 'رد کامل';

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ثبت پاسخ مشتری به پیش‌فاکتور (MKT-05)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت نتیجه مذاکره و بازخورد مشتری جهت تصمیم‌گیری در فرآیند بعدی.</p>
            </div>

            <LeadSearch onLeadSelect={onLeadSelect} />

            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border dark:border-gray-600">
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white flex items-center"><FileText className="ml-2" size={20}/>خلاصه پیش‌فاکتور</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">نام مشتری:</span> {leadData?.fullName || '---'}</div>
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">شناسه پیش‌فاکتور:</span> {leadData?.quotationId || '---'}</div>
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">تاریخ صدور:</span> {leadData?.quotationDate || '---'}</div>
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">مبلغ نهایی:</span> {leadData?.totalPrice?.toLocaleString('fa-IR') || '---'} ریال</div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
                    <Input id="responseDate" label="تاریخ دریافت پاسخ" type="date" value={formData.responseDate} onChange={handleChange} required />
                     <Select id="quotationResponse" label="وضعیت پاسخ مشتری" value={formData.quotationResponse} onChange={handleChange}>
                        {QUOTATION_RESPONSE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                    <Input id="reporter" label="ثبت‌کننده بازخورد" value="کارشناس فروش" disabled />
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="responseNotes" 
                        label={isRejection ? "توضیحات/دلایل مشتری (برای رد کامل الزامی است)" : "توضیحات/جزئیات مذاکره"} 
                        value={formData.responseNotes} 
                        onChange={handleChange}
                        required={isRejection}
                        placeholder={isRejection ? 'لطفاً علت رد شدن پیشنهاد را وارد کنید...' : 'جزئیات توافق یا موارد مورد نیاز برای اصلاح را وارد کنید...'}
                    />
                 </div>

                <div className="mt-6 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت پاسخ و ادامه فرآیند</span>
                        <ArrowLeft size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};