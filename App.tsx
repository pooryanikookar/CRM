import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LeadGenerationForm } from './components/forms/LeadGenerationForm';
import { LeadRegistrationForm } from './components/forms/LeadRegistrationForm';
import { NeedsAndQualificationForm } from './components/forms/NeedsAndQualificationForm';
import { CallContactLogForm } from './components/forms/CallContactLogForm';
import { QuotationForm } from './components/forms/QuotationForm';
import { QuotationResponseForm } from './components/forms/QuotationResponseForm';
import { SalesOrderForm } from './components/forms/SalesOrderForm';
import { SalesContractForm } from './components/forms/SalesContractForm';
import { DeliveryWorkOrderForm } from './components/forms/DeliveryWorkOrderForm';
import { DeliveryReceptionForm } from './components/forms/DeliveryReceptionForm';
import { MarketingActivityForm } from './components/forms/MarketingActivityForm';
import { ComplaintFeedbackForm } from './components/forms/ComplaintFeedbackForm';
import { CustomerSatisfactionSurveyForm } from './components/forms/CustomerSatisfactionSurveyForm';
import { CustomerFollowUpForm } from './components/forms/CustomerFollowUpForm';
import { VisitMeetingReportForm } from './components/forms/VisitMeetingReportForm';
import { ProductIntroductionForm } from './components/forms/ProductIntroductionForm';
import { PlaceholderForm } from './components/forms/PlaceholderForm';
import type { LeadData, WorkflowStep, WorkflowCategory, DigitalCampaign, ContentCalendarEntry, EmailSmsCampaign, ArticlePublishing, OnlineInquiry, DigitalLead, WebsiteUpdateRequest, OnlineExperienceFeedback, CampaignRequest, CampaignBudget, CampaignEffectiveness, MissionRequest, LeaveRequest, PolicyNotification, AppreciationWarning, PurchaseQuotationRequest, SupplyOrderRequest, InventoryReconciliation, SupplierFeedback, ReturnedGoods, ProductionRequest, WarehouseReservation, QCReport, ReleaseRequest, DiscrepancyReport, InventoryAdjustment, ContentRequest, ContentDataCollection, ContentValidation, ContentPublication, ChangeOfDistributor, MarketAssessmentReport, CompetitorAnalysis, MarketingStrategyReview, NewPartnershipRequest, AgentPerformanceEvaluation, StakeholderFeedback, TrainingEffectiveness, ProjectReview, SalesPeriodicReport, FieldSalesFeedback, PointOfSaleEvaluation, SampleProductRegistration, OnSiteAftersalesEvaluation, OnSiteSatisfactionSurvey, FocusGroupFeedback, StoreInventoryCheck, LostLeadAnalysis, ExhibitionVisitorLog, EventReport, PromoItemDistribution, CampaignRiskManagement, AdLicensing, AdMaterialRequest, CoMarketingRequest, EventSponsorship, CustomerCreditInquiry, ProformaInvoiceRequest, Receipt, InvoiceRequest, AccountClearance, CommissionReport, SalesIncentiveEffectiveness, B2BPartnershipRequest, B2BOrder, B2COrder, B2GTender, SalesProcessImprovement, PostMortemReview } from './types';
import NotificationGenerator from './components/NotificationGenerator';
import * as leadService from './services/leadService';
import { WORKFLOW_CATEGORIES, WORKFLOW_STEPS } from './constants';
import { DigitalCampaignForm } from './components/forms/marketing/DigitalCampaignForm';
import { ContentCalendarForm } from './components/forms/marketing/ContentCalendarForm';
import { EmailSmsCampaignForm } from './components/forms/marketing/EmailSmsCampaignForm';
import { ArticlePublishingForm } from './components/forms/marketing/ArticlePublishingForm';
import { OnlineInquiryForm } from './components/forms/marketing/OnlineInquiryForm';
import { DigitalLeadCaptureForm } from './components/forms/marketing/DigitalLeadCaptureForm';
import { OnlineBehaviorAnalysisForm } from './components/forms/marketing/OnlineBehaviorAnalysisForm';
import { WebsiteUpdateRequestForm } from './components/forms/marketing/WebsiteUpdateRequestForm';
import { OnlineExperienceFeedbackForm } from './components/forms/marketing/OnlineExperienceFeedbackForm';
import { DigitalAdEffectivenessForm } from './components/forms/marketing/DigitalAdEffectivenessForm';
import { CampaignRequestForm } from './components/forms/marketing/CampaignRequestForm';
import { CampaignBudgetForm } from './components/forms/marketing/CampaignBudgetForm';
import { CampaignEffectivenessForm } from './components/forms/marketing/CampaignEffectivenessForm';
import { SponsoredContentForm } from './components/forms/marketing/SponsoredContentForm';
import { MissionRequestForm } from './components/forms/interdepartmental/hr/MissionRequestForm';
import { LeaveRequestForm } from './components/forms/interdepartmental/hr/LeaveRequestForm';
import { PolicyNotificationForm } from './components/forms/interdepartmental/hr/PolicyNotificationForm';
import { AppreciationWarningForm } from './components/forms/interdepartmental/hr/AppreciationWarningForm';
import { PurchaseQuotationRequestForm } from './components/forms/interdepartmental/commercial/PurchaseQuotationRequestForm';
import { SupplyOrderRequestForm } from './components/forms/interdepartmental/commercial/SupplyOrderRequestForm';
import { InventoryReconciliationForm } from './components/forms/interdepartmental/commercial/InventoryReconciliationForm';
import { SupplierFeedbackForm } from './components/forms/interdepartmental/commercial/SupplierFeedbackForm';
import { ReturnedGoodsForm } from './components/forms/interdepartmental/commercial/ReturnedGoodsForm';
import { ProductionRequestForm } from './components/forms/interdepartmental/production/ProductionRequestForm';
import { WarehouseReservationForm } from './components/forms/interdepartmental/production/WarehouseReservationForm';
import { QCReportForm } from './components/forms/interdepartmental/production/QCReportForm';
import { ReleaseRequestForm } from './components/forms/interdepartmental/production/ReleaseRequestForm';
import { DiscrepancyReportForm } from './components/forms/interdepartmental/production/DiscrepancyReportForm';
import { InventoryAdjustmentForm } from './components/forms/interdepartmental/production/InventoryAdjustmentForm';
import { ContentRequestForm } from './components/forms/marketing/content/ContentRequestForm';
import { ContentDataCollectionForm } from './components/forms/marketing/content/ContentDataCollectionForm';
import { ContentValidationForm } from './components/forms/marketing/content/ContentValidationForm';
import { ContentPublicationForm } from './components/forms/marketing/content/ContentPublicationForm';
import { ChangeOfDistributorForm } from './components/forms/stakeholders/ChangeOfDistributorForm';
import { MarketAssessmentReportForm } from './components/forms/stakeholders/MarketAssessmentReportForm';
import { CompetitorAnalysisForm } from './components/forms/stakeholders/CompetitorAnalysisForm';
import { MarketingStrategyReviewForm } from './components/forms/stakeholders/MarketingStrategyReviewForm';
import { NewPartnershipRequestForm } from './components/forms/stakeholders/NewPartnershipRequestForm';
import { AgentPerformanceEvaluationForm } from './components/forms/stakeholders/AgentPerformanceEvaluationForm';
import { StakeholderFeedbackForm } from './components/forms/stakeholders/StakeholderFeedbackForm';
import { TrainingEffectivenessForm } from './components/forms/stakeholders/TrainingEffectivenessForm';
import { ProjectReviewForm } from './components/forms/stakeholders/ProjectReviewForm';
import { SalesPeriodicReportForm } from './components/forms/customer/SalesPeriodicReportForm';
import { FieldSalesFeedbackForm } from './components/forms/customer/FieldSalesFeedbackForm';
import { PointOfSaleEvaluationForm } from './components/forms/customer/PointOfSaleEvaluationForm';
import { SampleProductRegistrationForm } from './components/forms/customer/SampleProductRegistrationForm';
import { OnSiteAftersalesEvaluationForm } from './components/forms/customer/OnSiteAftersalesEvaluationForm';
import { OnSiteSatisfactionSurveyForm } from './components/forms/customer/OnSiteSatisfactionSurveyForm';
import { FocusGroupFeedbackForm } from './components/forms/customer/FocusGroupFeedbackForm';
import { StoreInventoryCheckForm } from './components/forms/customer/StoreInventoryCheckForm';
import { LostLeadAnalysisForm } from './components/forms/LostLeadAnalysisForm';
import { ExhibitionVisitorLogForm } from './components/forms/marketing/ExhibitionVisitorLogForm';
import { EventReportForm } from './components/forms/marketing/EventReportForm';
import { PromoItemDistributionForm } from './components/forms/marketing/PromoItemDistributionForm';
import { CampaignRiskManagementForm } from './components/forms/marketing/CampaignRiskManagementForm';
import { AdLicensingForm } from './components/forms/marketing/AdLicensingForm';
import { AdMaterialRequestForm } from './components/forms/marketing/AdMaterialRequestForm';
import { CoMarketingForm } from './components/forms/marketing/CoMarketingForm';
import { EventSponsorshipForm } from './components/forms/marketing/EventSponsorshipForm';
import { CustomerCreditInquiryForm } from './components/forms/interdepartmental/financial/CustomerCreditInquiryForm';
import { ProformaInvoiceIssuanceForm } from './components/forms/interdepartmental/financial/ProformaInvoiceIssuanceForm';
import { ReceiptsForm } from './components/forms/interdepartmental/financial/ReceiptsForm';
import { InvoiceRequestForm } from './components/forms/interdepartmental/financial/InvoiceRequestForm';
import { AccountClearanceReportForm } from './components/forms/interdepartmental/financial/AccountClearanceReportForm';
import { CommissionReportForm } from './components/forms/interdepartmental/financial/CommissionReportForm';
import { SalesIncentiveEffectivenessForm } from './components/forms/stakeholders/SalesIncentiveEffectivenessForm';
import { B2BPartnershipRequestForm } from './components/forms/stakeholders/B2BPartnershipRequestForm';
import { B2BOrderForm } from './components/forms/stakeholders/B2BOrderForm';
import { B2COrderForm } from './components/forms/stakeholders/B2COrderForm';
import { B2GTenderForm } from './components/forms/stakeholders/B2GTenderForm';
import { SalesProcessImprovementForm } from './components/forms/stakeholders/SalesProcessImprovementForm';
import { PostMortemReviewForm } from './components/forms/stakeholders/PostMortemReviewForm';


const componentMap: { [key: string]: React.FC<any> } = {
  '1-1': LeadGenerationForm,
  '1-2': LeadRegistrationForm,
  '1-3': NeedsAndQualificationForm,
  '1-4': CallContactLogForm,
  '1-5': CustomerFollowUpForm,
  '1-6': VisitMeetingReportForm,
  '1-7': ProductIntroductionForm,
  '1-8': QuotationForm,
  '1-8-response': QuotationResponseForm, // Custom step for response
  '1-9': SalesOrderForm,
  '1-10': SalesContractForm,
  '1-11': ComplaintFeedbackForm,
  '1-12': CustomerSatisfactionSurveyForm,
  '1-16': MarketingActivityForm,
  'mkt-08': DeliveryWorkOrderForm,
  'mkt-09': DeliveryReceptionForm,
  '9-1': LostLeadAnalysisForm,
  // --- Customer Management Forms ---
  '1-17': SalesPeriodicReportForm,
  '2-4': FieldSalesFeedbackForm,
  '2-5': PointOfSaleEvaluationForm,
  '2-6': SampleProductRegistrationForm,
  '2-8': OnSiteAftersalesEvaluationForm,
  '2-9': OnSiteSatisfactionSurveyForm,
  '2-10': FocusGroupFeedbackForm,
  '2-11': StoreInventoryCheckForm,
  // --- Marketing Forms ---
  '2-1': ExhibitionVisitorLogForm,
  '2-3': EventReportForm,
  '2-7': PromoItemDistributionForm,
  '4-1': DigitalCampaignForm,
  '4-2': ContentCalendarForm,
  '4-3': ArticlePublishingForm,
  '4-4': OnlineInquiryForm,
  '4-6': DigitalLeadCaptureForm,
  '4-7': OnlineBehaviorAnalysisForm,
  '4-8': WebsiteUpdateRequestForm,
  '4-9': SponsoredContentForm,
  '4-10': EmailSmsCampaignForm,
  '4-11': DigitalAdEffectivenessForm,
  '4-12': OnlineExperienceFeedbackForm,
  '4-13': CampaignRiskManagementForm,
  '5-1': CampaignRequestForm,
  '5-2': CampaignBudgetForm,
  '5-3': AdLicensingForm,
  '5-4': CampaignEffectivenessForm,
  '5-5': AdMaterialRequestForm,
  '5-6': CoMarketingForm,
  '5-7': EventSponsorshipForm,
  '10-1': ContentRequestForm,
  '11-1': ContentDataCollectionForm,
  '12-1': ContentValidationForm,
  '13-1': ContentPublicationForm,


  '1-15': PlaceholderForm,
  '1-13': PlaceholderForm,
  '1-14': PlaceholderForm,
  '9-10': PlaceholderForm,
  // --- Inter-departmental Forms ---
  '3-1-1': CustomerCreditInquiryForm,
  '3-1-2': ProformaInvoiceIssuanceForm,
  '3-1-3': ReceiptsForm,
  '3-1-4': InvoiceRequestForm,
  '3-1-5': AccountClearanceReportForm,
  '3-1-6': CommissionReportForm,
  '3-2-1': MissionRequestForm,
  '3-2-2': LeaveRequestForm,
  '3-2-3': PolicyNotificationForm,
  '3-2-4': AppreciationWarningForm,
  '3-3-1': PurchaseQuotationRequestForm,
  '3-3-2': SupplyOrderRequestForm,
  '3-3-3': InventoryReconciliationForm,
  '3-3-4': SupplierFeedbackForm,
  '3-3-5': ReturnedGoodsForm,
  '3-4-1': ProductionRequestForm,
  '3-4-2': WarehouseReservationForm,
  '3-4-3': QCReportForm,
  '3-4-4': ReleaseRequestForm,
  '3-4-5': DiscrepancyReportForm,
  '3-4-6': InventoryAdjustmentForm,
  // --- Stakeholders & Evaluation Forms ---
  '6-1': ChangeOfDistributorForm,
  '6-2': NewPartnershipRequestForm,
  '6-3': AgentPerformanceEvaluationForm,
  '6-4': StakeholderFeedbackForm,
  '7-1': MarketAssessmentReportForm,
  '7-2': CompetitorAnalysisForm,
  '7-4': TrainingEffectivenessForm,
  '7-5': SalesIncentiveEffectivenessForm,
  '7-6': MarketingStrategyReviewForm,
  '7-7': ProjectReviewForm,
  '8-1': B2BPartnershipRequestForm,
  '8-2': B2BOrderForm,
  '8-3': B2COrderForm,
  '8-4': B2GTenderForm,
  '9-6': SalesProcessImprovementForm,
  '9-7': PostMortemReviewForm,
};


export default function App(): React.ReactNode {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>(WORKFLOW_STEPS[0]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [latestLeadData, setLatestLeadData] = useState<LeadData | null>(null);
  const [activeCategory, setActiveCategory] = useState<WorkflowCategory>('acquisition_sales');
  const [completedAcquisitionSteps, setCompletedAcquisitionSteps] = useState<Set<string>>(new Set());
  const [completedMarketingSteps, setCompletedMarketingSteps] = useState<Set<string>>(new Set());
  const [completedInterDepartmentalSteps, setCompletedInterDepartmentalSteps] = useState<Set<string>>(new Set());
  const [completedEvaluationSteps, setCompletedEvaluationSteps] = useState<Set<string>>(new Set());
  const [completedCustomerManagementSteps, setCompletedCustomerManagementSteps] = useState<Set<string>>(new Set());
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);


  const [marketingData, setMarketingData] = useState({
      digitalCampaigns: [] as DigitalCampaign[],
      contentCalendarEntries: [] as ContentCalendarEntry[],
      emailSmsCampaigns: [] as EmailSmsCampaign[],
      articles: [] as ArticlePublishing[],
      onlineInquiries: [] as OnlineInquiry[],
      digitalLeads: [] as DigitalLead[],
      websiteUpdateRequests: [] as WebsiteUpdateRequest[],
      onlineFeedbacks: [] as OnlineExperienceFeedback[],
      campaignRequests: [] as CampaignRequest[],
      campaignBudgets: [] as CampaignBudget[],
      campaignEffectivenessReports: [] as CampaignEffectiveness[],
      contentRequests: [] as ContentRequest[],
      contentDataCollections: [] as ContentDataCollection[],
      contentValidations: [] as ContentValidation[],
      contentPublications: [] as ContentPublication[],
      exhibitionVisitorLogs: [] as ExhibitionVisitorLog[],
      eventReports: [] as EventReport[],
      promoItemDistributions: [] as PromoItemDistribution[],
      campaignRiskManagements: [] as CampaignRiskManagement[],
      adLicensings: [] as AdLicensing[],
      adMaterialRequests: [] as AdMaterialRequest[],
      coMarketingRequests: [] as CoMarketingRequest[],
      eventSponsorships: [] as EventSponsorship[],
  });

  const [interDepartmentalData, setInterDepartmentalData] = useState({
      missionRequests: [] as MissionRequest[],
      leaveRequests: [] as LeaveRequest[],
      policyNotifications: [] as PolicyNotification[],
      appreciationWarnings: [] as AppreciationWarning[],
      purchaseQuotationRequests: [] as PurchaseQuotationRequest[],
      supplyOrderRequests: [] as SupplyOrderRequest[],
      inventoryReconciliations: [] as InventoryReconciliation[],
      supplierFeedbacks: [] as SupplierFeedback[],
      returnedGoods: [] as ReturnedGoods[],
      productionRequests: [] as ProductionRequest[],
      warehouseReservations: [] as WarehouseReservation[],
      qcReports: [] as QCReport[],
      releaseRequests: [] as ReleaseRequest[],
      discrepancyReports: [] as DiscrepancyReport[],
      inventoryAdjustments: [] as InventoryAdjustment[],
      customerCreditInquiries: [] as CustomerCreditInquiry[],
      proformaInvoiceRequests: [] as ProformaInvoiceRequest[],
      receipts: [] as Receipt[],
      invoiceRequests: [] as InvoiceRequest[],
      accountClearances: [] as AccountClearance[],
      commissionReports: [] as CommissionReport[],
  });
  
  const [evaluationData, setEvaluationData] = useState({
      changeOfDistributors: [] as ChangeOfDistributor[],
      marketAssessments: [] as MarketAssessmentReport[],
      competitorAnalyses: [] as CompetitorAnalysis[],
      marketingStrategyReviews: [] as MarketingStrategyReview[],
      newPartnershipRequests: [] as NewPartnershipRequest[],
      agentPerformanceEvaluations: [] as AgentPerformanceEvaluation[],
      stakeholderFeedbacks: [] as StakeholderFeedback[],
      trainingEffectivenessReports: [] as TrainingEffectiveness[],
      projectReviews: [] as ProjectReview[],
      salesIncentiveEffectivenessReports: [] as SalesIncentiveEffectiveness[],
      b2bPartnershipRequests: [] as B2BPartnershipRequest[],
      b2bOrders: [] as B2BOrder[],
      b2cOrders: [] as B2COrder[],
      b2gTenders: [] as B2GTender[],
      salesProcessImprovements: [] as SalesProcessImprovement[],
      postMortemReviews: [] as PostMortemReview[],
  });
  
  const [customerManagementData, setCustomerManagementData] = useState({
    salesPeriodicReports: [] as SalesPeriodicReport[],
    fieldSalesFeedbacks: [] as FieldSalesFeedback[],
    pointOfSaleEvaluations: [] as PointOfSaleEvaluation[],
    sampleProductRegistrations: [] as SampleProductRegistration[],
    onSiteAftersalesEvaluations: [] as OnSiteAftersalesEvaluation[],
    onSiteSatisfactionSurveys: [] as OnSiteSatisfactionSurvey[],
    focusGroupFeedbacks: [] as FocusGroupFeedback[],
    storeInventoryChecks: [] as StoreInventoryCheck[],
  });


  const handleSave = (data: Partial<LeadData>) => {
    
    if (activeCategory === 'marketing_automation') {
        let marketingInfo: Partial<LeadData> = {
            leadId: 'MKT-GLOBAL',
            fullName: 'تیم بازاریابی',
            email: 'marketing@internal.com',
        };

        if ('digitalCampaign' in data && data.digitalCampaign) {
            setMarketingData(prev => ({...prev, digitalCampaigns: [...prev.digitalCampaigns, data.digitalCampaign as DigitalCampaign]}));
            marketingInfo = { ...marketingInfo, digitalCampaign: data.digitalCampaign };
        } else if ('contentCalendar' in data && data.contentCalendar) {
            setMarketingData(prev => ({...prev, contentCalendarEntries: [...prev.contentCalendarEntries, ...data.contentCalendar as ContentCalendarEntry[]]}));
            marketingInfo = { ...marketingInfo, contentCalendar: data.contentCalendar };
        } else if ('emailSmsCampaign' in data && data.emailSmsCampaign) {
            setMarketingData(prev => ({...prev, emailSmsCampaigns: [...prev.emailSmsCampaigns, data.emailSmsCampaign as EmailSmsCampaign]}));
            marketingInfo = { ...marketingInfo, emailSmsCampaign: data.emailSmsCampaign };
        } else if ('articlePublishing' in data && data.articlePublishing) {
            setMarketingData(prev => ({...prev, articles: [...prev.articles, data.articlePublishing as ArticlePublishing]}));
            marketingInfo = { ...marketingInfo, articlePublishing: data.articlePublishing };
        } else if ('onlineInquiry' in data && data.onlineInquiry) {
            setMarketingData(prev => ({...prev, onlineInquiries: [...prev.onlineInquiries, data.onlineInquiry as OnlineInquiry]}));
            marketingInfo = { ...marketingInfo, onlineInquiry: data.onlineInquiry };
        } else if ('digitalLead' in data && data.digitalLead) {
            setMarketingData(prev => ({...prev, digitalLeads: [...prev.digitalLeads, data.digitalLead as DigitalLead]}));
            marketingInfo = { ...marketingInfo, digitalLead: data.digitalLead };
        } else if ('websiteUpdateRequest' in data && data.websiteUpdateRequest) {
            setMarketingData(prev => ({...prev, websiteUpdateRequests: [...prev.websiteUpdateRequests, data.websiteUpdateRequest as WebsiteUpdateRequest]}));
            marketingInfo = { ...marketingInfo, websiteUpdateRequest: data.websiteUpdateRequest };
        } else if ('onlineExperienceFeedback' in data && data.onlineExperienceFeedback) {
            setMarketingData(prev => ({...prev, onlineFeedbacks: [...prev.onlineFeedbacks, data.onlineExperienceFeedback as OnlineExperienceFeedback]}));
            marketingInfo = { ...marketingInfo, onlineExperienceFeedback: data.onlineExperienceFeedback };
        } else if ('campaignRequest' in data && data.campaignRequest) {
            setMarketingData(prev => ({...prev, campaignRequests: [...prev.campaignRequests, data.campaignRequest as CampaignRequest]}));
            marketingInfo = { ...marketingInfo, campaignRequest: data.campaignRequest };
        } else if ('campaignBudget' in data && data.campaignBudget) {
            setMarketingData(prev => ({...prev, campaignBudgets: [...prev.campaignBudgets, data.campaignBudget as CampaignBudget]}));
            marketingInfo = { ...marketingInfo, campaignBudget: data.campaignBudget };
        } else if ('campaignEffectiveness' in data && data.campaignEffectiveness) {
            setMarketingData(prev => ({...prev, campaignEffectivenessReports: [...prev.campaignEffectivenessReports, data.campaignEffectiveness as CampaignEffectiveness]}));
            marketingInfo = { ...marketingInfo, campaignEffectiveness: data.campaignEffectiveness };
        } else if ('contentRequest' in data && data.contentRequest) {
            setMarketingData(prev => ({...prev, contentRequests: [...prev.contentRequests, data.contentRequest as ContentRequest]}));
            marketingInfo = { ...marketingInfo, contentRequest: data.contentRequest };
        } else if ('contentDataCollection' in data && data.contentDataCollection) {
            setMarketingData(prev => ({...prev, contentDataCollections: [...prev.contentDataCollections, data.contentDataCollection as ContentDataCollection]}));
            marketingInfo = { ...marketingInfo, contentDataCollection: data.contentDataCollection };
        } else if ('contentValidation' in data && data.contentValidation) {
            setMarketingData(prev => ({...prev, contentValidations: [...prev.contentValidations, data.contentValidation as ContentValidation]}));
            marketingInfo = { ...marketingInfo, contentValidation: data.contentValidation };
        } else if ('contentPublication' in data && data.contentPublication) {
            setMarketingData(prev => ({...prev, contentPublications: [...prev.contentPublications, data.contentPublication as ContentPublication]}));
            marketingInfo = { ...marketingInfo, contentPublication: data.contentPublication };
        } else if ('exhibitionVisitorLog' in data && data.exhibitionVisitorLog) {
            setMarketingData(prev => ({ ...prev, exhibitionVisitorLogs: [...prev.exhibitionVisitorLogs, data.exhibitionVisitorLog as ExhibitionVisitorLog] }));
            marketingInfo = { ...marketingInfo, exhibitionVisitorLog: data.exhibitionVisitorLog };
        } else if ('eventReport' in data && data.eventReport) {
            setMarketingData(prev => ({ ...prev, eventReports: [...prev.eventReports, data.eventReport as EventReport] }));
            marketingInfo = { ...marketingInfo, eventReport: data.eventReport };
        } else if ('promoItemDistribution' in data && data.promoItemDistribution) {
            setMarketingData(prev => ({ ...prev, promoItemDistributions: [...prev.promoItemDistributions, data.promoItemDistribution as PromoItemDistribution] }));
            marketingInfo = { ...marketingInfo, promoItemDistribution: data.promoItemDistribution };
        } else if ('campaignRiskManagement' in data && data.campaignRiskManagement) {
            setMarketingData(prev => ({ ...prev, campaignRiskManagements: [...prev.campaignRiskManagements, data.campaignRiskManagement as CampaignRiskManagement] }));
            marketingInfo = { ...marketingInfo, campaignRiskManagement: data.campaignRiskManagement };
        } else if ('adLicensing' in data && data.adLicensing) {
            setMarketingData(prev => ({ ...prev, adLicensings: [...prev.adLicensings, data.adLicensing as AdLicensing] }));
            marketingInfo = { ...marketingInfo, adLicensing: data.adLicensing };
        } else if ('adMaterialRequest' in data && data.adMaterialRequest) {
            setMarketingData(prev => ({ ...prev, adMaterialRequests: [...prev.adMaterialRequests, data.adMaterialRequest as AdMaterialRequest] }));
            marketingInfo = { ...marketingInfo, adMaterialRequest: data.adMaterialRequest };
        } else if ('coMarketingRequest' in data && data.coMarketingRequest) {
            setMarketingData(prev => ({ ...prev, coMarketingRequests: [...prev.coMarketingRequests, data.coMarketingRequest as CoMarketingRequest] }));
            marketingInfo = { ...marketingInfo, coMarketingRequest: data.coMarketingRequest };
        } else if ('eventSponsorship' in data && data.eventSponsorship) {
            setMarketingData(prev => ({ ...prev, eventSponsorships: [...prev.eventSponsorships, data.eventSponsorship as EventSponsorship] }));
            marketingInfo = { ...marketingInfo, eventSponsorship: data.eventSponsorship };
        }


        setLatestLeadData(marketingInfo as LeadData);
        setCompletedMarketingSteps(prev => new Set(prev).add(currentStep.id));
        setModalOpen(true);
        return;
    }
    
    if (activeCategory === 'inter_departmental_automation') {
        let interDeptInfo: Partial<LeadData> = {
            leadId: 'INT-DEPT-GLOBAL',
            fullName: selectedEmployee || selectedSupplier || latestLeadData?.fullName || 'واحد داخلی',
            email: 'internal@company.com',
        };

        if ('missionRequest' in data && data.missionRequest) {
            setInterDepartmentalData(prev => ({...prev, missionRequests: [...prev.missionRequests, data.missionRequest as MissionRequest]}));
            interDeptInfo = { ...interDeptInfo, missionRequest: data.missionRequest };
        } else if ('leaveRequest' in data && data.leaveRequest) {
            setInterDepartmentalData(prev => ({...prev, leaveRequests: [...prev.leaveRequests, data.leaveRequest as LeaveRequest]}));
            interDeptInfo = { ...interDeptInfo, leaveRequest: data.leaveRequest };
        } else if ('policyNotification' in data && data.policyNotification) {
            setInterDepartmentalData(prev => ({...prev, policyNotifications: [...prev.policyNotifications, data.policyNotification as PolicyNotification]}));
            interDeptInfo = { ...interDeptInfo, policyNotification: data.policyNotification };
        } else if ('appreciationWarning' in data && data.appreciationWarning) {
            setInterDepartmentalData(prev => ({...prev, appreciationWarnings: [...prev.appreciationWarnings, data.appreciationWarning as AppreciationWarning]}));
            interDeptInfo = { ...interDeptInfo, appreciationWarning: data.appreciationWarning };
        } else if ('purchaseQuotationRequest' in data && data.purchaseQuotationRequest) {
            setInterDepartmentalData(prev => ({...prev, purchaseQuotationRequests: [...prev.purchaseQuotationRequests, data.purchaseQuotationRequest as PurchaseQuotationRequest]}));
            interDeptInfo = { ...interDeptInfo, purchaseQuotationRequest: data.purchaseQuotationRequest };
        } else if ('supplyOrderRequest' in data && data.supplyOrderRequest) {
            setInterDepartmentalData(prev => ({...prev, supplyOrderRequests: [...prev.supplyOrderRequests, data.supplyOrderRequest as SupplyOrderRequest]}));
            interDeptInfo = { ...interDeptInfo, supplyOrderRequest: data.supplyOrderRequest };
        } else if ('inventoryReconciliation' in data && data.inventoryReconciliation) {
            setInterDepartmentalData(prev => ({...prev, inventoryReconciliations: [...prev.inventoryReconciliations, data.inventoryReconciliation as InventoryReconciliation]}));
            interDeptInfo = { ...interDeptInfo, inventoryReconciliation: data.inventoryReconciliation };
        } else if ('supplierFeedback' in data && data.supplierFeedback) {
            setInterDepartmentalData(prev => ({...prev, supplierFeedbacks: [...prev.supplierFeedbacks, data.supplierFeedback as SupplierFeedback]}));
            interDeptInfo = { ...interDeptInfo, supplierFeedback: data.supplierFeedback };
        } else if ('returnedGoods' in data && data.returnedGoods) {
            setInterDepartmentalData(prev => ({...prev, returnedGoods: [...prev.returnedGoods, data.returnedGoods as ReturnedGoods]}));
            interDeptInfo = { ...interDeptInfo, returnedGoods: data.returnedGoods };
        } else if ('productionRequest' in data && data.productionRequest) {
            setInterDepartmentalData(prev => ({...prev, productionRequests: [...prev.productionRequests, data.productionRequest as ProductionRequest]}));
            interDeptInfo = { ...interDeptInfo, productionRequest: data.productionRequest };
        } else if ('warehouseReservation' in data && data.warehouseReservation) {
            setInterDepartmentalData(prev => ({...prev, warehouseReservations: [...prev.warehouseReservations, data.warehouseReservation as WarehouseReservation]}));
            interDeptInfo = { ...interDeptInfo, warehouseReservation: data.warehouseReservation };
        } else if ('qcReport' in data && data.qcReport) {
            setInterDepartmentalData(prev => ({...prev, qcReports: [...prev.qcReports, data.qcReport as QCReport]}));
            interDeptInfo = { ...interDeptInfo, qcReport: data.qcReport };
        } else if ('releaseRequest' in data && data.releaseRequest) {
            setInterDepartmentalData(prev => ({...prev, releaseRequests: [...prev.releaseRequests, data.releaseRequest as ReleaseRequest]}));
            interDeptInfo = { ...interDeptInfo, releaseRequest: data.releaseRequest };
        } else if ('discrepancyReport' in data && data.discrepancyReport) {
            setInterDepartmentalData(prev => ({...prev, discrepancyReports: [...prev.discrepancyReports, data.discrepancyReport as DiscrepancyReport]}));
            interDeptInfo = { ...interDeptInfo, discrepancyReport: data.discrepancyReport };
        } else if ('inventoryAdjustment' in data && data.inventoryAdjustment) {
            setInterDepartmentalData(prev => ({...prev, inventoryAdjustments: [...prev.inventoryAdjustments, data.inventoryAdjustment as InventoryAdjustment]}));
            interDeptInfo = { ...interDeptInfo, inventoryAdjustment: data.inventoryAdjustment };
        } else if ('customerCreditInquiry' in data && data.customerCreditInquiry) {
            setInterDepartmentalData(prev => ({...prev, customerCreditInquiries: [...prev.customerCreditInquiries, data.customerCreditInquiry as CustomerCreditInquiry]}));
            interDeptInfo = { ...interDeptInfo, customerCreditInquiry: data.customerCreditInquiry };
        } else if ('proformaInvoiceRequest' in data && data.proformaInvoiceRequest) {
            setInterDepartmentalData(prev => ({...prev, proformaInvoiceRequests: [...prev.proformaInvoiceRequests, data.proformaInvoiceRequest as ProformaInvoiceRequest]}));
            interDeptInfo = { ...interDeptInfo, proformaInvoiceRequest: data.proformaInvoiceRequest };
        } else if ('receipt' in data && data.receipt) {
            setInterDepartmentalData(prev => ({...prev, receipts: [...prev.receipts, data.receipt as Receipt]}));
            interDeptInfo = { ...interDeptInfo, receipt: data.receipt };
        } else if ('invoiceRequest' in data && data.invoiceRequest) {
            setInterDepartmentalData(prev => ({...prev, invoiceRequests: [...prev.invoiceRequests, data.invoiceRequest as InvoiceRequest]}));
            interDeptInfo = { ...interDeptInfo, invoiceRequest: data.invoiceRequest };
        } else if ('accountClearance' in data && data.accountClearance) {
            setInterDepartmentalData(prev => ({...prev, accountClearances: [...prev.accountClearances, data.accountClearance as AccountClearance]}));
            interDeptInfo = { ...interDeptInfo, accountClearance: data.accountClearance };
        } else if ('commissionReport' in data && data.commissionReport) {
            setInterDepartmentalData(prev => ({...prev, commissionReports: [...prev.commissionReports, data.commissionReport as CommissionReport]}));
            interDeptInfo = { ...interDeptInfo, commissionReport: data.commissionReport };
        }
        
        setLatestLeadData(interDeptInfo as LeadData);
        setCompletedInterDepartmentalSteps(prev => new Set(prev).add(currentStep.id));
        setModalOpen(true);
        return;
    }

    if (activeCategory === 'stakeholders_evaluation') {
        let evalInfo: Partial<LeadData> = {
            leadId: 'EVAL-GLOBAL',
            fullName: 'تیم تحلیل و استراتژی',
            email: 'strategy@internal.com',
        };

        if ('changeOfDistributor' in data && data.changeOfDistributor) {
            setEvaluationData(prev => ({...prev, changeOfDistributors: [...prev.changeOfDistributors, data.changeOfDistributor as ChangeOfDistributor]}));
            evalInfo = { ...evalInfo, changeOfDistributor: data.changeOfDistributor };
        } else if ('marketAssessment' in data && data.marketAssessment) {
            setEvaluationData(prev => ({...prev, marketAssessments: [...prev.marketAssessments, data.marketAssessment as MarketAssessmentReport]}));
            evalInfo = { ...evalInfo, marketAssessment: data.marketAssessment };
        } else if ('competitorAnalysis' in data && data.competitorAnalysis) {
            setEvaluationData(prev => ({...prev, competitorAnalyses: [...prev.competitorAnalyses, data.competitorAnalysis as CompetitorAnalysis]}));
            evalInfo = { ...evalInfo, competitorAnalysis: data.competitorAnalysis };
        } else if ('marketingStrategyReview' in data && data.marketingStrategyReview) {
            setEvaluationData(prev => ({...prev, marketingStrategyReviews: [...prev.marketingStrategyReviews, data.marketingStrategyReview as MarketingStrategyReview]}));
            evalInfo = { ...evalInfo, marketingStrategyReview: data.marketingStrategyReview };
        } else if ('newPartnershipRequest' in data && data.newPartnershipRequest) {
            setEvaluationData(prev => ({...prev, newPartnershipRequests: [...prev.newPartnershipRequests, data.newPartnershipRequest as NewPartnershipRequest]}));
            evalInfo = { ...evalInfo, newPartnershipRequest: data.newPartnershipRequest };
        } else if ('agentPerformanceEvaluation' in data && data.agentPerformanceEvaluation) {
            setEvaluationData(prev => ({...prev, agentPerformanceEvaluations: [...prev.agentPerformanceEvaluations, data.agentPerformanceEvaluation as AgentPerformanceEvaluation]}));
            evalInfo = { ...evalInfo, agentPerformanceEvaluation: data.agentPerformanceEvaluation };
        } else if ('stakeholderFeedback' in data && data.stakeholderFeedback) {
            setEvaluationData(prev => ({...prev, stakeholderFeedbacks: [...prev.stakeholderFeedbacks, data.stakeholderFeedback as StakeholderFeedback]}));
            evalInfo = { ...evalInfo, stakeholderFeedback: data.stakeholderFeedback };
        } else if ('trainingEffectiveness' in data && data.trainingEffectiveness) {
            setEvaluationData(prev => ({...prev, trainingEffectivenessReports: [...prev.trainingEffectivenessReports, data.trainingEffectiveness as TrainingEffectiveness]}));
            evalInfo = { ...evalInfo, trainingEffectiveness: data.trainingEffectiveness };
        } else if ('projectReview' in data && data.projectReview) {
            setEvaluationData(prev => ({...prev, projectReviews: [...prev.projectReviews, data.projectReview as ProjectReview]}));
            evalInfo = { ...evalInfo, projectReview: data.projectReview };
        } else if ('salesIncentiveEffectiveness' in data && data.salesIncentiveEffectiveness) {
            setEvaluationData(prev => ({...prev, salesIncentiveEffectivenessReports: [...prev.salesIncentiveEffectivenessReports, data.salesIncentiveEffectiveness as SalesIncentiveEffectiveness]}));
            evalInfo = { ...evalInfo, salesIncentiveEffectiveness: data.salesIncentiveEffectiveness };
        } else if ('b2bPartnershipRequest' in data && data.b2bPartnershipRequest) {
            setEvaluationData(prev => ({...prev, b2bPartnershipRequests: [...prev.b2bPartnershipRequests, data.b2bPartnershipRequest as B2BPartnershipRequest]}));
            evalInfo = { ...evalInfo, b2bPartnershipRequest: data.b2bPartnershipRequest };
        } else if ('b2bOrder' in data && data.b2bOrder) {
            setEvaluationData(prev => ({...prev, b2bOrders: [...prev.b2bOrders, data.b2bOrder as B2BOrder]}));
            evalInfo = { ...evalInfo, b2bOrder: data.b2bOrder };
        } else if ('b2cOrder' in data && data.b2cOrder) {
            setEvaluationData(prev => ({...prev, b2cOrders: [...prev.b2cOrders, data.b2cOrder as B2COrder]}));
            evalInfo = { ...evalInfo, b2cOrder: data.b2cOrder };
        } else if ('b2gTender' in data && data.b2gTender) {
            setEvaluationData(prev => ({...prev, b2gTenders: [...prev.b2gTenders, data.b2gTender as B2GTender]}));
            evalInfo = { ...evalInfo, b2gTender: data.b2gTender };
        } else if ('salesProcessImprovement' in data && data.salesProcessImprovement) {
            setEvaluationData(prev => ({...prev, salesProcessImprovements: [...prev.salesProcessImprovements, data.salesProcessImprovement as SalesProcessImprovement]}));
            evalInfo = { ...evalInfo, salesProcessImprovement: data.salesProcessImprovement };
        } else if ('postMortemReview' in data && data.postMortemReview) {
            setEvaluationData(prev => ({...prev, postMortemReviews: [...prev.postMortemReviews, data.postMortemReview as PostMortemReview]}));
            evalInfo = { ...evalInfo, postMortemReview: data.postMortemReview };
        }


        setLatestLeadData(evalInfo as LeadData);
        setCompletedEvaluationSteps(prev => new Set(prev).add(currentStep.id));
        setModalOpen(true);
        return;
    }
    
    if (activeCategory === 'customer_management') {
        let custMgmtInfo: Partial<LeadData> = {
            leadId: 'CUST-MGMT-GLOBAL',
            fullName: 'تیم مدیریت مشتریان',
            email: 'crm@internal.com',
        };

        if ('salesPeriodicReport' in data && data.salesPeriodicReport) {
            setCustomerManagementData(prev => ({ ...prev, salesPeriodicReports: [...prev.salesPeriodicReports, data.salesPeriodicReport as SalesPeriodicReport] }));
            custMgmtInfo = { ...custMgmtInfo, salesPeriodicReport: data.salesPeriodicReport };
        } else if ('fieldSalesFeedback' in data && data.fieldSalesFeedback) {
            setCustomerManagementData(prev => ({ ...prev, fieldSalesFeedbacks: [...prev.fieldSalesFeedbacks, data.fieldSalesFeedback as FieldSalesFeedback] }));
            custMgmtInfo = { ...custMgmtInfo, fieldSalesFeedback: data.fieldSalesFeedback };
        } else if ('pointOfSaleEvaluation' in data && data.pointOfSaleEvaluation) {
            setCustomerManagementData(prev => ({ ...prev, pointOfSaleEvaluations: [...prev.pointOfSaleEvaluations, data.pointOfSaleEvaluation as PointOfSaleEvaluation] }));
            custMgmtInfo = { ...custMgmtInfo, pointOfSaleEvaluation: data.pointOfSaleEvaluation };
        } else if ('sampleProductRegistration' in data && data.sampleProductRegistration) {
            setCustomerManagementData(prev => ({ ...prev, sampleProductRegistrations: [...prev.sampleProductRegistrations, data.sampleProductRegistration as SampleProductRegistration] }));
            custMgmtInfo = { ...custMgmtInfo, sampleProductRegistration: data.sampleProductRegistration };
        } else if ('onSiteAftersalesEvaluation' in data && data.onSiteAftersalesEvaluation) {
            setCustomerManagementData(prev => ({ ...prev, onSiteAftersalesEvaluations: [...prev.onSiteAftersalesEvaluations, data.onSiteAftersalesEvaluation as OnSiteAftersalesEvaluation] }));
            custMgmtInfo = { ...custMgmtInfo, onSiteAftersalesEvaluation: data.onSiteAftersalesEvaluation };
        } else if ('onSiteSatisfactionSurvey' in data && data.onSiteSatisfactionSurvey) {
            setCustomerManagementData(prev => ({ ...prev, onSiteSatisfactionSurveys: [...prev.onSiteSatisfactionSurveys, data.onSiteSatisfactionSurvey as OnSiteSatisfactionSurvey] }));
            custMgmtInfo = { ...custMgmtInfo, onSiteSatisfactionSurvey: data.onSiteSatisfactionSurvey };
        } else if ('focusGroupFeedback' in data && data.focusGroupFeedback) {
            setCustomerManagementData(prev => ({ ...prev, focusGroupFeedbacks: [...prev.focusGroupFeedbacks, data.focusGroupFeedback as FocusGroupFeedback] }));
            custMgmtInfo = { ...custMgmtInfo, focusGroupFeedback: data.focusGroupFeedback };
        } else if ('storeInventoryCheck' in data && data.storeInventoryCheck) {
            setCustomerManagementData(prev => ({ ...prev, storeInventoryChecks: [...prev.storeInventoryChecks, data.storeInventoryCheck as StoreInventoryCheck] }));
            custMgmtInfo = { ...custMgmtInfo, storeInventoryCheck: data.storeInventoryCheck };
        }
        
        setLatestLeadData(custMgmtInfo as LeadData);
        setCompletedCustomerManagementSteps(prev => new Set(prev).add(currentStep.id));
        setModalOpen(true);
        return;
    }


    let mergedData = { ...(latestLeadData || {}), ...data };
    
    if (data.complaints && Array.isArray(data.complaints)) {
       const newComplaint = data.complaints[0];
       const updatedComplaints = [...(latestLeadData?.complaints || []), newComplaint];
       mergedData = { ...mergedData, complaints: updatedComplaints };
    } else if (data.surveys && Array.isArray(data.surveys)) {
        const newSurvey = data.surveys[0];
        const updatedSurveys = [...(latestLeadData?.surveys || []), newSurvey];
        mergedData = {...mergedData, surveys: updatedSurveys };
    } else if (data.marketingActivities && Array.isArray(data.marketingActivities)) {
        const newActivity = data.marketingActivities[0];
        const updatedActivities = [...(latestLeadData?.marketingActivities || []), newActivity];
        mergedData = { ...mergedData, marketingActivities: updatedActivities };
    } else if (data.followUps && Array.isArray(data.followUps)) {
        const newFollowUp = data.followUps[0];
        const updatedFollowUps = [...(latestLeadData?.followUps || []), newFollowUp];
        mergedData = { ...mergedData, followUps: updatedFollowUps };
    } else if (data.contactLogs && Array.isArray(data.contactLogs)) {
        const newLog = data.contactLogs[0];
        const updatedLogs = [...(latestLeadData?.contactLogs || []), newLog];
        mergedData = { ...mergedData, contactLogs: updatedLogs };
    } else if (data.visitReports && Array.isArray(data.visitReports)) {
        const newReport = data.visitReports[0];
        const updatedReports = [...(latestLeadData?.visitReports || []), newReport];
        mergedData = { ...mergedData, visitReports: updatedReports };
    } else if (data.productIntroductions && Array.isArray(data.productIntroductions)) {
        const newIntroduction = data.productIntroductions[0];
        const updatedIntroductions = [...(latestLeadData?.productIntroductions || []), newIntroduction];
        mergedData = { ...mergedData, productIntroductions: updatedIntroductions };
    } else if (data.lostLeadAnalysis) {
        mergedData = { ...mergedData, lostLeadAnalysis: data.lostLeadAnalysis };
    }


    if (!mergedData.leadId && currentStep.id === '1-1') {
        mergedData.leadId = `LEAD-${Date.now()}`;
    }

    const finalData = mergedData as LeadData;

    if(finalData.leadId){
        leadService.saveLead(finalData);
    }
    
    setLatestLeadData(finalData);
    setCompletedAcquisitionSteps(prev => new Set(prev).add(currentStep.id));
    
    if(currentStep.id === '1-8' && finalData.quotationResponse) {
        // This is a special case to handle the response to a quotation
        const nextStepId = finalData.quotationResponse === 'قبول کامل' ? '1-9' : '1-8';
        const nextStep = WORKFLOW_STEPS.find(s => s.id === nextStepId) || currentStep;
        setCurrentStep(nextStep);
    }

    // For implemented forms, show the generator. For placeholders, just show alert.
    if (componentMap[currentStep.id] && componentMap[currentStep.id] !== PlaceholderForm) {
        setModalOpen(true);
    } else {
        alert(`فرم "${currentStep.title}" ذخیره شد (نمونه اولیه).`);
    }
  };

  const handleNextStep = (data: Partial<LeadData>) => {
    handleSave(data);
    
    if (currentStep.id === '1-8') {
        // Special step to go to response form
         setCurrentStep(WORKFLOW_STEPS.find(s => s.id === '1-8-response')!);
         return;
    }
    
    const currentIndex = WORKFLOW_STEPS.findIndex(s => s.id === currentStep.id);
    const nextStep = WORKFLOW_STEPS[currentIndex + 1];
    if (nextStep && nextStep.category === currentStep.category) {
        setCurrentStep(nextStep);
    }
  };
  
  const handleModalClose = () => {
    setModalOpen(false);
  }

  const handleProceed = () => {
    handleModalClose();
  }

  const handleStepChange = (step: WorkflowStep) => {
    setCurrentStep(step);
  };
  
  const handleCategoryChange = (categoryId: WorkflowCategory) => {
    setActiveCategory(categoryId);
    const firstStepOfCategory = WORKFLOW_STEPS.find(step => step.category === categoryId && step.isStarter);
    if(firstStepOfCategory) {
        setCurrentStep(firstStepOfCategory);
    }
  };

  const handleLeadSelect = (lead: LeadData) => {
    setLatestLeadData(lead);
  };
  
  const handleEmployeeSelect = (employeeName: string) => {
      setSelectedEmployee(employeeName);
      setSelectedSupplier(null);
  }
  
  const handleSupplierSelect = (supplierName: string) => {
      setSelectedSupplier(supplierName);
      setSelectedEmployee(null);
  }

  const renderCurrentStep = (): React.ReactNode => {
    const FormComponent = componentMap[currentStep.id] || PlaceholderForm;
    
    const props: any = {
      onSave: handleSave,
      onNextStep: handleNextStep,
      leadData: latestLeadData,
      onLeadSelect: handleLeadSelect,
      step: currentStep,
      initialData: latestLeadData,
      marketingData: marketingData,
      interDepartmentalData: interDepartmentalData,
      evaluationData: evaluationData,
      customerManagementData: customerManagementData,
    };
    
    // Add employee/supplier selection handlers only if needed by the current category
    if (currentStep.category === 'inter_departmental_automation') {
        props.onEmployeeSelect = handleEmployeeSelect;
        props.selectedEmployee = selectedEmployee;
        props.onSupplierSelect = handleSupplierSelect;
        props.selectedSupplier = selectedSupplier;
    }
    
    return <FormComponent {...props} />;
  };

  return (
    <div className="flex flex-row-reverse h-screen bg-gray-100 dark:bg-gray-900 font-sans">
      <main className="flex-1 flex flex-col min-w-0">
        <Header 
            categories={WORKFLOW_CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
        />
        <div className="flex-1 p-6 overflow-y-auto">
          {renderCurrentStep()}
        </div>
      </main>
      <Sidebar 
        currentStep={currentStep} 
        onStepClick={handleStepChange} 
        steps={WORKFLOW_STEPS} 
        activeCategory={activeCategory}
        completedAcquisitionSteps={completedAcquisitionSteps}
        completedMarketingSteps={completedMarketingSteps}
        completedInterDepartmentalSteps={completedInterDepartmentalSteps}
        completedEvaluationSteps={completedEvaluationSteps}
        completedCustomerManagementSteps={completedCustomerManagementSteps}
      />
      
      {isModalOpen && latestLeadData && componentMap[currentStep.id] && (
          <NotificationGenerator 
            isOpen={isModalOpen} 
            onClose={handleModalClose}
            onProceed={handleProceed}
            leadData={latestLeadData}
            currentStepId={currentStep.id}
          />
      )}
    </div>
  );
}