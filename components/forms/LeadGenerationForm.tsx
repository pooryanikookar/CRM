import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Input, Textarea } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import type { LeadData } from '../../types';
import { LEAD_SOURCES } from '../../constants';
import { ArrowLeft, Search } from 'lucide-react';
import * as leadService from '../../services/leadService';

interface LeadGenerationFormProps {
  onNextStep: (data: Partial<LeadData>) => void;
  initialData: Partial<LeadData> | null;
  onLeadSelect: (lead: LeadData) => void;
}

const defaultFormData: Partial<LeadData> = {
    registrationDate: new Date().toISOString().split('T')[0],
    fullName: '',
    contactNumber: '',
    email: '',
    source: LEAD_SOURCES[0],
    productOfInterest: '',
    interestLevel: 3,
    notes: '',
};

export const LeadGenerationForm: React.FC<LeadGenerationFormProps> = ({ onNextStep, initialData, onLeadSelect }) => {
  const [formData, setFormData] = useState<Partial<LeadData>>(defaultFormData);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LeadData[]>([]);

  useEffect(() => {
    setFormData(initialData || defaultFormData);
  }, [initialData]);

  useEffect(() => {
      if (searchQuery.length > 1) {
          setSearchResults(leadService.searchLeads(searchQuery));
      } else {
          setSearchResults([]);
      }
  }, [searchQuery]);

  const handleSelectLead = (lead: LeadData) => {
      onLeadSelect(lead);
      setSearchQuery('');
      setSearchResults([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === 'interestLevel' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNextStep(formData);
  };

  return (
    <Card>
      <div className="border-b pb-4 mb-6 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم جمع‌آوری سرنخ (MKT-01)</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">هدف: ثبت مشخصات اولیه مشتریان بالقوه یا به‌روزرسانی سرنخ‌های موجود.</p>
      </div>

      <div className="relative mb-6">
          <Input 
              id="lead-search" 
              label="جستجوی سرنخ (توسط نام یا شناسه)"
              placeholder="جستجو..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchResults.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
                  {searchResults.map((lead) => (
                      <li 
                          key={lead.leadId} 
                          onClick={() => handleSelectLead(lead)}
                          className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900 cursor-pointer"
                      >
                          {lead.fullName} ({lead.leadId})
                      </li>
                  ))}
              </ul>
          )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Input id="leadId" label="شناسه سرنخ" value={formData.leadId || 'در انتظار ثبت...'} disabled />
          <Input id="fullName" label="نام و نام خانوادگی مشتری" value={formData.fullName} onChange={handleChange} required />
          <Input id="contactNumber" label="شماره تماس" type="tel" value={formData.contactNumber} onChange={handleChange} required />
          <Input id="email" label="ایمیل مشتری" type="email" value={formData.email} onChange={handleChange} required />
          <Select id="source" label="منبع سرنخ" value={formData.source} onChange={handleChange}>
            {LEAD_SOURCES.map(source => <option key={source} value={source}>{source}</option>)}
          </Select>
          <Input id="registrationDate" label="تاریخ ثبت سرنخ" type="date" value={formData.registrationDate} onChange={handleChange} required />
          <Input id="productOfInterest" label="محصول یا خدمت مورد علاقه" value={formData.productOfInterest} onChange={handleChange} />
        </div>
        <div className="mt-4">
             <label htmlFor="interestLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">سطح علاقه‌مندی (امتیازدهی)</label>
             <div className="flex items-center gap-4">
                <span className="text-gray-500 dark:text-gray-400">کم</span>
                <input
                    id="interestLevel"
                    type="range"
                    min="1"
                    max="5"
                    value={formData.interestLevel}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                 <span className="text-gray-500 dark:text-gray-400">زیاد</span>
                 <span className="font-bold text-indigo-600 dark:text-indigo-400 w-4">{formData.interestLevel}</span>
             </div>
        </div>
         <div className="mt-6">
             <Textarea id="notes" label="توضیحات تکمیلی" value={formData.notes} onChange={handleChange} />
         </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit">
            <span className="ml-2">ذخیره و تولید اعلان</span>
            <ArrowLeft size={18} />
          </Button>
        </div>
      </form>
    </Card>
  );
};