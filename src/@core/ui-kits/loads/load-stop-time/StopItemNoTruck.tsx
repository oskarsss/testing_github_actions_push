import StopsComponents from '@/@core/ui-kits/loads/load-stop/StopsComponents';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import moment from 'moment-timezone';
import { formatMinutes } from '@/utils/formatting';

type Props = {
    appointmentStartAt: string;
};

export default function StopItemNoTruck({ appointmentStartAt }: Props) {
    const { t } = useAppTranslation();

    const diff = moment(appointmentStartAt).diff(moment(), 'minutes');
    const date_is_until = moment(appointmentStartAt).isBefore(moment());
    const time = date_is_until
        ? moment(appointmentStartAt).format('MMM DD')
        : formatMinutes(diff, t);

    return (
        <StopsComponents.StopItemWrapper
            sx={{
                height        : '100%',
                alignItems    : 'center',
                justifyContent: 'center',
                svg           : {
                    width : '16px',
                    height: '16px',
                    color : (theme) => theme.palette.semantic.foreground.primary
                },
                span: {
                    fontSize: '14px'
                }
            }}
        >
            <StopsComponents.StopItemRowWrapper>
                <VectorIcons.ClockIcon />
                <StopsComponents.Text>{t('state_info:stop.start_in')}</StopsComponents.Text>
            </StopsComponents.StopItemRowWrapper>
            <StopsComponents.Text
                sx={{ fontWeight: 600 }}
                textColor="primary"
            >
                {time || '-'}
            </StopsComponents.Text>
        </StopsComponents.StopItemWrapper>
    );
}
