import React, { useState } from 'react';
import type { LeadData, ContactLog } from '../../types';
import { Card } from '../ui/Card';
import { Input, Textarea } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { LogIn } from 'lucide-react';
import { LeadSearch } from '../LeadSearch';
import { CONTACT_LOG_TYPES, CONTACT_LOG_STATUSES } from '../../constants';

interface CallContactLogFormProps {
  onNextStep: (data: Partial<LeadData>) => void;
  leadData: LeadData | null;
  onLeadSelect: (lead: LeadData) => void;
}

const defaultFormData: Omit<ContactLog, 'id' | 'date'> = {
    type: CONTACT_LOG_TYPES[0],
    contactPerson: '',
    summary: '',
    status: CONTACT_LOG_STATUSES[0],
    nextFollowUpDate: '',
};

export const CallContactLogForm: React.FC<CallContactLogFormProps> = ({ onNextStep, leadData, onLeadSelect }) => {
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
        const newLog: ContactLog = {
            ...formData,
            id: `LOG-${Date.now()}`,
            date: new Date().toISOString(),
        };
        onNextStep({ contactLogs: [newLog] });
        setFormData(defaultFormData);
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ثبت تماس‌های ورودی/خروجی (1-4)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت و مدیریت تمامی تعاملات با مشتریان.</p>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
                    <Select id="type" label="نوع تماس" value={formData.type} onChange={handleChange}>
                        {CONTACT_LOG_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                     <Input id="contactPerson" label="طرف تماس" value={formData.contactPerson} onChange={handleChange} placeholder="نام شخص در شرکت مشتری"/>
                     <Select id="status" label="وضعیت تماس" value={formData.status} onChange={handleChange}>
                        {CONTACT_LOG_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="summary" 
                        label="خلاصه تماس و نتایج" 
                        value={formData.summary} 
                        onChange={handleChange}
                        required
                        placeholder="جزئیات تماس، موارد توافق شده و اقدامات بعدی را ثبت کنید..."
                    />
                 </div>
                  <div className="mt-4">
                     <Input id="nextFollowUpDate" label="تاریخ پیگیری بعدی (اختیاری)" type="date" value={formData.nextFollowUpDate} onChange={handleChange}/>
                  </div>
                 
                <div className="mt-6 flex justify-end">
                    <Button type="submit" disabled={!leadData}>
                        <span className="ml-2">ثبت تماس و تولید اعلان</span>
                        <LogIn size={18} />
                    </Button>
                </div>
            </form>
            
            {leadData?.contactLogs && leadData.contactLogs.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">تاریخچه تماس‌ها</h3>
                    <div className="space-y-4">
                        {[...leadData.contactLogs].reverse().map(log => (
                            <div key={log.id} className="p-4 border dark:border-gray-700 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-bold text-gray-800 dark:text-white">{log.type} (با {log.contactPerson || 'مشتری'})</p>
                                    <div className='flex gap-4'>
                                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300">{log.status}</span>
                                      <span className="text-xs">{new Date(log.date).toLocaleString('fa-IR')}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 whitespace-pre-wrap">{log.summary}</p>
                                {log.nextFollowUpDate && <p className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold">پیگیری بعدی: {new Date(log.nextFollowUpDate).toLocaleDateString('fa-IR')}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
};