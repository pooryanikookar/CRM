
import React, { useState } from 'react';
import type { LeadData, FollowUp } from '../../types';
import { Card } from '../ui/Card';
import { Input, Textarea } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { PhoneForwarded } from 'lucide-react';
import { LeadSearch } from '../LeadSearch';
import { FOLLOW_UP_METHODS } from '../../constants';

interface CustomerFollowUpFormProps {
  onNextStep: (data: Partial<LeadData>) => void;
  leadData: LeadData | null;
  onLeadSelect: (lead: LeadData) => void;
}

const defaultFormData: Omit<FollowUp, 'id' | 'date'> = {
    method: FOLLOW_UP_METHODS[0],
    notes: '',
    nextFollowUpDate: '',
};

export const CustomerFollowUpForm: React.FC<CustomerFollowUpFormProps> = ({ onNextStep, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState(defaultFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!leadData) {
            alert("لطفاً ابتدا یک مشتری را جستجو و انتخاب کنید.");
            return;
        }
        const newFollowUp: FollowUp = {
            ...formData,
            id: `FU-${Date.now()}`,
            date: new Date().toISOString(),
        };
        onNextStep({ followUps: [newFollowUp] });
        
        // Reset form after submission
        setFormData(defaultFormData);
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم مدیریت ارتباط با مشتری و پیگیری‌ها (MKT-13)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت تماس‌ها، جلسات و برنامه‌ریزی پیگیری‌های آینده.</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Select id="method" label="روش پیگیری" value={formData.method} onChange={handleChange}>
                        {FOLLOW_UP_METHODS.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                     <Input id="nextFollowUpDate" label="تاریخ پیگیری بعدی" type="date" value={formData.nextFollowUpDate} onChange={handleChange}/>
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="notes" 
                        label="خلاصه مذاکرات و نتایج" 
                        value={formData.notes} 
                        onChange={handleChange}
                        required
                        placeholder="جزئیات تماس، موارد توافق شده و اقدامات بعدی را ثبت کنید..."
                    />
                 </div>
                 
                <div className="mt-6 flex justify-end">
                    <Button type="submit" disabled={!leadData}>
                        <span className="ml-2">ثبت پیگیری و تولید اعلان</span>
                        <PhoneForwarded size={18} />
                    </Button>
                </div>
            </form>
            
            {leadData?.followUps && leadData.followUps.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">تاریخچه پیگیری‌ها</h3>
                    <div className="space-y-4">
                        {[...leadData.followUps].reverse().map(fu => (
                            <div key={fu.id} className="p-4 border dark:border-gray-700 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-bold text-gray-800 dark:text-white">{fu.method}</p>
                                    <span className="text-xs">{new Date(fu.date).toLocaleString('fa-IR')}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 whitespace-pre-wrap">{fu.notes}</p>
                                {fu.nextFollowUpDate && <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">پیگیری بعدی: {new Date(fu.nextFollowUpDate).toLocaleDateString('fa-IR')}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
};
