import AddIcon from '@mui/icons-material/Add';
import { LoadingButton } from '@mui/lab';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useConfirm } from '@/@core/components/confirm-dialog';

type Props = {
    disabled?: boolean;
};

export default function QuickbooksBillCreateBtn({ disabled }: Props) {
    const { selectedSettlementParams } = useEditSettlementContext();
    const { t } = useAppTranslation('modals');
    const confirm = useConfirm();

    const [create, createState] =
        IntegrationQuickbooksGrpcService.useCreateBillQuickbooksMutation();

    const onClickButton = () => {
        confirm({
            title       : 'modals:settlements.edit_settlement.qb_bill.buttons.create.confirm.title',
            body        : 'modals:settlements.edit_settlement.qb_bill.buttons.create.confirm.body',
            confirm_text: 'common:button.create',
            onConfirm   : () =>
                create({
                    settlements: [
                        {
                            cycleId     : selectedSettlementParams.cycle_id,
                            periodId    : selectedSettlementParams.period_id,
                            settlementId: selectedSettlementParams.settlement_id
                        }
                    ]
                })
        });
    };

    return (
        <LoadingButton
            variant="contained"
            color="success"
            size="small"
            disabled={disabled}
            loading={createState.isLoading}
            onClick={onClickButton}
            startIcon={<AddIcon />}
            sx={{
                borderRadius   : '4px',
                backgroundColor: '#2CA01C',
                color          : 'white',
                fontSize       : '12px',
                fontWeight     : 500,
                lineHeight     : 1.5,
                padding        : '3px 8px !important',
                textTransform  : 'capitalize',
                boxShadow      : '0px 1px 2px 0px rgba(16, 24, 40, 0.05) !important',

                '.MuiButton-icon': {
                    marginRight       : '4px',
                    '.MuiSvgIcon-root': {
                        fontSize: '16px'
                    }
                },

                '&:hover': {
                    backgroundColor: '#2CA01C',
                    opacity        : 0.9
                }
            }}
        >
            {t('settlements.edit_settlement.qb_bill.buttons.create.title')}
        </LoadingButton>
    );
}
