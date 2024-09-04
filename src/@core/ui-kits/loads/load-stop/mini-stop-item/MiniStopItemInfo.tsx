import StopsComponents from '@/@core/ui-kits/loads/load-stop/StopsComponents';
import { Divider, Stack } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import CopyText from '@/@core/components/copy-text/CopyText';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import { COMMODITY_PACKAGE_UNIT } from '@/@core/ui-kits/loads/commodities-table/config';

type Props = {
    stop: ManifestsTypes.AnyPreparedStop;
};

export default function MiniStopItemInfo({ stop }: Props) {
    const { t } = useAppTranslation();

    return (
        <StopsComponents.StopItemWrapper
            sx={{
                borderLeft: (theme) => `1px solid ${theme.palette.semantic.border.primary}`
            }}
        >
            <Stack>
                <StopsComponents.Text
                    textColor="primary"
                    fontWeight={600}
                >
                    {t('common:ref')}#
                </StopsComponents.Text>
                <CopyText text={stop.referenceId}>
                    <StopsComponents.Text>{stop.referenceId || '-'}</StopsComponents.Text>
                </CopyText>
            </Stack>

            {stop.commodities.length > 0 && (
                <>
                    <StopsComponents.Divider sx={{ margin: '0px' }} />
                    <StopsComponents.StopItemRowWrapper sx={{ overflow: 'hidden' }}>
                        {stop.commodities.map((commodity, index) => (
                            <StopsComponents.StopItemRowWrapper key={commodity.commodityId}>
                                <StopsComponents.Text textColor="primary">
                                    {`${commodity.quantity} ${t(
                                        COMMODITY_PACKAGE_UNIT[commodity.packagingUnit]
                                    )},`}
                                </StopsComponents.Text>
                                <StopsComponents.Text>
                                    {commodity.weightFormatted}
                                </StopsComponents.Text>
                                {stop.commodities.length - 1 !== index && (
                                    <Divider
                                        orientation="vertical"
                                        sx={{
                                            margin: 0,
                                            height: '12px'
                                        }}
                                    />
                                )}
                            </StopsComponents.StopItemRowWrapper>
                        ))}
                    </StopsComponents.StopItemRowWrapper>
                </>
            )}
        </StopsComponents.StopItemWrapper>
    );
}
