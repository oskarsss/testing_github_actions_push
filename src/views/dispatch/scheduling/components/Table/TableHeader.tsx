import { memo } from 'react';
import moment from 'moment-timezone';
import {
    Column,
    ContainerHeader,
    Day,
    DayCell,
    Evening,
    Morning,
    PeriodList,
    Row,
    WrapFixed,
    WrapRegular
} from '@/views/dispatch/scheduling/components/Table/styled';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Tabs from './components/Tabs';
import { columnType } from './types';

const SchedulingTableHeader = ({ columns }: { columns: columnType[] }) => {
    const { t } = useAppTranslation('schedule');
    let totalFixedWidth = 0;

    columns.forEach((col) => {
        if (col.sticky) {
            totalFixedWidth += col.minWidth;
        }
    });

    return (
        <ContainerHeader>
            <WrapFixed style={{ width: totalFixedWidth }}>
                <Row>
                    {columns
                        .filter((col) => col.sticky && col.id === 'tabs')
                        .map((col, index) => (
                            <Column
                                key={col.id ?? index}
                                minWidth={col.minWidth}
                            >
                                <Tabs />
                            </Column>
                        ))}
                </Row>
            </WrapFixed>

            <WrapRegular totalFixedWidth={totalFixedWidth}>
                <Row>
                    {columns
                        .filter((col) => !col.sticky)
                        .map((col, index) => (
                            <Column
                                key={col.id ?? index}
                                minWidth={col.minWidth}
                                style={{
                                    background: 'transparent',
                                    padding   : '0 1px'
                                }}
                            >
                                {/* --------------- DAY CELL --------------- */}
                                <DayCell>
                                    {col.today && <div />}
                                    {moment(col.day).format('ddd')}
                                    <span>
                                        {moment(col.day).format(
                                            moment(col.day).isSame(moment(), 'month')
                                                ? 'DD'
                                                : 'MMM DD'
                                        )}
                                    </span>
                                </DayCell>

                                {/* --------------- PERIOD LIST --------------- */}
                                <PeriodList>
                                    <Morning>
                                        <VectorIcons.Morning />
                                        {col.minWidth > 210 && (
                                            <span>{t('table.header.period_list.morning')}</span>
                                        )}
                                    </Morning>
                                    <Day>
                                        <VectorIcons.Day />
                                        {col.minWidth > 210 && (
                                            <span>{t('table.header.period_list.noon')}</span>
                                        )}
                                    </Day>
                                    <Evening>
                                        <VectorIcons.Evening />
                                        {col.minWidth > 210 && (
                                            <span>{t('table.header.period_list.evening')}</span>
                                        )}
                                    </Evening>
                                </PeriodList>
                            </Column>
                        ))}
                </Row>
            </WrapRegular>
        </ContainerHeader>
    );
};

export default memo(SchedulingTableHeader);
