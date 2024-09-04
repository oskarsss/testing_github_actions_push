import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import { Button, Fade, Tooltip } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import AddIcon from '@mui/icons-material/Add';
import { memo, useMemo, useState } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import CopyText from '@/@core/components/copy-text/CopyText';
import { applyTestId, TestIDs } from '@/configs/tests';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DangerousIcon from '@mui/icons-material/Dangerous';
import VectorIcons from '@/@core/icons/vector_icons';
import BankAccountsGrpcService from '@/@grpcServices/services/bank-accounts.service';
import { useAddBankAccountDialog } from '@/views/settings/tabs/BankAccounts/dialogs/AddBankAccountDialog';
import { BankAccountModel_Entity_Type } from '@proto/models/model_bank_account';

type Props = {
    driverId: string;
    disabledAddNewBank?: boolean;
};

const BankInformation = ({
    driverId,
    disabledAddNewBank
}: Props) => {
    const [account_number, setAccountNumber] = useState<string>('');
    const [show_account_number, setShowAccountNumber] = useState<boolean>(false);
    const { t } = useAppTranslation();
    const addBankDialog = useAddBankAccountDialog();
    const [deleteBank] = BankAccountsGrpcService.useDeleteBankAccountMutation();
    const { data } = BankAccountsGrpcService.useGetBankAccountsQuery({
        filterByEntityType: BankAccountModel_Entity_Type.ENTITY_TYPE_DRIVER
    });

    const bankAccounts = useMemo(
        () => data?.bankAccounts.filter((account) => account.entityId === driverId) || [],
        [data?.bankAccounts, driverId]
    );

    // const [showAccountNumber] = driversAPI.endpoints.showAccountNumber.useMutation();
    const [showAccountNumber] = BankAccountsGrpcService.useLazyGetBankAccountNumberQuery();
    const confirm = useConfirm();

    const remove = (account_id: string) => {
        confirm({
            icon              : <DangerousIcon color="secondary" />,
            title             : 'drivers:profile.right.bank_information.dialog.unassign.title',
            body              : 'drivers:profile.right.bank_information.dialog.unassign.body',
            confirm_text      : 'common:button.unassign',
            translationOptions: {
                title: {
                    accountHolderName: bankAccounts[0].accountHolderName
                }
            },
            onConfirm: () =>
                deleteBank({
                    bankAccountId: account_id
                })
                    .unwrap()
                    .then(() => {
                        setAccountNumber('');
                        setShowAccountNumber(false);
                    })
        });
    };

    const openAddBankMenu = () => {
        addBankDialog.open({
            entityType: BankAccountModel_Entity_Type.ENTITY_TYPE_DRIVER,
            entityId  : driverId
        });
    };

    const showCard = (account_id: string) => {
        showAccountNumber({
            bankAccountId: account_id
        })
            .unwrap()
            .then((res) => {
                setAccountNumber(res.accountNumber);
                setShowAccountNumber(true);
            });
    };

    return (
        <RightStyled.IconBlock>
            <Box>
                <Typography>{t('drivers:profile.right.bank_information.title')}</Typography>

                {bankAccounts.length === 0 && (
                    <Button
                        onClick={openAddBankMenu}
                        startIcon={<AddIcon />}
                        disabled={disabledAddNewBank}
                        {...applyTestId(TestIDs.pages.driverProfile.buttons.addBankInfo)}
                    >
                        {t('common:button.add')}
                    </Button>
                )}
            </Box>
            {bankAccounts.length > 0 ? (
                bankAccounts.map((account) => (
                    <Fade
                        in
                        key={account.bankAccountId}
                    >
                        <div>
                            <RightStyled.CardInfo>
                                <RightStyled.Card>
                                    <RightStyled.AccountNumber>
                                        {show_account_number ? (
                                            <CopyText text={account_number}>
                                                <Typography variant="body1">
                                                    {account_number}
                                                </Typography>
                                            </CopyText>
                                        ) : (
                                            <Typography variant="body1">
                                                ********{account.lastFour}
                                            </Typography>
                                        )}
                                    </RightStyled.AccountNumber>
                                    {!show_account_number ? (
                                        <VisibilityOffIcon
                                            color="secondary"
                                            onClick={() =>
                                                !account_number
                                                    ? showCard(account.bankAccountId)
                                                    : setShowAccountNumber(true)}
                                        />
                                    ) : (
                                        <VisibilitySharpIcon
                                            color="secondary"
                                            onClick={() => setShowAccountNumber(false)}
                                        />
                                    )}
                                </RightStyled.Card>

                                <Tooltip
                                    title={t('drivers:profile.right.bank_information.tooltip')}
                                >
                                    <RightStyled.IconButton
                                        isUnassign
                                        onClick={() => remove(account.bankAccountId)}
                                        {...applyTestId(
                                            TestIDs.pages.driverProfile.buttons.removeBankInfo
                                        )}
                                    >
                                        <VectorIcons.Garbage />
                                    </RightStyled.IconButton>
                                </Tooltip>
                            </RightStyled.CardInfo>
                            <RightStyled.BankInfo>
                                <RightStyled.Item>
                                    <Typography variant="body2">
                                        {t('drivers:profile.right.bank_information.bank_name')}
                                    </Typography>
                                    <Typography variant="body1">
                                        <CopyText text={account.bankName}>
                                            <span>{account.bankName}</span>
                                        </CopyText>
                                    </Typography>
                                </RightStyled.Item>

                                <RightStyled.Item>
                                    <Typography variant="body2">
                                        {t(
                                            'drivers:profile.right.bank_information.name_on_account'
                                        )}
                                    </Typography>
                                    <Typography variant="body1">
                                        <CopyText text={account.accountHolderName}>
                                            <span>{account.accountHolderName}</span>
                                        </CopyText>
                                    </Typography>
                                </RightStyled.Item>

                                <RightStyled.Item>
                                    <Typography variant="body2">
                                        {t('drivers:profile.right.bank_information.routing_number')}
                                    </Typography>
                                    <Typography variant="body1">
                                        <CopyText text={account.routingNumber}>
                                            <span>{account.routingNumber}</span>
                                        </CopyText>
                                    </Typography>
                                </RightStyled.Item>
                            </RightStyled.BankInfo>
                        </div>
                    </Fade>
                ))
            ) : (
                <RightStyled.EmptyElement variant="body2">
                    {t('drivers:profile.right.bank_information.no_bank')}
                </RightStyled.EmptyElement>
            )}
        </RightStyled.IconBlock>
    );
};

export default memo(BankInformation);
