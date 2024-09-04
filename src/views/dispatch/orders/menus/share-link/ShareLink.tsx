import LoadTrackingLinkGrpcService from '@/@grpcServices/services/loads-service/loads-tracking-link.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import ShareLinkContent from '@/views/dispatch/orders/menus/share-link/ShareLinkContent';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import VectorIcons from '@/@core/icons/vector_icons';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ShareLinkStyled from '@/@core/ui-kits/loads/share-link/ShareLinkStyled';

export const useShareLinkDialog = hookFabric(ShareLink, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        padding="16px"
        paperStyle={{
            width   : '525px',
            maxWidth: '525px'
        }}
    />
));

type Props = {
    loadId: string;
};

export default function ShareLink({ loadId }: Props) {
    const { t } = useAppTranslation('modals');
    const {
        data,
        isLoading,
        error,
        isSuccess
    } =
        LoadTrackingLinkGrpcService.useGetTrackingLinkQuery({
            loadId
        });

    return (
        <>
            <ShareLinkStyled.Title>{t('loads.share_link.title')}</ShareLinkStyled.Title>

            {error ? (
                <FallbackContent
                    icon={<VectorIcons.Cone size={100} />}
                    firstText="common:something_went_wrong"
                    styles={{
                        position: 'relative',
                        height  : 217,
                        gap     : '16px'
                    }}
                />
            ) : (
                <ShareLinkStyled.SubTitle>
                    {t('loads.share_link.description')}
                </ShareLinkStyled.SubTitle>
            )}

            {isLoading && <Preloader sx={{ height: '182px' }} />}

            {isSuccess && (
                <ShareLinkContent
                    loadId={loadId}
                    data={data}
                />
            )}
        </>
    );
}
