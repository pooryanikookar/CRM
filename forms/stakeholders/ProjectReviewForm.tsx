import React, { useState } from 'react';
import type { ProjectReview } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { ClipboardList } from 'lucide-react';
import { Select } from '../../ui/Select';
import { PROJECT_STATUSES } from '../../../constants';

interface ProjectReviewFormProps {
  onSave: (data: { projectReview: ProjectReview }) => void;
}

export const ProjectReviewForm: React.FC<ProjectReviewFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<ProjectReview, 'id'>>({
        reviewDate: new Date().toISOString().split('T')[0],
        projectName: '',
        projectManager: '',
        status: 'در حال انجام',
        progressSummary: '',
        lessonsLearned: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReview: ProjectReview = {
            ...formData,
            id: `PROJ-${Date.now()}`,
        };
        onSave({ projectReview: newReview });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم بازبینی و کنترل پروژه‌های بازاریابی/فروش (7-7)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">نظارت بر پیشرفت پروژه‌ها، ثبت نقاط درس‌آموخته و تهیه گزارش برای آرشیو.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="projectName" label="نام پروژه" value={formData.projectName} onChange={handleChange} required />
                    <Input id="projectManager" label="مدیر پروژه" value={formData.projectManager} onChange={handleChange} required />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-4">
                    <Input id="reviewDate" label="تاریخ بازبینی" type="date" value={formData.reviewDate} disabled />
                    <Select id="status" label="وضعیت پروژه" value={formData.status} onChange={handleChange}>
                        {PROJECT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="progressSummary" 
                        label="خلاصه پیشرفت و اقدامات انجام شده" 
                        value={formData.progressSummary} 
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="lessonsLearned" 
                        label="درس آموخته‌ها و پیشنهادات برای ارتقا اجرا" 
                        value={formData.lessonsLearned} 
                        onChange={handleChange}
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت گزارش پروژه</span>
                        <ClipboardList size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};