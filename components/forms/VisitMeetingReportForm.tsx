import React, { useState } from 'react';
import type { LeadData, VisitReport } from '../../types';
import { Card } from '../ui/Card';
import { Input, Textarea } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Briefcase } from 'lucide-react';
import { LeadSearch } from '../LeadSearch';
import { VISIT_TYPES } from '../../constants';

interface VisitMeetingReportFormProps {
  onNextStep: (data: Partial<LeadData>) => void;
  leadData: LeadData | null;
  onLeadSelect: (lead: LeadData) => void;
}

const defaultFormData: Omit<VisitReport, 'id' | 'date'> = {
    type: VISIT_TYPES[0],
    location: '',
    attendeesInternal: '',
    attendeesExternal: '',
    purpose: '',
    summary: '',
    outcomes: '',
    nextSteps: '',
};

export const VisitMeetingReportForm: React.FC<VisitMeetingReportFormProps> = ({ onNextStep, leadData, onLeadSelect }) => {
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
        const newReport: VisitReport = {
            ...formData,
            id: `VMR-${Date.now()}`,
            date: new Date().toISOString(),
        };
        onNextStep({ visitReports: [newReport] });
        
        // Reset form after submission
        setFormData(defaultFormData);
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم گزارش ملاقات/بازدید میدانی (1-6)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت و مدیریت گزارش‌های بازدید، جلسات و رویدادهای میدانی.</p>
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
                    <Select id="type" label="نوع ملاقات" value={formData.type} onChange={handleChange}>
                        {VISIT_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                     <Input id="location" label="مکان برگزاری" value={formData.location} onChange={handleChange} placeholder="مثال: دفتر مشتری، پلتفرم آنلاین"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-4">
                     <Input id="attendeesInternal" label="حاضرین از طرف ما" value={formData.attendeesInternal} onChange={handleChange} placeholder="نام‌ها را با کاما جدا کنید"/>
                     <Input id="attendeesExternal" label="حاضرین از طرف مشتری" value={formData.attendeesExternal} onChange={handleChange} placeholder="نام‌ها و سمت‌ها را با کاما جدا کنید"/>
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="purpose" 
                        label="هدف از ملاقات" 
                        value={formData.purpose} 
                        onChange={handleChange}
                        required
                        rows={2}
                        placeholder="مثال: دمو محصول، مذاکره فنی،..."
                    />
                 </div>
                 <div className="mt-4">
                    <Textarea 
                        id="summary" 
                        label="خلاصه مذاکرات" 
                        value={formData.summary} 
                        onChange={handleChange}
                        required
                        placeholder="مهم‌ترین نکات مطرح شده در جلسه را ثبت کنید..."
                    />
                 </div>
                 <div className="mt-4">
                    <Textarea 
                        id="outcomes" 
                        label="نتایج و توافقات" 
                        value={formData.outcomes} 
                        onChange={handleChange}
                        required
                        placeholder="تصمیمات گرفته شده، توافقات نهایی و..."
                    />
                 </div>
                  <div className="mt-4">
                    <Textarea 
                        id="nextSteps" 
                        label="اقدامات بعدی" 
                        value={formData.nextSteps} 
                        onChange={handleChange}
                        placeholder="وظایف محول شده به طرفین و تاریخ‌های پیگیری..."
                    />
                 </div>
                 
                <div className="mt-6 flex justify-end">
                    <Button type="submit" disabled={!leadData}>
                        <span className="ml-2">ثبت گزارش و تولید اعلان</span>
                        <Briefcase size={18} />
                    </Button>
                </div>
            </form>
            
            {leadData?.visitReports && leadData.visitReports.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">تاریخچه ملاقات‌ها</h3>
                    <div className="space-y-4">
                        {[...leadData.visitReports].reverse().map(report => (
                            <div key={report.id} className="p-4 border dark:border-gray-700 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-bold text-gray-800 dark:text-white">{report.type} در {report.location}</p>
                                    <span className="text-xs">{new Date(report.date).toLocaleString('fa-IR')}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 whitespace-pre-wrap"><b>خلاصه:</b> {report.summary}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 whitespace-pre-wrap"><b>نتایج:</b> {report.outcomes}</p>
                                {report.nextSteps && <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">اقدامات بعدی: {report.nextSteps}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
};