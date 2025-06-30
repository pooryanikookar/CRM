
import React, { useState, useEffect } from 'react';
import { EMPLOYEE_LIST } from '../constants';
import { Input } from './ui/Input';

interface EmployeeSearchProps {
  onEmployeeSelect: (employeeName: string) => void;
  selectedEmployee: string | null;
}

export const EmployeeSearch: React.FC<EmployeeSearchProps> = ({ onEmployeeSelect, selectedEmployee }) => {
  const [searchQuery, setSearchQuery] = useState(selectedEmployee || '');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  
  useEffect(() => {
      setSearchQuery(selectedEmployee || '');
  }, [selectedEmployee]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setSearchResults(EMPLOYEE_LIST.filter(e => e.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSelect = (employee: string) => {
    onEmployeeSelect(employee);
    setSearchQuery(employee);
    setSearchResults([]);
    setIsFocused(false);
  };

  return (
    <div className="relative mb-6">
      <Input
        id="employee-search"
        label="جستجوی پرسنل"
        placeholder="نام پرسنل یا واحد را وارد کنید..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        autoComplete="off"
        required
      />
      {isFocused && searchResults.length > 0 && (
        <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
          {searchResults.map((employee) => (
            <li
              key={employee}
              onMouseDown={() => handleSelect(employee)}
              className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900 cursor-pointer"
            >
              {employee}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
