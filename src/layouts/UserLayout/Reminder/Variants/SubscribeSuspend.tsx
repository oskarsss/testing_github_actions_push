import navigateToPage from '@/utils/navigateToPage';
import SYSTEM from '@/@system';
import Link from '@mui/material/Link';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ReminderStyled from './styled';

export default function SubscribeSuspend() {
    const { t } = useAppTranslation('reminder');
    return (
        <ReminderStyled.InfoParagraph color="error">
            {t('subscribe_suspend.first_text')}
            <ReminderStyled.LinkParagraph
                color="error"
                onClick={(e) => navigateToPage('/settings/billing', e)}
            >
                {t('subscribe_suspend.link')}
            </ReminderStyled.LinkParagraph>{' '}
            {t('subscribe_suspend.second_text')}
            <Link
                href={`mailto:${SYSTEM.SUPPORT_EMAIL}`}
                color="inherit"
            >
                <ReminderStyled.LinkParagraph color="error">
                    {SYSTEM.SUPPORT_EMAIL}
                </ReminderStyled.LinkParagraph>
            </Link>
            .
        </ReminderStyled.InfoParagraph>
    );
}
