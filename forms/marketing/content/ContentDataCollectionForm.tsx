import React, { useState, useEffect } from 'react';
import type { ContentDataCollection } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input, Textarea } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Database } from 'lucide-react';

interface ContentDataCollectionFormProps {
  onSave: (data: { contentDataCollection: ContentDataCollection }) => void;
  marketingData: { contentRequests: { id: string; topic: string }[] };
}

export const ContentDataCollectionForm: React.FC<ContentDataCollectionFormProps> = ({ onSave, marketingData }) => {
    const [formData, setFormData] = useState<Omit<ContentDataCollection, 'id' | 'fileUrl'>>({
        requestId: '',
        provider: '',
        dataSummary: '',
        sources: '',
    });
    
    useEffect(() => {
        if(marketingData?.contentRequests?.length > 0) {
            setFormData(prev => ({...prev, requestId: marketingData.contentRequests[marketingData.contentRequests.length - 1].id }))
        }
    }, [marketingData.contentRequests])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newData: ContentDataCollection = {
            ...formData,
            id: `CDC-${Date.now()}`,
        };
        onSave({ contentDataCollection: newData });
    };

    const currentRequest = marketingData.contentRequests.find(r => r.id === formData.requestId);

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم جمع‌آوری داده و اطلاعات خام برای تولید محتوا (11-1)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">دریافت و ثبت اطلاعات فنی، کاربردی و کلیدی از واحدهای مختلف سازمان.</p>
            </div>
            
             <div className="mb-4">
                  <label htmlFor="requestId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    درخواست مرتبط
                  </label>
                  <select
                    id="requestId"
                    value={formData.requestId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">یک درخواست را انتخاب کنید</option>
                    {marketingData.contentRequests.map(req => (
                        <option key={req.id} value={req.id}>{req.topic} ({req.id})</option>
                    ))}
                  </select>
            </div>
            {currentRequest && (
                 <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
                    موضوع انتخاب شده: <span className="font-semibold">{currentRequest.topic}</span>
                 </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="provider" label="نام ارائه‌دهنده داده" value={formData.provider} onChange={handleChange} required placeholder="نام فرد یا واحد" />
                     <Input id="contentFile" label="فایل ضمیمه (اختیاری)" type="file" />
                </div>
                
                <div className="mt-4">
                     <Textarea 
                        id="dataSummary" 
                        label="خلاصه داده‌ها و نکات کلیدی" 
                        value={formData.dataSummary} 
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="اطلاعات اصلی، آمار، مشخصات فنی و نکات مهم را اینجا وارد کنید."
                    />
                </div>
                <div className="mt-4">
                     <Textarea 
                        id="sources" 
                        label="منابع و مراجع" 
                        value={formData.sources} 
                        onChange={handleChange}
                        placeholder="لینک‌ها، اسناد مرجع یا نام افراد مطلع را وارد کنید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!formData.requestId}>
                        <span className="ml-2">ارسال داده برای بازبینی</span>
                        <Database size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};