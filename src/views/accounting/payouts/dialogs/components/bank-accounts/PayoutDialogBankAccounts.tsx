import {
    checkPayoutTypeForRequiredBankField,
    DefaultValues
} from '@/views/accounting/payouts/dialogs/helpers';
import React, { MouseEvent } from 'react';
import { Control, useWatch, useController } from 'react-hook-form';
import BankAccountComponents from '@/views/accounting/payouts/dialogs/components/bank-accounts/BankAccountComponents';
import RadioButton from '@/@core/ui-kits/basic/radio-button/RadioButton';
import { Fade, Stack, Typography } from '@mui/material';
import BankAccountEmptyScreen from '@/views/accounting/payouts/dialogs/components/bank-accounts/BankAccountEmptyScreen';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import BankAccountsGrpcService from '@/@grpcServices/services/bank-accounts.service';
import { BankAccountModel_Entity_Type } from '@proto/models/model_bank_account';
import { useStableArray } from '@/hooks/useStable';
import BankAccountNumber from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/BankAccountNumber';
import AddIcon from '@mui/icons-material/Add';
import { useAddBankAccountDialog } from '@/views/settings/tabs/BankAccounts/dialogs/AddBankAccountDialog';
import { useAppSelector } from '@/store/hooks';

type Props = {
    control: Control<DefaultValues>;
    disabledChange?: boolean;
};

export default function PayoutDialogBankAccounts({
    control,
    disabledChange
}: Props) {
    const { t } = useAppTranslation();
    const addBankAccountDialog = useAddBankAccountDialog();
    const companyId = useAppSelector((state) => state.app.company_id);
    const type = useWatch({ control, name: 'type' });
    const {
        field: {
            value,
            onChange
        }
    } = useController({ control, name: 'bankAccountId' });

    const bankAccountsResult = BankAccountsGrpcService.useGetBankAccountsQuery({
        filterByEntityType: BankAccountModel_Entity_Type.ENTITY_TYPE_COMPANY,
        filterByDeleted   : { deleted: false }
    });

    const bankAccounts = useStableArray(bankAccountsResult.data?.bankAccounts);

    if (!checkPayoutTypeForRequiredBankField(type)) {
        return null;
    }

    const onClick = (bankAccountId: string) => (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (disabledChange) return;
        onChange(bankAccountId);
    };

    const handleAddBankAccount = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        if (!companyId) return;
        addBankAccountDialog.open({
            entityType     : BankAccountModel_Entity_Type.ENTITY_TYPE_COMPANY,
            entityId       : companyId,
            onSuccessfulAdd: (bankAccountId) => {
                if (!disabledChange) {
                    onChange(bankAccountId);
                }
            }
        });
    };

    if (!bankAccounts.length) {
        return <BankAccountEmptyScreen onClickAddBankAccount={handleAddBankAccount} />;
    }

    return (
        <Fade
            in
            timeout={500}
        >
            <Stack
                overflow="hidden"
                maxHeight="320px"
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    pl="20px"
                    mt="12px"
                >
                    <Typography
                        fontSize="16px"
                        fontWeight={600}
                        lineHeight={1.4}
                    >
                        {t('modals:payouts.bank_account.title')}
                    </Typography>
                    <BankAccountComponents.AddButton
                        variant="contained"
                        disabled={disabledChange}
                        startIcon={<AddIcon />}
                        onClick={handleAddBankAccount}
                    >
                        {t('common:button.add')}
                    </BankAccountComponents.AddButton>
                </Stack>
                <BankAccountComponents.Container>
                    {bankAccounts.map((bankAccount) => (
                        <BankAccountComponents.Wrapper
                            key={bankAccount.bankAccountId}
                            onClick={onClick(bankAccount.bankAccountId)}
                            selected={bankAccount.bankAccountId === value}
                            isEdit={disabledChange}
                        >
                            <RadioButton
                                checked={bankAccount.bankAccountId === value}
                                sx={{
                                    width  : '16px',
                                    height : '16px',
                                    padding: 0,
                                    cursor : disabledChange ? 'default' : 'pointer'
                                }}
                            />
                            <BankAccountComponents.Rows>
                                <BankAccountComponents.Row>
                                    <BankAccountComponents.Label>
                                        {t('modals:payouts.bank_account.bank')}
                                    </BankAccountComponents.Label>
                                    {bankAccount ? (
                                        <BankAccountNumber
                                            lastFour={bankAccount.lastFour}
                                            bankAccountId={bankAccount.bankAccountId}
                                        />
                                    ) : (
                                        '-'
                                    )}
                                </BankAccountComponents.Row>

                                <BankAccountComponents.Row>
                                    <BankAccountComponents.Label>
                                        {t('modals:payouts.bank_account.name')}
                                    </BankAccountComponents.Label>
                                    <BankAccountComponents.Value>
                                        {bankAccount.bankName}
                                    </BankAccountComponents.Value>
                                </BankAccountComponents.Row>

                                <BankAccountComponents.Row>
                                    <BankAccountComponents.Label>
                                        {t('modals:payouts.bank_account.routing_number')}
                                    </BankAccountComponents.Label>
                                    <BankAccountComponents.Value>
                                        {bankAccount.routingNumber}
                                    </BankAccountComponents.Value>
                                </BankAccountComponents.Row>
                            </BankAccountComponents.Rows>
                        </BankAccountComponents.Wrapper>
                    ))}
                </BankAccountComponents.Container>
            </Stack>
        </Fade>
    );
}
