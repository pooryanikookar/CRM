import { GoogleGenAI } from "@google/genai";
import type { LeadData, NotificationContent, QuoteItem, Complaint, SatisfactionSurvey, MarketingActivity, FollowUp, ContactLog, VisitReport, ProductIntroduction, DigitalCampaign, ContentCalendarEntry, EmailSmsCampaign, ArticlePublishing, OnlineInquiry, DigitalLead, WebsiteUpdateRequest, OnlineExperienceFeedback, CampaignRequest, CampaignBudget, CampaignEffectiveness, MissionRequest, LeaveRequest, PolicyNotification, AppreciationWarning, PurchaseQuotationRequest, SupplyOrderRequest, InventoryReconciliation, SupplierFeedback, ReturnedGoods, ProductionRequest, WarehouseReservation, QCReport, ReleaseRequest, DiscrepancyReport, InventoryAdjustment, ContentRequest, ContentDataCollection, ContentValidation, ContentPublication, NewPartnershipRequest, AgentPerformanceEvaluation, StakeholderFeedback, TrainingEffectiveness, ProjectReview, SalesPeriodicReport, FieldSalesFeedback, PointOfSaleEvaluation, SampleProductRegistration, OnSiteAftersalesEvaluation, OnSiteSatisfactionSurvey, FocusGroupFeedback, StoreInventoryCheck, LostLeadAnalysis, ExhibitionVisitorLog, EventReport, PromoItemDistribution, CampaignRiskManagement, AdLicensing, AdMaterialRequest, CoMarketingRequest, EventSponsorship, CustomerCreditInquiry, ProformaInvoiceRequest, Receipt, InvoiceRequest, AccountClearance, CommissionReport, SalesIncentiveEffectiveness, B2BPartnershipRequest, B2BOrder, B2COrder, B2GTender, SalesProcessImprovement, PostMortemReview } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateNotificationContent = async (lead: LeadData, stepId: string, type: 'internal' | 'external'): Promise<NotificationContent> => {
    const prompts = generatePrompts(lead, stepId);
    const promptText = type === 'internal' ? prompts.internal : prompts.external;

    if (!promptText || promptText.includes('No external communication') || promptText.includes('internal form')) {
        return {
            subject: 'بدون نیاز به اعلان',
            body: 'برای این مرحله اعلان خودکار در نظر گرفته نشده است.'
        };
    }
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: promptText,
            config: {
                responseMimeType: "application/json",
                temperature: 0.5,
            },
        });

        let jsonStr = response.text.trim();
        const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[2]) {
            jsonStr = match[2].trim();
        }
        
        const parsedData = JSON.parse(jsonStr);

        if (parsedData.subject && parsedData.body) {
            return {
                subject: parsedData.subject,
                body: parsedData.body
            };
        }

        console.error("Invalid JSON structure from Gemini", parsedData);
        return { subject: "خطا در تولید محتوا", body: "پاسخ دریافت شده از سرویس هوش مصنوعی ساختار معتبری ندارد." };

    } catch (error) {
        console.error("Error generating notification content with Gemini:", error);
        return {
            subject: 'خطا در ارتباط با سرویس هوش مصنوعی',
            body: `امکان تولید محتوای خودکار در حال حاضر وجود ندارد. لطفاً بعداً تلاش کنید.\n\nجزئیات خطا: ${error}`
        };
    }
};


const formatQuoteItems = (items?: QuoteItem[]): string => {
    if (!items || items.length === 0) return '-';
    return items.map(item => `- ${item.description} (تعداد: ${item.quantity}, قیمت واحد: ${item.unitPrice.toLocaleString('fa-IR')} ریال, جمع: ${item.total.toLocaleString('fa-IR')} ریال)`).join('\n');
}

const formatSurveyResults = (survey?: SatisfactionSurvey): string => {
    if (!survey) return 'اطلاعاتی ثبت نشده.';
    return Object.entries(survey.ratings).map(([key, value]) => `- ${key}: ${value}/5`).join('\n');
}

const formatContactLog = (log?: ContactLog): string => {
    if (!log) return 'اطلاعاتی ثبت نشده.';
    return `
- نوع تماس: ${log.type}
- شخص تماس: ${log.contactPerson}
- وضعیت: ${log.status}
- خلاصه: ${log.summary}
- پیگیری بعدی: ${log.nextFollowUpDate ? new Date(log.nextFollowUpDate).toLocaleDateString('fa-IR') : 'ندارد'}
    `.trim();
};

const formatVisitReport = (report?: VisitReport): string => {
    if (!report) return 'اطلاعاتی ثبت نشده.';
    return `
- نوع: ${report.type}
- تاریخ: ${new Date(report.date).toLocaleString('fa-IR')}
- مکان: ${report.location}
- حاضرین داخلی: ${report.attendeesInternal}
- حاضرین خارجی: ${report.attendeesExternal}
- خلاصه: ${report.summary}
- نتایج: ${report.outcomes}
- اقدامات بعدی: ${report.nextSteps || 'ندارد'}
    `.trim();
};

const formatProductIntroduction = (intro?: ProductIntroduction): string => {
    if (!intro) return 'اطلاعاتی ثبت نشده.';
    return `
- نام محصول/کاتالوگ: ${intro.productName}
- یادداشت‌ها: ${intro.notes}
- فایل ضمیمه: ${intro.fileUrl || 'ندارد'}
    `.trim();
};

const jsonPromptPrefix = 'You are a professional assistant for a CRM system. Generate a notification. The response MUST be a JSON object with two keys: "subject" and "body". The language of the JSON values must be Farsi. The tone should be formal and appropriate for the context described.\n\nTask:\n';

const generatePrompts = (lead: LeadData, stepId: string) => {
    const prompts = {
        internal: '',
        external: ''
    };

    switch(stepId) {
        case '1-1': // Lead Generation
            prompts.internal = jsonPromptPrefix + `Generate an internal notification for the sales team about a new lead.
Data:
- Name: ${lead.fullName}
- Phone: ${lead.contactNumber}
- Email: ${lead.email}
- Source: ${lead.source}
- Interest: ${lead.productOfInterest}
- Interest Level: ${lead.interestLevel}/5
The subject should be "سرنخ جدید ثبت شد: ${lead.fullName}".
The body should summarize the lead's information and prompt the sales team to follow up.`;
            prompts.external = jsonPromptPrefix + `Generate a welcome email to a new lead.
Data:
- Name: ${lead.fullName}
The subject should be "از علاقه شما سپاسگزاریم، ${lead.fullName}!".
The body should be a warm welcome, confirm their interest, and mention that a sales representative will contact them soon.`;
            break;

        case '1-2': // Lead Registration
            prompts.internal = jsonPromptPrefix + `Generate an internal notification for the qualification team about a newly registered potential customer.
Data:
- Name: ${lead.fullName}
- Potential Customer ID: ${lead.potentialCustomerId}
- Customer Group: ${lead.customerGroup}
- Activity Field: ${lead.activityField}
The subject should be "مشتری بالقوه جدید ثبت شد: ${lead.fullName}".
The body should announce the new potential customer and ask the team to proceed with needs assessment and qualification.`;
            prompts.external = jsonPromptPrefix + `Generate a follow-up email to the newly registered potential customer.
Data:
- Name: ${lead.fullName}
The subject should be "اطلاعات شما با موفقیت ثبت شد".
The body should confirm the registration, thank them for providing more details, and explain that the next step is a needs assessment call.`;
            break;
            
        case '1-3': // Needs and Qualification
            prompts.internal = jsonPromptPrefix + `Generate an internal notification for the sales/technical team about a qualified lead.
Data:
- Name: ${lead.fullName}
- Area of Need: ${lead.areaOfNeed}
- Announced Budget: ${lead.announcedBudget?.toLocaleString('fa-IR')} ریال
- Purchase Priority: ${lead.purchasePriority}
- Status Summary: ${lead.statusSummary}
The subject should be "سرنخ واجد شرایط برای ارائه پیشنهاد: ${lead.fullName}".
The body should summarize the qualification details and request the preparation of a quotation.`;
            prompts.external = jsonPromptPrefix + `Generate a follow-up email to the customer after the qualification call.
Data:
- Name: ${lead.fullName}
- Area of Need: ${lead.areaOfNeed}
The subject should be "در حال آماده‌سازی پیشنهاد قیمت برای شما".
The body should thank them for the call, confirm understanding of their needs, and inform them that a quotation is being prepared and will be sent shortly.`;
            break;
        
        case '1-4': // Call/Contact Log
            const log = lead.contactLogs?.[lead.contactLogs.length-1];
            prompts.internal = jsonPromptPrefix + `Generate an internal summary of a recent contact log for the sales manager.
Data:
- Customer: ${lead.fullName}
- Contact Type: ${log?.type}
- Contact Person: ${log?.contactPerson}
- Status: ${log?.status}
- Summary: ${log?.summary}
The subject should be "گزارش تماس با مشتری: ${lead.fullName}".
The body should detail the contact log for the manager's awareness and record-keeping.`;
             prompts.external = jsonPromptPrefix + `Generate a follow-up email to the customer after a call.
Data:
- Customer Name: ${lead.fullName}
- Summary: ${log?.summary}
- Next Step: ${log?.nextFollowUpDate ? `بر اساس توافق، پیگیری بعدی ما در تاریخ ${new Date(log.nextFollowUpDate).toLocaleDateString('fa-IR')} خواهد بود.` : ''}
The subject should be "خلاصه تماس امروز".
The body should summarize the key points discussed in the call and confirm the next steps.`;
            break;
            
        case '1-5': // Customer Follow-up
            const followUp = lead.followUps?.[lead.followUps.length - 1];
            prompts.internal = jsonPromptPrefix + `Generate an internal notification about a customer follow-up action.
Data:
- Customer: ${lead.fullName}
- Method: ${followUp?.method}
- Notes: ${followUp?.notes}
- Next Follow-up: ${followUp?.nextFollowUpDate ? new Date(followUp?.nextFollowUpDate).toLocaleDateString('fa-IR') : 'ندارد'}
The subject should be "ثبت پیگیری برای مشتری: ${lead.fullName}".
The body should log the follow-up details and set a reminder if a next follow-up date is provided.`;
            prompts.external = 'This is an internal form. No external communication needed.';
            break;

        case '1-6': // Visit/Meeting Report
            const visit = lead.visitReports?.[lead.visitReports.length - 1];
            prompts.internal = jsonPromptPrefix + `Generate a meeting report summary for internal stakeholders.
Data:
- Customer: ${lead.fullName}
- Attendees: ${visit?.attendeesInternal}
- Outcomes: ${visit?.outcomes}
- Next Steps: ${visit?.nextSteps}
The subject should be "گزارش جلسه با ${lead.fullName}".
The body should provide a concise summary of the meeting, including key outcomes and action items for internal teams.`;
            prompts.external = jsonPromptPrefix + `Generate a follow-up email to the customer after a meeting.
Data:
- Customer Name: ${lead.fullName}
- Key Outcomes: ${visit?.outcomes}
- Next Steps: ${visit?.nextSteps}
The subject should be "خلاصه جلسه امروز - ${visit?.purpose}".
The body should thank them for their time, summarize the key decisions and outcomes, and outline the agreed-upon next steps for both parties.`;
            break;

        case '1-7': // Product Introduction
            const intro = lead.productIntroductions?.[lead.productIntroductions.length - 1];
            prompts.internal = jsonPromptPrefix + `Generate an internal log entry about a product introduction.
Data:
- Customer: ${lead.fullName}
- Product/Catalog: ${intro?.productName}
- Notes: ${intro?.notes}
The subject should be "ثبت معرفی محصول به ${lead.fullName}".
The body should log that the product information was sent, for sales tracking purposes.`;
            prompts.external = jsonPromptPrefix + `Generate an email to the customer after sending them product information.
Data:
- Customer Name: ${lead.fullName}
- Product/Catalog Name: ${intro?.productName}
The subject should be "اطلاعات محصول درخواستی شما".
The body should state that the requested information/catalog is attached or has been sent, and offer to answer any questions they may have.`;
            break;
            
        case '1-8': // Quotation
            prompts.internal = jsonPromptPrefix + `Generate an internal notification that a quotation has been issued.
Data:
- Customer: ${lead.fullName}
- Quotation ID: ${lead.quotationId}
- Total Price: ${lead.totalPrice?.toLocaleString('fa-IR')} ریال
- Items: ${formatQuoteItems(lead.quoteItems)}
The subject should be "پیش‌فاکتور جدید صادر شد - ${lead.fullName}".
The body should inform the sales team that the quotation has been sent and to prepare for follow-up.`;
            prompts.external = jsonPromptPrefix + `Generate an email to send with the quotation.
Data:
- Customer Name: ${lead.fullName}
- Quotation ID: ${lead.quotationId}
- Total Price: ${lead.totalPrice?.toLocaleString('fa-IR')} ریال
- Validity: ${lead.validityPeriod}
The subject should be "پیشنهاد قیمت سفارش شما - شماره ${lead.quotationId}".
The body should state that the quotation is attached, highlight the total price and validity period, and invite them to review and ask questions.`;
            break;
        
        case '1-8-response': // Quotation Response
            const responseText = lead.quotationResponse === 'قبول کامل' ? 'موافقت خود را اعلام کرده' : lead.quotationResponse === 'رد کامل' ? 'پیشنهاد را رد کرده' : 'درخواست مذاکره و اصلاح دارد';
            prompts.internal = jsonPromptPrefix + `Generate an internal alert about a customer's response to a quotation.
Data:
- Customer: ${lead.fullName}
- Quotation ID: ${lead.quotationId}
- Response: ${lead.quotationResponse}
- Notes: ${lead.responseNotes}
The subject should be "پاسخ مشتری به پیش‌فاکتور ${lead.quotationId}".
The body should state that the customer, ${lead.fullName}, has ${responseText}, and include their notes for the team to take the appropriate next action (proceed to order, re-negotiate, or close).`;
            prompts.external = jsonPromptPrefix + `Generate an email acknowledging the customer's response.
Data:
- Customer Name: ${lead.fullName}
- Quotation ID: ${lead.quotationId}
The subject should be "پاسخ شما در مورد پیشنهاد ${lead.quotationId} دریافت شد".
The body should thank them for their feedback. If accepted, confirm the next step is processing the order. If negotiation is requested, propose a meeting. If rejected, express regret and ask if there's anything else you can assist with.`;
            break;

        case '1-9': // Sales Order
            prompts.internal = jsonPromptPrefix + `Generate an internal notification to create a sales order.
Data:
- Customer: ${lead.fullName}
- Sales Order ID: ${lead.salesOrderId}
- Total Price: ${lead.totalPrice?.toLocaleString('fa-IR')} ریال
The subject should be "ایجاد سفارش فروش جدید برای ${lead.fullName}".
The body should instruct the admin/finance team to create the official sales order in the system and prepare for the contract phase.`;
            prompts.external = jsonPromptPrefix + `Generate an order confirmation email for the customer.
Data:
- Customer Name: ${lead.fullName}
- Order ID: ${lead.salesOrderId}
- Total Price: ${lead.totalPrice?.toLocaleString('fa-IR')} ریال
The subject should be "سفارش شما با شماره ${lead.salesOrderId} تایید شد".
The body should thank them for their order, confirm the details, and explain that the next step is the sales contract.`;
            break;
            
        case '1-10': // Sales Contract
            prompts.internal = jsonPromptPrefix + `Generate an internal notification for the legal and finance teams that a contract has been finalized.
Data:
- Customer: ${lead.fullName}
- Contract ID: ${lead.contractId}
- Signed by: Customer (${lead.customerSignature}), Manager (${lead.managerSignature})
The subject should be "قرارداد فروش با ${lead.fullName} نهایی و امضا شد".
The body should announce the finalized contract and instruct relevant departments to proceed with delivery and invoicing.`;
            prompts.external = jsonPromptPrefix + `Generate an email to the customer with the signed contract.
Data:
- Customer Name: ${lead.fullName}
- Contract ID: ${lead.contractId}
The subject should be "نسخه نهایی قرارداد شما - ${lead.contractId}".
The body should provide the customer with the final, signed copy of the contract for their records and thank them for their business.`;
            break;

        case '1-11': // Complaint/Feedback
            const complaint = lead.complaints?.[lead.complaints.length - 1];
            prompts.internal = jsonPromptPrefix + `Generate an internal alert for the customer support or relevant department about new customer feedback.
Data:
- Customer: ${lead.fullName}
- Type: ${complaint?.type}
- Priority: ${complaint?.priority}
- Details: ${complaint?.details}
The subject should be "بازخورد جدید از مشتری: ${lead.fullName} (اولویت: ${complaint?.priority})".
The body should detail the complaint/feedback and assign it for immediate investigation and resolution.`;
            prompts.external = jsonPromptPrefix + `Generate an acknowledgement email to the customer who submitted feedback.
Data:
- Customer Name: ${lead.fullName}
- Type: ${complaint?.type}
The subject should be "بازخورد شما دریافت شد".
The body should thank them for their feedback, confirm that their message has been received and routed to the correct department, and assure them of a follow-up.`;
            break;
        
        case '1-12': // Customer Satisfaction Survey
            const survey = lead.surveys?.[lead.surveys.length - 1];
            prompts.internal = jsonPromptPrefix + `Generate an internal summary of a new customer satisfaction survey.
Data:
- Customer: ${lead.fullName}
- Overall Satisfaction: ${survey?.ratings?.overallSatisfaction}/5
- Comments: ${survey?.comments}
The subject should be "نتایج نظرسنجی جدید از مشتری: ${lead.fullName}".
The body should summarize the survey results for the customer success team to review and identify areas for improvement.`;
            prompts.external = jsonPromptPrefix + `Generate a thank you email to the customer after they complete a survey.
Data:
- Customer Name: ${lead.fullName}
The subject should be "از اینکه در نظرسنجی ما شرکت کردید سپاسگزاریم".
The body should thank them for their time and valuable feedback, assuring them that their input helps improve services.`;
            break;

        case '1-16': // Marketing Activity
            const activity = lead.marketingActivities?.[lead.marketingActivities.length - 1];
            prompts.internal = jsonPromptPrefix + `Generate an internal notification about a planned marketing activity.
Data:
- Activity Type: ${activity?.type}
- Target Audience: ${activity?.targetAudience}
- Expected Outcome: ${activity?.outcome}
The subject should be "برنامه‌ریزی فعالیت بازاریابی جدید: ${activity?.type}".
The body should detail the planned activity for the marketing team's awareness and coordination.`;
            prompts.external = 'This is an internal form. No external communication needed.';
            break;
            
        case 'mkt-08': // Delivery Work Order
            prompts.internal = jsonPromptPrefix + `Generate a work order for the logistics/operations team to arrange a delivery.
Data:
- Customer: ${lead.fullName}
- Delivery Order ID: ${lead.deliveryOrderId}
- Delivery Address: ${lead.deliveryAddress}
- Scheduled Date: ${lead.deliveryDate}
- Notes: ${lead.deliveryTermsDetails}
The subject should be "دستور تحویل کالا برای سفارش ${lead.salesOrderId}".
The body should provide all necessary details for the operations team to prepare and dispatch the goods.`;
            prompts.external = jsonPromptPrefix + `Generate a notification to the customer about their upcoming delivery.
Data:
- Customer Name: ${lead.fullName}
- Order ID: ${lead.salesOrderId}
- Scheduled Delivery Date: ${lead.deliveryDate}
The subject should be "سفارش شما در راه است!".
The body should inform the customer of the scheduled delivery date and ask them to be prepared for reception.`;
            break;
            
        case 'mkt-09': // Delivery Reception
            prompts.internal = jsonPromptPrefix + `Generate an internal notification for the finance and support teams that a delivery has been completed.
Data:
- Customer: ${lead.fullName}
- Delivery Order ID: ${lead.deliveryOrderId}
- Reception Status: ${lead.receptionStatus}
- Notes: ${lead.receptionNotes}
The subject should be "گزارش تحویل سفارش ${lead.salesOrderId}".
The body should confirm the delivery status. If issues are reported, it should alert the support team. It should also notify finance that the delivery is complete, clearing the way for final invoicing.`;
            prompts.external = jsonPromptPrefix + `Generate a delivery confirmation email to the customer.
Data:
- Customer Name: ${lead.fullName}
- Order ID: ${lead.salesOrderId}
The subject should be "تاییدیه تحویل سفارش شما".
The body should confirm that the delivery was successful. If the customer reported issues, it should acknowledge them and state that a support representative will be in touch.`;
            break;

        case '3-1-1': // Customer Credit Inquiry
            const cci = lead.customerCreditInquiry;
            prompts.internal = jsonPromptPrefix + `Generate a formal request email to the finance department to conduct a credit check.
Data:
- Customer ID: ${cci?.customerId}
- Customer Name: ${lead.fullName}
- Request Reason: ${cci?.requestReason}
The subject should be "درخواست استعلام اعتبار برای مشتری: ${lead.fullName}".
The body should be a formal request to the finance department to perform a credit check, mentioning the customer's name and the reason for the request.`;
            prompts.external = jsonPromptPrefix + `Generate a notification email to the customer informing them that a credit check is part of the process.
Data:
- Customer Name: ${lead.fullName}
The subject should be "اطلاع‌رسانی در خصوص فرآیند ثبت سفارش".
The body should politely inform the customer that a standard credit check is underway as part of the new order process and ask them to provide any necessary documents if requested by the finance team.`;
            break;
        case '3-1-2': // Proforma Invoice Issuance
            const pfi = lead.proformaInvoiceRequest;
            prompts.internal = jsonPromptPrefix + `Generate a request to the finance/sales admin team to issue a proforma invoice.
Data:
- Customer ID: ${pfi?.customerId}
- Related Quote ID: ${pfi?.relatedQuoteId}
The subject should be "درخواست صدور پیش‌فاکتور برای سفارش ${pfi?.relatedQuoteId}".
The body should instruct the team to generate and send the proforma invoice to the customer based on the referenced quotation.`;
            prompts.external = jsonPromptPrefix + `Generate an email to the customer with the attached proforma invoice.
Data:
- Customer Name: ${lead.fullName}
- Quote ID: ${pfi?.relatedQuoteId}
The subject should be "پیش‌فاکتور سفارش شما - شماره ${pfi?.relatedQuoteId}".
The body should mention that the proforma invoice is attached and explain the payment details and next steps to finalize the order.`;
            break;
        case '3-1-3': // Receipts
            const rec = lead.receipt;
            prompts.internal = jsonPromptPrefix + `Generate an internal notification for the finance department about a received payment.
Data:
- Customer Name: ${lead.fullName}
- Amount: ${rec?.amount.toLocaleString('fa-IR')} ریال
- Method: ${rec?.paymentMethod}
- Reference: ${rec?.referenceId}
- Invoice ID: ${rec?.invoiceId}
The subject should be "ثبت وصول وجه از مشتری: ${lead.fullName}".
The body should inform the finance department of the payment details for reconciliation against the customer's account or specific invoice.`;
            prompts.external = jsonPromptPrefix + `Generate a payment confirmation email for the customer.
Data:
- Customer Name: ${lead.fullName}
- Amount: ${rec?.amount.toLocaleString('fa-IR')} ریال
- Reference: ${rec?.referenceId}
The subject should be "تاییدیه دریافت پرداخت شما".
The body should thank the customer for their payment and confirm the amount received.`;
            break;
        case '3-1-4': // Invoice Request
            const invReq = lead.invoiceRequest;
            prompts.internal = jsonPromptPrefix + `Generate a request for the accounting department to issue a final invoice.
Data:
- Customer ID: ${invReq?.customerId}
- Proforma ID: ${invReq?.proformaInvoiceId}
- Amount: ${invReq?.amount.toLocaleString('fa-IR')} ریال
The subject should be "درخواست صدور فاکتور نهایی برای ${lead.fullName}".
The body should request the issuance of the official final tax invoice based on the proforma and confirmed payment.`;
            prompts.external = jsonPromptPrefix + `Generate an email to the customer with their final invoice attached.
Data:
- Customer Name: ${lead.fullName}
- Invoice Amount: ${invReq?.amount.toLocaleString('fa-IR')} ریال
The subject should be "فاکتور فروش رسمی سفارش شما".
The body should state that the final invoice is attached for their records and provide details on warranty or support if applicable.`;
            break;
        case '3-1-5': // Account Clearance
            const ac = lead.accountClearance;
            prompts.internal = jsonPromptPrefix + `Generate a notification for sales and finance that a customer's account has been cleared.
Data:
- Customer Name: ${lead.fullName}
- Clearance Date: ${new Date(ac?.clearanceDate || Date.now()).toLocaleDateString('fa-IR')}
The subject should be "اعلام تسویه حساب نهایی مشتری: ${lead.fullName}".
The body should inform the teams that the customer has settled all dues, and the sales cycle for this transaction is now fiscally closed.`;
            prompts.external = jsonPromptPrefix + `Generate an account clearance confirmation and thank you letter for the customer.
Data:
- Customer Name: ${lead.fullName}
The subject should be "گواهی تسویه حساب و سپاس از همکاری شما".
The body should formally thank the customer for their business, confirm that their account for the recent transaction is fully settled, and express hope for future collaboration.`;
            break;
        case '3-1-6': // Commission Report
            const comm = lead.commissionReport;
            prompts.internal = jsonPromptPrefix + `Generate a commission payment request for the finance department.
Data:
- Salesperson: ${comm?.salespersonName}
- Period: ${comm?.reportPeriod}
- Commission Amount: ${comm?.commissionAmount.toLocaleString('fa-IR')} ریال
The subject should be "درخواست پرداخت کمیسیون فروش - ${comm?.salespersonName}".
The body should request the processing and payment of the calculated commission for the specified period.`;
            prompts.external = jsonPromptPrefix + `Generate a commission statement for the salesperson.
Data:
- Salesperson: ${comm?.salespersonName}
- Period: ${comm?.reportPeriod}
- Total Sales: ${comm?.totalSales.toLocaleString('fa-IR')} ریال
- Commission Amount: ${comm?.commissionAmount.toLocaleString('fa-IR')} ریال
The subject should be "صورتحساب کمیسیون شما برای دوره ${comm?.reportPeriod}".
The body should provide a detailed breakdown of their sales and the calculated commission for their records.`;
            break;
        case '2-1':
            const evl = lead.exhibitionVisitorLog;
            prompts.internal = jsonPromptPrefix + `Generate an internal notification for the sales team about a new lead from an event.
Data:
- Visitor Name: ${evl?.visitorName} from ${evl?.company}
- Event: ${evl?.eventName}
- Interest Level: ${evl?.interestLevel}/5
- Notes: ${evl?.notes}
The subject should be "سرنخ جدید از رویداد ${evl?.eventName}: ${evl?.visitorName}".
The body should announce the new lead and assign a salesperson for immediate follow-up.`;
            prompts.external = jsonPromptPrefix + `Generate a thank you email to an event visitor.
Data:
- Visitor Name: ${evl?.visitorName}
- Event: ${evl?.eventName}
The subject should be "از بازدید شما از غرفه ما در ${evl?.eventName} متشکریم".
The body should thank them for visiting the booth, briefly remind them of the company/product, and provide a contact person for further questions.`;
            break;
        case '2-3':
            const er = lead.eventReport;
            prompts.internal = jsonPromptPrefix + `Generate a summary report for management about an event's performance.
Data:
- Event: ${er?.eventName}
- Attendees: ${er?.totalAttendees}
- Leads: ${er?.leadsGenerated}
- Cost: ${er?.totalCost?.toLocaleString('fa-IR')} ریال
- Summary: ${er?.summary}
The subject should be "گزارش عملکرد رویداد: ${er?.eventName}".
The body should summarize the key metrics, outcomes, and learnings from the event for management review.`;
            prompts.external = jsonPromptPrefix + `Generate a thank you email for event attendees and partners.
Data:
- Event: ${er?.eventName}
The subject should be "سپاس از حضور شما در رویداد ${er?.eventName}".
The body should thank all attendees and partners for their participation which made the event a success, and optionally share a link to photos or presentations.`;
            break;
        case '2-7':
            const pid = lead.promoItemDistribution;
            prompts.internal = jsonPromptPrefix + `Generate a report for the marketing department about the distribution of promotional items.
Data:
- Event: ${pid?.eventName}
- Item: ${pid?.itemName}
- Quantity: ${pid?.quantity}
The subject should be "گزارش توزیع اقلام تبلیغاتی در رویداد ${pid?.eventName}".
The body should inform the team about the number of ${pid?.itemName} distributed for inventory and effectiveness tracking purposes.`;
            prompts.external = 'This is an internal form. No external communication needed.';
            break;
        case '4-13':
            const crm = lead.campaignRiskManagement;
             prompts.internal = jsonPromptPrefix + `Generate an internal alert to the campaign manager about an identified risk.
Data:
- Campaign: ${crm?.campaignName}
- Risk: ${crm?.riskDescription}
- Likelihood: ${crm?.likelihood}
- Impact: ${crm?.impact}
- Mitigation: ${crm?.mitigationPlan}
The subject should be "هشدار ریسک در کمپین ${crm?.campaignName}".
The body should detail the identified risk and the proposed mitigation plan for immediate review and action.`;
            prompts.external = `This is an internal form. No external communication is typically needed.`;
            break;
        case '5-3':
            const al = lead.adLicensing;
            prompts.internal = jsonPromptPrefix + `Generate a follow-up request for the legal/admin team regarding an advertising license.
Data:
- Campaign: ${al?.campaignName}
- License Type: ${al?.licenseType}
- Status: ${al?.status}
The subject should be "پیگیری وضعیت مجوز تبلیغات برای کمپین ${al?.campaignName}".
The body should request an update on the status of the license application from the relevant authority.`;
            prompts.external = `This is an internal form. No external communication is typically needed.`;
            break;
        case '5-5':
            const amr = lead.adMaterialRequest;
            prompts.internal = jsonPromptPrefix + `Generate a formal request to the design team for new advertising materials.
Data:
- Requester: ${amr?.requester}
- Campaign: ${amr?.campaignName}
- Material: ${amr?.materialType}
- Deadline: ${new Date(amr?.deadline || Date.now()).toLocaleDateString('fa-IR')}
- Specs: ${amr?.specifications}
The subject should be "درخواست طراحی جدید برای کمپین ${amr?.campaignName}".
The body should formally detail the design request, specifications, and deadline for the design team.`;
            prompts.external = `This is an internal form. No external communication needed.`;
            break;
        case '5-6':
            const cmr = lead.coMarketingRequest;
            prompts.internal = jsonPromptPrefix + `Generate a proposal summary for management review about a co-marketing opportunity.
Data:
- Partner: ${cmr?.partnerName}
- Campaign: ${cmr?.campaignName}
- Objectives: ${cmr?.objectives}
The subject should be "بررسی پیشنهاد همکاری مشترک بازاریابی با ${cmr?.partnerName}".
The body should summarize the co-marketing proposal, including objectives and potential benefits, and ask for a go/no-go decision.`;
            prompts.external = jsonPromptPrefix + `Generate a proposal email to a potential co-marketing partner.
Data:
- Partner: ${cmr?.partnerName}
- Campaign: ${cmr?.campaignName}
- Objectives: ${cmr?.objectives}
The subject should be "پیشنهاد همکاری در کمپین بازاریابی مشترک".
The body should formally propose the joint marketing campaign, outlining the mutual benefits and objectives, and invite them to a meeting to discuss further.`;
            break;
        case '5-7':
            const es = lead.eventSponsorship;
            prompts.internal = jsonPromptPrefix + `Generate an internal report for management on a sponsorship decision.
Data:
- Event: ${es?.eventName}
- Type: ${es?.sponsorshipType}
- Cost: ${es?.cost.toLocaleString('fa-IR')} ریال
- Outcome: ${es?.outcome}
The subject should be "گزارش حمایت مالی از رویداد ${es?.eventName}".
The body should summarize the sponsorship details, cost, and its outcome or ROI for management records.`;
            prompts.external = jsonPromptPrefix + `Generate a formal sponsorship request letter.
Data:
- Event: ${es?.eventName}
- Sponsorship Level: ${es?.sponsorshipLevel}
- Benefits: ${es?.benefits}
The subject should be "دعوت به حمایت مالی از رویداد ${es?.eventName}".
The body should be a formal request for sponsorship, detailing the event, the various sponsorship levels, and the benefits for the sponsor at the specified level.`;
            break;
        case '9-1':
            const lla = lead.lostLeadAnalysis;
            prompts.internal = jsonPromptPrefix + `Generate a summary email for the marketing and sales managers about a lost lead analysis.
Data:
- Lost Lead: ${lla?.lostLeadName} (${lla?.lostLeadId})
- Reason: ${lla?.reasonForLoss}
- Customer Feedback: ${lla?.customerFeedback || 'N/A'}
- Corrective Action: ${lla?.correctiveAction}
The subject should be "تحلیل علل از دست رفتن سرنخ: ${lla?.lostLeadName}".
The body should summarize the findings of the analysis and the proposed corrective action for review and implementation.`;
            prompts.external = jsonPromptPrefix + `Generate a re-engagement email for a lost customer.
Data:
- Customer Name: ${lla?.lostLeadName}
- Context: Reaching out after some time to offer a new alternative or special discount.
The subject should be "یک فرصت جدید برای همکاری".
The body should be a polite and carefully worded email acknowledging their previous interest, expressing regret that it didn't work out at the time, and gently offering a special incentive or a new, more suitable product/service to encourage them to reconsider.`;
            break;
        case '1-17':
            const spr = lead.salesPeriodicReport;
            prompts.internal = jsonPromptPrefix + `Generate a concise summary email for sales management about the periodic sales report.
Data:
- Period: ${spr?.period}
- Total Sales: ${spr?.totalSales.toLocaleString('fa-IR')} ریال
- Top Customers: ${spr?.topCustomers}
- Analysis: ${spr?.analysis}
The subject should be "خلاصه گزارش فروش دوره‌ای - ${spr?.period}".
The body should provide key metrics and a summary of the analysis, highlighting trends and key performance indicators.`;
            prompts.external = 'This is an internal form. No external communication needed.';
            break;
        case '2-4':
            const fsf = lead.fieldSalesFeedback;
            prompts.internal = jsonPromptPrefix + `Generate an internal alert for the sales manager about new feedback from a field representative.
Data:
- Customer: ${fsf?.customerName}
- Feedback: "${fsf?.feedback}"
- Visit Date: ${new Date(fsf?.visitDate || Date.now()).toLocaleDateString('fa-IR')}
The subject should be "بازخورد جدید از بازدید میدانی - مشتری: ${fsf?.customerName}".
The body should detail the feedback from the field sales rep and request the manager's review for potential action or strategic adjustment.`;
            prompts.external = `This is an internal form. No external communication needed.`;
            break;
        case '2-5':
            const pse = lead.pointOfSaleEvaluation;
            prompts.internal = jsonPromptPrefix + `Generate a summary report for the regional manager about a point of sale evaluation.
Data:
- Branch: ${pse?.branchName}
- Date: ${new Date(pse?.evaluationDate || Date.now()).toLocaleDateString('fa-IR')}
- Appearance Score: ${pse?.appearance}/5
- Service Quality: ${pse?.serviceQuality}/5
- Comments: ${pse?.comments}
The subject should be "گزارش ارزیابی شعبه: ${pse?.branchName}".
The body should summarize the scores and key comments from the evaluation for management review.`;
            prompts.external = jsonPromptPrefix + `Generate a formal notification for the branch manager about their evaluation results.
Data:
- Branch: ${pse?.branchName}
- Evaluation Date: ${new Date(pse?.evaluationDate || Date.now()).toLocaleDateString('fa-IR')}
- Key Comments: ${pse?.comments}
The subject should be "نتایج ارزیابی عملکرد شعبه شما".
The body should share the results constructively, highlighting strengths and areas for improvement, and encourage the branch manager to implement suggested changes.`;
            break;
        case '2-6':
            const spr_reg = lead.sampleProductRegistration;
            prompts.internal = jsonPromptPrefix + `Generate a notification for the warehouse and sales team about a new product sample request.
Data:
- Customer: ${spr_reg?.customerName}
- Product: ${spr_reg?.productName}
The subject should be "درخواست ارسال نمونه محصول برای ${spr_reg?.customerName}".
The body should instruct the warehouse to dispatch the sample and inform the sales team to follow up with the customer after a reasonable time.`;
            prompts.external = jsonPromptPrefix + `Generate an email to the customer confirming their sample request.
Data:
- Customer: ${spr_reg?.customerName}
- Product: ${spr_reg?.productName}
The subject should be "نمونه محصول درخواستی شما در راه است".
The body should inform the customer that their requested sample has been dispatched and to expect it soon, providing a contact for any questions.`;
            break;
        case '2-8':
            const osae = lead.onSiteAftersalesEvaluation;
            prompts.internal = jsonPromptPrefix + `Generate a report for the service manager about an on-site service evaluation.
Data:
- Customer: ${osae?.customerName}
- Service: ${osae?.serviceType}
- Technician: ${osae?.technician}
- Rating: ${osae?.serviceRating}/5
The subject should be "گزارش ارزیابی خدمات پس از فروش در محل - ${osae?.customerName}".
The body should provide details of the service provided and the customer's rating for quality control and performance review purposes.`;
            prompts.external = `This is an internal form. No external communication needed.`;
            break;
        case '2-9':
            const osss = lead.onSiteSatisfactionSurvey;
            prompts.internal = jsonPromptPrefix + `Generate a summary of an on-site satisfaction survey for management.
Data:
- Interviewer: ${osss?.interviewer}
- Overall Satisfaction: ${osss?.overallSatisfaction}/5
- Positives: ${osss?.positivePoints}
- Improvements: ${osss?.improvementAreas}
The subject should be "نتایج نظرسنجی رضایت در محل - ${osss?.id}".
The body should summarize the key findings from the survey, including positive points and areas needing improvement, for management review.`;
            prompts.external = jsonPromptPrefix + `Generate a thank you message for the customer after completing an on-site survey.
Data:
- Customer Name: ${lead.fullName}
The subject should be "از اینکه در نظرسنجی ما شرکت کردید سپاسگزاریم".
The body should thank them for their time and valuable feedback, assuring them it will be used to improve services.`;
            break;
        case '2-10':
            const fgf = lead.focusGroupFeedback;
            prompts.internal = jsonPromptPrefix + `Generate a detailed memo for the product and marketing teams about the results of a focus group.
Data:
- Topic: ${fgf?.topic}
- Key Findings: ${fgf?.keyFindings}
The subject should be "خلاصه نتایج جلسه گروه تمرکز با موضوع: ${fgf?.topic}".
The body should detail the main insights and actionable feedback gathered from the session to inform product development and marketing strategies.`;
            prompts.external = jsonPromptPrefix + `Generate a thank you email for the focus group participants.
Data:
- Topic: ${fgf?.topic}
The subject should be "سپاس از حضور شما در جلسه گروه تمرکز".
The body should thank them for their valuable contribution and insights on the topic discussed.`;
            break;
        case '2-11':
            const sic = lead.storeInventoryCheck;
            const discrepancyItems = sic?.checkedItems?.filter(item => item.systemQty !== item.physicalQty)
                .map(item => `- ${item.itemName} (سیستم: ${item.systemQty}, فیزیکی: ${item.physicalQty}, مغایرت: ${item.physicalQty - item.systemQty})`).join('\n');
            prompts.internal = jsonPromptPrefix + `Generate an inventory check report for the warehouse and finance managers.
Data:
- Branch: ${sic?.branchName}
- Date: ${new Date(sic?.checkDate || Date.now()).toLocaleDateString('fa-IR')}
- Discrepancies: ${discrepancyItems || 'ندارد'}
The subject should be "گزارش کنترل موجودی انبار شعبه ${sic?.branchName}".
The body should report the findings of the inventory check, highlighting any discrepancies for investigation and adjustment.`;
            prompts.external = `This is an internal form. No external communication needed.`;
            break;

        case '6-2':
            const npr = lead.newPartnershipRequest;
            prompts.internal = jsonPromptPrefix + `Generate a formal internal notification for the business development manager about a new partnership request.
Data:
- Potential Partner: ${npr?.potentialPartner}
- Partnership Area: ${npr?.partnershipArea}
- Synergy: ${npr?.synergyDescription}
The subject should be "بررسی درخواست همکاری جدید از طرف ${npr?.potentialPartner}".
The body should summarize the request and ask for a preliminary evaluation and risk assessment.`;
            prompts.external = jsonPromptPrefix + `Generate a formal acknowledgement email to the potential partner.
Data:
- Partner Name: ${npr?.potentialPartner}
The subject should be "دریافت درخواست همکاری شما".
The body should thank them for their interest, confirm receipt of their proposal, and inform them that it is under review and that you will get back to them in due course.`;
            break;
        case '6-3':
            const ape = lead.agentPerformanceEvaluation;
            prompts.internal = jsonPromptPrefix + `Generate a summary of an agent's performance review for the sales manager.
Data:
- Agent: ${ape?.agentName}
- Period: ${ape?.period}
- Sales Volume: ${ape?.salesVolume.toLocaleString('fa-IR')} ریال
- Customer Satisfaction: ${ape?.customerSatisfaction}/5
- Recommendation: ${ape?.recommendation}
The subject should be "خلاصه ارزیابی عملکرد نماینده: ${ape?.agentName}".
The body should provide a concise summary of the performance metrics and the final recommendation for the manager's review.`;
            prompts.external = jsonPromptPrefix + `Generate an email to the agent/partner summarizing their performance review.
Data:
- Agent: ${ape?.agentName}
- Period: ${ape?.period}
The subject should be "نتایج ارزیابی عملکرد شما در دوره ${ape?.period}".
The body should share the key results in a constructive manner, appreciate their efforts, and invite them for a meeting to discuss future plans and areas for growth.`;
            break;
        case '6-4':
            const sf = lead.stakeholderFeedback;
            prompts.internal = jsonPromptPrefix + `Generate an internal alert for the relevant department head about new feedback from a stakeholder.
Data:
- Stakeholder: ${sf?.stakeholderName} (${sf?.stakeholderType})
- Feedback: "${sf?.feedbackText}"
- Proposed Action: ${sf?.proposedAction}
The subject should be "بازخورد جدید از ذی‌نفع: ${sf?.stakeholderName}".
The body should detail the feedback and request a review and action plan from the relevant department manager.`;
            prompts.external = jsonPromptPrefix + `Generate a confirmation email to the stakeholder who provided feedback.
Data:
- Stakeholder Name: ${sf?.stakeholderName}
The subject should be "بازخورد شما با موفقیت ثبت شد".
The body should thank them for their feedback, assure them that it has been forwarded to the relevant department for review, and that they will be updated on the progress if applicable.`;
            break;
        case '7-4':
            const te = lead.trainingEffectiveness;
            prompts.internal = jsonPromptPrefix + `Generate a report for the HR/Training manager on the effectiveness of a training program.
Data:
- Training Name: ${te?.trainingName}
- Post-training Score: ${te?.postTrainingScore}
- Change: ${te.postTrainingScore - te.preTrainingScore}
- Feedback Summary: "${te?.feedbackSummary}"
The subject should be "گزارش اثربخشی آموزش: ${te?.trainingName}".
The body should summarize the results, highlight the score improvement, and note key feedback points for improving future training sessions.`;
            prompts.external = jsonPromptPrefix + `Generate a summary email for the training attendees.
Data:
- Training Name: ${te?.trainingName}
The subject should be "نتایج و جمع‌بندی دوره آموزشی ${te?.trainingName}".
The body should thank them for their participation, share the overall positive outcomes and improvements, and provide links to resources or certificates if available.`;
            break;
        case '7-5':
            const sie = lead.salesIncentiveEffectiveness;
            prompts.internal = jsonPromptPrefix + `Generate a report for sales and finance management on the effectiveness of an incentive program.
Data:
- Program: ${sie?.programName}
- Cost: ${sie?.cost.toLocaleString('fa-IR')} ریال
- Sales Increase: ${sie?.salesIncrease.toLocaleString('fa-IR')} ریال
- ROI: ${sie?.roi}%
- Feedback: ${sie?.feedback}
The subject should be "گزارش اثربخشی برنامه انگیزشی: ${sie?.programName}".
The body should summarize the financial results and team feedback to evaluate the program's success and decide on future initiatives.`;
            prompts.external = `This is an internal form. No external communication needed.`;
            break;
        case '7-7':
            const projRev = lead.projectReview;
            prompts.internal = jsonPromptPrefix + `Generate an internal memo for project stakeholders about a project's status.
Data:
- Project: ${projRev?.projectName}
- Status: ${projRev?.status}
- Summary: ${projRev?.progressSummary}
- Lessons Learned: ${projRev?.lessonsLearned}
The subject should be "به‌روزرسانی وضعیت پروژه: ${projRev?.projectName}".
The body should provide a clear and concise update on the project's progress, current status, and key takeaways or lessons learned.`;
            prompts.external = jsonPromptPrefix + `Generate a project status update email for a client or external partner.
Data:
- Project: ${projRev?.projectName}
- Status: ${projRev?.status}
- Summary: ${projRev?.progressSummary}
The subject should be "گزارش پیشرفت پروژه ${projRev?.projectName}".
The body should inform the client of the current status in a professional tone, highlighting achievements and managing expectations for the next phase.`;
            break;
        case '6-1':
            const cod = lead.changeOfDistributor;
            prompts.internal = jsonPromptPrefix + `Generate a formal internal notification about a change of distributor.
Data:
- Previous Agent: ${cod?.previousAgent}
- New Agent: ${cod?.newAgent}
- Transfer Date: ${new Date(cod?.transferDate || Date.now()).toLocaleDateString('fa-IR')}
- Accounts: ${cod?.transferredAccounts}
The subject should be "اطلاع‌رسانی تغییر نماینده فروش".
The body should announce the change and ask all departments (sales, finance, support) to update their records and ensure a smooth transition for the affected accounts.`;
            prompts.external = jsonPromptPrefix + `Generate a formal notification email to the affected customers about the change of distributor.
Data:
- Previous Agent: ${cod?.previousAgent}
- New Agent: ${cod?.newAgent}
The subject should be "اطلاع‌رسانی در خصوص تغییر نماینده فروش".
The body should politely inform the customers about the change, introduce the new agent and their contact information, and reassure them of continued service quality.`;
            break;
        case '7-1':
            const ma = lead.marketAssessment;
            prompts.internal = jsonPromptPrefix + `Generate a summary report for the management team based on a market assessment.
Data:
- Target Market: ${ma?.targetMarket}
- Summary: ${ma?.summary}
- Opportunities: ${ma?.opportunities}
- Threats: ${ma?.threats}
- Recommendations: ${ma?.recommendations}
The subject should be "گزارش ارزیابی بازار: ${ma?.targetMarket}".
The body should provide a concise summary of the findings and highlight key recommendations for strategic planning.`;
            prompts.external = 'This is an internal form. No external communication needed.';
            break;
        case '7-2':
            const ca = lead.competitorAnalysis;
             prompts.internal = jsonPromptPrefix + `Generate an internal alert about a new competitor analysis.
Data:
- Competitor: ${ca?.competitorName}
- Key Strength: ${ca?.strengths}
- Key Weakness: ${ca?.weaknesses}
- Observed Strategy: ${ca?.strategy}
The subject should be "تحلیل جدید از رقیب: ${ca?.competitorName}".
The body should summarize the key findings from the analysis and suggest a strategy discussion meeting to address the competitor's actions.`;
            prompts.external = jsonPromptPrefix + `Generate a notification for the sales team and partners about a competitor's move.
Data:
- Competitor: ${ca?.competitorName}
- Action: ${ca?.strategy}
The subject should be "هشدار: حرکت جدید از سوی رقیب، ${ca?.competitorName}".
The body should briefly explain the competitor's recent action (e.g., new product launch, price drop) and provide talking points to reassure customers and counter their move.`;
            break;
        case '7-6':
             const sr = lead.marketingStrategyReview;
             prompts.internal = jsonPromptPrefix + `Generate an invitation for the strategic committee to a marketing strategy review meeting.
Data:
- Period: ${sr?.period}
- Key Performance: ${sr?.performanceVsGoals}
- Recommendations: ${sr.recommendations}
The subject should be "دعوت به جلسه بازنگری استراتژی بازاریابی - ${sr?.period}".
The body should announce the meeting, state its purpose, and attach the full report for prior review, highlighting key performance points and recommendations.`;
            prompts.external = 'This is an internal form. No external communication needed.';
            break;
        case '8-1':
            const b2bReq = lead.b2bPartnershipRequest;
            prompts.internal = jsonPromptPrefix + `Generate an internal memo for the business development team about a new B2B partnership request.
Data:
- Partner Name: ${b2bReq?.partnerName}
- Industry: ${b2bReq?.industry}
- Partnership Type: ${b2bReq?.partnershipType}
- Justification: ${b2bReq?.justification}
The subject should be "بررسی درخواست همکاری B2B از طرف ${b2bReq?.partnerName}".
The body should summarize the partnership request and ask for an evaluation of its strategic value and risks.`;
            prompts.external = jsonPromptPrefix + `Generate an acknowledgement email to the potential B2B partner.
Data:
- Partner Name: ${b2bReq?.partnerName}
The subject should be "درخواست همکاری شما دریافت شد".
The body should thank them for their proposal, confirm its receipt, and inform them that the business development team will review it and be in touch.`;
            break;
        case '8-2':
            const b2bOrder = lead.b2bOrder;
            prompts.internal = jsonPromptPrefix + `Generate a notification for the order processing and logistics teams about a new B2B order.
Data:
- Customer: ${b2bOrder?.customerName}
- Total Amount: ${b2bOrder?.totalAmount.toLocaleString('fa-IR')} ریال
- Payment Terms: ${b2bOrder?.paymentTerms}
The subject should be "ثبت سفارش عمده جدید برای ${b2bOrder?.customerName}".
The body should detail the order and instruct the teams to begin processing, check inventory, and prepare for shipment according to the payment terms.`;
            prompts.external = jsonPromptPrefix + `Generate a formal order confirmation for the B2B customer.
Data:
- Customer Name: ${b2bOrder?.customerName}
- Total Amount: ${b2bOrder?.totalAmount.toLocaleString('fa-IR')} ریال
The subject should be "تاییدیه سفارش عمده شما".
The body should formally confirm the order, summarize the key details like total amount and payment terms, and provide an estimated delivery schedule.`;
            break;
        case '8-3':
            const b2cOrder = lead.b2cOrder;
            prompts.internal = jsonPromptPrefix + `Generate an alert for the e-commerce fulfillment team about a new online order.
Data:
- Customer ID: ${b2cOrder?.customerId}
- Total Amount: ${b2cOrder?.totalAmount.toLocaleString('fa-IR')} ریال
The subject should be "سفارش اینترنتی جدید - ${b2cOrder?.id}".
The body should notify the team to pick, pack, and ship the order.`;
            prompts.external = jsonPromptPrefix + `Generate an order confirmation email for the B2C customer.
Data:
- Order ID: ${b2cOrder?.id}
- Total Amount: ${b2cOrder?.totalAmount.toLocaleString('fa-IR')} ریال
The subject should be "سفارش شما با موفقیت ثبت شد!".
The body should thank the customer for their purchase, confirm the order details, and provide a link to track the order status.`;
            break;
        case '8-4':
            const b2gTender = lead.b2gTender;
            prompts.internal = jsonPromptPrefix + `Generate an internal notification for the tender management team.
Data:
- Tender Title: ${b2gTender?.tenderTitle}
- Government Entity: ${b2gTender?.governmentEntity}
- Submission Date: ${new Date(b2gTender?.submissionDate || Date.now()).toLocaleDateString('fa-IR')}
The subject should be "یادآوری: آخرین مهلت ارسال اسناد مناقصه ${b2gTender?.tenderTitle}".
The body should remind the team of the upcoming deadline and ensure all required documents are prepared and submitted on time.`;
            prompts.external = `This is an internal form. No external communication needed.`;
            break;
        case '9-6':
            const spi = lead.salesProcessImprovement;
            prompts.internal = jsonPromptPrefix + `Generate a memo for the process improvement team about a newly identified issue.
Data:
- Process Area: ${spi?.processArea}
- Issue: ${spi?.issueDescription}
- Proposed Solution: ${spi?.proposedSolution}
The subject should be "شناسایی نقطه بهبود در فرآیند فروش: ${spi?.processArea}".
The body should describe the issue and the proposed solution, and request a review and feasibility analysis from the team.`;
            prompts.external = `This is an internal form. No external communication needed.`;
            break;
        case '9-7':
            const pmr = lead.postMortemReview;
            prompts.internal = jsonPromptPrefix + `Generate a summary report for management following a post-mortem review.
Data:
- Project/Sale: ${pmr?.projectName}
- Reason for Failure: ${pmr?.reasonForFailure}
- Lessons Learned: ${pmr?.lessonsLearned}
- Action Items: ${pmr?.actionItems}
The subject should be "گزارش بازبینی پس از شکست: ${pmr?.projectName}".
The body should provide a concise, factual summary of the analysis and outline clear, actionable steps to prevent similar issues in the future.`;
            prompts.external = `This is an internal form. No external communication needed.`;
            break;


        case '10-1': // content-request
            const cr = lead.contentRequest;
            prompts.internal = jsonPromptPrefix + `Generate a formal internal notification to the content manager about a new content request.
Data:
- Requester: ${cr?.requester}
- Topic: ${cr?.topic}
- Content Type: ${cr?.contentType}
- Goal: ${cr?.goal}
- Audience: ${cr?.targetAudience}
The subject should be "درخواست تولید محتوای جدید: ${cr?.topic}".
The body should detail the request and ask the content manager to assign it to a writer and add it to the production schedule.`;
            prompts.external = jsonPromptPrefix + `Generate a confirmation email to the requester.
Data:
- Requester: ${cr?.requester}
- Topic: ${cr?.topic}
The subject should be "درخواست تولید محتوای شما ثبت شد".
The body should thank them for their request, confirm the topic, and state that it's been sent to the content team for review and scheduling.`;
            break;
            
        case '11-1': // content-data-collection
            const cdc = lead.contentDataCollection;
            prompts.internal = jsonPromptPrefix + `Generate a notification for the content production team that raw data for a topic is now available.
Data:
- Request ID: ${cdc?.requestId}
- Data Provider: ${cdc?.provider}
- Summary: ${cdc?.dataSummary}
- Sources: ${cdc?.sources}
The subject should be "داده‌های خام برای محتوای (${cdc?.requestId}) آماده شد".
The body should announce that the data for request ${cdc?.requestId} is ready for the next step (validation/writing) and is available for review.`;
            prompts.external = `This is an internal form. No external communication needed.`;
            break;

        case '12-1': // content-validation
            const cv = lead.contentValidation;
            prompts.internal = jsonPromptPrefix + `Generate a notification for the content production team about the validation result.
Data:
- Collection ID: ${cv?.collectionId}
- Validator: ${cv?.validator}
- Status: ${cv?.status}
- Comments: "${cv?.comments}"
The subject should be "نتیجه بررسی داده‌های محتوا (${cv?.collectionId}): ${cv?.status}".
The body should announce the result of the data validation. If changes are needed, it should specify them clearly based on the comments. If approved, it should give the green light for content production.`;
            prompts.external = `This is an internal form. No external communication needed.`;
            break;

        case '13-1': // content-publication
            const cp = lead.contentPublication;
            prompts.internal = jsonPromptPrefix + `Generate a final announcement for all relevant internal teams (Marketing, Sales, Support) about a new piece of content being published.
Data:
- Validation ID: ${cp?.validationId}
- Platform: ${cp?.platform}
- Publish Date: ${new Date(cp?.publishDate || Date.now()).toLocaleString('fa-IR')}
- Published URL: ${cp?.publishedUrl}
- Publisher: ${cp?.publisher}
The subject should be "محتوای جدید منتشر شد: [موضوع محتوا]".
The body should announce the new content, provide the link, and encourage teams to share it on their channels to maximize reach.`;
            prompts.external = jsonPromptPrefix + `Generate a notification email for the customer/partner mailing list about the newly published content.
Data:
- Topic: [موضوع محتوا]
- URL: ${cp?.publishedUrl}
The subject should be "یک مطلب جدید و خواندنی برای شما داریم!".
The body should announce the new content in an engaging way, briefly explain its value to the reader, and include a clear call-to-action to view it at the provided link.`;
            break;

        case '4-1': // digital-campaign-registration
            const campaign = lead.digitalCampaign;
            prompts.internal = jsonPromptPrefix + `Generate a formal internal notification to announce the start of a new digital campaign.
Data:
- Campaign Name: ${campaign?.name}
- Goal: ${campaign?.goal}
- Budget: ${campaign?.budget?.toLocaleString('fa-IR')} ریال
- Platforms: ${campaign?.platforms?.join(', ')}
The subject should be "ابلاغ شروع کمپین دیجیتال: ${campaign?.name}".
The body should ask the team to prepare for execution and request the finance team to allocate the budget.`;
            prompts.external = jsonPromptPrefix + `Generate a customer-facing announcement email for a new digital campaign.
Data:
- Campaign Name: ${campaign?.name}
- Key Message: ${campaign?.summary}
The subject should be catchy, for example: "یک خبر هیجان‌انگیز از طرف ما برای شما!".
The body should introduce the new campaign to customers, explain its benefits or what they can expect, and include a call to action.`;
            break;

        case '4-2': // content-calendar
            const entries = lead.contentCalendar;
            const formattedEntries = entries?.map(e => `- ${new Date(e.publishDate).toLocaleDateString('fa-IR')}: ${e.event} (در ${e.platform}) - وضعیت: ${e.status}`).join('\n');
            prompts.internal = jsonPromptPrefix + `Generate an internal notification to share the new content calendar.
Data:
- Calendar Entries:
${formattedEntries}
The subject should be "ارسال برنامه انتشار محتوا برای ماه آینده".
The body should instruct the teams to review the schedule, prepare the content, and raise any concerns about the timeline.`;
            prompts.external = `This is an internal form. No external communication needed.`;
            break;

        case '4-3': // article-publishing
            const article = lead.articlePublishing;
            prompts.internal = jsonPromptPrefix + `Generate an internal notification for the content and IT teams about a new article ready for publishing.
Data:
- Title: ${article?.title}
- Author: ${article?.author}
- Platform: ${article?.platform}
- Target Date: ${new Date(article?.publishDate || Date.now()).toLocaleDateString('fa-IR')}
The subject should be "مقاله جدید آماده انتشار: ${article?.title}".
The body should ask for a final review and technical preparation for uploading and publishing the article.`;
            prompts.external = jsonPromptPrefix + `Generate a press release announcement for media and journalists about a new published article.
Data:
- Title: ${article?.title}
- Summary: ${article?.contentSummary}
- Link: [Link to be inserted after publication]
The subject should be "اطلاعیه خبری: انتشار مقاله جدید با عنوان «${article?.title}»".
The body should be a formal press release announcing the publication, summarizing its key points, and providing contact information for media inquiries.`;
            break;

        case '4-4': // online-inquiry
            const inquiry = lead.onlineInquiry;
            prompts.internal = jsonPromptPrefix + `Generate an internal alert to the support/sales team about a new online inquiry.
Data:
- Channel: ${inquiry?.channel}
- Customer Name: ${inquiry?.customerName}
- Inquiry: "${inquiry?.inquiryText}"
- Assigned to: ${inquiry?.assignedTo}
The subject should be "پیام جدید از طریق وب‌سایت: ${inquiry?.customerName}".
The body should detail the inquiry and urge the assigned team member to respond promptly.`;
            prompts.external = jsonPromptPrefix + `Generate an automated acknowledgement email to the customer who submitted an inquiry.
Data:
- Customer Name: ${inquiry?.customerName}
The subject should be "پیام شما را دریافت کردیم".
The body should thank them for their inquiry, confirm its receipt, and state that a team member will respond to them as soon as possible (e.g., within 24 business hours).`;
            break;

        case '4-6': // digital-lead-capture
            const dLead = lead.digitalLead;
            prompts.internal = jsonPromptPrefix + `Generate an internal alert for the sales team about a new high-value digital lead.
Data:
- Source: ${dLead?.source}
- Name: ${dLead?.name}
- Email: ${dLead?.email}
- Interest: ${dLead?.interest}
The subject should be "سرنخ دیجیتال جدید از (${dLead?.source}): ${dLead?.name}".
The body should emphasize the lead source and their specific interest to enable a quick and tailored follow-up by the sales team.`;
            prompts.external = jsonPromptPrefix + `Generate a welcome email for the new digital lead.
Data:
- Name: ${dLead?.name}
- Interest: ${dLead?.interest}
The subject should be "از علاقه شما به ${dLead?.interest} سپاسگزاریم!".
The body should thank them for their interest, provide a brief intro to the company or product, and suggest next steps like viewing a demo, reading a related article, or scheduling a call.`;
            break;

        case '4-8': // website-update-request
            const wuRequest = lead.websiteUpdateRequest;
            prompts.internal = jsonPromptPrefix + `Generate a formal request to the IT/Development team for a website update.
Data:
- Requester: ${wuRequest?.requester}
- Area: ${wuRequest?.area}
- Priority: ${wuRequest?.priority}
- Description: "${wuRequest?.description}"
The subject should be "درخواست ارتقا وب‌سایت (${wuRequest?.priority}): ${wuRequest?.area}".
The body should detail the requested change or fix and ask the technical team to assess it and provide a timeline for implementation.`;
            prompts.external = 'This is an internal form. No external communication needed.';
            break;

        case '4-12': // online-experience-feedback
            const feedback = lead.onlineExperienceFeedback;
            prompts.internal = jsonPromptPrefix + `Generate an internal summary for the UX/Product team about new user feedback.
Data:
- Page URL: ${feedback?.pageUrl}
- Rating: ${feedback?.rating}/5
- Feedback: "${feedback?.feedbackText}"
- User: ${feedback?.userIdentifier || 'ناشناس'}
The subject should be "بازخورد جدید تجربه کاربری (امتیاز: ${feedback?.rating}/5)".
The body should present the feedback clearly for the product/UX team to review and consider for future improvements.`;
            prompts.external = jsonPromptPrefix + `Generate a thank-you email to the user who provided feedback.
Data:
- User Name: ${feedback?.userIdentifier || 'کاربر گرامی'}
The subject should be "از بازخورد شما متشکریم".
The body should thank them for their valuable input and assure them it will be reviewed carefully by the team to improve the user experience.`;
            break;

        case '5-1': // campaign-request
            const cRequest = lead.campaignRequest;
            prompts.internal = jsonPromptPrefix + `Generate a formal internal request to the marketing manager to approve a new campaign.
Data:
- Campaign Name: ${cRequest?.campaignName}
- Requester: ${cRequest?.requester}
- Goals: "${cRequest?.goals}"
- Target: ${cRequest?.targetAudience}
- Budget: ${cRequest?.budget.toLocaleString('fa-IR')} ریال
- Timeline: ${cRequest?.timeline}
The subject should be "درخواست بررسی و تایید کمپین: ${cRequest?.campaignName}".
The body should lay out the campaign plan clearly and ask for formal approval to proceed to the budgeting and execution phases.`;
            prompts.external = `This is an internal form. No external communication needed.`;
            break;

        case '5-2': // campaign-budget
            const cBudget = lead.campaignBudget;
            prompts.internal = jsonPromptPrefix + `Generate a formal notification to the finance department about an approved campaign budget.
Data:
- Campaign Name: ${cBudget?.campaignName}
- Total Budget: ${cBudget?.totalBudget.toLocaleString('fa-IR')} ریال
- Breakdown: ${cBudget?.breakdown}
- Approval Status: ${cBudget?.approvalStatus}
The subject should be "تخصیص بودجه برای کمپین ${cBudget?.campaignName}".
The body should formally request the allocation of funds for the specified campaign, attached with the breakdown, now that it has been approved.`;
            prompts.external = `This is an internal form. No external communication needed.`;
            break;

        case '5-4': // campaign-effectiveness
            const cEffect = lead.campaignEffectiveness;
            prompts.internal = jsonPromptPrefix + `Generate an internal report summary for management on campaign effectiveness.
Data:
- Campaign Name: ${cEffect?.campaignName}
- KPIs: "${cEffect?.kpiSummary}"
- Analysis: "${cEffect?.analysis}"
- Recommendations: "${cEffect?.recommendations}"
The subject should be "گزارش نهایی اثربخشی کمپین: ${cEffect?.campaignName}".
The body should provide a concise overview of the results, analysis of what worked and what didn't, and actionable recommendations for future campaigns.`;
            prompts.external = jsonPromptPrefix + `Generate a summary report for partners or stakeholders on the success of a joint campaign.
Data:
- Campaign Name: ${cEffect?.campaignName}
- Key Results: "${cEffect?.kpiSummary}"
The subject should be "خلاصه نتایج موفقیت‌آمیز کمپین مشترک: ${cEffect?.campaignName}".
The body should highlight the positive outcomes and key metrics achieved, and thank them for their successful collaboration.`;
            break;

        case '4-10': // email-sms-campaign
            const emailSms = lead.emailSmsCampaign;
            prompts.internal = jsonPromptPrefix + `Generate a notification for the marketing team to launch an email/sms campaign.
Data:
- Campaign Type: ${emailSms?.type}
- Subject/Header: ${emailSms?.subject}
- Target List: ${emailSms?.targetListId}
- Send Date: ${new Date(emailSms?.sendDate || Date.now()).toLocaleString('fa-IR')}
The subject should be "تایید درخواست کمپین ${emailSms?.type}: ${emailSms?.subject}".
The body should confirm the details and ask the team to prepare the campaign for launch on the scheduled date.`;
            prompts.external = jsonPromptPrefix + `This is an internal process, but generate the template for the campaign message itself.
Data:
- Subject/Header: ${emailSms?.subject}
- Body Content: ${emailSms?.content}
The subject should be "${emailSms?.subject}".
The body should be exactly "${emailSms?.content}".`;
            break;
    }

    return prompts;
};