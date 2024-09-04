import CustomerPortalGrpcService from '@/@grpcServices/services/customer-portal.service';
import { CustomerPortalModel_CustomerPortal } from '@proto/models/model_customer_portal';
import React from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import DomainIcon from '@mui/icons-material/Domain';
import DeleteIcon from '@mui/icons-material/Delete';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import EditIcon from '@mui/icons-material/Edit';
import VpnKeyOffIcon from '@mui/icons-material/VpnKeyOff';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useCustomerPortalSetCodeDialog } from '../modals/SetCode';
import CustomerPortalDomains from './CustomerPortalDomains';
import Search from '../../domains/Search';
import styles from './CustomerPortalCard.module.scss';

type Props = {
    portal: CustomerPortalModel_CustomerPortal;
};

export default function CustomerPortalCard({ portal }: Props) {
    const [search, setSearch] = React.useState('');
    const [create] = CustomerPortalGrpcService.useCustomerPortalDomainCreateMutation();
    const [clearCode] = CustomerPortalGrpcService.useCustomerPortalCodeClearMutation();
    const [deletePortal] = CustomerPortalGrpcService.useCustomerPortalDeleteMutation();
    const confirm = useConfirm();
    const handleCreate = () => {
        create({ domainName: search, customerPortalId: portal.customerPortalId });
    };

    const setCodeDialog = useCustomerPortalSetCodeDialog();

    const handleClickCode = () => {
        if (!portal.code) {
            setCodeDialog.open({ portalId: portal.customerPortalId });
        } else {
            confirm({
                title    : 'Clear Code',
                body     : 'Are you sure you want to clear the code?',
                onConfirm: () => {
                    clearCode({ customerPortalId: portal.customerPortalId });
                },
                confirm_text: 'Yes'
            });
        }
    };

    const handleDeleteHandler = () => {
        confirm({
            title    : 'Delete Portal',
            body     : 'Are you sure you want to delete the portal?',
            onConfirm: () => {
                deletePortal({ customerPortalId: portal.customerPortalId });
            },
            confirm_text: 'Yes'
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.overview}>
                <p className={styles.portalName}>{portal.name}</p>
                <div className={styles.overviewControls}>
                    <IconButton size="small">
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <Tooltip title={portal.code ? 'Clear Code' : 'Set Code'}>
                        <IconButton
                            size="small"
                            onClick={handleClickCode}
                        >
                            {portal.code ? (
                                <VpnKeyOffIcon fontSize="small" />
                            ) : (
                                <VpnKeyIcon fontSize="small" />
                            )}
                        </IconButton>
                    </Tooltip>
                    <IconButton
                        size="small"
                        color="error"
                        onClick={handleDeleteHandler}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>
            <div>
                <p>Support Email: {portal.supportEmail}</p>
                <p>Support Phone: {portal.supportPhone}</p>
                <p>Code: {portal.code}</p>
            </div>
            <div className={styles.title}>
                <DomainIcon />
                <p>Domains</p>
            </div>
            <div className={styles.domainsWrapper}>
                <div className={styles.searchContainer}>
                    <Search
                        onChange={setSearch}
                        value={search}
                    />
                    <Button
                        variant="contained"
                        onClick={handleCreate}
                    >
                        Add
                    </Button>
                </div>
                <CustomerPortalDomains
                    search={search}
                    portalId={portal.customerPortalId}
                />
            </div>
        </div>
    );
}
