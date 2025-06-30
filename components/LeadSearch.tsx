import React, { useState, useEffect } from 'react';
import type { LeadData } from '../types';
import * as leadService from '../services/leadService';
import { Input } from './ui/Input';

interface LeadSearchProps {
  onLeadSelect: (lead: LeadData) => void;
}

export const LeadSearch: React.FC<LeadSearchProps> = ({ onLeadSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LeadData[]>([]);
  const [isFocused, setIsFocused] = useState(false);

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
    setIsFocused(false);
  };

  return (
    <div className="relative mb-6">
      <Input
        id="lead-search"
        label="جستجوی مشتری (توسط نام، شناسه سرنخ یا شناسه مشتری)"
        placeholder="جستجو..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        autoComplete="off"
      />
      {isFocused && searchResults.length > 0 && (
        <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
          {searchResults.map((lead) => (
            <li
              key={lead.leadId}
              onMouseDown={() => handleSelectLead(lead)}
              className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900 cursor-pointer"
            >
              {lead.fullName} ({lead.potentialCustomerId || lead.leadId})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};