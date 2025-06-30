import React, { useState } from 'react';
import type { CampaignRiskManagement } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { ShieldAlert } from 'lucide-react';
import { RISK_LEVELS } from '../../../constants';

interface CampaignRiskManagementFormProps {
  onSave: (data: { campaignRiskManagement: CampaignRiskManagement }) => void;
  marketingData: { campaignRequests: {id: string, campaignName: string}[] };
}

export const CampaignRiskManagementForm: React.FC<CampaignRiskManagementFormProps> = ({ onSave, marketingData }) => {
    const [formData, setFormData] = useState<Omit<CampaignRiskManagement, 'id'>>({
        campaignName: marketingData?.campaignRequests?.[0]?.campaignName || '',
        riskDescription: '',
        likelihood: 'متوسط',
        impact: 'متوسط',
        mitigationPlan: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRisk: CampaignRiskManagement = {
            ...formData,
            id: `RISK-${Date.now()}`,
        };
        onSave({ campaignRiskManagement: newRisk });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ارزیابی ریسک کمپین (4-13)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">شناسایی، ارزیابی و برنامه‌ریزی برای مقابله با ریسک‌های کمپین.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Select id="campaignName" label="کمپین مرتبط" value={formData.campaignName} onChange={handleChange}>
                        <option value="">یک کمپین را انتخاب کنید</option>
                        {marketingData.campaignRequests.map(req => <option key={req.id} value={req.campaignName}>{req.campaignName}</option>)}
                    </Select>
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="riskDescription" 
                        label="شرح ریسک" 
                        value={formData.riskDescription} 
                        onChange={handleChange}
                        required
                        placeholder="ریسک مورد نظر را به طور کامل شرح دهید (مثال: احتمال بازخورد منفی در شبکه‌های اجتماعی)."
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-4">
                    <Select id="likelihood" label="احتمال وقوع" value={formData.likelihood} onChange={handleChange}>
                        {RISK_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
                    </Select>
                    <Select id="impact" label="شدت اثر" value={formData.impact} onChange={handleChange}>
                        {RISK_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
                    </Select>
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="mitigationPlan" 
                        label="برنامه پیشگیری یا کاهش اثر" 
                        value={formData.mitigationPlan} 
                        onChange={handleChange}
                        required
                        placeholder="اقدامات مشخصی که برای مدیریت این ریسک انجام خواهد شد را بنویسید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت ریسک</span>
                        <ShieldAlert size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};