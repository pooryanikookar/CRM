
import React, { useState } from 'react';
import type { OnlineExperienceFeedback } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Star } from 'lucide-react';

interface OnlineExperienceFeedbackFormProps {
  onSave: (data: { onlineExperienceFeedback: OnlineExperienceFeedback }) => void;
}

export const OnlineExperienceFeedbackForm: React.FC<OnlineExperienceFeedbackFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<OnlineExperienceFeedback, 'id' | 'date' | 'rating'>>({
        pageUrl: '',
        feedbackText: '',
        userIdentifier: '',
    });
    const [rating, setRating] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newFeedback: OnlineExperienceFeedback = {
            ...formData,
            id: `FBACK-${Date.now()}`,
            date: new Date().toISOString(),
            rating,
        };
        onSave({ onlineExperienceFeedback: newFeedback });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم بازخورد تجربه کاربری آنلاین (4-12)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت نظرات، مشکلات و پیشنهادات کاربران در مورد وب‌سایت یا اپلیکیشن.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="userIdentifier" label="شناسه کاربر (ایمیل یا نام کاربری، اختیاری)" value={formData.userIdentifier} onChange={handleChange} />
                    <Input id="pageUrl" label="آدرس صفحه مورد نظر (اختیاری)" value={formData.pageUrl} onChange={handleChange} placeholder="https://example.com/product/xyz" />
                </div>
                
                 <div className="my-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">امتیاز شما به این تجربه چقدر است؟</label>
                    <div className="flex items-center justify-center flex-row-reverse gap-2">
                        {[5, 4, 3, 2, 1].map(star => (
                            <Star
                                key={star}
                                onClick={() => setRating(star)}
                                className={`cursor-pointer transition-colors ${
                                    rating >= star
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300 dark:text-gray-600'
                                }`}
                                size={32}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-4">
                    <Textarea 
                        id="feedbackText" 
                        label="شرح کامل بازخورد" 
                        value={formData.feedbackText} 
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="لطفاً نظر، پیشنهاد یا مشکل خود را به طور کامل شرح دهید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ارسال بازخورد</span>
                    </Button>
                </div>
            </form>
        </Card>
    );
};
