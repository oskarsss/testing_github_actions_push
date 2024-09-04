/* eslint-disable max-len */
import React, { ReactNode } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { formatAmount, formatMiles } from '@/utils/formatting';
import VectorIcons from '@/@core/icons/vector_icons';
import useCopyToClipboard from '@/utils/copy-to-clipboard';
import LoadDispatcherCharacteristic from '@/views/dispatch/orders/Details/sections/load-characteristics/custom-items/LoadDispatcherCharacteristic';
import { IntlMessageKey, TFunction } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useAppDispatch } from '@/store/hooks';
import { LoadDetailsTabs, LoadsActions } from '@/store/dispatch/loads/slice';
import Styled from './LoadCharacteristics.styled';
import LoadTemperatureCharacteristic from './custom-items/LoadTemperatureCharacteristic';

type Props = {
    dispatcherId: string;
    loadedMiles: number;
    emptyMiles: number;
    commodity: string;
    weightFormatted: string;
    equipmentId: string;
    temperatureFormatted: string;
    invoiceAmount: string;
    ratePerMileFormatted: string;
};

type CharacteristicsRow = {
    title: IntlMessageKey;
    value?: LoadDetailsTabs;
    icon: ReactNode;
    is_custom_value?: boolean;
    renderCell: (props: Props, t: TFunction) => React.ReactNode;
};

const CharacteristicsRows: CharacteristicsRow[] = [
    {
        title          : 'entity:dispatcher',
        icon           : <VectorIcons.LoadIcons.Dispatcher />,
        is_custom_value: true,
        renderCell     : (load) => <LoadDispatcherCharacteristic dispatcher_id={load.dispatcherId} />
    },

    // {
    //     title          : 'Load Contact',
    //     icon           : <VectorIcons.Contact />,
    //     is_custom_value: true,
    //     renderCell     : (load) => '-'
    // },
    {
        title     : 'loads:details.characteristics.titles.loaded',
        value     : 'loadStops',
        icon      : <VectorIcons.LoadIcons.Loaded />,
        renderCell: (load, t) =>
            load.loadedMiles ? `${formatMiles(load.loadedMiles)} ${t('common:mi')}` : '-'
    },

    // {
    //     title     : 'loads:details.characteristics.titles.empty',
    //     icon      : <VectorIcons.NavIcons.EmptyTruck />,
    //     renderCell: (load, t) =>
    //         load.emptyMiles ? `${formatMiles(load.emptyMiles)} ${t('common:mi')}` : '-'
    // },
    {
        title     : 'loads:details.characteristics.titles.commodity',
        value     : 'loadCommodities',
        icon      : <VectorIcons.LoadIcons.Commodity />,
        renderCell: (load) => load.commodity || '-'
    },
    {
        title     : 'loads:details.characteristics.titles.weight',
        value     : 'loadCommodities',
        icon      : <VectorIcons.LoadIcons.Weight />,
        renderCell: (load) => load.weightFormatted || '-'
    },
    {
        title          : '',
        icon           : null,
        is_custom_value: true,
        renderCell(load) {
            return (
                <LoadTemperatureCharacteristic
                    equipmentId={load.equipmentId}
                    temperatureFormatted={load.temperatureFormatted}
                />
            );
        }
    }
];

function LoadCharacteristics(props: Props) {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();

    const {
        loadedMiles,
        emptyMiles,
        invoiceAmount,
        ratePerMileFormatted,
        equipmentId,
        temperatureFormatted,
        weightFormatted,
        dispatcherId,
        commodity
    } = props;

    const copy = useCopyToClipboard();

    const copyRPM = () => {
        copy(
            ratePerMileFormatted,
            `${t('loads:details.characteristics.tooltips.copy_rpm')}: ${ratePerMileFormatted}`
        );
    };

    const openTabByCharacteristic = (tab?: LoadDetailsTabs) => {
        if (!tab) return;
        dispatch(LoadsActions.selectLoadDetailsTab(tab));
    };

    const broker_amount = parseFloat(invoiceAmount.replace(/[^\d.]/g, ''));
    const rmp_with_empty = (broker_amount / (loadedMiles + emptyMiles)).toFixed(2);

    return (
        <Styled.Container>
            <Styled.LoadInfoWrapper>
                {CharacteristicsRows.map((item) => {
                    if (!item.icon && !item.title) {
                        return (
                            <Styled.LoadInfoItem key={item.title || item.value}>
                                {item.renderCell(props, t)}
                            </Styled.LoadInfoItem>
                        );
                    }
                    return (
                        <Styled.LoadInfoItem
                            key={item.title}
                            onClick={() => openTabByCharacteristic(item.value)}
                            isClickable={!!item.value}
                        >
                            <Styled.LoadInfoIconWrapper>{item.icon}</Styled.LoadInfoIconWrapper>
                            <Styled.LoadInfoRow
                                sx={!item?.is_custom_value ? { alignItems: 'baseline' } : {}}
                            >
                                <Styled.LoadInfoItemTitle>{t(item.title)}</Styled.LoadInfoItemTitle>
                                <Styled.LoadInfoItemValue>
                                    {item.renderCell(props, t)}
                                </Styled.LoadInfoItemValue>
                            </Styled.LoadInfoRow>
                        </Styled.LoadInfoItem>
                    );
                })}
            </Styled.LoadInfoWrapper>

            <Styled.PaymentWrapper>
                <Styled.PaymentItem
                    onClick={() => openTabByCharacteristic('loadFinancial')}
                    sx={{ cursor: 'pointer' }}
                >
                    <Styled.PaymentTitle>
                        {t('loads:details.characteristics.titles.total')}
                    </Styled.PaymentTitle>
                    <Styled.PaymentTotal>{invoiceAmount || '-'}</Styled.PaymentTotal>
                </Styled.PaymentItem>

                <Styled.PaymentItem isRPM>
                    <Styled.PaymentTitle>
                        {t('loads:details.characteristics.titles.rpm')}
                    </Styled.PaymentTitle>
                    <Tooltip
                        disableInteractive
                        title={`${t('loads:details.characteristics.tooltips.rpm')}: ${formatAmount(
                            rmp_with_empty
                        )}`}
                    >
                        <Styled.PaymentTotal onClick={copyRPM}>
                            {ratePerMileFormatted || '-'}
                        </Styled.PaymentTotal>
                    </Tooltip>
                </Styled.PaymentItem>
            </Styled.PaymentWrapper>
        </Styled.Container>
    );
}

export default React.memo(LoadCharacteristics);
