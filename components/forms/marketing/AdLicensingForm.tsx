import React, { useState } from 'react';
import type { AdLicensing } from '../../../types';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { Landmark } from 'lucide-react';
import { LICENSE_STATUSES } from '../../../constants';

interface AdLicensingFormProps {
  onSave: (data: { adLicensing: AdLicensing }) => void;
  marketingData: { campaignRequests: {id: string, campaignName: string}[] };
}

export const AdLicensingForm: React.FC<AdLicensingFormProps> = ({ onSave, marketingData }) => {
    const [formData, setFormData] = useState<Omit<AdLicensing, 'id'>>({
        campaignName: marketingData?.campaignRequests?.[0]?.campaignName || '',
        licenseType: '',
        authority: '',
        status: 'در حال پیگیری',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newLicense: AdLicensing = {
            ...formData,
            id: `LIC-${Date.now()}`,
        };
        onSave({ adLicensing: newLicense });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم هماهنگی مجوزهای تبلیغات (5-3)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">پیگیری و مدیریت اخذ مجوزهای قانونی لازم برای کمپین‌های تبلیغاتی.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                     <Select id="campaignName" label="کمپین مرتبط" value={formData.campaignName} onChange={handleChange}>
                        <option value="">یک کمپین را انتخاب کنید</option>
                         {marketingData.campaignRequests.map(req => <option key={req.id} value={req.campaignName}>{req.campaignName}</option>)}
                    </Select>
                    <Input id="licenseType" label="نوع مجوز مورد نیاز" value={formData.licenseType} onChange={handleChange} required placeholder="مثال: مجوز تبلیغات محیطی"/>
                    <Input id="authority" label="مرجع صدور مجوز" value={formData.authority} onChange={handleChange} required placeholder="مثال: سازمان زیباسازی شهرداری"/>
                    <Select id="status" label="وضعیت پیگیری" value={formData.status} onChange={handleChange}>
                       {LICENSE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت و شروع پیگیری</span>
                        <Landmark size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};