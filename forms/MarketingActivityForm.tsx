
import React, { useState } from 'react';
import type { LeadData, MarketingActivity } from '../../types';
import { Card } from '../ui/Card';
import { Input, Textarea } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Megaphone } from 'lucide-react';
import { LeadSearch } from '../LeadSearch';
import { MARKETING_ACTIVITY_TYPES } from '../../constants';

interface MarketingActivityFormProps {
  onNextStep: (data: Partial<LeadData>) => void;
  leadData: LeadData | null;
  onLeadSelect: (lead: LeadData) => void;
}

const defaultFormData: Omit<MarketingActivity, 'id' | 'date'> = {
    type: MARKETING_ACTIVITY_TYPES[0],
    targetAudience: '',
    details: '',
    cost: 0,
    outcome: '',
};

export const MarketingActivityForm: React.FC<MarketingActivityFormProps> = ({ onNextStep, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState(defaultFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: id === 'cost' ? Number(value) : value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!leadData) {
            alert("لطفاً ابتدا یک مشتری/گروه هدف را جستجو و انتخاب کنید.");
            return;
        }
        const newActivity: MarketingActivity = {
            ...formData,
            id: `ACT-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
        };
        onNextStep({ marketingActivities: [newActivity] });
        
        // Reset form after submission
        setFormData(defaultFormData);
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ثبت فعالیت‌های بازاریابی (MKT-10)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت و برنامه‌ریزی کمپین‌ها و فعالیت‌های بازاریابی.</p>
            </div>

            <LeadSearch onLeadSelect={onLeadSelect} />
            
            {leadData && (
                 <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border dark:border-gray-600">
                    <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">مشتری/گروه هدف انتخاب‌شده</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div><span className="font-semibold text-gray-600 dark:text-gray-400">نام:</span> {leadData.fullName}</div>
                        <div><span className="font-semibold text-gray-600 dark:text-gray-400">شناسه:</span> {leadData.potentialCustomerId || leadData.leadId}</div>
                    </div>
                 </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Select id="type" label="نوع فعالیت" value={formData.type} onChange={handleChange}>
                        {MARKETING_ACTIVITY_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                     <Input id="targetAudience" label="مخاطب هدف" value={formData.targetAudience} onChange={handleChange} placeholder="مثال: مدیران IT شرکت‌های متوسط"/>
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="details" 
                        label="شرح کامل فعالیت/کمپین" 
                        value={formData.details} 
                        onChange={handleChange}
                        required
                        placeholder="اهداف، پیام کلیدی، کانال‌های توزیع و... را شرح دهید"
                    />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-4">
                    <Input id="cost" label="هزینه تخمینی (ریال)" type="number" value={formData.cost} onChange={handleChange} />
                    <Input id="outcome" label="نتیجه یا پیامد مورد انتظار" value={formData.outcome} onChange={handleChange} placeholder="مثال: جذب ۵۰ سرنخ جدید" />
                 </div>
                 
                <div className="mt-6 flex justify-end">
                    <Button type="submit" disabled={!leadData}>
                        <span className="ml-2">ثبت و تولید محتوای کمپین</span>
                        <Megaphone size={18} />
                    </Button>
                </div>
            </form>
            
            {leadData?.marketingActivities && leadData.marketingActivities.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">تاریخچه فعالیت‌ها</h3>
                    <div className="space-y-4">
                        {leadData.marketingActivities.map(act => (
                            <div key={act.id} className="p-4 border dark:border-gray-700 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-bold text-gray-800 dark:text-white">{act.type} - {act.id}</p>
                                    <span className="text-xs">{new Date(act.date).toLocaleDateString('fa-IR')}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{act.details}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-500">نتیجه: {act.outcome}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
};
