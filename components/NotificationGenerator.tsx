
import React, { useState, useEffect } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import type { LeadData, NotificationContent } from '../types';
import { generateNotificationContent } from '../services/geminiService';
import { Clipboard, Check, Loader2, Mail, Users } from 'lucide-react';

interface NotificationGeneratorProps {
    isOpen: boolean;
    onClose: () => void;
    onProceed: () => void;
    leadData: LeadData;
    currentStepId: string;
}

const NotificationGenerator: React.FC<NotificationGeneratorProps> = ({ isOpen, onClose, onProceed, leadData, currentStepId }) => {
    const [notificationType, setNotificationType] = useState<'internal' | 'external'>('internal');
    const [notification, setNotification] = useState<NotificationContent | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const generateContent = async (type: 'internal' | 'external') => {
        setIsLoading(true);
        setNotification(null);
        const content = await generateNotificationContent(leadData, currentStepId, type);
        setNotification(content);
        setIsLoading(false);
    };

    useEffect(() => {
        if (isOpen) {
             // Reset to internal view when modal opens for a new step
            const initialType = currentStepId === 'lead-generation' ? 'external' : 'internal';
            setNotificationType(initialType);
            generateContent(initialType);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, currentStepId, leadData]);
    
    useEffect(() => {
        if(isOpen){
            generateContent(notificationType);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notificationType]);

    const handleCopyToClipboard = () => {
        if(notification){
            const textToCopy = `موضوع: ${notification.subject}\n\n${notification.body}`;
            navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
            setTimeout(()=> setIsCopied(false), 2000);
        }
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose} title="تولید اعلان با Gemini">
           <div>
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                <button 
                    onClick={() => setNotificationType('internal')}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 ${notificationType === 'internal' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                >
                    <Users size={16}/> ابلاغ داخلی
                </button>
                 <button 
                    onClick={() => setNotificationType('external')}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 ${notificationType === 'external' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                >
                    <Mail size={16}/> ایمیل به مشتری
                </button>
            </div>

            <div className="min-h-[250px] bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md border dark:border-gray-600">
                {isLoading && (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="animate-spin text-indigo-500" size={32}/>
                        <p className="mr-4 text-gray-600 dark:text-gray-300">در حال تولید محتوا...</p>
                    </div>
                )}
                {notification && !isLoading && (
                    <div>
                        <div className="flex justify-between items-center mb-2">
                             <h4 className="font-bold text-gray-800 dark:text-white">موضوع: {notification.subject}</h4>
                              <Button variant="ghost" size="sm" onClick={handleCopyToClipboard}>
                                {isCopied ? <Check size={16} className="ml-2 text-green-500"/> : <Clipboard size={16} className="ml-2"/>}
                                {isCopied ? 'کپی شد!' : 'کپی'}
                              </Button>
                        </div>
                        <p className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{notification.body}</p>
                    </div>
                )}
            </div>

             <div className="mt-6 flex justify-between items-center">
                <Button onClick={onClose} variant="secondary">بستن</Button>
                <Button onClick={onProceed}>
                    تایید و بستن
                </Button>
            </div>
           </div>
        </Modal>
    );
};

export default NotificationGenerator;
