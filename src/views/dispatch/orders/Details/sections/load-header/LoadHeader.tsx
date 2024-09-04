import React from 'react';
import { useEventListener } from 'usehooks-ts';
import CopyText from '@/@core/components/copy-text/CopyText';
import { useAppDispatch } from '@/store/hooks';
import { LoadsActions } from '@/store/dispatch/loads/slice';
import ButtonDownloadInvoice from '@/views/dispatch/orders/Details/sections/load-header/components/ButtonDownloadInvoice';
import LoadStatusChipSelect from '@/@core/fields/chip-select/LoadStatusChipSelect';
import LoadInvoiceStatusChipSelect from '@/@core/fields/chip-select/LoadInvoiceStatusChipSelect';
import ButtonEditLoad from '@/views/dispatch/orders/Details/sections/load-header/components/ButtonEditLoad';
import ButtonShare from '@/views/dispatch/orders/Details/sections/load-header/components/ButtonShare';
import ButtonNewTab from '@/views/dispatch/orders/Details/sections/load-header/components/ButtonNewTab';
import { LOAD_INVOICE_STATUS_GRPC_ENUM, LOAD_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import { checkLoadForDownloadInvoice } from '@/@grpcServices/services/loads-service/service-utils/utils';
import CloneLoadButton from '@/@core/ui-kits/loads/clone-load-button/CloneLoadButton';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import ManifestDetailsIcons from '@/views/dispatch/manifests/details/icons';
import navigateToPage from '@/utils/navigateToPage';
import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import type { LoadModel_InvoiceStatus, LoadModel_Status } from '@proto/models/model_load';
import VectorIcons from '@/@core/icons/vector_icons';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';
import LoadHeaderStyled from './LoadHeader.styled';

type Props = {
    loadFriendlyId: string;
    loadId: string;
    loadStatus: LoadModel_Status;
    loadInvoiceStatus: LoadModel_InvoiceStatus;
    truckId: string;
};

function LoadHeader({
    loadFriendlyId,
    loadId,
    loadStatus,
    loadInvoiceStatus,
    truckId
}: Props) {
    const { t } = useAppTranslation('loads');
    const dispatch = useAppDispatch();
    const { pathname } = useRouter();

    const closeDetails = (e: KeyboardEvent) => {
        const galleryEl = document.getElementById('slideshowAnim');
        if (!galleryEl && e.key === 'Escape') {
            dispatch(LoadsActions.ResetSelectedLoad());
        }
    };

    useEventListener('keydown', closeDetails);

    const goBack = () => {
        navigateToPage(APP_ROUTES_CONFIG.dispatch.orders.path);
    };

    return (
        <LoadHeaderStyled.Container>
            <LoadHeaderStyled.Wrapper>
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                >
                    {pathname === `${APP_ROUTES_CONFIG.dispatch.orders.path}/[id]` && (
                        <IconButtonWithTooltip
                            size="small"
                            onClick={goBack}
                            tooltip="loads:details.header.tooltips.back_to_loads"
                            icon={(
                                <ManifestDetailsIcons.ArrowBack
                                    sx={{
                                        svg: {
                                            height: '20px',
                                            width : '20px'
                                        }
                                    }}
                                />
                            )}
                        />
                    )}

                    <VectorIcons.CubeIcon
                        color="primary"
                        sx={{
                            width : '28px',
                            height: '28px'
                        }}
                    />

                    <CopyText text={`${loadFriendlyId}`}>
                        <LoadHeaderStyled.Title>
                            {t('common:loads.friendlyId', { friendlyId: loadFriendlyId })}
                        </LoadHeaderStyled.Title>
                    </CopyText>
                </Stack>

                <LoadHeaderStyled.Wrapper sx={{ gap: '8px' }}>
                    <LoadStatusChipSelect
                        load_status={LOAD_STATUS_GRPC_ENUM[loadStatus]}
                        load_id={loadId}
                    />
                    <LoadInvoiceStatusChipSelect
                        invoice_status={LOAD_INVOICE_STATUS_GRPC_ENUM[loadInvoiceStatus]}
                        load_id={loadId}
                    />
                </LoadHeaderStyled.Wrapper>
            </LoadHeaderStyled.Wrapper>

            <LoadHeaderStyled.Wrapper>
                <ButtonNewTab load_id={loadId} />
                <ButtonShare load_id={loadId} />
                <CloneLoadButton loadId={loadId} />
                {checkLoadForDownloadInvoice(loadStatus, truckId) && (
                    <ButtonDownloadInvoice
                        loadId={loadId}
                        loadFriendlyId={loadFriendlyId}
                    />
                )}
                <ButtonEditLoad load_id={loadId} />
            </LoadHeaderStyled.Wrapper>
        </LoadHeaderStyled.Container>
    );
}

export default React.memo(LoadHeader);
