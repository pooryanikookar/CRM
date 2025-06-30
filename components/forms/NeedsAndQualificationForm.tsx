import React, { useState, useEffect } from 'react';
import type { LeadData } from '../../types';
import { Card } from '../ui/Card';
import { Input, Textarea } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { PURCHASE_PRIORITIES, FINANCIAL_RISK_STATUS } from '../../constants';
import { ArrowLeft } from 'lucide-react';
import { LeadSearch } from '../LeadSearch';

interface NeedsAndQualificationFormProps {
  onNextStep: (data: Partial<LeadData>) => void;
  leadData: LeadData | null;
  onLeadSelect: (lead: LeadData) => void;
}

export const NeedsAndQualificationForm: React.FC<NeedsAndQualificationFormProps> = ({ onNextStep, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState({
        assessmentDate: leadData?.assessmentDate || new Date().toISOString().split('T')[0],
        areaOfNeed: leadData?.areaOfNeed || leadData?.productOfInterest || '',
        announcedBudget: leadData?.announcedBudget || 0,
        purchasePriority: leadData?.purchasePriority || PURCHASE_PRIORITIES[1],
        decisionMaker: leadData?.decisionMaker || '',
        technicalPrerequisites: leadData?.technicalPrerequisites || '',
        financialRisk: leadData?.financialRisk || FINANCIAL_RISK_STATUS[2],
        statusSummary: leadData?.statusSummary || '',
    });

    useEffect(() => {
        setFormData({
            assessmentDate: leadData?.assessmentDate || new Date().toISOString().split('T')[0],
            areaOfNeed: leadData?.areaOfNeed || leadData?.productOfInterest || '',
            announcedBudget: leadData?.announcedBudget || 0,
            purchasePriority: leadData?.purchasePriority || PURCHASE_PRIORITIES[1],
            decisionMaker: leadData?.decisionMaker || '',
            technicalPrerequisites: leadData?.technicalPrerequisites || '',
            financialRisk: leadData?.financialRisk || FINANCIAL_RISK_STATUS[2],
            statusSummary: leadData?.statusSummary || '',
        });
    }, [leadData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const numValue = id === 'announcedBudget' ? Number(value) : value;
        setFormData((prev) => ({ ...prev, [id]: numValue }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNextStep(formData);
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم نیازسنجی و اعتبارسنجی (MKT-03)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">گردآوری اطلاعات درباره نیاز واقعی، بودجه، و اولویت مشتری.</p>
            </div>

            <LeadSearch onLeadSelect={onLeadSelect} />

            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border dark:border-gray-600">
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">اطلاعات مشتری بالقوه</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">نام:</span> {leadData?.fullName || '---'}</div>
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">شناسه:</span> {leadData?.potentialCustomerId || '---'}</div>
                    <div><span className="font-semibold text-gray-600 dark:text-gray-400">تماس:</span> {leadData?.contactNumber || '---'}</div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="assessmentDate" label="تاریخ ارزیابی" type="date" value={formData.assessmentDate} onChange={handleChange} required />
                    <Input id="areaOfNeed" label="حوزه نیاز یا درخواست" value={formData.areaOfNeed} onChange={handleChange} required />
                    <Input id="announcedBudget" label="میزان بودجه اعلام‌شده (ریال)" type="number" value={formData.announcedBudget} onChange={handleChange} />
                    <Select id="purchasePriority" label="اولویت خرید یا زمان‌بندی" value={formData.purchasePriority} onChange={handleChange}>
                        {PURCHASE_PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                    </Select>
                    <Input id="decisionMaker" label="طرف تصمیم‌گیرنده" value={formData.decisionMaker} onChange={handleChange} />
                    <Select id="financialRisk" label="ارزیابی اعتبار/ریسک مالی" value={formData.financialRisk} onChange={handleChange}>
                        {FINANCIAL_RISK_STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                </div>
                 <div className="mt-4">
                    <Input id="technicalPrerequisites" label="پیش‌نیازهای فنی یا مستندات" value={formData.technicalPrerequisites} onChange={handleChange} />
                    <Textarea id="statusSummary" label="خلاصه وضعیت و پیشنهاد مراقبت" value={formData.statusSummary} onChange={handleChange} />
                    <Input id="assessmentFile" label="فایل ضمیمه (مدارک و مستندات)" type="file" />
                 </div>

                <div className="mt-6 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ارائه پیشنهاد قیمت</span>
                        <ArrowLeft size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};