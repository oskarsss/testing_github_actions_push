import Typography from '@mui/material/Typography';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import { useIntegrationProviders } from '@/store/settings/integrations/hooks';
import { useMemo } from 'react';
import { latestActivity } from '@/@core/ui-kits/page-headers/components/AvatarGroup/utils';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    integration_provide_id: string;
    timestamp: number;
};

export default function TrackingInfo({
    integration_provide_id,
    timestamp
}: Props) {
    const { t } = useAppTranslation();
    const { connected } = useIntegrationProviders();

    const provider = useMemo(
        () => connected.find((provider) => provider.id === integration_provide_id),
        [integration_provide_id, connected]
    );

    return (
        <>
            <RightStyled.Item>
                <Typography variant="body2">{t('common:provider')}</Typography>
                <Typography>{provider?.name}</Typography>
            </RightStyled.Item>
            {/* <RightStyled.Item> */}
            {/*     <Typography variant="body2">Gateway</Typography> */}
            {/*     <Typography>{get_away}</Typography> */}
            {/* </RightStyled.Item> */}
            <RightStyled.Item>
                <Typography variant="body2">{t('common:last_update')}</Typography>
                <Typography>{latestActivity(timestamp, t)}</Typography>
            </RightStyled.Item>
        </>
    );
}
