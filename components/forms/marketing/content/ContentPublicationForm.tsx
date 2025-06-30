import React, { useState, useEffect } from 'react';
import type { ContentPublication } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Select } from '../../../ui/Select';
import { SendHorizonal } from 'lucide-react';
import { CONTENT_PLATFORMS, EMPLOYEE_LIST } from '../../../../constants';

interface ContentPublicationFormProps {
  onSave: (data: { contentPublication: ContentPublication }) => void;
  marketingData: { contentValidations: { id: string; collectionId: string }[] };
}

export const ContentPublicationForm: React.FC<ContentPublicationFormProps> = ({ onSave, marketingData }) => {
    const [formData, setFormData] = useState<Omit<ContentPublication, 'id'>>({
        validationId: '',
        platform: CONTENT_PLATFORMS[0],
        publishDate: new Date().toISOString().split('T')[0],
        publishedUrl: '',
        publisher: '',
    });

    useEffect(() => {
        if(marketingData?.contentValidations?.length > 0) {
            setFormData(prev => ({...prev, validationId: marketingData.contentValidations[marketingData.contentValidations.length - 1].id }))
        }
    }, [marketingData.contentValidations])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newPublication: ContentPublication = {
            ...formData,
            id: `PUB-${Date.now()}`,
        };
        onSave({ contentPublication: newPublication });
    };
    
    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم انتشار رسمی محتوا (13-1)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت و کنترل فرآیند انتشار نهایی محتوا در پلتفرم‌های هدف.</p>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Select id="validationId" label="محتوای تایید شده مرتبط" value={formData.validationId} onChange={handleChange} required>
                        <option value="">انتخاب کنید...</option>
                        {marketingData.contentValidations.map(v => (
                            <option key={v.id} value={v.id}>{v.id}</option>
                        ))}
                    </Select>
                    <Select id="platform" label="پلتفرم انتشار" value={formData.platform} onChange={handleChange}>
                        {CONTENT_PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                    </Select>
                    <Input id="publishDate" label="تاریخ و ساعت انتشار" type="datetime-local" value={formData.publishDate} onChange={handleChange} required />
                    <Input id="publishedUrl" label="لینک محتوای منتشر شده" value={formData.publishedUrl} onChange={handleChange} />
                    <Select id="publisher" label="منتشر کننده" value={formData.publisher} onChange={handleChange} required>
                        <option value="">انتخاب کنید...</option>
                        {EMPLOYEE_LIST.map(e => <option key={e} value={e}>{e}</option>)}
                    </Select>
                </div>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!formData.validationId}>
                        <span className="ml-2">ثبت انتشار</span>
                        <SendHorizonal size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};