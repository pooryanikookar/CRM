import React, { useState } from 'react';
import type { TrainingEffectiveness } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { GraduationCap } from 'lucide-react';
import { Select } from '../../ui/Select';
import { TRAINING_TYPES } from '../../../constants';

interface TrainingEffectivenessFormProps {
  onSave: (data: { trainingEffectiveness: TrainingEffectiveness }) => void;
}

export const TrainingEffectivenessForm: React.FC<TrainingEffectivenessFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<TrainingEffectiveness, 'id'>>({
        reportDate: new Date().toISOString().split('T')[0],
        trainingName: TRAINING_TYPES[0],
        attendees: '',
        preTrainingScore: 0,
        postTrainingScore: 0,
        feedbackSummary: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const isNumeric = ['preTrainingScore', 'postTrainingScore'].includes(id);
        setFormData((prev) => ({ ...prev, [id]: isNumeric ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReport: TrainingEffectiveness = {
            ...formData,
            id: `TRAIN-${Date.now()}`,
        };
        onSave({ trainingEffectiveness: newReport });
    };

    const scoreDifference = formData.postTrainingScore - formData.preTrainingScore;

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ارزیابی اثربخشی آموزش فروش/بازاریابی (7-4)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">سنجش نتایج و بازخورد دوره‌های آموزشی برگزار شده برای پرسنل.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Select id="trainingName" label="نام دوره آموزشی" value={formData.trainingName} onChange={handleChange}>
                        {TRAINING_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </Select>
                    <Input id="attendees" label="شرکت‌کنندگان" value={formData.attendees} onChange={handleChange} placeholder="نام‌ها را با کاما جدا کنید" required />
                    <Input id="preTrainingScore" label="میانگین امتیاز پیش‌آزمون" type="number" value={formData.preTrainingScore} onChange={handleChange} />
                    <Input id="postTrainingScore" label="میانگین امتیاز پس‌آزمون" type="number" value={formData.postTrainingScore} onChange={handleChange} />
                </div>
                 <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                     <span className="font-semibold">میزان بهبود: </span>
                     <span className={scoreDifference >= 0 ? 'text-green-600' : 'text-red-600'}>{scoreDifference}</span>
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="feedbackSummary" 
                        label="خلاصه بازخورد شرکت‌کنندگان" 
                        value={formData.feedbackSummary} 
                        onChange={handleChange}
                        placeholder="نکات مثبت، منفی و پیشنهادات شرکت‌کنندگان را خلاصه کنید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت گزارش ارزیابی</span>
                        <GraduationCap size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};