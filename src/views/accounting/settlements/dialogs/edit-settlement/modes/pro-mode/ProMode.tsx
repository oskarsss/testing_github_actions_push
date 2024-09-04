import { Fade, Stack } from '@mui/material';
import Notes from '@/@core/components/notes/Notes';
import Payout from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/Payout';
import QuickbooksBill from '@/views/accounting/settlements/dialogs/edit-settlement/components/quickbooks-bill/QuickbooksBill';
import { useEditSettlementContext } from '../../EditSettlement';
import EditSettlement from '../../styled';
import EditSettlementOverview from '../../components/edit-settlement-overview/EditSettlementOverview';
import EditSettlementManifests from '../../components/edit-settlement-tables/Loads/EditSettlementManifests';
import EditSettlementFuel from '../../components/edit-settlement-tables/Fuel/EditSettlementFuel';
import EditSettlementTolls from '../../components/edit-settlement-tables/Tolls/EditSettlementTolls';
import TransactionsTablePro from '../../components/edit-settlement-tables/Transactions/TransactionsTablePro';
import RecurringTransactionTable from '../../components/edit-settlement-tables/RecurringTransaction/ReccuringTransactionTable';

export default function EditSettlementProMode() {
    const { settlement } = useEditSettlementContext();

    return (
        <Fade in>
            <EditSettlement.Wrapper sx={{ height: '100%', overflow: 'hidden' }}>
                <EditSettlement.Column sx={{ overflow: 'auto' }}>
                    <EditSettlement.Row
                        grow={0}
                        sx={{ overflow: 'visible' }}
                    >
                        <EditSettlementOverview />
                    </EditSettlement.Row>
                    <EditSettlement.Row>
                        <EditSettlementManifests />
                    </EditSettlement.Row>
                </EditSettlement.Column>
                <EditSettlement.Column
                    sx={{
                        overflowY             : 'auto',
                        '&::-webkit-scrollbar': {
                            width  : '6px !important',
                            height : '6px !important',
                            opacity: ' 1 !important'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: (theme) =>
                                `${
                                    theme.palette.mode === 'light' ? '#D0D5DD' : '#535252'
                                } !important`,
                            borderRadius: '16px !important',
                            width       : '4px !important'
                        }
                    }}
                >
                    <EditSettlement.Row
                        grow={1}
                        sx={{ overflow: 'visible' }}
                    >
                        <EditSettlementFuel setMinHeight />
                    </EditSettlement.Row>
                    <EditSettlement.Row
                        grow={1}
                        sx={{ overflow: 'visible' }}
                    >
                        <EditSettlementTolls setMaxHeight />
                    </EditSettlement.Row>
                    <EditSettlement.Row
                        grow={1}
                        sx={{ overflow: 'visible' }}
                    >
                        <RecurringTransactionTable setMinHeight />
                    </EditSettlement.Row>
                    <EditSettlement.Row
                        grow={1}
                        sx={{ overflow: 'visible' }}
                    >
                        <TransactionsTablePro setMinHeight />
                    </EditSettlement.Row>
                    <Stack
                        flexDirection="row"
                        alignItems="stretch"
                        width="100%"
                        gap="inherit"
                    >
                        <Stack
                            gap="inherit"
                            minWidth="350px"
                        >
                            <QuickbooksBill />
                            <Payout />
                        </Stack>
                        <Notes
                            entity_id={settlement.settlementId}
                            entity_type="settlement"
                            variant="filled"
                            textFieldBottom
                            size="small"
                            slots={{
                                header: {
                                    props: {
                                        sxContainer: {
                                            justifyContent: 'flex-start',
                                            padding       : '0'
                                        },
                                        sxTitle: {
                                            textAlign: 'start'
                                        }
                                    }
                                },
                                container: {
                                    props: {
                                        sx: {
                                            flexGrow       : 2,
                                            borderRadius   : '8px',
                                            backgroundColor: (theme) =>
                                                theme.palette.semantic.foreground.white.tertiary,
                                            padding: '16px'
                                        }
                                    }
                                }
                            }}
                        />
                    </Stack>
                </EditSettlement.Column>
            </EditSettlement.Wrapper>
        </Fade>
    );
}
