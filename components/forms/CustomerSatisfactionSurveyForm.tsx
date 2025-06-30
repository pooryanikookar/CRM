import React, { useState } from 'react';
import type { LeadData, SatisfactionSurvey } from '../../types';
import { Card } from '../ui/Card';
import { Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import { SmilePlus, Star } from 'lucide-react';
import { LeadSearch } from '../LeadSearch';
import { SURVEY_QUESTIONS } from '../../constants';

interface CustomerSatisfactionSurveyFormProps {
  onNextStep: (data: Partial<LeadData>) => void;
  leadData: LeadData | null;
  onLeadSelect: (lead: LeadData) => void;
}

const defaultRatings = SURVEY_QUESTIONS.reduce((acc, q) => ({...acc, [q.id]: 3 }), {});

export const CustomerSatisfactionSurveyForm: React.FC<CustomerSatisfactionSurveyFormProps> = ({ onNextStep, leadData, onLeadSelect }) => {
    const [ratings, setRatings] = useState<{ [key: string]: number }>(defaultRatings);
    const [comments, setComments] = useState('');

    const handleRatingChange = (questionId: string, rating: number) => {
        setRatings(prev => ({ ...prev, [questionId]: rating }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!leadData) {
            alert("لطفاً ابتدا یک مشتری را جستجو و انتخاب کنید.");
            return;
        }
        const newSurvey: SatisfactionSurvey = {
            id: `SURVEY-${Date.now()}`,
            date: new Date().toISOString(),
            ratings,
            comments,
        };
        onNextStep({ surveys: [newSurvey] });

        // Reset form
        setRatings(defaultRatings);
        setComments('');
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم رضایت‌سنجی مشتری (MKT-12)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">سنجش میزان رضایت مشتری از فرآیند خرید و خدمات.</p>
            </div>

            <LeadSearch onLeadSelect={onLeadSelect} />

            {leadData && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border dark:border-gray-600">
                    <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">مشتری انتخاب‌شده</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div><span className="font-semibold text-gray-600 dark:text-gray-400">نام:</span> {leadData.fullName}</div>
                        <div><span className="font-semibold text-gray-600 dark:text-gray-400">شناسه:</span> {leadData.potentialCustomerId || leadData.leadId}</div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    {SURVEY_QUESTIONS.map(question => (
                        <div key={question.id}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{question.label}</label>
                            <div className="flex items-center justify-end flex-row-reverse gap-1">
                                {[5, 4, 3, 2, 1].map(star => (
                                    <Star
                                        key={star}
                                        onClick={() => handleRatingChange(question.id, star)}
                                        className={`cursor-pointer transition-colors ${
                                            (ratings[question.id] || 0) >= star
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-300 dark:text-gray-600'
                                        }`}
                                        size={28}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <Textarea
                        id="comments"
                        label="نظرات و پیشنهادات تکمیلی"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="نظر شما برای بهبود خدمات ما بسیار ارزشمند است..."
                    />
                </div>

                <div className="mt-6 flex justify-end">
                    <Button type="submit" disabled={!leadData}>
                        <span className="ml-2">ثبت نظرسنجی و تولید اعلان</span>
                        <SmilePlus size={18} />
                    </Button>
                </div>
            </form>
             {leadData?.surveys && leadData.surveys.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">تاریخچه نظرسنجی‌ها</h3>
                    <div className="space-y-4">
                        {leadData.surveys.map(s => (
                            <div key={s.id} className="p-4 border dark:border-gray-700 rounded-lg">
                                <p className="font-bold text-gray-800 dark:text-white mb-2">نظرسنجی ثبت شده در تاریخ: {new Date(s.date).toLocaleString('fa-IR')}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">نظرات: {s.comments || '---'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
};