
import React, { useState } from 'react';
import type { FocusGroupFeedback } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Users } from 'lucide-react';

interface FocusGroupFeedbackFormProps {
  onSave: (data: { focusGroupFeedback: FocusGroupFeedback }) => void;
}

export const FocusGroupFeedbackForm: React.FC<FocusGroupFeedbackFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<FocusGroupFeedback, 'id'>>({
        sessionDate: new Date().toISOString().split('T')[0],
        topic: '',
        keyFindings: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newFeedback: FocusGroupFeedback = {
            ...formData,
            id: `FGF-${Date.now()}`,
        };
        onSave({ focusGroupFeedback: newFeedback });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم بازخورد گروه تمرکز (2-10)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت و مستندسازی نتایج و یافته‌های کلیدی از جلسات گروه تمرکز.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="topic" label="موضوع جلسه" value={formData.topic} onChange={handleChange} required />
                    <Input id="sessionDate" label="تاریخ جلسه" type="date" value={formData.sessionDate} onChange={handleChange} required />
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="keyFindings" 
                        label="یافته‌های کلیدی، ایده‌ها و پیشنهادات مطرح شده" 
                        value={formData.keyFindings} 
                        onChange={handleChange}
                        required
                        rows={10}
                        placeholder="مهم‌ترین نکات، نقل‌قول‌ها، و ایده‌های عملیاتی که از جلسه استخراج شده را به تفصیل ثبت کنید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت نتایج جلسه</span>
                        <Users size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
