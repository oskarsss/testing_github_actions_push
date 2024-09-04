import VectorIcons from '@/@core/icons/vector_icons';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import trucksAvailabilityService from '@/@grpcServices/services/trucks-availability.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { Typography } from '@mui/material';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import RevokeLink from './RevokeLink';
import LinkPreview from './LinkPreview';

export const useCapListDialog = hookFabric(ShareCapList, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        padding="16px"
        paperStyle={{
            width    : '525px',
            maxWidth : '525px',
            minHeight: '182px'
        }}
    />
));

function ShareCapList() {
    const { t } = useAppTranslation('schedule');
    const {
        data,
        error,
        isSuccess,
        isLoading
    } =
        trucksAvailabilityService.useGetCapListShareLinkQuery({});

    return (
        <>
            <Typography
                variant="body1"
                fontWeight={600}
                fontSize="18px"
                lineHeight="23px"
                marginBottom="5px"
            >
                {t('dialogs.share_cap_list.title')}
            </Typography>
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
                <Typography
                    variant="body2"
                    fontWeight={500}
                    lineHeight="20px"
                    marginBottom="15px"
                >
                    {t('dialogs.share_cap_list.description')}
                </Typography>
            )}
            {isLoading && <Preloader sx={{ height: '100px' }} />}
            {isSuccess && (
                <div
                    style={{
                        minHeight    : '100px',
                        display      : 'flex',
                        flexDirection: 'column',
                        gap          : '10px'
                    }}
                >
                    <LinkPreview token={data.token} />
                    <RevokeLink token={data.token} />
                </div>
            )}
        </>
    );
}
