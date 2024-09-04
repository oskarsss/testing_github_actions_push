import * as yup from 'yup';
import { EmailValidation } from '@/utils/schema-validators';

export type DefaultValues = {
    subject: string;
    body: string;
    option_email_to_driver?: boolean;
    option_email_to_vendor?: boolean;
    option_email_to_cc_emails?: boolean;
    option_sms_to_driver?: boolean;
    option_attachment_documents?: boolean;
};
export const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    subject                    : yup.string().trim().required('Subject is required'),
    body                       : yup.string().trim().required('Body is required'),
    option_email_to_driver     : yup.boolean(),
    option_email_to_vendor     : yup.boolean(),
    option_email_to_cc_emails  : yup.boolean(),
    option_sms_to_driver       : yup.boolean(),
    option_attachment_documents: yup.boolean()
});
