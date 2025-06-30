import React, { useState } from 'react';
import type { SalesProcessImprovement } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { Lightbulb } from 'lucide-react';
import { IMPROVEMENT_STATUSES } from '../../../constants';

interface SalesProcessImprovementFormProps {
  onSave: (data: { salesProcessImprovement: SalesProcessImprovement }) => void;
}

export const SalesProcessImprovementForm: React.FC<SalesProcessImprovementFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<SalesProcessImprovement, 'id'>>({
        reportDate: new Date().toISOString().split('T')[0],
        processArea: '',
        issueDescription: '',
        proposedSolution: '',
        status: IMPROVEMENT_STATUSES[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newImprovement: SalesProcessImprovement = {
            ...formData,
            id: `SPI-${Date.now()}`,
        };
        onSave({ salesProcessImprovement: newImprovement });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم ثبت و پایش نقاط بهبود فرآیند فروش (9-6)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">شناسایی، ثبت و پیگیری حل مشکلات و بهبودهای فرآیند فروش.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="processArea" label="بخش/فرآیند نیازمند بهبود" value={formData.processArea} onChange={handleChange} required placeholder="مثال: مرحله نیازسنجی، فرآیند صدور فاکتور"/>
                    <Select id="status" label="وضعیت" value={formData.status} onChange={handleChange}>
                        {IMPROVEMENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="issueDescription" 
                        label="شرح کامل مشکل یا نقطه ضعف" 
                        value={formData.issueDescription} 
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="proposedSolution" 
                        label="راهکار پیشنهادی برای بهبود" 
                        value={formData.proposedSolution} 
                        onChange={handleChange}
                        required
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت پیشنهاد بهبود</span>
                        <Lightbulb size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};