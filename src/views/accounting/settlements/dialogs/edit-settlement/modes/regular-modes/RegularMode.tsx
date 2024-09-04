import { Fade, useTheme } from '@mui/material';
import Notes from '@/@core/components/notes/Notes';
import { editSettlementTabValueSelector } from '@/store/accounting/settlements/selectors';
import { useAppSelector } from '@/store/hooks';
import Payout from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/Payout';
import QuickbooksBill from '@/views/accounting/settlements/dialogs/edit-settlement/components/quickbooks-bill/QuickbooksBill';
import getScrollBarStyles from '@/utils/get-scrollbar-styles';
import { useEditSettlementContext } from '../../EditSettlement';
import EditSettlement from '../../styled';
import EditSettlementOverview from '../../components/edit-settlement-overview/EditSettlementOverview';
import Tabs from './Tabs/Tabs';
import { tabs_config } from './Tabs/tabs_config';

export default function EditSettlementRegularMode() {
    const { settlement } = useEditSettlementContext();
    const tabValue = useAppSelector(editSettlementTabValueSelector);
    const theme = useTheme();

    return (
        <Fade in>
            <EditSettlement.Wrapper sx={{ overflow: 'hidden' }}>
                <EditSettlement.Column
                    sx={{ overflow: 'hidden' }}
                    flexGrow={3}
                >
                    <EditSettlement.Row grow={0}>
                        <EditSettlementOverview />
                    </EditSettlement.Row>
                    <EditSettlement.Row>
                        <Tabs />

                        {tabs_config.map(
                            ({
                                Component,
                                settlement_field
                            }) =>
                                tabValue === settlement_field && (
                                    <Component key={settlement_field} />
                                )
                        )}
                    </EditSettlement.Row>
                </EditSettlement.Column>

                <EditSettlement.Column
                    sx={{
                        flexBasis: '340px',
                        flexGrow : 0,
                        overflowY: 'auto',
                        ...getScrollBarStyles(theme)
                    }}
                >
                    <QuickbooksBill />
                    <Payout />
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
                                        flexBasis      : '340px',
                                        maxWidth       : '340px',
                                        flexGrow       : 1,
                                        borderRadius   : '8px',
                                        backgroundColor: (theme) =>
                                            theme.palette.semantic.foreground.white.tertiary,
                                        padding: '16px 16px'
                                    }
                                }
                            }
                        }}
                    />
                </EditSettlement.Column>
            </EditSettlement.Wrapper>
        </Fade>
    );
}
