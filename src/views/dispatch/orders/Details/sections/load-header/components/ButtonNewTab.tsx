import TabIcon from '@mui/icons-material/Tab';
import LoadHeaderStyled from '@/views/dispatch/orders/Details/sections/load-header/LoadHeader.styled';
import React from 'react';
import openNewWindow from '@/utils/open-new-window';
import { useRouter } from 'next/router';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';
import { Tooltip } from '@mui/material';

type Props = {
    load_id: string;
};

export default function ButtonNewTab({ load_id }: Props) {
    const { route } = useRouter();
    const { t } = useAppTranslation('common');

    const openNewTab = () => {
        openNewWindow(APP_ROUTES_CONFIG.dispatch.orders.details(load_id));
    };

    if (route.includes('id')) return null;

    return (
        <Tooltip
            title={t('tooltips.open_in_new_tab')}
            disableInteractive
        >
            <LoadHeaderStyled.Button
                variant="outlined"
                onClick={openNewTab}
                sx={{ pl: '8px', pr: '8px' }}
            >
                <TabIcon sx={{ fontSize: '20px' }} />
            </LoadHeaderStyled.Button>
        </Tooltip>
    );
}
