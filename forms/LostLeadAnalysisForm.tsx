import React, { useState, useEffect } from 'react';
import type { LeadData, LostLeadAnalysis } from '../../types';
import { Card } from '../ui/Card';
import { Input, Textarea } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { SearchX } from 'lucide-react';
import { LeadSearch } from '../LeadSearch';
import { REASONS_FOR_LOSS } from '../../constants';

interface LostLeadAnalysisFormProps {
  onSave: (data: Partial<LeadData>) => void;
  leadData: LeadData | null;
  onLeadSelect: (lead: LeadData) => void;
}

const defaultFormData: Omit<LostLeadAnalysis, 'id' | 'lostLeadId' | 'lostLeadName'> = {
    analysisDate: new Date().toISOString().split('T')[0],
    reasonForLoss: REASONS_FOR_LOSS[0],
    competitorName: '',
    customerFeedback: '',
    correctiveAction: '',
    analystName: '',
};

export const LostLeadAnalysisForm: React.FC<LostLeadAnalysisFormProps> = ({ onSave, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState(defaultFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!leadData) {
            alert("لطفاً ابتدا یک سرنخ را برای تحلیل انتخاب کنید.");
            return;
        }
        const newAnalysis: LostLeadAnalysis = {
            ...formData,
            id: `LLA-${Date.now()}`,
            lostLeadId: leadData.leadId,
            lostLeadName: leadData.fullName,
        };
        onSave({ lostLeadAnalysis: newAnalysis });
        
        setFormData(defaultFormData); // Reset form for next entry
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم تحلیل علل از دست رفتن سرنخ (9-1)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">بررسی و مستندسازی دلایل عدم موفقیت در فروش برای جلوگیری از تکرار.</p>
            </div>

            <LeadSearch onLeadSelect={onLeadSelect} />
            
            {leadData && (
                 <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-700">
                    <h3 className="font-bold text-lg mb-2 text-red-800 dark:text-red-300">سرنخ انتخاب شده برای تحلیل</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div><span className="font-semibold text-gray-600 dark:text-gray-400">نام:</span> {leadData.fullName}</div>
                        <div><span className="font-semibold text-gray-600 dark:text-gray-400">شناسه:</span> {leadData.leadId}</div>
                    </div>
                 </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="analystName" label="نام تحلیلگر" value={formData.analystName} onChange={handleChange} required />
                    <Input id="analysisDate" label="تاریخ تحلیل" type="date" value={formData.analysisDate} disabled />
                </div>
                <div className="mt-4">
                    <Select id="reasonForLoss" label="علت اصلی از دست رفتن سرنخ" value={formData.reasonForLoss} onChange={handleChange}>
                        {REASONS_FOR_LOSS.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                </div>
                 <div className="mt-4">
                    <Input 
                        id="competitorName" 
                        label="نام رقیب (در صورت وجود)" 
                        value={formData.competitorName} 
                        onChange={handleChange}
                    />
                 </div>
                 <div className="mt-4">
                    <Textarea 
                        id="customerFeedback" 
                        label="بازخورد مشتری (در صورت دریافت)" 
                        value={formData.customerFeedback} 
                        onChange={handleChange}
                        placeholder="نظرات مستقیم مشتری در مورد دلیل عدم خرید را وارد کنید..."
                    />
                 </div>
                 <div className="mt-4">
                    <Textarea 
                        id="correctiveAction" 
                        label="اقدام اصلاحی پیشنهادی" 
                        value={formData.correctiveAction} 
                        onChange={handleChange}
                        required
                        placeholder="چه اقداماتی برای جلوگیری از تکرار این مورد پیشنهاد می‌شود؟"
                    />
                 </div>
                 
                <div className="mt-6 flex justify-end">
                    <Button type="submit" disabled={!leadData}>
                        <span className="ml-2">ثبت تحلیل و تولید اعلان</span>
                        <SearchX size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};