
import React, { useState } from 'react';
import type { OnSiteSatisfactionSurvey } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Smile } from 'lucide-react';
import { LeadSearch } from '../../LeadSearch';

interface OnSiteSatisfactionSurveyFormProps {
  onSave: (data: { onSiteSatisfactionSurvey: OnSiteSatisfactionSurvey }) => void;
  leadData: { fullName: string } | null;
  onLeadSelect: (lead: any) => void;
}

export const OnSiteSatisfactionSurveyForm: React.FC<OnSiteSatisfactionSurveyFormProps> = ({ onSave, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState<Omit<OnSiteSatisfactionSurvey, 'id' | 'overallSatisfaction'>>({
        surveyDate: new Date().toISOString().split('T')[0],
        interviewer: '',
        positivePoints: '',
        improvementAreas: '',
    });
    const [satisfaction, setSatisfaction] = useState(3);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!leadData) {
            alert("لطفا یک مشتری را انتخاب کنید.");
            return;
        }
        const newSurvey: OnSiteSatisfactionSurvey = {
            ...formData,
            id: `OSSS-${Date.now()}`,
            overallSatisfaction: satisfaction,
        };
        onSave({ onSiteSatisfactionSurvey: newSurvey });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم رضایت‌سنجی در محل (2-9)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">انجام نظرسنجی رضایت از مشتری به صورت حضوری.</p>
            </div>
            
            <LeadSearch onLeadSelect={onLeadSelect} />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="customerName" label="مشتری" value={leadData?.fullName || 'یک مشتری انتخاب کنید'} disabled />
                    <Input id="interviewer" label="نام مصاحبه‌کننده" value={formData.interviewer} onChange={handleChange} required />
                </div>
                 <div className="mt-6">
                    <label htmlFor="overallSatisfaction" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">امتیاز رضایت کلی (۱ تا ۵)</label>
                    <input id="overallSatisfaction" type="range" min="1" max="5" value={satisfaction} onChange={e => setSatisfaction(Number(e.target.value))} className="w-full" />
                </div>
                <div className="mt-4">
                    <Textarea id="positivePoints" label="نقاط قوت و جنبه‌های مثبت" value={formData.positivePoints} onChange={handleChange} />
                </div>
                <div className="mt-4">
                    <Textarea id="improvementAreas" label="زمینه‌های بهبود و پیشنهادات" value={formData.improvementAreas} onChange={handleChange} />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!leadData}>
                        <span className="ml-2">ثبت نظرسنجی</span>
                        <Smile size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
