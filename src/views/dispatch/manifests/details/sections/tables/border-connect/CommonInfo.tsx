import React from 'react';
import { Stack, Typography, styled } from '@mui/material';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Styled from './styled';
import Icons from './icons';

const PreparedBadge = styled(Badge)({
    justifyContent: 'flex-start',
    maxWidth      : 'max-content',
    fontWeight    : 500,
    fontSize      : '14px'
});

export default function CommonInfo() {
    const { t } = useAppTranslation();
    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                gap={5}
            >
                <Stack
                    flex="1 1 0"
                    gap={2}
                >
                    <Styled.Icon>
                        <Icons.TripNumber color="primary" />
                    </Styled.Icon>
                    <Styled.Text
                        fontWeight={600}
                        fontSize="18px"
                        textTransform="uppercase"
                    >
                        {t('modals:manifests.details.tabs.border_connect.info.titles.trip_number')}
                    </Styled.Text>
                    <PreparedBadge variant="outlined">156436790078</PreparedBadge>
                </Stack>

                <Stack
                    flex="1 1 0"
                    gap={2}
                >
                    <Styled.Icon>
                        <Icons.Status />
                    </Styled.Icon>
                    <Styled.Text
                        fontWeight={600}
                        fontSize="18px"
                        textTransform="uppercase"
                    >
                        {t('common:status')}
                    </Styled.Text>
                    <PreparedBadge variant="filled">Arrival Reported at Border</PreparedBadge>
                </Stack>

                <Stack
                    flex="1 1 0"
                    gap={2}
                >
                    <Styled.Icon>
                        <Icons.Created color="primary" />
                    </Styled.Icon>
                    <Styled.Text
                        fontWeight={600}
                        fontSize="18px"
                        textTransform="uppercase"
                    >
                        {t('common:created')}
                    </Styled.Text>
                    <PreparedBadge variant="outlined">123</PreparedBadge>
                </Stack>
            </Stack>
            <Stack
                direction="row"
                alignItems="center"
                gap={5}
            >
                <Stack
                    flex="1 1 0"
                    gap={2}
                >
                    <Styled.Icon>
                        <Icons.EstimatedArrDate />
                    </Styled.Icon>
                    <Styled.Text
                        fontWeight={600}
                        fontSize="18px"
                        textTransform="uppercase"
                    >
                        {t(
                            'modals:manifests.details.tabs.border_connect.info.titles.estimated_arrival_date'
                        )}
                    </Styled.Text>
                    <PreparedBadge variant="outlined">May 19, 2024 16:00 EST</PreparedBadge>
                </Stack>

                <Stack
                    flex="1 1 0"
                    gap={2}
                >
                    <Styled.Icon>
                        <Icons.Fax />
                    </Styled.Icon>
                    <Styled.Text
                        fontWeight={600}
                        fontSize="18px"
                        textTransform="uppercase"
                    >
                        {t('modals:manifests.details.tabs.border_connect.info.titles.fax_billable')}
                        ?
                    </Styled.Text>
                    <PreparedBadge variant="outlined">No</PreparedBadge>
                </Stack>

                <Stack
                    flex="1 1 0"
                    gap={2}
                >
                    <Styled.Icon>
                        <Icons.LastEdited />
                    </Styled.Icon>
                    <Styled.Text
                        fontWeight={600}
                        fontSize="18px"
                        textTransform="uppercase"
                    >
                        {t('modals:manifests.details.tabs.border_connect.info.titles.last_edited')}
                    </Styled.Text>
                    <PreparedBadge variant="outlined">May 18, 2024 20:00</PreparedBadge>
                </Stack>
            </Stack>
        </>
    );
}
