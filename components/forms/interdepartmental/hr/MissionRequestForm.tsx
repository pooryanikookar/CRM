
import React, { useState, useEffect } from 'react';
import type { MissionRequest } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input, Textarea } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Select } from '../../../ui/Select';
import { Briefcase } from 'lucide-react';
import { EmployeeSearch } from '../../../EmployeeSearch';
import { MISSION_TYPES } from '../../../../constants';

interface MissionRequestFormProps {
  onSave: (data: { missionRequest: MissionRequest }) => void;
  selectedEmployee: string | null;
  onEmployeeSelect: (employeeName: string) => void;
}

export const MissionRequestForm: React.FC<MissionRequestFormProps> = ({ onSave, selectedEmployee, onEmployeeSelect }) => {
    const [formData, setFormData] = useState<Omit<MissionRequest, 'id' | 'requestDate' | 'employeeName'>>({
        missionType: MISSION_TYPES[0],
        destination: '',
        startDate: '',
        endDate: '',
        objective: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!selectedEmployee) {
            alert("لطفاً ابتدا یک کارمند را جستجو و انتخاب کنید.");
            return;
        }
        const newRequest: MissionRequest = {
            ...formData,
            id: `MISS-${Date.now()}`,
            requestDate: new Date().toISOString().split('T')[0],
            employeeName: selectedEmployee,
        };
        onSave({ missionRequest: newRequest });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم درخواست ماموریت بازاریابی یا فروش (3-2-1)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت و پیگیری درخواست‌های ماموریت کاری کارشناسان.</p>
            </div>

            <EmployeeSearch selectedEmployee={selectedEmployee} onEmployeeSelect={onEmployeeSelect} />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Select id="missionType" label="نوع ماموریت" value={formData.missionType} onChange={handleChange}>
                        {MISSION_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </Select>
                     <Input id="destination" label="مقصد یا مهمان ماموریت" value={formData.destination} onChange={handleChange} required />
                     <Input id="startDate" label="تاریخ شروع" type="date" value={formData.startDate} onChange={handleChange} required />
                     <Input id="endDate" label="تاریخ پایان" type="date" value={formData.endDate} onChange={handleChange} required />
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="objective" 
                        label="شرح هدف ماموریت" 
                        value={formData.objective} 
                        onChange={handleChange}
                        required
                        placeholder="اهداف اصلی ماموریت را به طور خلاصه شرح دهید..."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!selectedEmployee}>
                        <span className="ml-2">ارسال درخواست ماموریت</span>
                        <Briefcase size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
