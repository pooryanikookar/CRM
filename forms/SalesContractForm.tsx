import React, { useState, useEffect } from 'react';
import type { LeadData } from '../../types';
import { Card } from '../ui/Card';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import { ArrowLeft, CheckCircle, FileSignature } from 'lucide-react';
import { LeadSearch } from '../LeadSearch';

interface SalesContractFormProps {
  onNextStep: (data: Partial<LeadData>) => void;
  leadData: LeadData | null;
  onLeadSelect: (lead: LeadData) => void;
}

export const SalesContractForm: React.FC<SalesContractFormProps> = ({ onNextStep, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState({
        contractDate: leadData?.contractDate || new Date().toISOString().split('T')[0],
        legalClauses: leadData?.legalClauses || 'طبق قوانین تجارت الکترونیک جمهوری اسلامی ایران.',
        contractFile: leadData?.contractFile || null,
        managerSignature: leadData?.managerSignature || '',
        customerSignature: leadData?.customerSignature || ''
    });

    useEffect(() => {
        setFormData({
             contractDate: leadData?.contractDate || new Date().toISOString().split('T')[0],
             legalClauses: leadData?.legalClauses || 'طبق قوانین تجارت الکترونیک جمهوری اسلامی ایران.',
             contractFile: leadData?.contractFile || null,
             managerSignature: leadData?.managerSignature || '',
             customerSignature: leadData?.customerSignature || ''
        });
    }, [leadData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]){
            setFormData(prev => ({...prev, contractFile: e.target.files?.[0] || null}))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const contractId = leadData?.contractId || `CTR-${Date.now()}`;
        onNextStep({ ...formData, contractId });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ثبت و صدور قرارداد فروش (MKT-07)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">رسمی‌سازی، مدیریت و پیگیری فرآیند صدور و امضای قرارداد فروش.</p>
            </div>

            <LeadSearch onLeadSelect={onLeadSelect} />

            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700">
                <h3 className="font-bold text-lg mb-2 text-green-800 dark:text-green-300 flex items-center"><CheckCircle className="ml-2" size={22}/>سفارش فروش تایید شده</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">نام مشتری:</span> {leadData?.fullName || '---'}</div>
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">شناسه سفارش:</span> {leadData?.salesOrderId || '---'}</div>
                     <div><span className="font-semibold text-gray-600 dark:text-gray-400">مبلغ نهایی:</span> {leadData?.totalPrice?.toLocaleString('fa-IR') || '---'} ریال</div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
                   <Input id="contractId" label="شماره قرارداد (سیستمی)" value={leadData?.contractId || "در حال ایجاد..."} disabled/>
                   <Input id="customerName" label="نام مشتری" value={leadData?.fullName || ''} disabled/>
                   <Input id="contractDate" label="تاریخ تنظیم قرارداد" type="date" value={formData.contractDate} onChange={handleChange} required />
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="legalClauses" 
                        label="مفاد کلیدی قرارداد (تحویل، گارانتی، جریمه‌ها)" 
                        value={formData.legalClauses} 
                        onChange={handleChange}
                        placeholder="مهم‌ترین بندهای حقوقی و تعهدات طرفین را وارد نمایید..."
                        rows={4}
                    />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 mt-4 items-end">
                     <Input 
                        id="contractFile" 
                        label="فایل قرارداد نهایی جهت امضا (PDF/Docx)" 
                        type="file" 
                        onChange={handleFileChange}
                     />
                     <Input 
                        id="customerSignature" 
                        label="امضای دیجیتال مشتری (نام کامل)" 
                        value={formData.customerSignature} 
                        onChange={handleChange} 
                        placeholder="جهت شبیه‌سازی امضا، نام کامل را وارد کنید"
                      />
                     <Input 
                        id="managerSignature" 
                        label="امضای دیجیتال مدیر فروش (نام کامل)" 
                        value={formData.managerSignature} 
                        onChange={handleChange} 
                        placeholder="نام کامل مدیر مربوطه را وارد کنید"
                     />
                 </div>

                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">پایان فرآیند فروش و ابلاغ نهایی</span>
                        <FileSignature size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};