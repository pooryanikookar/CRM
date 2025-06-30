import React, { useState } from 'react';
import type { SupplierFeedback } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Textarea } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Star } from 'lucide-react';
import { SupplierSearch } from '../../../SupplierSearch';

interface SupplierFeedbackFormProps {
  onSave: (data: { supplierFeedback: SupplierFeedback }) => void;
  selectedSupplier: string | null;
  onSupplierSelect: (supplierName: string) => void;
}

export const SupplierFeedbackForm: React.FC<SupplierFeedbackFormProps> = ({ onSave, selectedSupplier, onSupplierSelect }) => {
    const [rating, setRating] = useState(3);
    const [comments, setComments] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!selectedSupplier) {
            alert("لطفاً یک تامین‌کننده را انتخاب کنید.");
            return;
        }
        const newFeedback: SupplierFeedback = {
            id: `SF-${Date.now()}`,
            evaluationDate: new Date().toISOString().split('T')[0],
            supplier: selectedSupplier,
            rating,
            comments,
        };
        onSave({ supplierFeedback: newFeedback });
        setRating(3);
        setComments('');
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم بازخورد یا ارزیابی تامین‌کننده (3-3-4)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت و ارزیابی عملکرد تامین‌کنندگان بر اساس معیارهای مختلف.</p>
            </div>

            <SupplierSearch selectedSupplier={selectedSupplier} onSupplierSelect={onSupplierSelect} />

            <form onSubmit={handleSubmit}>
                <div className="my-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">امتیاز کلی به عملکرد تامین‌کننده</label>
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
                <Textarea 
                    id="comments" 
                    label="توضیحات و بازخورد (نقاط قوت و ضعف)" 
                    value={comments} 
                    onChange={e => setComments(e.target.value)}
                    placeholder="جزئیات عملکرد تامین‌کننده در زمینه قیمت، کیفیت، زمان تحویل و پشتیبانی را شرح دهید."
                    required
                />
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!selectedSupplier}>
                        <span className="ml-2">ثبت بازخورد</span>
                    </Button>
                </div>
            </form>
        </Card>
    );
};