
import React, { useState } from 'react';
import type { CampaignBudget } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { Wallet } from 'lucide-react';
import { CAMPAIGN_APPROVAL_STATUSES } from '../../../constants';

interface CampaignBudgetFormProps {
  onSave: (data: { campaignBudget: CampaignBudget }) => void;
  marketingData: { campaignRequests: {id: string, campaignName: string}[] };
}

export const CampaignBudgetForm: React.FC<CampaignBudgetFormProps> = ({ onSave, marketingData }) => {
    const [formData, setFormData] = useState<Omit<CampaignBudget, 'id'>>({
        campaignName: marketingData?.campaignRequests?.[0]?.campaignName || '',
        totalBudget: 0,
        breakdown: '',
        approvalStatus: 'در انتظار',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: id === 'totalBudget' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newBudget: CampaignBudget = {
            ...formData,
            id: `BUD-${Date.now()}`,
        };
        onSave({ campaignBudget: newBudget });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم بودجه‌بندی کمپین (5-2)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">تخصیص و مدیریت بودجه برای کمپین‌های تایید شده.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Select id="campaignName" label="کمپین مرتبط" value={formData.campaignName} onChange={handleChange}>
                        <option value="">یک کمپین را انتخاب کنید</option>
                         {marketingData.campaignRequests.map(req => <option key={req.id} value={req.campaignName}>{req.campaignName}</option>)}
                    </Select>
                    <Input id="totalBudget" label="مبلغ کل بودجه (ریال)" type="number" value={formData.totalBudget} onChange={handleChange} required />
                    <Select id="approvalStatus" label="وضعیت تایید" value={formData.approvalStatus} onChange={handleChange}>
                        {CAMPAIGN_APPROVAL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="breakdown" 
                        label="جزئیات و شکست هزینه‌ها" 
                        value={formData.breakdown} 
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="هزینه‌ها را به تفکیک آیتم وارد کنید (مثال: تبلیغات دیجیتال: ۱۰۰،۰۰۰ ریال، تولید محتوا: ۵۰،۰۰۰ ریال)."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت بودجه و ارسال به مالی</span>
                        <Wallet size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
