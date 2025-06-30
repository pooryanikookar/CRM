import type { LeadData } from '../types';

const LEADS_STORAGE_KEY = 'crm_leads_data';

// Function to get all leads from localStorage
export const getLeads = (): LeadData[] => {
    try {
        const leadsJson = localStorage.getItem(LEADS_STORAGE_KEY);
        return leadsJson ? JSON.parse(leadsJson) : [];
    } catch (error) {
        console.error("Error reading leads from localStorage", error);
        return [];
    }
};

// Function to save a lead (creates or updates)
export const saveLead = (leadToSave: LeadData): void => {
    if (!leadToSave.leadId) {
        console.error("Cannot save lead without a leadId");
        return;
    }
    const leads = getLeads();
    const existingLeadIndex = leads.findIndex(lead => lead.leadId === leadToSave.leadId);

    if (existingLeadIndex > -1) {
        // Update existing lead
        leads[existingLeadIndex] = { ...leads[existingLeadIndex], ...leadToSave };
    } else {
        // Add new lead
        leads.push(leadToSave);
    }

    try {
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch (error) {
        console.error("Error saving lead to localStorage", error);
    }
};

// Function to search for leads by name or ID
export const searchLeads = (query: string): LeadData[] => {
    if (!query) return [];
    const lowercasedQuery = query.toLowerCase();
    const leads = getLeads();

    return leads.filter(lead => 
        lead.fullName.toLowerCase().includes(lowercasedQuery) ||
        lead.leadId.toLowerCase().includes(lowercasedQuery) ||
        (lead.potentialCustomerId && lead.potentialCustomerId.toLowerCase().includes(lowercasedQuery))
    );
};