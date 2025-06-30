import React, { useState, useEffect } from 'react';
import { SUPPLIER_LIST } from '../constants';
import { Input } from './ui/Input';

interface SupplierSearchProps {
  onSupplierSelect: (supplierName: string) => void;
  selectedSupplier: string | null;
}

export const SupplierSearch: React.FC<SupplierSearchProps> = ({ onSupplierSelect, selectedSupplier }) => {
  const [searchQuery, setSearchQuery] = useState(selectedSupplier || '');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  
  useEffect(() => {
      setSearchQuery(selectedSupplier || '');
  }, [selectedSupplier]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setSearchResults(SUPPLIER_LIST.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSelect = (supplier: string) => {
    onSupplierSelect(supplier);
    setSearchQuery(supplier);
    setSearchResults([]);
    setIsFocused(false);
  };

  return (
    <div className="relative mb-6">
      <Input
        id="supplier-search"
        label="جستجوی تامین‌کننده"
        placeholder="نام تامین‌کننده را وارد کنید..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        autoComplete="off"
        required
      />
      {isFocused && searchResults.length > 0 && (
        <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
          {searchResults.map((supplier) => (
            <li
              key={supplier}
              onMouseDown={() => handleSelect(supplier)}
              className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900 cursor-pointer"
            >
              {supplier}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};