import React, { useState } from 'react';
import type { StakeholderFeedback } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { MessageCircleWarning } from 'lucide-react';
import { STAKEHOLDER_TYPES } from '../../../constants';

interface StakeholderFeedbackFormProps {
  onSave: (data: { stakeholderFeedback: StakeholderFeedback }) => void;
}

export const StakeholderFeedbackForm: React.FC<StakeholderFeedbackFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<StakeholderFeedback, 'id'>>({
        feedbackDate: new Date().toISOString().split('T')[0],
        stakeholderName: '',
        stakeholderType: 'نماینده',
        feedbackText: '',
        proposedAction: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newFeedback: StakeholderFeedback = {
            ...formData,
            id: `SHF-${Date.now()}`,
        };
        onSave({ stakeholderFeedback: newFeedback });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم دریافت شکایت یا بازخورد از ذی‌نفعان (6-4)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت و پیگیری بازخوردها و شکایات از طرف شرکای تجاری، نمایندگان و سایر ذی‌نفعان.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="stakeholderName" label="نام ذی‌نفع" value={formData.stakeholderName} onChange={handleChange} required placeholder="نام شخص یا شرکت" />
                    <Select id="stakeholderType" label="نوع ذی‌نفع" value={formData.stakeholderType} onChange={handleChange}>
                        {STAKEHOLDER_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </Select>
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="feedbackText" 
                        label="شرح کامل شکایت یا بازخورد" 
                        value={formData.feedbackText} 
                        onChange={handleChange}
                        required
                        placeholder="جزئیات کامل موضوع را با ذکر مصادیق بنویسید."
                    />
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="proposedAction" 
                        label="اقدام پیشنهادی برای حل موضوع" 
                        value={formData.proposedAction} 
                        onChange={handleChange}
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت بازخورد و ارجاع</span>
                        <MessageCircleWarning size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};