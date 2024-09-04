import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, styled } from '@mui/material';
import LoadDraftsGrpcService from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';
import { useNewLoadsDialog } from './NewLoads';

const StyledNewLoadsButton = styled(Button)(() => ({
    '@keyframes new-loads-slide-left': {
        from: {
            width: '82px'
        },
        to: {
            width: '158px',

            opacity       : 1,
            boxShadow     : '0 12px 48px rgba(34, 103, 255, 0.35) !important',
            display       : 'flex',
            flexDirection : 'row',
            alignItems    : 'center',
            justifyContent: 'space-between'
        }
    },
    '@keyframes new-loads-slide-right': {
        from: {
            width: '158px'
        },
        to: {
            width: '82px'
        }
    },

    position     : 'absolute',
    zIndex       : 999,
    right        : 0,
    bottom       : '62px',
    height       : '85px',
    borderRadius : '8px 0px 0px 8px',
    padding      : '3px 7px',
    textTransform: 'uppercase',
    fontWeight   : 500,
    fontSize     : '14px',
    textAlign    : 'center',
    boxShadow    : '0 12px 48px rgba(34, 103, 255, 0.2) !important',
    span         : {
        fontSize: '25px'
    },

    display       : 'flex',
    flexDirection : 'column',
    alignItems    : 'center',
    justifyContent: 'center',

    width: '82px',

    '&.mouse-over': {
        animationName          : 'new-loads-slide-left',
        animationDuration      : '0.2s',
        animationTimingFunction: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
        animationFillMode      : 'both',
        animationPlayState     : 'running'
    },
    '&.mouse-not-over': {
        animationName          : 'new-loads-slide-right',
        animationDuration      : '0.2s',
        animationTimingFunction: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
        animationFillMode      : 'both',
        animationPlayState     : 'running'
    }
}));

const verification_array = [
    '/dispatch/scheduling',
    APP_ROUTES_CONFIG.dispatch.orders.path,
    `${APP_ROUTES_CONFIG.dispatch.orders.path}/[id]`,
    '/dispatch/brokers',
    '/dispatch/customers',
    '/map'

    // '/dispatch/tracking',
];

const NewLoadsButton = () => {
    const { t } = useAppTranslation();
    const router = useRouter();
    const { data } = LoadDraftsGrpcService.useGetDraftsQuery(
        {},
        {
            refetchOnFocus           : true,
            refetchOnMountOrArgChange: true
        }
    );

    const [checked, setChecked] = useState('');

    const newLoadsDialog = useNewLoadsDialog();

    if (!verification_array.includes(router.pathname)) return null;

    const handleMouseEnter = () => {
        setChecked('mouse-over');
    };
    const handleMouseLeave = () => {
        setChecked('mouse-not-over');
    };

    const handleOpenNewLoads = () => {
        newLoadsDialog.open({});
    };

    if (!data?.loadDrafts?.length) return null;

    return (
        <StyledNewLoadsButton
            variant="contained"
            size="small"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleOpenNewLoads}
            className={checked}
        >
            <span
                style={
                    checked === 'mouse-not-over'
                        ? {
                            height: '34px'
                        }
                        : {}
                }
            >
                {data?.loadDrafts.length}
            </span>
            {t('new_loads:buttons.load_drafts')}
        </StyledNewLoadsButton>
    );
};

export default NewLoadsButton;
