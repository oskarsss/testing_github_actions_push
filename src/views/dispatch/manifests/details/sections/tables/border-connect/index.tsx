import { Stack, Button, styled } from '@mui/material';
import React from 'react';
import { DriverIcon, TrailerIcon, TrucksIcon } from '@/@core/icons/custom-nav-icons/icons';
import VectorIcons from '@/@core/icons/vector_icons';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ArticleHeader from './component/ArticleHeader';
import Icons from './icons';
import CommonInfo from './CommonInfo';
import Styled from './styled';
import AciHistory from './AciHistory';
import ManifestStopsTableActionsStyled from '../stops/actions/styled';

type Props = {
    manifestId: string;
};

const IconWrapper = styled('div')(({ theme }) => ({
    display   : 'flex',
    alignItems: 'center',
    svg       : {
        width : '24px !important',
        height: '24px !important',
        fill  : theme.palette.semantic.foreground.brand.primary
    }
}));

export default function BorderConnect({ manifestId }: Props) {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="column"
            padding="16px"
            overflow="hidden"
            gap="16px"
        >
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <ArticleHeader
                    Icon={<Icons.BorderConnect color="primary" />}
                    title={t('modals:manifests.details.tabs.titles.border_connect')}
                />
                <ManifestStopsTableActionsStyled.Button variant="contained">
                    {t('modals:manifests.details.tabs.border_connect.buttons.sync_with_cbsa')}
                </ManifestStopsTableActionsStyled.Button>
            </Stack>
            <Stack
                direction="row"
                gap="12px"
            >
                <Styled.ArticleWrapper
                    flex="1.3 1 0"
                    gap={5}
                    maxHeight="260px"
                >
                    <CommonInfo />
                </Styled.ArticleWrapper>
                <Styled.ArticleWrapper
                    maxHeight="260px"
                    overflow="hidden"
                    flex="1 1 0"
                >
                    <AciHistory />
                </Styled.ArticleWrapper>
            </Stack>

            <Styled.ArticleWrapper
                flex="1 1 0"
                gap={5}
                maxHeight="260px"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <ArticleHeader
                        title={t('entity:trucks')}
                        Icon={(
                            <IconWrapper>
                                <TrucksIcon />
                            </IconWrapper>
                        )}
                    />

                    <Stack
                        direction="row"
                        gap={2}
                    >
                        <ManifestStopsTableActionsStyled.Button
                            startIcon={<SwapHorizIcon />}
                            variant="text"
                        >
                            {t('common:button.change')}
                        </ManifestStopsTableActionsStyled.Button>
                        <ManifestStopsTableActionsStyled.Button
                            startIcon={<CloseIcon />}
                            variant="text"
                        >
                            {t('common:button.unassign')}
                        </ManifestStopsTableActionsStyled.Button>
                    </Stack>
                </Stack>
            </Styled.ArticleWrapper>

            <Styled.ArticleWrapper
                flex="1 1 0"
                gap={5}
                maxHeight="260px"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <ArticleHeader
                        title={t('entity:trailers')}
                        Icon={(
                            <IconWrapper>
                                <TrailerIcon />
                            </IconWrapper>
                        )}
                    />
                    <ManifestStopsTableActionsStyled.Button
                        startIcon={<AddIcon />}
                        variant="text"
                    >
                        {t('common:actions.add_trailer')}
                    </ManifestStopsTableActionsStyled.Button>
                </Stack>
            </Styled.ArticleWrapper>

            <Styled.ArticleWrapper
                flex="1 1 0"
                gap={5}
                maxHeight="260px"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <ArticleHeader
                        title={t('entity:drivers')}
                        Icon={(
                            <IconWrapper>
                                <DriverIcon />
                            </IconWrapper>
                        )}
                    />

                    <ManifestStopsTableActionsStyled.Button
                        variant="text"
                        startIcon={<AddIcon />}
                    >
                        {t('common:actions.add_driver')}
                    </ManifestStopsTableActionsStyled.Button>
                </Stack>
            </Styled.ArticleWrapper>

            <Styled.ArticleWrapper
                flex="1 1 0"
                gap={5}
                maxHeight="260px"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <ArticleHeader
                        title={t('entity:commodity')}
                        Icon={<VectorIcons.FullDialogIcons.Commodity />}
                    />
                    <Stack
                        direction="row"
                        gap={2}
                    >
                        <ManifestStopsTableActionsStyled.Button
                            startIcon={<SendIcon />}
                            variant="text"
                        >
                            {t('modals:manifests.details.tabs.border_connect.buttons.send_to_cbsa')}
                        </ManifestStopsTableActionsStyled.Button>
                        <ManifestStopsTableActionsStyled.Button
                            variant="text"
                            startIcon={<AddIcon />}
                        >
                            {t('common:actions.add_commodity')}
                        </ManifestStopsTableActionsStyled.Button>
                    </Stack>
                </Stack>
            </Styled.ArticleWrapper>
        </Stack>
    );
}
