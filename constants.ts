import type { WorkflowCategory, WorkflowStep } from './types';

export const LEAD_SOURCES = ['وب‌سایت', 'نمایشگاه', 'تبلیغات', 'معرفی', 'تماس مستقیم'];
export const CUSTOMER_GROUPS = ['حقیقی', 'حقوقی', 'سازمانی'];
export const PURCHASE_PRIORITIES = ['فوری', 'کوتاه مدت', 'بلند مدت'];
export const FINANCIAL_RISK_STATUS = ['تایید اعتبار', 'نیاز به بررسی مالی', 'نامشخص'];
export const QUOTATION_RESPONSE_STATUSES = ['قبول کامل', 'مذاکره/اصلاح', 'رد کامل'];
export const RECEPTION_STATUSES = ['سالم', 'مشروط (با ایرادات جزئی)', 'ایراددار (نیاز به بررسی)'];

export const MARKETING_ACTIVITY_TYPES = ['کمپین ایمیل', 'تبلیغات دیجیتال', 'وبینار', 'رویداد حضوری', 'تولید محتوا', 'تماس سرد'];

export const COMPLAINT_TYPES = ['شکایت', 'پیشنهاد', 'تقدیر', 'سوال فنی', 'مشکل در پرداخت'];
export const COMPLAINT_STATUSES = ['در حال بررسی', 'پاسخ داده شده', 'نیازمند اقدام', 'بسته شده'];
export const COMPLAINT_PRIORITIES = ['فوری', 'بالا', 'متوسط', 'پایین'] as const;

export const SURVEY_QUESTIONS = [
    { id: 'productQuality', label: 'کیفیت محصول/خدمت' },
    { id: 'salesProcess', label: 'فرآیند فروش و پاسخگویی' },
    { id: 'deliveryExperience', label: 'تجربه تحویل کالا' },
    { id: 'supportExperience', label: 'پشتیبانی و خدمات پس از فروش' },
    { id: 'overallSatisfaction', label: 'رضایت کلی از شرکت' },
];

export const FOLLOW_UP_METHODS = ['تماس تلفنی', 'ایمیل', 'جلسه حضوری', 'پیامک', 'شبکه های اجتماعی'];

export const CONTACT_LOG_TYPES = ['تماس ورودی', 'تماس خروجی', 'ایمیل', 'جلسه حضوری', 'جلسه آنلاین'];
export const CONTACT_LOG_STATUSES = ['موفق', 'ناموفق', 'پیام گذاشته شد', 'نیاز به پیگیری'];

export const VISIT_TYPES = ['بازدید میدانی', 'جلسه در دفتر مشتری', 'جلسه آنلاین', 'رویداد'];

export const REASONS_FOR_LOSS = [
    'قیمت بالا',
    'محصول/خدمت رقیب بهتر بود',
    'زمان‌بندی نامناسب',
    'عدم پیگیری موثر',
    'نیاز مشتری تغییر کرد',
    'مشکل در ارتباط',
    'سایر موارد (در توضیحات ذکر شود)',
];

// --- Marketing Forms ---
export const DIGITAL_CAMPAIGN_GOALS = ['افزایش آگاهی از برند', 'جذب سرنخ (Lead Generation)', 'افزایش فروش', 'معرفی محصول جدید', 'تعامل با مشتریان'];
export const DIGITAL_CAMPAIGN_PLATFORMS = ['وب‌سایت', 'گوگل (AdWords)', 'اینستاگرام', 'لینکدین', 'ایمیل مارکتینگ', 'کمپین پیامکی'];
export const CONTENT_PLATFORMS = ['وبلاگ', 'اینستاگرام', 'لینکدین', 'توییتر', 'کانال تلگرام', 'یوتیوب'];
export const CONTENT_STATUSES = ['ایده اولیه', 'در حال نگارش', 'آماده بازبینی', 'آماده انتشار', 'منتشر شده', 'لغو شده'];
export const CAMPAIGN_MESSAGE_TYPES = ['ایمیل', 'پیامک', 'ترکیبی'];
export const ARTICLE_PLATFORMS = ['وبلاگ اصلی', 'وبسایت محصول', 'لینکدین', 'ویرگول'];
export const ARTICLE_STATUSES = ['پیش‌نویس', 'در حال بازبینی', 'آماده انتشار', 'منتشر شده'];

export const ONLINE_INQUIRY_CHANNELS = ['فرم تماس وب‌سایت', 'چت آنلاین', 'ایمیل مستقیم', 'شبکه‌های اجتماعی'];
export const ONLINE_INQUIRY_STATUSES = ['جدید', 'در حال بررسی', 'پاسخ داده شده', 'بسته شده'];

export const DIGITAL_LEAD_SOURCES = ['تبلیغات گوگل', 'کمپین اینستاگرام', 'لینکدین', 'دانلود محتوا'];

export const WEBSITE_UPDATE_AREAS = ['صفحه اصلی', 'بخش محصولات', 'وبلاگ', 'پرتال مشتریان', 'فرآیند خرید'];
export const WEBSITE_UPDATE_PRIORITIES = ['بالا', 'متوسط', 'پایین'] as const;

export const CAMPAIGN_APPROVAL_STATUSES = ['در انتظار تایید', 'تایید شده', 'نیازمند بازنگری', 'رد شده'];

export const CONTENT_TYPES = ['پست وبلاگ', 'راهنمای فنی', 'گزارش تحلیلی', 'ویدیو', 'پادکست', 'اینفوگرافیک'];
export const VALIDATION_STATUSES = ['تایید نهایی', 'نیاز به اصلاح', 'رد شده'] as const;

export const RISK_LEVELS = ['کم', 'متوسط', 'زیاد'] as const;
export const LICENSE_STATUSES = ['در حال پیگیری', 'تایید شده', 'رد شده'] as const;
export const AD_MATERIAL_TYPES = ['بنر دیجیتال', 'بروشور', 'ویدیوی تبلیغاتی', 'پست شبکه‌های اجتماعی', 'پوستر چاپی'];
export const SPONSORSHIP_TYPES = ['درخواست حمایت', 'ارائه حمایت'];


// --- Inter-departmental Forms ---
export const MISSION_TYPES = ['بازاریابی', 'فروش', 'نصب و راه‌اندازی', 'پشتیبانی فنی', 'جلسه داخلی', 'آموزش'];
export const LEAVE_TYPES = ['استحقاقی', 'استعلاجی', 'بدون حقوق', 'ساعتی'];
export const APPRECIATION_WARNING_TYPES = ['تقدیر', 'تشویق', 'تذکر', 'جایزه'] as const;
export const EMPLOYEE_LIST = ['علی رضایی', 'مریم حسینی', 'رضا محمدی', 'فاطمه احمدی', 'تیم فروش', 'تیم پشتیبانی', 'تیم بازرگانی', 'مدیریت انبار', 'تیم محتوا', 'مدیر محصول', 'کمیته راهبردی', 'تیم طراحی', 'تیم حقوقی', 'واحد مالی'];
export const SUPPLIER_LIST = ['تامین‌کننده الف', 'شرکت تجهیزات بتا', 'خدمات لجستیک گاما', 'واردات دلتا'];
export const AGENT_LIST = ['نمایندگی شمال', 'نمایندگی اصفهان', 'فروشگاه مرکزی تهران', 'شریک تجاری البرز'];
export const QC_STATUSES = ['قبول', 'مردود', 'مشروط'] as const;
export const DISCREPANCY_TYPES = ['کسری', 'اضافه', 'آسیب‌دیدگی', 'اشتباه در ارسال'] as const;
export const INVENTORY_ADJUSTMENT_REASONS = ['شمارش انبار', 'ورود کالای جدید', 'مرجوعی', 'ضایعات'];
export const CREDIT_INQUIRY_STATUS = ['در انتظار پاسخ', 'تایید شد', 'رد شد', 'نیاز به مدارک بیشتر'];
export const RECEIPT_METHODS = ['کارت به کارت', 'واریز به حساب', 'چک', 'پرداخت آنلاین'];
export const COMMISSION_STATUSES = ['محاسبه شده', 'در انتظار تایید', 'پرداخت شده'];


// --- Stakeholder & Evaluation Forms ---
export const STAKEHOLDER_TYPES = ['نماینده', 'شریک تجاری', 'سهام‌دار'] as const;
export const PROJECT_STATUSES = ['در حال انجام', 'تکمیل شده', 'با تاخیر', 'متوقف شده'] as const;
export const TRAINING_TYPES = ['آموزش فروش', 'آموزش بازاریابی', 'آموزش محصول', 'آموزش نرم‌افزار CRM'];
export const INCENTIVE_PROGRAM_TYPES = ['کمیسیون ویژه', 'پاداش نقدی', 'سفر تشویقی', 'مسابقه فروش'];
export const PARTNERSHIP_TYPES = ['همکاری در فروش', 'توسعه مشترک محصول', 'بازاریابی مشترک', 'نمایندگی انحصاری'];
export const TENDER_STATUSES = ['در حال آماده‌سازی', 'ارسال شده', 'در حال ارزیابی', 'برنده شده', 'رد شده'];
export const B2C_ORDER_STATUSES = ['در انتظار پرداخت', 'پرداخت شده', 'در حال پردازش', 'ارسال شده', 'تحویل داده شده', 'لغو شده'];
export const IMPROVEMENT_STATUSES = ['شناسایی شده', 'در حال بررسی', 'راهکار ارائه شده', 'در حال اجرا', 'اجرا شده'];

// --- Customer Management Forms ---
export const REPORT_PERIODS = ['ماهانه', 'فصلی', 'شش ماهه', 'سالانه'];
export const SALE_BRANCHES = ['شعبه مرکزی', 'شعبه شمال', 'فروشگاه آنلاین', 'نمایندگی اصفهان'];
export const SAMPLE_STATUSES = ['ارسال شده', 'در انتظار بازخورد', 'بازخورد دریافت شد', 'نیاز به پیگیری'];

export const WORKFLOW_CATEGORIES: { id: WorkflowCategory; title: string }[] = [
  { id: 'acquisition_sales', title: 'جذب و فروش' },
  { id: 'customer_management', title: 'مدیریت مشتریان' },
  { id: 'marketing_automation', title: 'بازاریابی و اتوماسیون' },
  { id: 'inter_departmental_automation', title: 'اتوماسیون بین واحدی' },
  { id: 'stakeholders_evaluation', title: 'ذی‌نفعان و ارزیابی' },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  // 1. Acquisition & Sales
  { id: '1-1', title: 'جمع‌آوری سرنخ', description: 'ثبت اولیه مشخصات مشتریان بالقوه', category: 'acquisition_sales', isStarter: true },
  { id: '1-2', title: 'ثبت مشتری بالقوه', description: 'تکمیل اطلاعات و ورود رسمی به قیف فروش', category: 'acquisition_sales' },
  { id: '1-3', title: 'نیازسنجی و اعتبارسنجی', description: 'بررسی نیاز واقعی، بودجه و اولویت مشتری', category: 'acquisition_sales' },
  { id: '1-7', title: 'معرفی محصول/ارسال کاتالوگ', description: 'ارائه اطلاعات محصولات به مشتری', category: 'acquisition_sales' },
  { id: '1-8', title: 'ارائه پیشنهاد قیمت', description: 'صدور پیش‌فاکتور رسمی برای مشتری', category: 'acquisition_sales' },
  { id: '1-8-response', title: 'پاسخ به پیشنهاد قیمت', description: 'ثبت بازخورد مشتری به پیش‌فاکتور', category: 'acquisition_sales' },
  { id: '1-9', title: 'ثبت سفارش فروش', description: 'ثبت سفارش نهایی پس از تایید مشتری', category: 'acquisition_sales' },
  { id: '1-10', title: 'قرارداد فروش', description: 'تنظیم و نهایی‌سازی قرارداد رسمی', category: 'acquisition_sales' },
  { id: 'mkt-08', title: 'دستور تحویل کالا/خدمت', description: 'صدور دستور برای ارسال یا انجام خدمت', category: 'acquisition_sales' },
  { id: 'mkt-09', title: 'گزارش تحویل', description: 'ثبت صورتجلسه تحویل و تایید مشتری', category: 'acquisition_sales' },
  
  { id: '9-1', title: 'تحلیل علل از دست رفتن سرنخ', description: 'بررسی دلایل عدم موفقیت در فروش', category: 'acquisition_sales', isStarter: true },

  // 2. Customer Management
  { id: '1-4', title: 'ثبت تماس‌ها', description: 'ثبت تماس‌های ورودی/خروجی با مشتریان', category: 'customer_management', isStarter: true },
  { id: '1-5', title: 'پیگیری مشتری', description: 'برنامه‌ریزی و ثبت پیگیری‌های آتی', category: 'customer_management' },
  { id: '1-6', title: 'گزارش ملاقات/بازدید', description: 'ثبت گزارش جلسات و بازدیدهای میدانی', category: 'customer_management' },
  
  { id: '1-11', title: 'ثبت شکایات و بازخورد', description: 'ثبت و پیگیری بازخوردهای مشتریان', category: 'customer_management', isStarter: true },
  { id: '1-12', title: 'رضایت‌سنجی مشتری', description: 'ارسال و تحلیل نظرسنجی رضایت', category: 'customer_management' },
  
  { id: '1-17', title: 'گزارش فروش دوره‌ای', description: 'تهیه گزارش عملکرد فروش ماهانه/فصلی', category: 'customer_management', isStarter: true },
  
  { id: '2-4', title: 'بازخورد نماینده فروش حضوری', description: 'ثبت بازخوردها از ویزیتورها', category: 'customer_management', isStarter: true },
  { id: '2-5', title: 'ارزیابی محل فروش/شعبه', description: 'سنجش عملکرد و وضعیت شعب', category: 'customer_management' },
  
  { id: '2-6', title: 'ثبت نمونه محصول', description: 'مدیریت ارسال و بازخورد نمونه محصولات', category: 'customer_management', isStarter: true },
  
  { id: '2-8', title: 'ارزیابی خدمات پس از فروش', description: 'سنجش کیفیت خدمات حضوری پس از فروش', category: 'customer_management', isStarter: true },
  { id: '2-9', title: 'رضایت‌سنجی در محل', description: 'انجام نظرسنجی رضایت در محل مشتری', category: 'customer_management' },
  
  { id: '2-10', title: 'بازخورد گروه تمرکز', description: 'ثبت نتایج جلسات Focus Group', category: 'customer_management', isStarter: true },
  
  { id: '2-11', title: 'کنترل موجودی در نقطه فروش', description: 'بررسی و ثبت موجودی کالا در فروشگاه', category: 'customer_management', isStarter: true },

  // 3. Marketing & Automation
  { id: '4-1', title: 'ثبت کمپین دیجیتال', description: 'ایجاد و مدیریت کمپین‌های بازاریابی دیجیتال', category: 'marketing_automation', isStarter: true },
  { id: '4-6', title: 'ثبت لید دیجیتال', description: 'جمع‌آوری و ثبت سرنخ از کانال‌های دیجیتال', category: 'marketing_automation' },
  { id: '4-10', title: 'راه‌اندازی کمپین ایمیل/پیامک', description: 'درخواست و مدیریت کمپین‌های ایمیل/پیامک', category: 'marketing_automation' },
  { id: '4-11', title: 'تحلیل اثربخشی تبلیغات', description: 'گزارش و تحلیل نتایج کمپین‌های دیجیتال', category: 'marketing_automation' },
  { id: '4-13', title: 'ارزیابی ریسک کمپین', description: 'ارزیابی موفقیت و مدیریت ریسک کمپین', category: 'marketing_automation' },
  { id: '1-16', title: 'ثبت فعالیت‌های ترویجی', description: 'ثبت و مدیریت فعالیت‌های تشویقی و پروموشن‌ها', category: 'marketing_automation' },
  
  { id: '10-1', title: 'درخواست تولید محتوا', description: 'ثبت درخواست رسمی برای تولید یا به‌روزرسانی محتوا', category: 'marketing_automation', isStarter: true },
  { id: '4-2', title: 'تقویم انتشار محتوا', description: 'برنامه‌ریزی زمانی برای انتشار محتوا', category: 'marketing_automation' },
  { id: '11-1', title: 'جمع‌آوری داده برای محتوا', description: 'گردآوری اطلاعات خام، فنی و کلیدی برای تولید محتوا', category: 'marketing_automation' },
  { id: '12-1', title: 'بررسی و تایید داده محتوا', description: 'بازبینی و تایید نهایی داده‌های جمع‌آوری شده', category: 'marketing_automation' },
  { id: '13-1', title: 'انتشار رسمی محتوا', description: 'ثبت و کنترل فرآیند انتشار نهایی محتوا', category: 'marketing_automation' },
  
  { id: '4-3', title: 'انتشار خبر/مقاله', description: 'مدیریت انتشار اخبار و مقالات', category: 'marketing_automation', isStarter: true },
  { id: '4-9', title: 'درخواست رپورتاژ خبری', description: 'ثبت درخواست رپورتاژ و تبلیغات محتوایی', category: 'marketing_automation' },
  
  { id: '4-4', title: 'ارتباط با مشتریان مجازی', description: 'فرم دریافت تماس و پیام از کانال‌های آنلاین', category: 'marketing_automation', isStarter: true },
  { id: '4-7', title: 'تحلیل رفتار آنلاین', description: 'نیازسنجی و تحلیل رفتار کاربران آنلاین', category: 'marketing_automation' },
  { id: '4-8', title: 'درخواست ارتقا وبسایت', description: 'درخواست بهبود یا اصلاح وبسایت و پرتال‌ها', category: 'marketing_automation' },
  { id: '4-12', title: 'بازخورد تجربه کاربری آنلاین', description: 'ثبت بازخورد در مورد تجربه کاربری وبسایت', category: 'marketing_automation' },
  
  { id: '5-1', title: 'درخواست اجرای کمپین', description: 'ثبت درخواست رسمی برای اجرای کمپین تبلیغاتی', category: 'marketing_automation', isStarter: true },
  { id: '2-1', title: 'ثبت بازدیدکننده نمایشگاه', description: 'ثبت اطلاعات بازدیدکنندگان از غرفه', category: 'marketing_automation' },
  { id: '2-3', title: 'گزارش برگزاری رویداد', description: 'ثبت گزارش عملکرد و نتایج رویدادها', category: 'marketing_automation' },
  { id: '2-7', title: 'گزارش توزیع اقلام تبلیغاتی', description: 'گزارش توزیع هدایا و اقلام تبلیغاتی', category: 'marketing_automation' },
  { id: '5-2', title: 'بودجه‌بندی کمپین', description: 'تخصیص و مدیریت بودجه کمپین‌ها', category: 'marketing_automation' },
  { id: '5-3', title: 'هماهنگی مجوزهای تبلیغات', description: 'پیگیری مجوزهای قانونی برای کمپین‌ها', category: 'marketing_automation' },
  { id: '5-4', title: 'گزارش اثربخشی کمپین', description: 'ارزیابی و گزارش نتایج کمپین‌ها', category: 'marketing_automation' },
  { id: '5-5', title: 'درخواست طراحی اقلام تبلیغاتی', description: 'ارسال درخواست به تیم طراحی', category: 'marketing_automation' },
  { id: '5-6', title: 'درخواست تبلیغات مشترک', description: 'مدیریت کمپین‌های مشترک با همکاران', category: 'marketing_automation' },
  { id: '5-7', title: 'درخواست و گزارش حمایت رویداد', description: 'مدیریت اسپانسرشیپ رویدادها', category: 'marketing_automation' },

  // 4. Inter-departmental Automation
  { id: '3-1-1', title: 'استعلام اعتبار مشتری', description: 'ارتباط با واحد مالی برای استعلام اعتبار', category: 'inter_departmental_automation', isStarter: true },
  { id: '3-1-2', title: 'صدور پیش فاکتور', description: 'درخواست صدور پیش فاکتور از مالی', category: 'inter_departmental_automation' },
  { id: '3-1-3', title: 'وصول وجه', description: 'ثبت دریافت وجه از مشتری', category: 'inter_departmental_automation' },
  { id: '3-1-4', title: 'درخواست صدور فاکتور', description: 'درخواست صدور فاکتور رسمی از مالی', category: 'inter_departmental_automation' },
  { id: '3-1-5', title: 'گزارش تسویه حساب', description: 'اعلام تسویه حساب کامل مشتری', category: 'inter_departmental_automation' },
  { id: '3-1-6', title: 'گزارش کمیسیون', description: 'محاسبه و پرداخت کمیسیون فروش', category: 'inter_departmental_automation' },
  
  { id: '3-2-1', title: 'درخواست ماموریت', description: 'ثبت و پیگیری درخواست ماموریت کاری پرسنل', category: 'inter_departmental_automation', isStarter: true },
  { id: '3-2-2', title: 'درخواست مرخصی', description: 'ثبت و پیگیری درخواست مرخصی پرسنل', category: 'inter_departmental_automation' },
  { id: '3-2-3', title: 'ابلاغ آیین‌نامه', description: 'ابلاغ دستورالعمل‌ها و سیاست‌های جدید', category: 'inter_departmental_automation', isStarter: true },
  { id: '3-2-4', title: 'فرم تشویق/تذکر', description: 'ثبت تقدیر، پاداش یا تذکر عملکردی', category: 'inter_departmental_automation', isStarter: true },
  
  { id: '3-3-1', title: 'استعلام قیمت خرید', description: 'درخواست استعلام قیمت از تامین‌کنندگان', category: 'inter_departmental_automation', isStarter: true },
  { id: '3-3-2', title: 'ثبت سفارش تامین کالا', description: 'ثبت سفارش خرید کالا از تامین‌کننده', category: 'inter_departmental_automation' },
  { id: '3-3-3', title: 'گزارش تطبیق موجودی و تامین', description: 'مقایسه کالای دریافتی با سفارش', category: 'inter_departmental_automation' },
  { id: '3-3-4', title: 'بازخورد یا ارزیابی تامین‌کننده', description: 'ارزیابی عملکرد تامین‌کنندگان', category: 'inter_departmental_automation' },
  { id: '3-3-5', title: 'برگشت یا اصلاح کالای تامین‌شده', description: 'مدیریت فرآیند مرجوعی کالا به تامین‌کننده', category: 'inter_departmental_automation' },
  
  { id: '3-4-1', title: 'درخواست تولید/آماده‌سازی', description: 'ارسال درخواست به واحد تولید', category: 'inter_departmental_automation', isStarter: true },
  { id: '3-4-2', title: 'رزرو موجودی انبار', description: 'درخواست رزرو کالا از انبار', category: 'inter_departmental_automation' },
  { id: '3-4-3', title: 'گزارش تولید و کنترل کیفیت', description: 'ثبت گزارش تولید و نتایج QC', category: 'inter_departmental_automation' },
  { id: '3-4-4', title: 'درخواست خروج کالا از انبار', description: 'صدور مجوز خروج کالا از انبار (حواله)', category: 'inter_departmental_automation' },
  { id: '3-4-5', title: 'گزارش مغایرت یا خسارت انبار', description: 'ثبت مغایرت‌ها و خسارت‌های انبار', category: 'inter_departmental_automation' },
  { id: '3-4-6', title: 'اصلاح موجودی / ثبت ورود جدید', description: 'ثبت دستی تغییرات در موجودی انبار', category: 'inter_departmental_automation' },

  // 5. Stakeholders & Evaluation
  { id: '6-1', title: 'انتقال/تغییر نمایندگی فروش', description: 'مدیریت تغییرات در نمایندگان فروش', category: 'stakeholders_evaluation', isStarter: true },
  { id: '6-2', title: 'درخواست پارتنرشیپ جدید', description: 'بررسی و ثبت درخواست‌های همکاری جدید', category: 'stakeholders_evaluation' },
  { id: '6-3', title: 'ارزیابی عملکرد نمایندگان', description: 'سنجش عملکرد دوره‌ای نمایندگان', category: 'stakeholders_evaluation' },
  { id: '6-4', title: 'دریافت بازخورد از ذی‌نفعان', description: 'ثبت بازخورد از شرکا و نمایندگان', category: 'stakeholders_evaluation' },
  
  { id: '7-1', title: 'ثبت گزارش ارزیابی بازار', description: 'تحلیل و ارزیابی وضعیت بازار', category: 'stakeholders_evaluation', isStarter: true },
  { id: '7-2', title: 'فرم ثبت تحلیل رقبا', description: 'تحلیل و بررسی عملکرد رقبا', category: 'stakeholders_evaluation' },
  { id: '7-4', title: 'ارزیابی اثربخشی آموزش', description: 'سنجش نتایج دوره‌های آموزشی', category: 'stakeholders_evaluation' },
  { id: '7-5', title: 'گزارش اثربخشی برنامه‌های انگیزشی', description: 'سنجش نتایج برنامه‌های تشویقی فروش', category: 'stakeholders_evaluation' },
  { id: '7-6', title: 'گزارش بازنگری استراتژی', description: 'بررسی و بازنگری استراتژی‌های بازاریابی', category: 'stakeholders_evaluation' },
  { id: '7-7', title: 'بازبینی و کنترل پروژه‌ها', description: 'نظارت بر پیشرفت پروژه‌های بازاریابی', category: 'stakeholders_evaluation' },
  
  { id: '8-1', title: 'درخواست همکاری سازمانی (B2B)', description: 'فرم ثبت درخواست همکاری B2B', category: 'stakeholders_evaluation', isStarter: true },
  { id: '8-2', title: 'ثبت سفارش عمده (B2B)', description: 'ثبت سفارشات عمده‌فروشی', category: 'stakeholders_evaluation' },
  { id: '8-3', title: 'درخواست خرید اینترنتی (B2C)', description: 'ثبت سفارشات خرده‌فروشی آنلاین', category: 'stakeholders_evaluation' },
  { id: '8-4', title: 'شرکت در مناقصه (B2G)', description: 'فرم استعلام و شرکت در مناقصات دولتی', category: 'stakeholders_evaluation' },
  
  { id: '9-6', title: 'پایش نقاط بهبود فرآیند فروش', description: 'ثبت و پیگیری بهبودهای فرآیند فروش', category: 'stakeholders_evaluation', isStarter: true },
  { id: '9-7', title: 'بازبینی فرآیند پس از شکست', description: 'تحلیل علل شکست پروژه یا فروش', category: 'stakeholders_evaluation' },
];