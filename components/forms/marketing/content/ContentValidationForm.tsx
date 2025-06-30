import React, { useState, useEffect } from 'react';
import type { ContentValidation } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Textarea } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Select } from '../../../ui/Select';
import { ShieldCheck } from 'lucide-react';
import { VALIDATION_STATUSES, EMPLOYEE_LIST } from '../../../../constants';

interface ContentValidationFormProps {
  onSave: (data: { contentValidation: ContentValidation }) => void;
  marketingData: { contentDataCollections: { id: string; dataSummary: string }[] };
}

export const ContentValidationForm: React.FC<ContentValidationFormProps> = ({ onSave, marketingData }) => {
    const [formData, setFormData] = useState<Omit<ContentValidation, 'id'>>({
        collectionId: '',
        validator: '',
        status: 'تایید نهایی',
        comments: '',
    });
    
    useEffect(() => {
        if(marketingData?.contentDataCollections?.length > 0) {
            setFormData(prev => ({...prev, collectionId: marketingData.contentDataCollections[marketingData.contentDataCollections.length - 1].id }))
        }
    }, [marketingData.contentDataCollections])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newValidation: ContentValidation = {
            ...formData,
            id: `CV-${Date.now()}`,
        };
        onSave({ contentValidation: newValidation });
    };
    
    const currentCollection = marketingData.contentDataCollections.find(c => c.id === formData.collectionId);

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم بررسی، تایید و نهایی‌سازی داده محتوا (12-1)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">تایید نهایی صحت و کامل بودن داده‌ها قبل از ارسال برای تیم تولید محتوا.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <div className="mb-4">
                      <label htmlFor="collectionId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        داده جمع‌آوری شده مرتبط
                      </label>
                      <select
                        id="collectionId"
                        value={formData.collectionId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="">انتخاب کنید...</option>
                        {marketingData.contentDataCollections.map(c => (
                            <option key={c.id} value={c.id}>{c.id}</option>
                        ))}
                      </select>
                </div>
                <Select id="validator" label="تایید کننده" value={formData.validator} onChange={handleChange} required>
                    <option value="">انتخاب کنید...</option>
                    {EMPLOYEE_LIST.map(e => <option key={e} value={e}>{e}</option>)}
                </Select>
            </div>
            
            {currentCollection && (
                 <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
                    <p className="font-semibold mb-2">خلاصه داده برای بازبینی:</p>
                    <p className="whitespace-pre-wrap text-gray-600 dark:text-gray-300">{currentCollection.dataSummary}</p>
                 </div>
            )}

            <form onSubmit={handleSubmit}>
                 <Select id="status" label="نتیجه بازبینی" value={formData.status} onChange={handleChange}>
                    {VALIDATION_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </Select>
                <div className="mt-4">
                     <Textarea 
                        id="comments" 
                        label="توضیحات و موارد نیاز به اصلاح" 
                        value={formData.comments} 
                        onChange={handleChange}
                        placeholder="اگر نیاز به اصلاح است، موارد را به طور دقیق ذکر کنید."
                    />
                </div>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!formData.collectionId}>
                        <span className="ml-2">ثبت نتیجه بازبینی</span>
                        <ShieldCheck size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};