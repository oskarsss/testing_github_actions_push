import CustomerPortalGrpcService from '@/@grpcServices/services/customer-portal.service';
import React from 'react';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import StarRateIcon from '@mui/icons-material/StarRate';
import { Button } from '@mui/material';
import Container from '../../components/Container/Container';
import SettingsHeader from '../../components/Header/SettingsHeader';
import styles from './CustomerPortal.module.scss';
import { useCreateCustomerPortalDialog } from './modals/CreateCustomerPortal';
import CustomerPortalCard from './customer-portal-card';

export default function CustomerPortals() {
    const dialog = useCreateCustomerPortalDialog();
    const {
        customerPortals,
        isLoading
    } = CustomerPortalGrpcService.useCustomerPortalGetQuery(
        {},
        {
            selectFromResult: ({
                data,
                ...rest
            }) => ({
                customerPortals: data?.customerPortals || [],
                ...rest
            })
        }
    );

    const handleAddDomain = () => {
        dialog.open({});
    };

    return (
        <Container
            sx={{
                minHeight: '100%'
            }}
        >
            <SettingsHeader
                title="Customer Portals"
                icon={<StarRateIcon />}
                children_left_side={(
                    <Button
                        variant="contained"
                        onClick={handleAddDomain}
                    >
                        Add
                    </Button>
                )}
            />
            {!isLoading ? (
                <div className={styles.portalsContainer}>
                    {customerPortals.map((portal) => (
                        <CustomerPortalCard portal={portal} />
                    ))}
                </div>
            ) : (
                <Preloader />
            )}
        </Container>
    );
}
