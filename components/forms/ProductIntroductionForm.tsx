import React, { useState } from 'react';
import type { LeadData, ProductIntroduction } from '../../types';
import { Card } from '../ui/Card';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import { FileStack } from 'lucide-react';
import { LeadSearch } from '../LeadSearch';

interface ProductIntroductionFormProps {
  onNextStep: (data: Partial<LeadData>) => void;
  leadData: LeadData | null;
  onLeadSelect: (lead: LeadData) => void;
}

const defaultFormData: Omit<ProductIntroduction, 'id' | 'date' | 'fileUrl'> = {
    productName: '',
    notes: '',
};

export const ProductIntroductionForm: React.FC<ProductIntroductionFormProps> = ({ onNextStep, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState(defaultFormData);
    const [fileName, setFileName] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('');
        }
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!leadData) {
            alert("لطفاً ابتدا یک مشتری را جستجو و انتخاب کنید.");
            return;
        }
        const newIntroduction: ProductIntroduction = {
            ...formData,
            id: `PROD-INTRO-${Date.now()}`,
            date: new Date().toISOString(),
            fileUrl: fileName || undefined,
        };
        onNextStep({ productIntroductions: [newIntroduction] });
        setFormData(defaultFormData);
        setFileName('');
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم معرفی محصول/ارسال کاتالوگ (1-7)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت ارسال کاتالوگ، بروشور یا اطلاعات محصول به مشتری.</p>
            </div>

            <LeadSearch onLeadSelect={onLeadSelect} />
            
            {leadData && (
                 <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border dark:border-gray-600">
                    <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">مشتری انتخاب‌شده</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div><span className="font-semibold text-gray-600 dark:text-gray-400">نام:</span> {leadData.fullName}</div>
                        <div><span className="font-semibold text-gray-600 dark:text-gray-400">شناسه:</span> {leadData.potentialCustomerId || leadData.leadId}</div>
                    </div>
                 </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="productName" label="نام محصول/کاتالوگ" value={formData.productName} onChange={handleChange} placeholder="مثال: کاتالوگ جامع محصولات بهار ۱۴۰۳" required />
                    <Input id="catalogFile" label="فایل ضمیمه (کاتالوگ، بروشور...)" type="file" onChange={handleFileChange} />
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="notes" 
                        label="یادداشت‌های تکمیلی" 
                        value={formData.notes} 
                        onChange={handleChange}
                        placeholder="نکات مهم در مورد این معرفی یا فایل ارسالی را ثبت کنید..."
                    />
                 </div>
                 
                <div className="mt-6 flex justify-end">
                    <Button type="submit" disabled={!leadData}>
                        <span className="ml-2">ثبت و تولید اعلان</span>
                        <FileStack size={18} />
                    </Button>
                </div>
            </form>
            
            {leadData?.productIntroductions && leadData.productIntroductions.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">تاریخچه معرفی محصولات</h3>
                    <div className="space-y-4">
                        {[...leadData.productIntroductions].reverse().map(intro => (
                            <div key={intro.id} className="p-4 border dark:border-gray-700 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-bold text-gray-800 dark:text-white">{intro.productName}</p>
                                    <span className="text-xs">{new Date(intro.date).toLocaleString('fa-IR')}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 whitespace-pre-wrap">{intro.notes}</p>
                                {intro.fileUrl && <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">فایل ضمیمه شده: {intro.fileUrl}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
};