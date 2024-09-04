import CenterStyled from '@/views/fleet/drivers/Details/components/Center/styled';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function MapEmptyScreen() {
    const { t } = useAppTranslation();
    return (
        <CenterStyled.MapEmptyScreen>
            {t('common:profile.center.map.location_unavailable')}
        </CenterStyled.MapEmptyScreen>
    );
}
