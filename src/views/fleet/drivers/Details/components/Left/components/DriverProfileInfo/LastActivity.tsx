import useLastActivity from '@/hooks/useLastActivity';
import LeftStyled from '@/views/fleet/drivers/Details/components/Left/styled';
import { memo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {

    /** Date in ISO format */
    lastGPSUpdate?: string;
};

const LastActivity = ({ lastGPSUpdate }: Props) => {
    const { t } = useAppTranslation();
    const {
        last_activity,
        isOnline
    } = useLastActivity(lastGPSUpdate);

    return (
        <LeftStyled.Subtitle variant="subtitle2">
            <LeftStyled.OnlineBadge isOnline={isOnline} />
            {t('drivers:profile.last_activity', { lastActivity: last_activity })}
        </LeftStyled.Subtitle>
    );
};

export default memo(LastActivity);
