
import React, { useState } from 'react';
import type { AppreciationWarning } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Textarea } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Select } from '../../../ui/Select';
import { Award } from 'lucide-react';
import { EmployeeSearch } from '../../../EmployeeSearch';
import { APPRECIATION_WARNING_TYPES } from '../../../../constants';

interface AppreciationWarningFormProps {
  onSave: (data: { appreciationWarning: AppreciationWarning }) => void;
  selectedEmployee: string | null;
  onEmployeeSelect: (employeeName: string) => void;
}

export const AppreciationWarningForm: React.FC<AppreciationWarningFormProps> = ({ onSave, selectedEmployee, onEmployeeSelect }) => {
    const [formData, setFormData] = useState<Omit<AppreciationWarning, 'id' | 'date' | 'employeeName'>>({
        type: APPRECIATION_WARNING_TYPES[0],
        reason: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        if (id === 'type') {
            setFormData((prev) => ({ ...prev, type: value as AppreciationWarning['type'] }));
        } else {
            setFormData((prev) => ({ ...prev, [id]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!selectedEmployee) {
            alert("لطفاً ابتدا یک کارمند را جستجو و انتخاب کنید.");
            return;
        }
        const newRecord: AppreciationWarning = {
            ...formData,
            id: `PERF-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            employeeName: selectedEmployee,
        };
        onSave({ appreciationWarning: newRecord });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم تشویق، تقدیر یا تذکر عملکرد (3-2-4)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت و ارجاع شفاف پیشنهادات تشویق، تذکر کتبی یا اعطای پاداش.</p>
            </div>

            <EmployeeSearch selectedEmployee={selectedEmployee} onEmployeeSelect={onEmployeeSelect} />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Select id="type" label="نوع اقدام" value={formData.type} onChange={handleChange}>
                        {APPRECIATION_WARNING_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </Select>
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="reason" 
                        label="شرح کامل عملکرد یا دلیل اقدام" 
                        value={formData.reason} 
                        onChange={handleChange}
                        required
                        placeholder="دلایل و مصادیق عملکردی که منجر به این اقدام شده را به طور دقیق شرح دهید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!selectedEmployee}>
                        <span className="ml-2">ثبت و ابلاغ</span>
                        <Award size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
