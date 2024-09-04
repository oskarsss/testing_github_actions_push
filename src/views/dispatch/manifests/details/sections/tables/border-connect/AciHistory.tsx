import { Stack, Typography, styled } from '@mui/material';
import React from 'react';
import CountBadge from '@/@core/ui-kits/basic/count-badge/CountBadge';
import getScrollBarStyles from '@/utils/get-scrollbar-styles';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ArticleHeader from './component/ArticleHeader';
import Icons from './icons';

const TimeMarker = styled(Typography)(({ theme }) => ({
    color   : theme.palette.semantic.text.disabled,
    fontSize: '12px'
}));

const Text = styled(Typography)(({ theme }) => ({
    color     : theme.palette.semantic.text.primary,
    fontSize  : '14px',
    fontWeight: 500
}));

const Description = styled('span')(({ theme }) => ({
    color   : theme.palette.semantic.text.disabled,
    fontSize: '14px'
}));

export default function AciHistory() {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="column"
            overflow="hidden"
        >
            <Stack
                direction="row"
                alignItems="center"
                gap={2}
                sx={{
                    paddingBottom: '8px',
                    borderBottom : ({ palette }) => `1px solid ${palette.semantic.border.secondary}`
                }}
            >
                <ArticleHeader
                    title={t(
                        'modals:manifests.details.tabs.border_connect.info.titles.aci_history'
                    )}
                    Icon={<Icons.AciHistory />}
                />

                <CountBadge count={1} />
            </Stack>

            <Stack
                direction="column"
                overflow="auto"
                gap={4}
                paddingTop={5}
                sx={(theme) => ({
                    ...getScrollBarStyles(theme)
                })}
            >
                <Stack direction="column">
                    <TimeMarker>20 min ago</TimeMarker>
                    <Text>
                        Trip and 1 Shipment <Description> started by</Description> Kirill Kuts
                    </Text>
                </Stack>

                <Stack direction="column">
                    <TimeMarker>20 min ago</TimeMarker>
                    <Text>
                        Trip and 1 Shipment <Description> started by</Description> Kirill Kuts
                    </Text>
                </Stack>

                <Stack direction="column">
                    <TimeMarker>20 min ago</TimeMarker>
                    <Text>
                        Trip and 1 Shipment <Description> started by</Description> Kirill Kuts
                    </Text>
                </Stack>

                <Stack direction="column">
                    <TimeMarker>20 min ago</TimeMarker>
                    <Text>
                        Trip and 1 Shipment <Description> started by</Description> Kirill Kuts
                    </Text>
                </Stack>
                <Stack direction="column">
                    <TimeMarker>20 min ago</TimeMarker>
                    <Text>
                        Trip and 1 Shipment <Description> started by</Description> Kirill Kuts
                    </Text>
                </Stack>
                <Stack direction="column">
                    <TimeMarker>20 min ago</TimeMarker>
                    <Text>
                        Trip and 1 Shipment <Description> started by</Description> Kirill Kuts
                    </Text>
                </Stack>
            </Stack>
        </Stack>
    );
}
