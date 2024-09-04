import navigateToPage from '@/utils/navigateToPage';
import SYSTEM from '@/@system';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ReminderStyled from './styled';

function SubscribeDontSuspend() {
    const { t } = useAppTranslation('reminder');
    return (
        <ReminderStyled.InfoParagraph color="primary">
            {t('subscribe_dont_suspend.first_text')}
            <ReminderStyled.LinkParagraph
                color="primary"
                onClick={(e) => navigateToPage('/settings/billing', e)}
            >
                {t('subscribe_dont_suspend.link')}
            </ReminderStyled.LinkParagraph>{' '}
            {t('subscribe_dont_suspend.second_text')}
            {SYSTEM.SUPPORT_EMAIL}
        </ReminderStyled.InfoParagraph>
    );
}

export default SubscribeDontSuspend;
