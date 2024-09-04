import navigateToPage from '@/utils/navigateToPage';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ReminderStyled from './styled';

export default function PaymentMethodSuspend() {
    const { t } = useAppTranslation('reminder');
    return (
        <ReminderStyled.InfoParagraph color="error">
            {t('payment_method_suspend.first_text')}
            <ReminderStyled.LinkParagraph
                color="primary"
                onClick={(e) => navigateToPage('/settings/billing', e)}
            >
                {t('payment_method_suspend.link')}
            </ReminderStyled.LinkParagraph>{' '}
            {t('payment_method_suspend.second_text')}
        </ReminderStyled.InfoParagraph>
    );
}
