import navigateToPage from '@/utils/navigateToPage';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { GetSubscriptionReply } from '@proto/settings_billing';
import ReminderStyled from './styled';

type FreeTrialProps = {
    response: GetSubscriptionReply;
};

export default function FreeTrial({ response }: FreeTrialProps) {
    const { t } = useAppTranslation('reminder');
    return (
        <ReminderStyled.InfoParagraph color="primary">
            {t('free_trial.first_text', { daysLeft: response.freeTrial?.daysLeft || '' })} &nbsp;
            <ReminderStyled.LinkParagraph
                color="primary"
                onClick={(e) => navigateToPage('/settings/billing', e)}
            >
                {t('free_trial.link')}
            </ReminderStyled.LinkParagraph>
        </ReminderStyled.InfoParagraph>
    );
}
