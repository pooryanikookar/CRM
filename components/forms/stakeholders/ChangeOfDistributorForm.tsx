
import React, { useState } from 'react';
import type { ChangeOfDistributor } from '../../../types';
import { Card } from '../../ui/Card';
import { Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { GitCommit } from 'lucide-react';
import { AgentSearch } from '../../AgentSearch';

interface ChangeOfDistributorFormProps {
  onSave: (data: { changeOfDistributor: ChangeOfDistributor }) => void;
}

export const ChangeOfDistributorForm: React.FC<ChangeOfDistributorFormProps> = ({ onSave }) => {
    const [previousAgent, setPreviousAgent] = useState<string | null>(null);
    const [newAgent, setNewAgent] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        transferDate: new Date().toISOString().split('T')[0],
        reason: '',
        transferredAccounts: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!previousAgent || !newAgent) {
            alert("لطفاً نماینده قبلی و جدید را انتخاب کنید.");
            return;
        }
        const newRecord: ChangeOfDistributor = {
            ...formData,
            id: `CDIST-${Date.now()}`,
            previousAgent,
            newAgent,
        };
        onSave({ changeOfDistributor: newRecord });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم انتقال/تغییر نمایندگی فروش (6-1)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">مدیریت فرآیند تغییر نماینده فروش برای مشتریان یا مناطق خاص.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <AgentSearch label="نماینده قبلی" selectedAgent={previousAgent} onAgentSelect={setPreviousAgent} />
                    <AgentSearch label="نماینده جدید" selectedAgent={newAgent} onAgentSelect={setNewAgent} />
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="transferredAccounts" 
                        label="فهرست حساب‌ها/مشتریان منتقل شده" 
                        value={formData.transferredAccounts} 
                        onChange={handleChange}
                        required
                        placeholder="شناسه یا نام مشتریان را با کاما جدا کنید."
                    />
                </div>
                <div className="mt-4">
                    <Textarea 
                        id="reason" 
                        label="شرح علت انتقال" 
                        value={formData.reason} 
                        onChange={handleChange}
                        required
                        placeholder="دلیل اصلی این تغییر را شرح دهید."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت انتقال و ابلاغ</span>
                        <GitCommit size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
