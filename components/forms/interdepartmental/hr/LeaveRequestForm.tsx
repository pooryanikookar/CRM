
import React, { useState } from 'react';
import type { LeaveRequest } from '../../../../types';
import { Card } from '../../../ui/Card';
import { Input, Textarea } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Select } from '../../../ui/Select';
import { CalendarOff } from 'lucide-react';
import { EmployeeSearch } from '../../../EmployeeSearch';
import { LEAVE_TYPES } from '../../../../constants';

interface LeaveRequestFormProps {
  onSave: (data: { leaveRequest: LeaveRequest }) => void;
  selectedEmployee: string | null;
  onEmployeeSelect: (employeeName: string) => void;
}

export const LeaveRequestForm: React.FC<LeaveRequestFormProps> = ({ onSave, selectedEmployee, onEmployeeSelect }) => {
    const [formData, setFormData] = useState<Omit<LeaveRequest, 'id' | 'requestDate' | 'employeeName'>>({
        leaveType: LEAVE_TYPES[0],
        startDate: '',
        endDate: '',
        reason: '',
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
        const newRequest: LeaveRequest = {
            ...formData,
            id: `LEAVE-${Date.now()}`,
            requestDate: new Date().toISOString().split('T')[0],
            employeeName: selectedEmployee,
        };
        onSave({ leaveRequest: newRequest });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم درخواست مرخصی (3-2-2)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ثبت و پیگیری درخواست مرخصی پرسنل فروش یا پشتیبانی.</p>
            </div>

            <EmployeeSearch selectedEmployee={selectedEmployee} onEmployeeSelect={onEmployeeSelect} />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
                    <Select id="leaveType" label="نوع مرخصی" value={formData.leaveType} onChange={handleChange}>
                        {LEAVE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </Select>
                     <Input id="startDate" label="تاریخ شروع" type="date" value={formData.startDate} onChange={handleChange} required />
                     <Input id="endDate" label="تاریخ پایان" type="date" value={formData.endDate} onChange={handleChange} required />
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="reason" 
                        label="دلیل مرخصی" 
                        value={formData.reason} 
                        onChange={handleChange}
                        required
                        placeholder="لطفاً دلیل درخواست خود را به طور خلاصه شرح دهید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit" disabled={!selectedEmployee}>
                        <span className="ml-2">ارسال درخواست مرخصی</span>
                        <CalendarOff size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
