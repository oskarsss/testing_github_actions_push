import navigateToPage from '@/utils/navigateToPage';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ReminderStyled from './styled';

export default function PaymentMethodDontSuspend() {
    const { t } = useAppTranslation('reminder');
    return (
        <ReminderStyled.InfoParagraph color="primary">
            {t('payment_method_dont_suspend.first_text')}
            <ReminderStyled.LinkParagraph
                color="primary"
                onClick={(e) => navigateToPage('/settings/billing', e)}
            >
                {t('payment_method_dont_suspend.link')}
            </ReminderStyled.LinkParagraph>{' '}
            {t('payment_method_dont_suspend.second_text')}
        </ReminderStyled.InfoParagraph>
    );
}
