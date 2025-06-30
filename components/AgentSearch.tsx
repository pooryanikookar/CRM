
import React, { useState, useEffect } from 'react';
import { AGENT_LIST } from '../constants';
import { Input } from './ui/Input';

interface AgentSearchProps {
  onAgentSelect: (agentName: string) => void;
  selectedAgent: string | null;
  label: string;
}

export const AgentSearch: React.FC<AgentSearchProps> = ({ onAgentSelect, selectedAgent, label }) => {
  const [searchQuery, setSearchQuery] = useState(selectedAgent || '');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  
  useEffect(() => {
      setSearchQuery(selectedAgent || '');
  }, [selectedAgent]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setSearchResults(AGENT_LIST.filter(e => e.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSelect = (agent: string) => {
    onAgentSelect(agent);
    setSearchQuery(agent);
    setSearchResults([]);
    setIsFocused(false);
  };

  return (
    <div className="relative mb-4">
      <Input
        id="agent-search"
        label={label}
        placeholder="نام نمایندگی را وارد کنید..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        autoComplete="off"
        required
      />
      {isFocused && searchResults.length > 0 && (
        <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
          {searchResults.map((agent) => (
            <li
              key={agent}
              onMouseDown={() => handleSelect(agent)}
              className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900 cursor-pointer"
            >
              {agent}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
