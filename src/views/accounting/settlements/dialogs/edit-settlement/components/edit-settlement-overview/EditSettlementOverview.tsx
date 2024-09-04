import useCopyToClipboard from '@/utils/copy-to-clipboard';
import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { SettlementsActions } from '@/store/accounting/settlements/slice';
import { editSettlementTabValueSelector } from '@/store/accounting/settlements/selectors';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import EditSettlement from '../../styled';
import EditSettlementIcons from '../../edit-settlement-icons';
import { ChangeTabAction } from '../../modes/regular-modes/Tabs/tabs_config';
import OverviewStyled from './EditSettlementOverview.styled';
import { useEditSettlementContext } from '../../EditSettlement';

export default function EditSettlementOverview() {
    const isProMode = useAppSelector((state) => state.settlements.edit_dialog.is_pro_mode);
    const tabValue = useAppSelector(editSettlementTabValueSelector);
    const { settlement } = useEditSettlementContext();
    const { t } = useAppTranslation();
    const copy = useCopyToClipboard();

    const dispatch = useAppDispatch();

    const handleChange: ChangeTabAction = (_, newValue) => {
        dispatch(SettlementsActions.ToggleTabValue(newValue));
    };

    const copyTotal = (value: string) => {
        copy(value, `${t('common:copy.copied')} ${value}`);
    };

    return (
        <Stack
            direction="column"
            sx={{
                borderRadius: '8px'
            }}
        >
            <EditSettlement.SectionHeader
                title="modals:settlements.edit_settlement.overview.title"
                Icon={<EditSettlementIcons.Section.Overview />}
            />
            <Stack
                direction="row"
                spacing={2}
            >
                <OverviewStyled.Item
                    style={{
                        flex: '1 1 0'
                    }}
                    direction="column"
                >
                    <OverviewStyled.ItemLabel
                        Icon={<EditSettlementIcons.Overview.Driver />}
                        label="modals:settlements.edit_settlement.overview.labels.driver_earned"
                    />

                    <OverviewStyled.ItemTotal
                        tooltip="common:copy.copy_total"
                        onClick={() => copyTotal(settlement.driverPayAmount)}
                        setDivider
                        totalAmount={settlement.driverPayAmount}
                    >
                        <Box
                            sx={{
                                display       : 'flex',
                                alignItems    : 'center',
                                justifyContent: 'center',
                                padding       : '6px'
                            }}
                        >
                            <ContentCopyIcon
                                color="secondary"
                                fontSize="small"
                            />
                        </Box>
                    </OverviewStyled.ItemTotal>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Typography
                            fontSize="12px"
                            lineHeight="18px"
                            variant="body1"
                            color="GrayText"
                            fontWeight={600}
                        >
                            {t('modals:settlements.edit_settlement.overview.labels.per_mile')}
                        </Typography>
                        <Typography
                            fontSize="12px"
                            lineHeight="18px"
                            variant="body1"
                            fontWeight={600}
                        >
                            {settlement.avgRpm}
                        </Typography>
                    </Stack>
                </OverviewStyled.Item>

                {!isProMode && (
                    <OverviewStyled.Item
                        direction="column"
                        style={{
                            flex: '1 1 0'
                        }}
                    >
                        <OverviewStyled.ItemLabel
                            Icon={<EditSettlementIcons.Overview.Company />}
                            label="modals:settlements.edit_settlement.overview.labels.company_net"
                        />
                        <OverviewStyled.ItemTotal
                            tooltip="common:copy.copy_total"
                            onClick={() => copyTotal(settlement.companyNetAmount)}
                            totalAmount={settlement.companyNetAmount}
                        >
                            <Box
                                sx={{
                                    display       : 'flex',
                                    alignItems    : 'center',
                                    justifyContent: 'center',
                                    padding       : '6px'
                                }}
                            >
                                <ContentCopyIcon
                                    color="secondary"
                                    fontSize="small"
                                />
                            </Box>
                        </OverviewStyled.ItemTotal>
                    </OverviewStyled.Item>
                )}

                <OverviewStyled.Item
                    smallPadding
                    style={{
                        flex: '2.5 1 0'
                    }}
                >
                    <Stack
                        direction="column"
                        justifyContent="space-between"
                        flex="1 1 100%"
                    >
                        <OverviewStyled.RowInfo
                            labelValue="manifestsInfo"
                            handleChange={handleChange}
                            tabValue={tabValue}
                            Icon={EditSettlementIcons.Overview.Gross}
                            label="common:gross"
                            totalAmount={settlement.totalLoadsAmount}
                        />

                        <OverviewStyled.RowInfo
                            handleChange={handleChange}
                            labelValue="driverRecurringTransactionsInfo"
                            tabValue={tabValue}
                            Icon={EditSettlementIcons.Overview.Debits}
                            label="modals:settlements.edit_settlement.overview.labels.debits"
                            totalAmount={settlement.debitsAmount}
                        />

                        <OverviewStyled.RowInfo
                            handleChange={handleChange}
                            labelValue="driverRecurringTransactionsInfo"
                            tabValue={tabValue}
                            Icon={EditSettlementIcons.Overview.Credits}
                            label="modals:settlements.edit_settlement.overview.labels.credits"
                            totalAmount={settlement.creditsAmount}
                        />
                    </Stack>

                    <Stack
                        direction="column"
                        flex="1 1 100%"

                        // flexGrow={1}
                    >
                        {isProMode && (
                            <OverviewStyled.RowInfo
                                handleChange={handleChange}
                                tabValue={tabValue}
                                Icon={EditSettlementIcons.Overview.Company}
                                label="modals:settlements.edit_settlement.overview.labels.company_fee"
                                totalAmount={settlement.companyNetAmount}
                            />
                        )}
                        <OverviewStyled.RowInfo
                            handleChange={handleChange}
                            labelValue="tollsInfo"
                            tabValue={tabValue}
                            Icon={EditSettlementIcons.Overview.Toll}
                            label="entity:tolls"
                            totalAmount={settlement.tollsAmount}
                            isDeduct={settlement.driverPayDeductTolls}
                        />
                        <OverviewStyled.RowInfo
                            handleChange={handleChange}
                            labelValue="fuelInfo"
                            tabValue={tabValue}
                            Icon={EditSettlementIcons.Overview.Fuel}
                            label="entity:fuels"
                            totalAmount={settlement.fuelAmount}
                            isDeduct={settlement.driverPayDeductFuel}
                        />
                    </Stack>
                </OverviewStyled.Item>
            </Stack>
        </Stack>
    );
}
