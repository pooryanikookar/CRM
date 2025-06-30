import React, { useState, useEffect } from 'react';
import type { LeadData } from '../../types';
import { Card } from '../ui/Card';
import { Input, Textarea } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { CUSTOMER_GROUPS } from '../../constants';
import { ArrowLeft } from 'lucide-react';
import { LeadSearch } from '../LeadSearch';

interface LeadRegistrationFormProps {
  onNextStep: (data: Partial<LeadData>) => void;
  leadData: LeadData | null;
  onLeadSelect: (lead: LeadData) => void;
}

export const LeadRegistrationForm: React.FC<LeadRegistrationFormProps> = ({ onNextStep, leadData, onLeadSelect }) => {
  const [formData, setFormData] = useState({
    customerGroup: leadData?.customerGroup || CUSTOMER_GROUPS[0],
    nationalId: leadData?.nationalId || '',
    activityField: leadData?.activityField || '',
    initialCreditLevel: leadData?.initialCreditLevel || 3,
    fullAddress: leadData?.fullAddress || '',
  });

  useEffect(() => {
    // Pre-populate fields from leadData if it exists
    setFormData({
      customerGroup: leadData?.customerGroup || CUSTOMER_GROUPS[0],
      nationalId: leadData?.nationalId || '',
      activityField: leadData?.activityField || leadData?.productOfInterest || '',
      initialCreditLevel: leadData?.initialCreditLevel || 3,
      fullAddress: leadData?.fullAddress || '',
    });
  }, [leadData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const potentialCustomerId = leadData?.potentialCustomerId || `CUST-${Date.now()}`;
    onNextStep({ ...formData, potentialCustomerId });
  };

  return (
    <Card>
      <div className="border-b pb-4 mb-6 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ثبت مشتری بالقوه (MKT-02)</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت جزئیات مشتری بالقوه برای ورود رسمی به قیف فروش.</p>
      </div>

      <LeadSearch onLeadSelect={onLeadSelect} />

      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border dark:border-gray-600">
        <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">اطلاعات سرنخ مرتبط</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><span className="font-semibold text-gray-600 dark:text-gray-400">شناسه:</span> {leadData?.leadId || '---'}</div>
            <div><span className="font-semibold text-gray-600 dark:text-gray-400">نام:</span> {leadData?.fullName || '---'}</div>
            <div><span className="font-semibold text-gray-600 dark:text-gray-400">ایمیل:</span> {leadData?.email || '---'}</div>
            <div><span className="font-semibold text-gray-600 dark:text-gray-400">منبع:</span> {leadData?.source || '---'}</div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <Input id="relatedLeadId" label="شناسه سرنخ مرتبط" value={leadData?.leadId || 'N/A'} disabled />
            <Input id="potentialCustomerId" label="شناسه مشتری بالقوه" value={leadData?.potentialCustomerId || "در حال ایجاد..."} disabled />
            <Select id="customerGroup" label="گروه مشتری" value={formData.customerGroup} onChange={handleChange}>
                {CUSTOMER_GROUPS.map(group => <option key={group} value={group}>{group}</option>)}
            </Select>
            <Input id="nationalId" label="کد ملی / شناسه ملی" value={formData.nationalId} onChange={handleChange} />
            <Input id="activityField" label="حوزه فعالیت" value={formData.activityField} onChange={handleChange} />
            <Input id="fullAddress" label="آدرس کامل" value={formData.fullAddress} onChange={handleChange} />
        </div>
        <div className="mt-4">
             <label htmlFor="initialCreditLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">سطح اعتبار اولیه</label>
             <input
                id="initialCreditLevel"
                type="range"
                min="1"
                max="5"
                value={formData.initialCreditLevel}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
        </div>
        <Textarea id="notes" label="توضیحات تکمیلی" value={leadData?.notes || ''} disabled/>

        <div className="mt-6 flex justify-end">
          <Button type="submit">
            <span className="ml-2">ثبت و ارجاع برای نیازسنجی</span>
            <ArrowLeft size={18} />
          </Button>
        </div>
      </form>
    </Card>
  );
};