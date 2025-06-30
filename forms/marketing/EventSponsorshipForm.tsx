import React, { useState } from 'react';
import type { EventSponsorship } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { CircleDollarSign } from 'lucide-react';
import { Select } from '../../ui/Select';
import { SPONSORSHIP_TYPES } from '../../../constants';

interface EventSponsorshipFormProps {
  onSave: (data: { eventSponsorship: EventSponsorship }) => void;
}

export const EventSponsorshipForm: React.FC<EventSponsorshipFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<EventSponsorship, 'id'>>({
        eventName: '',
        sponsorshipType: 'درخواست حمایت',
        sponsorshipLevel: '',
        cost: 0,
        benefits: '',
        outcome: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: id === 'cost' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newSponsorship: EventSponsorship = {
            ...formData,
            id: `SPON-${Date.now()}`,
        };
        onSave({ eventSponsorship: newSponsorship });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم درخواست و گزارش حمایت رویداد (5-7)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">مدیریت فرآیندهای مربوط به حمایت مالی از رویدادها یا دریافت حمایت.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                     <Input id="eventName" label="نام رویداد" value={formData.eventName} onChange={handleChange} required />
                     <Select id="sponsorshipType" label="نوع فرم" value={formData.sponsorshipType} onChange={handleChange}>
                        {SPONSORSHIP_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                     </Select>
                     <Input id="sponsorshipLevel" label="سطح حمایت (پلاتینیوم، طلایی...)" value={formData.sponsorshipLevel} onChange={handleChange} />
                     <Input id="cost" label="هزینه/ارزش حمایت (ریال)" type="number" value={formData.cost} onChange={handleChange} required />
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="benefits" 
                        label="مزایای ارائه شده یا مورد انتظار" 
                        value={formData.benefits} 
                        onChange={handleChange}
                        placeholder="مثال: درج لوگو، سخنرانی، ارائه غرفه و..."
                    />
                </div>
                 <div className="mt-4">
                    <Textarea 
                        id="outcome" 
                        label="نتیجه/گزارش نهایی (در صورت وجود)" 
                        value={formData.outcome} 
                        onChange={handleChange}
                        placeholder="گزارش نهایی از نتایج و بازدهی حمایت مالی."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت</span>
                        <CircleDollarSign size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};