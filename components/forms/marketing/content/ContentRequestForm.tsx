import React, { useState } from 'react';
import type { ContentRequest } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input, Textarea } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Select } from '../../../ui/Select';
import { FilePlus2 } from 'lucide-react';
import { CONTENT_TYPES, EMPLOYEE_LIST } from '../../../../constants';

interface ContentRequestFormProps {
  onSave: (data: { contentRequest: ContentRequest }) => void;
}

export const ContentRequestForm: React.FC<ContentRequestFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<ContentRequest, 'id'>>({
        requestDate: new Date().toISOString().split('T')[0],
        requester: '',
        topic: '',
        contentType: CONTENT_TYPES[0],
        goal: '',
        targetAudience: '',
        deadline: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRequest: ContentRequest = {
            ...formData,
            id: `CR-${Date.now()}`,
        };
        onSave({ contentRequest: newRequest });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم درخواست تولید یا به‌روزرسانی محتوا (10-1)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت درخواست رسمی برای تولید محتوای فنی، بازاریابی، آموزشی یا مرجع.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Select id="requester" label="واحد/فرد درخواست‌دهنده" value={formData.requester} onChange={handleChange} required>
                        <option value="">انتخاب کنید...</option>
                        {EMPLOYEE_LIST.map(e => <option key={e} value={e}>{e}</option>)}
                    </Select>
                    <Input id="topic" label="موضوع محتوای درخواستی" value={formData.topic} onChange={handleChange} required />
                    <Select id="contentType" label="نوع محتوا" value={formData.contentType} onChange={handleChange}>
                        {CONTENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </Select>
                    <Input id="targetAudience" label="مخاطب هدف محتوا" value={formData.targetAudience} onChange={handleChange} required placeholder="مثال: مشتریان B2B، توسعه‌دهندگان جدید" />
                </div>
                <div className="mt-4">
                     <Textarea 
                        id="goal" 
                        label="علت یا هدف محتوا" 
                        value={formData.goal} 
                        onChange={handleChange}
                        required
                        placeholder="دلیل نیاز به این محتوا را شرح دهید. (مثال: تکرار سوال مشتریان، نیاز کمپین جدید)"
                    />
                </div>
                 <div className="mt-4">
                    <Input id="deadline" label="ضرب‌العجل پیشنهادی (اختیاری)" type="date" value={formData.deadline} onChange={handleChange} />
                 </div>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ارسال درخواست به تیم محتوا</span>
                        <FilePlus2 size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};