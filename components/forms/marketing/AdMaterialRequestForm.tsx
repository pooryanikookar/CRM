import React, { useState } from 'react';
import type { AdMaterialRequest } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { Brush } from 'lucide-react';
import { AD_MATERIAL_TYPES, EMPLOYEE_LIST } from '../../../constants';

interface AdMaterialRequestFormProps {
  onSave: (data: { adMaterialRequest: AdMaterialRequest }) => void;
  marketingData: { campaignRequests: {id: string, campaignName: string}[] };
}

export const AdMaterialRequestForm: React.FC<AdMaterialRequestFormProps> = ({ onSave, marketingData }) => {
    const [formData, setFormData] = useState<Omit<AdMaterialRequest, 'id'>>({
        requestDate: new Date().toISOString().split('T')[0],
        requester: '',
        campaignName: marketingData?.campaignRequests?.[0]?.campaignName || '',
        materialType: AD_MATERIAL_TYPES[0],
        specifications: '',
        deadline: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRequest: AdMaterialRequest = {
            ...formData,
            id: `AMR-${Date.now()}`,
        };
        onSave({ adMaterialRequest: newRequest });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم درخواست طراحی اقلام تبلیغاتی (5-5)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ارسال درخواست رسمی به تیم طراحی جهت آماده‌سازی اقلام بصری کمپین.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Select id="campaignName" label="کمپین مرتبط" value={formData.campaignName} onChange={handleChange}>
                        <option value="">یک کمپین را انتخاب کنید</option>
                        {marketingData.campaignRequests.map(req => <option key={req.id} value={req.campaignName}>{req.campaignName}</option>)}
                    </Select>
                     <Select id="requester" label="درخواست‌دهنده" value={formData.requester} onChange={handleChange}>
                        <option value="">انتخاب کنید</option>
                        {EMPLOYEE_LIST.map(e => <option key={e} value={e}>{e}</option>)}
                    </Select>
                     <Select id="materialType" label="نوع قلم تبلیغاتی" value={formData.materialType} onChange={handleChange}>
                        {AD_MATERIAL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </Select>
                     <Input id="deadline" label="مهلت تحویل" type="date" value={formData.deadline} onChange={handleChange} required />
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="specifications" 
                        label="مشخصات فنی و پیام کلیدی" 
                        value={formData.specifications} 
                        onChange={handleChange}
                        required
                        placeholder="ابعاد، فرمت، متن اصلی، لوگوهای مورد نیاز و سایر جزئیات را ذکر کنید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ارسال به تیم طراحی</span>
                        <Brush size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};