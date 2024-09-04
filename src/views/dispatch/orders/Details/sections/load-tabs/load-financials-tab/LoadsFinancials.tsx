import * as React from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import DriverPayItems from '@/views/dispatch/orders/dialogs/EditLoad/components/driver-pay-items';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Stack } from '@mui/material';
import { LoadData_Load } from '@proto/loads';
import LoadInvoiceDetails from './load-invoice-details/LoadInvoiceDetails';
import LoadsFinancialsStyled from './LoadsFinancials.styled';
import LoadDetailsViewStyled from '../../../LoadDetailsView.styled';

type Props = {
    load: LoadData_Load;
};

function LoadsFinancials({ load }: Props) {
    const { t } = useAppTranslation();
    return (
        <LoadsFinancialsStyled.Container
            sx={{
                display      : 'flex',
                flexDirection: 'column',
                gap          : '20px'
            }}
        >
            <LoadInvoiceDetails load={load} />
            <LoadsFinancialsStyled.Divider />
            <Stack
                direction="column"
                gap="12px"
            >
                <LoadDetailsViewStyled.FlexContainer style={{ gap: '4px', padding: '0 8px' }}>
                    <VectorIcons.NavIcons.Truck size={24} />
                    <LoadDetailsViewStyled.Title style={{ fontSize: '16px' }}>
                        {t('modals:loads.edit_load.driver_pay_items.title')}
                    </LoadDetailsViewStyled.Title>
                </LoadDetailsViewStyled.FlexContainer>
                <Stack
                    direction="column"
                    padding="0 8px"
                    gap="inherit"
                >
                    {load.manifests.map((manifest) => (
                        <DriverPayItems
                            key={manifest.manifestId}
                            manifest={manifest}
                            loadId={load.loadId}
                        />
                    ))}
                </Stack>
            </Stack>
        </LoadsFinancialsStyled.Container>
    );
}

export default React.memo(LoadsFinancials);
