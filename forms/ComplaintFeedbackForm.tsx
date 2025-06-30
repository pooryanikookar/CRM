
import React, { useState } from 'react';
import type { LeadData, Complaint } from '../../types';
import { Card } from '../ui/Card';
import { Input, Textarea } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { MessageSquarePlus } from 'lucide-react';
import { LeadSearch } from '../LeadSearch';
import { COMPLAINT_TYPES, COMPLAINT_STATUSES, COMPLAINT_PRIORITIES } from '../../constants';

interface ComplaintFeedbackFormProps {
  onNextStep: (data: Partial<LeadData>) => void;
  leadData: LeadData | null;
  onLeadSelect: (lead: LeadData) => void;
}

export const ComplaintFeedbackForm: React.FC<ComplaintFeedbackFormProps> = ({ onNextStep, leadData, onLeadSelect }) => {
    const [formData, setFormData] = useState<Omit<Complaint, 'id' | 'date'>>({
        type: COMPLAINT_TYPES[0],
        details: '',
        status: COMPLAINT_STATUSES[0],
        priority: COMPLAINT_PRIORITIES[2],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        if (id === 'priority') {
            setFormData((prev) => ({ ...prev, priority: value as Complaint['priority'] }));
        } else {
            setFormData((prev) => ({ ...prev, [id]: value }));
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!leadData) {
            alert("لطفاً ابتدا یک مشتری را جستجو و انتخاب کنید.");
            return;
        }
        const newComplaint: Complaint = {
            ...formData,
            id: `CMP-${Date.now()}`,
            date: new Date().toISOString(),
        };
        onNextStep({ complaints: [newComplaint] });
        
        // Reset form after submission
        setFormData({
            type: COMPLAINT_TYPES[0],
            details: '',
            status: COMPLAINT_STATUSES[0],
            priority: COMPLAINT_PRIORITIES[2],
        });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ثبت شکایات/بازخورد مشتریان (MKT-11)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت و پیگیری هرگونه بازخورد، پیشنهاد یا شکایت از مشتریان.</p>
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
                    <Select id="type" label="نوع بازخورد" value={formData.type} onChange={handleChange}>
                        {COMPLAINT_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                     <Select id="priority" label="اولویت" value={formData.priority} onChange={handleChange}>
                        {COMPLAINT_PRIORITIES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="details" 
                        label="شرح کامل بازخورد/شکایت" 
                        value={formData.details} 
                        onChange={handleChange}
                        required
                        placeholder="لطفاً جزئیات کامل موضوع را وارد نمایید..."
                    />
                 </div>
                 
                <div className="mt-6 flex justify-end">
                    <Button type="submit" disabled={!leadData}>
                        <span className="ml-2">ثبت و تولید اعلان</span>
                        <MessageSquarePlus size={18} />
                    </Button>
                </div>
            </form>
            
            {leadData?.complaints && leadData.complaints.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">تاریخچه بازخوردها</h3>
                    <div className="space-y-4">
                        {leadData.complaints.map(c => (
                            <div key={c.id} className="p-4 border dark:border-gray-700 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-bold text-gray-800 dark:text-white">{c.type} - {c.id}</p>
                                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300">{c.status}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{c.details}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">تاریخ ثبت: {new Date(c.date).toLocaleString('fa-IR')}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
};