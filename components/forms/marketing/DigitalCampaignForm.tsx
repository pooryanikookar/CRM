
import React, { useState } from 'react';
import type { DigitalCampaign } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { Checkbox } from '../../ui/Checkbox';
import { Goal } from 'lucide-react';
import { DIGITAL_CAMPAIGN_GOALS, DIGITAL_CAMPAIGN_PLATFORMS } from '../../../constants';

interface DigitalCampaignFormProps {
  onSave: (data: { digitalCampaign: DigitalCampaign }) => void;
}

export const DigitalCampaignForm: React.FC<DigitalCampaignFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<DigitalCampaign, 'id'>>({
        name: '',
        goal: DIGITAL_CAMPAIGN_GOALS[0],
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        budget: 0,
        platforms: [],
        manager: '',
        summary: '',
    });

    const handlePlatformChange = (platform: string) => {
        setFormData(prev => {
            const newPlatforms = prev.platforms.includes(platform)
                ? prev.platforms.filter(p => p !== platform)
                : [...prev.platforms, platform];
            return { ...prev, platforms: newPlatforms };
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: id === 'budget' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newCampaign: DigitalCampaign = {
            ...formData,
            id: `CAMP-${Date.now()}`,
        };
        onSave({ digitalCampaign: newCampaign });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ثبت کمپین دیجیتال جدید (4-1)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ایجاد و مدیریت کمپین‌های بازاریابی دیجیتال.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="name" label="نام کمپین" value={formData.name} onChange={handleChange} required />
                    <Select id="goal" label="هدف اصلی کمپین" value={formData.goal} onChange={handleChange}>
                        {DIGITAL_CAMPAIGN_GOALS.map(g => <option key={g} value={g}>{g}</option>)}
                    </Select>
                    <Input id="startDate" label="تاریخ شروع" type="date" value={formData.startDate} onChange={handleChange} required />
                    <Input id="endDate" label="تاریخ پایان" type="date" value={formData.endDate} onChange={handleChange} />
                    <Input id="budget" label="بودجه کل (ریال)" type="number" value={formData.budget} onChange={handleChange} required />
                    <Input id="manager" label="مدیر مسئول کمپین" value={formData.manager} onChange={handleChange} placeholder="نام مدیر یا تیم مسئول" />
                </div>
                
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">پلتفرم‌های اجرایی</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {DIGITAL_CAMPAIGN_PLATFORMS.map(platform => (
                           <Checkbox 
                                key={platform}
                                id={`platform-${platform}`}
                                label={platform}
                                checked={formData.platforms.includes(platform)}
                                onChange={() => handlePlatformChange(platform)}
                           />
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <Textarea 
                        id="summary" 
                        label="خلاصه و پیام کلیدی کمپین" 
                        value={formData.summary} 
                        onChange={handleChange}
                        placeholder="شرح مختصری از کمپین و پیامی که قرار است به مخاطب منتقل شود."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ایجاد کمپین و تولید اعلان</span>
                        <Goal size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
