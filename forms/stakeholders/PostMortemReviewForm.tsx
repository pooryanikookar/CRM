import React, { useState } from 'react';
import type { PostMortemReview } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { SearchSlash } from 'lucide-react';
import { LeadSearch } from '../../LeadSearch';

interface PostMortemReviewFormProps {
  onSave: (data: { postMortemReview: PostMortemReview }) => void;
  leadData: { leadId: string; fullName: string; } | null;
  onLeadSelect: (lead: any) => void;
}

export const PostMortemReviewForm: React.FC<PostMortemReviewFormProps> = ({ onSave, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState<Omit<PostMortemReview, 'id' | 'projectName'>>({
        reviewDate: new Date().toISOString().split('T')[0],
        reasonForFailure: '',
        lessonsLearned: '',
        actionItems: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!leadData) {
            alert("لطفاً یک پروژه/فروش شکست‌خورده را انتخاب کنید.");
            return;
        }
        const newReview: PostMortemReview = {
            ...formData,
            id: `PMR-${Date.now()}`,
            projectName: leadData.fullName,
        };
        onSave({ postMortemReview: newReview });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم بازبینی فرآیندها پس از شکست فروش یا پروژه (9-7)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">تحلیل علل شکست و مستندسازی درس‌آموخته‌ها برای آینده.</p>
            </div>

            <LeadSearch onLeadSelect={onLeadSelect} />
            
            {leadData && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-700">
                    <h3 className="font-bold text-lg mb-2 text-red-800 dark:text-red-300">پروژه/فروش مورد تحلیل</h3>
                    <p>{leadData.fullName} (شناسه: {leadData.leadId})</p>
                 </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <Textarea 
                        id="reasonForFailure" 
                        label="تحلیل دلایل اصلی شکست" 
                        value={formData.reasonForFailure} 
                        onChange={handleChange}
                        required
                        placeholder="دلایل ریشه‌ای و عوامل موثر در شکست را تحلیل کنید."
                    />
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="lessonsLearned" 
                        label="درس‌آموخته‌های کلیدی" 
                        value={formData.lessonsLearned} 
                        onChange={handleChange}
                        required
                        placeholder="چه چیزهایی از این تجربه آموختیم؟"
                    />
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="actionItems" 
                        label="اقدامات اصلاحی مشخص برای آینده" 
                        value={formData.actionItems} 
                        onChange={handleChange}
                        required
                        placeholder="چه کارهای مشخصی باید انجام شود تا از تکرار این شکست جلوگیری شود؟"
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!leadData}>
                        <span className="ml-2">ثبت گزارش</span>
                        <SearchSlash size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
