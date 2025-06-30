export type WorkflowCategory = 
  | 'acquisition_sales'
  | 'customer_management'
  | 'marketing_automation'
  | 'inter_departmental_automation'
  | 'stakeholders_evaluation';

export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Complaint {
  id:string;
  date: string;
  type: string;
  details: string;
  status: string;
  priority: 'فوری' | 'بالا' | 'متوسط' | 'پایین';
}

export interface SatisfactionSurvey {
  id: string;
  date: string;
  ratings: { [key: string]: number };
  comments: string;
}

export interface MarketingActivity {
  id: string;
  date: string;
  type: string;
  targetAudience: string;
  details: string;
  cost: number;
  outcome: string;
}

export interface FollowUp {
  id: string;
  date: string;
  method: string;
  notes: string;
  nextFollowUpDate?: string;
}

export interface ContactLog {
  id: string;
  date: string;
  type: string;
  contactPerson: string;
  summary: string;
  nextFollowUpDate?: string;
  status: string;
}

export interface VisitReport {
  id: string;
  date: string; // ISO string for datetime
  type: string; 
  location: string;
  attendeesInternal: string;
  attendeesExternal: string;
  purpose: string;
  summary: string;
  outcomes: string;
  nextSteps?: string;
}

export interface ProductIntroduction {
  id: string;
  date: string;
  productName: string;
  notes: string;
  fileUrl?: string;
}

export interface DigitalCampaign {
  id: string;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  budget: number;
  platforms: string[];
  manager: string;
  summary: string;
}

export interface ContentCalendarEntry {
  id: string;
  event: string;
  platform: string;
  publishDate: string;
  status: string;
}

export interface EmailSmsCampaign {
  id: string;
  type: 'ایمیل' | 'پیامک' | 'ترکیبی';
  subject: string;
  targetListId: string;
  content: string;
  sendDate: string;
}

export interface ArticlePublishing {
  id: string;
  title: string;
  author: string;
  platform: string;
  publishDate: string;
  status: string;
  contentSummary: string;
}

export interface OnlineInquiry {
    id: string;
    date: string;
    channel: string;
    customerName: string;
    inquiryText: string;
    assignedTo: string;
    status: string;
}

export interface DigitalLead {
    id: string;
    captureDate: string;
    source: string;
    name: string;
    email: string;
    interest: string;
}

export interface WebsiteUpdateRequest {
    id: string;
    requestDate: string;
    requester: string;
    area: string;
    description: string;
    priority: 'بالا' | 'متوسط' | 'پایین';
}

export interface OnlineExperienceFeedback {
    id: string;
    date: string;
    pageUrl: string;
    rating: number;
    feedbackText: string;
    userIdentifier?: string;
}

export interface CampaignRequest {
    id: string;
    requestDate: string;
    campaignName: string;
    goals: string;
    targetAudience: string;
    budget: number;
    timeline: string;
    requester: string;
}

export interface CampaignBudget {
    id: string;
    campaignName: string;
    totalBudget: number;
    breakdown: string;
    approvalStatus: 'در انتظار' | 'تایید شده' | 'رد شده';
}

export interface CampaignEffectiveness {
    id: string;
    reportDate: string;
    campaignName: string;
    kpiSummary: string;
    analysis: string;
    recommendations: string;
}

export interface ExhibitionVisitorLog {
  id: string;
  eventName: string;
  visitorName: string;
  company: string;
  phone: string;
  email: string;
  interestLevel: number;
  notes: string;
}

export interface EventReport {
    id: string;
    eventName: string;
    eventDate: string;
    totalAttendees: number;
    leadsGenerated: number;
    totalCost: number;
    summary: string;
}

export interface PromoItemDistribution {
    id: string;
    eventName: string;
    itemName: string;
    quantity: number;
    recipientType: string;
}

export interface CampaignRiskManagement {
    id: string;
    campaignName: string;
    riskDescription: string;
    likelihood: 'کم' | 'متوسط' | 'زیاد';
    impact: 'کم' | 'متوسط' | 'زیاد';
    mitigationPlan: string;
}

export interface AdLicensing {
    id: string;
    campaignName: string;
    licenseType: string;
    authority: string;
    status: 'در حال پیگیری' | 'تایید شده' | 'رد شده';
}

export interface AdMaterialRequest {
    id: string;
    requestDate: string;
    requester: string;
    campaignName: string;
    materialType: string;
    specifications: string;
    deadline: string;
}

export interface CoMarketingRequest {
    id: string;
    partnerName: string;
    campaignName: string;
    objectives: string;
    budgetSplit: string;
}

export interface EventSponsorship {
    id: string;
    eventName: string;
    sponsorshipType: 'درخواست حمایت' | 'ارائه حمایت';
    sponsorshipLevel: string;
    cost: number;
    benefits: string;
    outcome: string;
}

export interface CustomerCreditInquiry {
  id: string;
  requestDate: string;
  customerId: string;
  requestReason: string;
  status: string;
}

export interface ProformaInvoiceRequest {
  id: string;
  requestDate: string;
  customerId: string;
  relatedQuoteId: string;
  status: string;
}

export interface Receipt {
  id: string;
  receiptDate: string;
  customerId: string;
  amount: number;
  paymentMethod: string;
  referenceId: string;
  invoiceId?: string;
}

export interface InvoiceRequest {
  id: string;
  requestDate: string;
  customerId: string;
  proformaInvoiceId: string;
  amount: number;
}

export interface AccountClearance {
  id: string;
  clearanceDate: string;
  customerId: string;
  notes: string;
}

export interface CommissionReport {
  id: string;
  reportPeriod: string;
  salespersonName: string;
  totalSales: number;
  commissionRate: number;
  commissionAmount: number;
  status: string;
}

export interface MissionRequest {
    id: string;
    requestDate: string;
    employeeName: string;
    missionType: string;
    destination: string;
    startDate: string;
    endDate: string;
    objective: string;
}

export interface LeaveRequest {
    id: string;
    requestDate: string;
    employeeName: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
}

export interface PolicyNotification {
    id: string;
    effectiveDate: string;
    policyTitle: string;
    summary: string;
    audience: string;
}

export interface AppreciationWarning {
    id: string;
    date: string;
    employeeName: string;
    type: 'تقدیر' | 'تشویق' | 'تذکر' | 'جایزه';
    reason: string;
}

export interface PurchaseQuotationRequest {
    id: string;
    itemName: string;
    supplier: string;
    deadline: string;
    requester: string;
}

export interface SupplyOrderRequest {
    id: string;
    orderDate: string;
    supplier: string;
    itemName: string;
    quantity: number;
    deliveryDate: string;
}

export interface InventoryReconciliation {
    id: string;
    reportDate: string;
    itemCode: string;
    systemQuantity: number;
    physicalQuantity: number;
    discrepancyReason: string;
}

export interface SupplierFeedback {
    id: string;
    evaluationDate: string;
    supplier: string;
    rating: number;
    comments: string;
}

export interface ReturnedGoods {
    id: string;
    returnDate: string;
    supplier: string;
    itemName: string;
    quantity: number;
    reason: string;
}

export interface ProductionRequest {
    id: string;
    requestDate: string;
    productName: string;
    quantity: number;
    orderId: string;
    deadline: string;
}

export interface WarehouseReservation {
    id: string;
    reservationDate: string;
    itemName: string;
    quantity: number;
    orderId: string;
}

export interface QCReport {
    id: string;
    reportDate: string;
    productName: string;
    batchNumber: string;
    status: 'قبول' | 'مردود' | 'مشروط';
    notes: string;
}

export interface ReleaseRequest {
    id: string;
    requestDate: string;
    orderId: string;
    items: { name: string; quantity: number }[];
    destination: string;
}

export interface DiscrepancyReport {
    id: string;
    reportDate: string;
    itemCode: string;
    discrepancyType: 'کسری' | 'اضافه' | 'آسیب‌دیدگی' | 'اشتباه';
    quantity: number;
    notes: string;
}

export interface InventoryAdjustment {
    id: string;
    adjustmentDate: string;
    itemCode: string;
    reason: string;
    quantityChange: number;
}

export interface ContentRequest {
    id: string;
    requestDate: string;
    requester: string;
    topic: string;
    contentType: string;
    goal: string;
    targetAudience: string;
    deadline?: string;
}

export interface ContentDataCollection {
    id: string;
    requestId: string;
    provider: string;
    dataSummary: string;
    sources: string;
    fileUrl?: string;
}

export interface ContentValidation {
    id: string;
    collectionId: string;
    validator: string;
    status: 'تایید نهایی' | 'نیاز به اصلاح' | 'رد شده';
    comments: string;
}

export interface ContentPublication {
    id: string;
    validationId: string;
    platform: string;
    publishDate: string;
    publishedUrl?: string;
    publisher: string;
}

export interface ChangeOfDistributor {
    id: string;
    transferDate: string;
    previousAgent: string;
    newAgent: string;
    reason: string;
    transferredAccounts: string;
}

export interface MarketAssessmentReport {
    id: string;
    reportDate: string;
    targetMarket: string;
    summary: string;
    opportunities: string;
    threats: string;
    recommendations: string;
}

export interface CompetitorAnalysis {
    id: string;
    analysisDate: string;
    competitorName: string;
    products: string;
    pricing: string;
    strengths: string;
    weaknesses: string;
    strategy: string;
}

export interface MarketingStrategyReview {
    id: string;
    reviewDate: string;
    period: string;
    summary: string;
    performanceVsGoals: string;
    swot: string;
    recommendations: string;
}

export interface NewPartnershipRequest {
    id: string;
    requestDate: string;
    potentialPartner: string;
    partnershipArea: string;
    synergyDescription: string;
    contactPerson: string;
}

export interface AgentPerformanceEvaluation {
    id: string;
    evaluationDate: string;
    agentName: string;
    period: string;
    salesVolume: number;
    customerSatisfaction: number;
    compliance: string;
    recommendation: string;
}

export interface StakeholderFeedback {
    id: string;
    feedbackDate: string;
    stakeholderName: string;
    stakeholderType: 'نماینده' | 'شریک تجاری' | 'سهام‌دار';
    feedbackText: string;
    proposedAction: string;
}

export interface TrainingEffectiveness {
    id: string;
    reportDate: string;
    trainingName: string;
    attendees: string;
    preTrainingScore: number;
    postTrainingScore: number;
    feedbackSummary: string;
}

export interface ProjectReview {
  id: string;
  reviewDate: string;
  projectName: string;
  projectManager: string;
  status: 'در حال انجام' | 'تکمیل شده' | 'با تاخیر' | 'متوقف شده';
  progressSummary: string;
  lessonsLearned: string;
}

// --- Customer Management Forms ---
export interface SalesPeriodicReport {
    id: string;
    period: string;
    totalSales: number;
    topCustomers: string;
    analysis: string;
}

export interface FieldSalesFeedback {
    id: string;
    visitDate: string;
    customerName: string;
    feedback: string;
}

export interface PointOfSaleEvaluation {
    id: string;
    branchName: string;
    evaluationDate: string;
    appearance: number;
    serviceQuality: number;
    comments: string;
}

export interface SampleProductRegistration {
    id: string;
    requestDate: string;
    productName: string;
    customerName: string;
    status: 'ارسال شده' | 'در انتظار بازخورد' | 'بازخورد دریافت شد';
}

export interface OnSiteAftersalesEvaluation {
    id: string;
    visitDate: string;
    customerName: string;
    serviceType: string;
    technician: string;
    serviceRating: number;
}

export interface OnSiteSatisfactionSurvey {
    id: string;
    surveyDate: string;
    interviewer: string;
    overallSatisfaction: number;
    positivePoints: string;
    improvementAreas: string;
}

export interface FocusGroupFeedback {
    id: string;
    sessionDate: string;
    topic: string;
    keyFindings: string;
}

export interface StoreInventoryCheck {
    id: string;
    checkDate: string;
    branchName: string;
    checkedItems: { itemName: string, systemQty: number, physicalQty: number }[];
}

export interface LostLeadAnalysis {
    id: string;
    analysisDate: string;
    lostLeadId: string;
    lostLeadName: string;
    reasonForLoss: string;
    competitorName?: string;
    customerFeedback?: string;
    correctiveAction: string;
    analystName: string;
}

export interface SalesIncentiveEffectiveness {
  id: string;
  reportDate: string;
  programName: string;
  cost: number;
  salesIncrease: number;
  roi: number;
  feedback: string;
}

export interface B2BPartnershipRequest {
  id: string;
  requestDate: string;
  partnerName: string;
  industry: string;
  partnershipType: string;
  justification: string;
}

export interface B2BOrder {
  id: string;
  orderDate: string;
  customerName: string;
  items: { product: string, quantity: number, price: number }[];
  totalAmount: number;
  paymentTerms: string;
}

export interface B2COrder {
  id: string;
  orderDate: string;
  customerId: string;
  items: { product: string, quantity: number, price: number }[];
  totalAmount: number;
  status: string;
}

export interface B2GTender {
  id: string;
  submissionDate: string;
  tenderTitle: string;
  governmentEntity: string;
  status: string;
  submissionDocsUrl?: string;
}

export interface SalesProcessImprovement {
  id: string;
  reportDate: string;
  processArea: string;
  issueDescription: string;
  proposedSolution: string;
  status: string;
}

export interface PostMortemReview {
  id: string;
  reviewDate: string;
  projectName: string;
  reasonForFailure: string;
  lessonsLearned: string;
  actionItems: string;
}


export interface LeadData {
  // Unique Identifier
  leadId: string;
  
  // MKT-01 Fields
  registrationDate: string;
  fullName: string;
  contactNumber: string;
  email: string;
  source: string;
  productOfInterest: string;
  interestLevel: number;
  notes: string;
  
  // MKT-02 Fields
  customerGroup?: string;
  nationalId?: string;
  activityField?: string;
  initialCreditLevel?: number;
  fullAddress?: string;
  potentialCustomerId?: string;
  
  // MKT-03 Fields
  assessmentDate?: string;
  areaOfNeed?: string;
  announcedBudget?: number;
  purchasePriority?: string;
  decisionMaker?: string;
  technicalPrerequisites?: string;
  financialRisk?: string;
  statusSummary?: string;
  assessmentFile?: File | null;

  // MKT-04 (Call Log)
  contactLogs?: ContactLog[];

  // 1-6 Visit Report
  visitReports?: VisitReport[];

  // 1-7 Product Introduction
  productIntroductions?: ProductIntroduction[];

  // MKT-04 (Quotation) Fields
  quotationId?: string;
  quotationDate?: string;
  quoteItems?: QuoteItem[];
  subTotal?: number;
  discount?: number;
  tax?: number;
  totalPrice?: number;
  validityPeriod?: string;
  paymentTerms?: string;
  deliveryTerms?: string;

  // MKT-05 Fields
  quotationResponse?: string;
  responseDate?: string;
  responseNotes?: string;

  // MKT-06 Fields
  salesOrderId?: string;
  orderDate?: string;
  finalPaymentTerms?: string;
  finalDeliveryTerms?: string;
  contractNotes?: string;

  // MKT-07 Fields
  contractId?: string;
  contractDate?: string;
  legalClauses?: string;
  contractFile?: File | null;
  managerSignature?: string;
  customerSignature?: string;

  // MKT-08 Fields
  deliveryOrderId?: string;
  deliveryDate?: string;
  deliveryAddress?: string;
  deliveryTermsDetails?: string;

  // MKT-09 Fields
  receptionReportId?: string;
  receptionDate?: string;
  receptionStatus?: string;
  receptionNotes?: string;

  // MKT-10 Fields
  marketingActivities?: MarketingActivity[];

  // MKT-11 Fields
  complaints?: Complaint[];

  // MKT-12 Fields
  surveys?: SatisfactionSurvey[];
  
  // MKT-13 Fields
  followUps?: FollowUp[];

  // Marketing & Automation Data (to pass to notification generator)
  digitalCampaign?: DigitalCampaign;
  contentCalendar?: ContentCalendarEntry[];
  emailSmsCampaign?: EmailSmsCampaign;
  articlePublishing?: ArticlePublishing;
  onlineInquiry?: OnlineInquiry;
  digitalLead?: DigitalLead;
  websiteUpdateRequest?: WebsiteUpdateRequest;
  onlineExperienceFeedback?: OnlineExperienceFeedback;
  campaignRequest?: CampaignRequest;
  campaignBudget?: CampaignBudget;
  campaignEffectiveness?: CampaignEffectiveness;
  contentRequest?: ContentRequest;
  contentDataCollection?: ContentDataCollection;
  contentValidation?: ContentValidation;
  contentPublication?: ContentPublication;
  exhibitionVisitorLog?: ExhibitionVisitorLog;
  eventReport?: EventReport;
  promoItemDistribution?: PromoItemDistribution;
  campaignRiskManagement?: CampaignRiskManagement;
  adLicensing?: AdLicensing;
  adMaterialRequest?: AdMaterialRequest;
  coMarketingRequest?: CoMarketingRequest;
  eventSponsorship?: EventSponsorship;


  // Inter-departmental Automation Data
  missionRequest?: MissionRequest;
  leaveRequest?: LeaveRequest;
  policyNotification?: PolicyNotification;
  appreciationWarning?: AppreciationWarning;
  purchaseQuotationRequest?: PurchaseQuotationRequest;
  supplyOrderRequest?: SupplyOrderRequest;
  inventoryReconciliation?: InventoryReconciliation;
  supplierFeedback?: SupplierFeedback;
  returnedGoods?: ReturnedGoods;
  productionRequest?: ProductionRequest;
  warehouseReservation?: WarehouseReservation;
  qcReport?: QCReport;
  releaseRequest?: ReleaseRequest;
  discrepancyReport?: DiscrepancyReport;
  inventoryAdjustment?: InventoryAdjustment;
  customerCreditInquiry?: CustomerCreditInquiry;
  proformaInvoiceRequest?: ProformaInvoiceRequest;
  receipt?: Receipt;
  invoiceRequest?: InvoiceRequest;
  accountClearance?: AccountClearance;
  commissionReport?: CommissionReport;


  // Stakeholder & Evaluation data
  changeOfDistributor?: ChangeOfDistributor;
  marketAssessment?: MarketAssessmentReport;
  competitorAnalysis?: CompetitorAnalysis;
  marketingStrategyReview?: MarketingStrategyReview;
  newPartnershipRequest?: NewPartnershipRequest;
  agentPerformanceEvaluation?: AgentPerformanceEvaluation;
  stakeholderFeedback?: StakeholderFeedback;
  trainingEffectiveness?: TrainingEffectiveness;
  projectReview?: ProjectReview;
  salesIncentiveEffectiveness?: SalesIncentiveEffectiveness;
  b2bPartnershipRequest?: B2BPartnershipRequest;
  b2bOrder?: B2BOrder;
  b2cOrder?: B2COrder;
  b2gTender?: B2GTender;
  salesProcessImprovement?: SalesProcessImprovement;
  postMortemReview?: PostMortemReview;
  
  // Customer Management Data
  salesPeriodicReport?: SalesPeriodicReport;
  fieldSalesFeedback?: FieldSalesFeedback;
  pointOfSaleEvaluation?: PointOfSaleEvaluation;
  sampleProductRegistration?: SampleProductRegistration;
  onSiteAftersalesEvaluation?: OnSiteAftersalesEvaluation;
  onSiteSatisfactionSurvey?: OnSiteSatisfactionSurvey;
  focusGroupFeedback?: FocusGroupFeedback;
  storeInventoryCheck?: StoreInventoryCheck;

  // Acquisition & Sales Data
  lostLeadAnalysis?: LostLeadAnalysis;
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  category: WorkflowCategory;
  isStarter?: boolean;
  prerequisite?: string;
}

export interface NotificationContent {
  subject: string;
  body: string;
}