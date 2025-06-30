
import React, { useState } from 'react';
import type { ContentCalendarEntry } from '../../../types';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { CalendarDays, PlusCircle, Trash2 } from 'lucide-react';
import { CONTENT_PLATFORMS, CONTENT_STATUSES } from '../../../constants';

interface ContentCalendarFormProps {
    onSave: (data: { contentCalendar: ContentCalendarEntry[] }) => void;
}

export const ContentCalendarForm: React.FC<ContentCalendarFormProps> = ({ onSave }) => {
    const [entries, setEntries] = useState<ContentCalendarEntry[]>([
        { id: `entry-${Date.now()}`, event: '', platform: CONTENT_PLATFORMS[0], publishDate: new Date().toISOString().split('T')[0], status: CONTENT_STATUSES[0] }
    ]);

    const handleEntryChange = (index: number, field: keyof ContentCalendarEntry, value: string) => {
        const newEntries = [...entries];
        (newEntries[index] as any)[field] = value;
        setEntries(newEntries);
    };

    const addEntry = () => {
        setEntries(prev => [
            ...prev,
            { id: `entry-${Date.now()}`, event: '', platform: CONTENT_PLATFORMS[0], publishDate: new Date().toISOString().split('T')[0], status: CONTENT_STATUSES[0] }
        ]);
    };

    const removeEntry = (index: number) => {
        setEntries(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ contentCalendar: entries });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم تقویم انتشار محتوا (4-2)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">برنامه‌ریزی زمانی برای تولید و انتشار محتوا در پلتفرم‌های مختلف.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    {entries.map((entry, index) => (
                        <div key={entry.id} className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-2 p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                            <div className="md:col-span-4">
                                <Input label="عنوان محتوا/رویداد" id={`event-${index}`} value={entry.event} onChange={e => handleEntryChange(index, 'event', e.target.value)} />
                            </div>
                            <div className="md:col-span-3">
                                <Select label="پلتفرم" id={`platform-${index}`} value={entry.platform} onChange={e => handleEntryChange(index, 'platform', e.target.value)}>
                                    {CONTENT_PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                                </Select>
                            </div>
                             <div className="md:col-span-2">
                                <Input label="تاریخ انتشار" id={`publishDate-${index}`} type="date" value={entry.publishDate} onChange={e => handleEntryChange(index, 'publishDate', e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                                <Select label="وضعیت" id={`status-${index}`} value={entry.status} onChange={e => handleEntryChange(index, 'status', e.target.value)}>
                                    {CONTENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                </Select>
                            </div>
                            <div className="md:col-span-1 flex items-end pb-4">
                               {entries.length > 1 && <Button type="button" variant="danger" size="sm" onClick={() => removeEntry(index)}><Trash2 size={16} /></Button>}
                            </div>
                        </div>
                    ))}
                </div>

                 <Button type="button" variant="ghost" className="mt-4" onClick={addEntry}>
                    <PlusCircle size={16} className="ml-2"/> افزودن ردیف جدید
                </Button>

                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت تقویم و تولید اعلان</span>
                        <CalendarDays size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
