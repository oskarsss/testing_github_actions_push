import { Stop } from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/load-info-controller-stops/LoadInfoControllerStops';
import StopsComponents from '@/@core/ui-kits/loads/load-stop/StopsComponents';
import { Typography, Tooltip } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import openNewWindow from '@/utils/open-new-window';
import moment from 'moment-timezone';
import VectorIcons from '@/@core/icons/vector_icons';
import { formatMinutes } from '@/utils/formatting';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';

type Props = {
    stop: Stop;
};

export default function LoadInfoControllerStopSecondRow({ stop }: Props) {
    const { t } = useAppTranslation();
    const onOpenLoad = () => {
        if (!stop.loadId) return;
        openNewWindow(APP_ROUTES_CONFIG.dispatch.orders.details(stop.loadId));
    };

    const isLate =
        (stop.lateness > 0 || stop.earliness === 0) &&
        formatMinutes(stop.lateness, t) !== t('common:not_provided');

    return (
        <StopsComponents.StopItemRow>
            <StopsComponents.StopItemRowWrapper>
                <Tooltip
                    disableInteractive
                    disableHoverListener={!stop.loadFriendlyId}
                    title={t('common:tooltips.open_in_new_tab')}
                >
                    <Typography
                        fontSize="14px"
                        fontWeight={500}
                        lineHeight={1.4}
                        onClick={onOpenLoad}
                        sx={{
                            textDecoration: stop.loadFriendlyId ? 'underline' : 'none',
                            minWidth      : '25px',
                            textAlign     : stop.loadFriendlyId ? 'left' : 'center',
                            transition    : 'color 0.3s',
                            marginRight   : '4px',
                            cursor        : stop.loadFriendlyId ? 'pointer' : 'default',

                            ...(stop.loadFriendlyId && {
                                '&:hover': {
                                    color: (theme) => theme.palette.semantic.text.brand.primary
                                }
                            })
                        }}
                    >
                        {stop.loadFriendlyId || '-'}
                    </Typography>
                </Tooltip>
                <Typography
                    fontSize="14px"
                    fontWeight={500}
                    lineHeight={1.4}
                    color={(theme) => theme.palette.semantic.text.secondary}
                >
                    {stop.location
                        ? `${stop.location.city || '-'}, ${stop.location.state || '-'}`
                        : ''}
                </Typography>
            </StopsComponents.StopItemRowWrapper>
            <StopsComponents.StopItemRowWrapper>
                {isLate && (
                    <VectorIcons.CalendarAndCrossIcon
                        sx={{
                            fontSize: '16px',
                            color   : (theme) => theme.palette.utility.foreground.error.primary
                        }}
                    />
                )}
                <Typography
                    fontSize="14px"
                    fontWeight={500}
                    lineHeight={1.4}
                    color={(theme) => theme.palette.semantic.text.secondary}
                >
                    {stop.appointmentStartAtLocal
                        ? moment(stop.appointmentStartAtLocal).format('MMM D HH:mm')
                        : '-'}
                </Typography>
            </StopsComponents.StopItemRowWrapper>
        </StopsComponents.StopItemRow>
    );
}
