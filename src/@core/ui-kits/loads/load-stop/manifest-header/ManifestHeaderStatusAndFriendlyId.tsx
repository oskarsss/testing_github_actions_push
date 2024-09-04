import { Stack, Tooltip } from '@mui/material';
import LoadStopsStyled from '@/views/dispatch/orders/Details/sections/load-tabs/load-stops-tab/LoadStops.styled';
import VectorIcons from '@/@core/icons/vector_icons';
import React from 'react';
import openNewWindow from '@/utils/open-new-window';
import { IChipColors } from '@/@core/theme/chip';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import navigateToPage from '@/utils/navigateToPage';

type Props = {
    statusIcon: React.ReactElement;
    statusText: string;
    statusColor: IChipColors;
    friendlyId: string;
    link: string;
    openInNewTab?: boolean;
};

export default function ManifestHeaderStatusAndFriendlyId({
    statusIcon,
    statusText,
    statusColor,
    friendlyId,
    link,
    openInNewTab = true
}: Props) {
    const { t } = useAppTranslation();

    const openNewTab = () => {
        if (openInNewTab) {
            openNewWindow(link);
        } else {
            navigateToPage(link);
        }
    };

    const tooltip = openInNewTab
        ? t('common:tooltips.open_in_new_tab')
        : t('common:tooltips.click_to_open');

    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            gap="inherit"
            sx={{
                svg: {
                    fontSize: '16px',
                    color   : (theme) => theme.palette.utility.foreground[statusColor]?.primary
                }
            }}
        >
            <Tooltip
                title={statusText}
                disableInteractive
            >
                <Stack>{statusIcon}</Stack>
            </Tooltip>

            <Tooltip
                title={tooltip}
                disableInteractive
            >
                <Stack
                    whiteSpace="nowrap"
                    flexDirection="row"
                    alignItems="center"
                    gap="inherit"
                    mr="4px"
                    onClick={openNewTab}
                    onAuxClick={() => openNewWindow(link)}
                    sx={{
                        cursor    : 'pointer',
                        opacity   : 1,
                        transition: 'opacity 0.3s',
                        '&:hover' : {
                            opacity: 0.7
                        }
                    }}
                >
                    <LoadStopsStyled.ManifestId color={statusColor}>
                        {friendlyId}
                    </LoadStopsStyled.ManifestId>
                    <VectorIcons.ArrowRightIcon />
                </Stack>
            </Tooltip>
        </Stack>
    );
}
