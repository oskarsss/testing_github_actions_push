import SettlementCyclePeriodsGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycle-periods';
import moment from 'moment-timezone';

const dataFormatter = (datetime: string) => moment(datetime).format('MM/DD ddd hh:mm A');

type Props = {
    cycleId: string;
    periodId: string;
};

export default function PeriodDateRange({
    cycleId,
    periodId
}: Props) {
    const { data } = SettlementCyclePeriodsGrpcService.useGetPeriodsQuery({ cycleId });
    const period = data?.periods.find((period) => period.periodId === periodId);

    if (!period) return '-';

    return `${dataFormatter(period.startDatetime)} - ${dataFormatter(period.endDatetime)}`;
}
