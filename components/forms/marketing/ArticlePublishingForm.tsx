
import React, { useState } from 'react';
import type { ArticlePublishing } from '../../../types';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { FileText } from 'lucide-react';
import { ARTICLE_PLATFORMS, ARTICLE_STATUSES } from '../../../constants';

interface ArticlePublishingFormProps {
  onSave: (data: { articlePublishing: ArticlePublishing }) => void;
}

export const ArticlePublishingForm: React.FC<ArticlePublishingFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<ArticlePublishing, 'id'>>({
        title: '',
        author: '',
        platform: ARTICLE_PLATFORMS[0],
        publishDate: new Date().toISOString().split('T')[0],
        status: ARTICLE_STATUSES[0],
        contentSummary: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newArticle: ArticlePublishing = {
            ...formData,
            id: `ART-${Date.now()}`,
        };
        onSave({ articlePublishing: newArticle });
    };

    return (
        <Card>
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">فرم انتشار خبر/مقاله (4-3)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">مدیریت انتشار اخبار و مقالات در وب‌سایت یا شبکه‌های اجتماعی.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input id="title" label="عنوان خبر/مقاله" value={formData.title} onChange={handleChange} required />
                    <Input id="author" label="نویسنده/واحد مسئول" value={formData.author} onChange={handleChange} required />
                    <Select id="platform" label="پلتفرم انتشار" value={formData.platform} onChange={handleChange}>
                        {ARTICLE_PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                    </Select>
                    <Input id="publishDate" label="تاریخ انتشار هدف" type="date" value={formData.publishDate} onChange={handleChange} required />
                     <Select id="status" label="وضعیت انتشار" value={formData.status} onChange={handleChange}>
                        {ARTICLE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                     <Input id="contentFile" label="فایل محتوا (اختیاری)" type="file" />
                </div>
                
                <div className="mt-4">
                    <Textarea 
                        id="contentSummary" 
                        label="خلاصه محتوا" 
                        value={formData.contentSummary} 
                        onChange={handleChange}
                        required
                        placeholder="چکیده کوتاهی از محتوا جهت استفاده در اعلان‌ها و خلاصه‌ها."
                    />
                </div>
                 
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <span className="ml-2">ثبت و تولید اعلان</span>
                        <FileText size={18} />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
