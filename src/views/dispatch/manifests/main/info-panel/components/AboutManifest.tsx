import { Stack, styled, Typography, Tooltip } from '@mui/material';
import React, { useCallback } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import openNewTab from '@/utils/openNewTab';

type Props = {
    friendlyId: number;
    amountFormatted: string;
    rpmFormatted: string;
    manifestId: string;
};

const LinkText = styled(Typography)(({ theme }) => ({
    color         : theme.palette.semantic.text.brand.primary,
    textDecoration: 'underline',
    fontSize      : '20px',
    fontWeight    : 600,
    cursor        : 'pointer',
    transition    : 'color 0.3s',
    flexShrink    : 0,

    '&:hover': {
        color: theme.palette.semantic.text.brand.secondary
    }
}));

function AboutManifest({
    amountFormatted,
    rpmFormatted,
    friendlyId,
    manifestId
}: Props) {
    const { t } = useAppTranslation();

    const handleClick = useCallback(() => {
        openNewTab(manifestId);
    }, [manifestId]);

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap="8px"
            overflow="hidden"
        >
            <Tooltip
                placement="top"
                title={t('common:tooltips.open_in_new_tab')}
            >
                <LinkText
                    onClick={handleClick}
                    variant="body1"
                >
                    {`M-${friendlyId}`}
                </LinkText>
            </Tooltip>

            <Stack
                direction="row"
                alignItems="center"
                gap="4px"
                overflow="hidden"
            >
                <Badge
                    variant="outlined"
                    size="medium"
                >
                    {`${t('common:gross')}:`}
                    <Typography
                        noWrap
                        component="span"
                        fontSize="inherit"
                        fontWeight="inherit"
                        color={(theme) => theme.palette.semantic.text.primary}
                    >
                        {amountFormatted || '-'}
                    </Typography>
                </Badge>
                <Badge
                    variant="outlined"
                    size="medium"
                >
                    {`${t('common:rpm')}:`}
                    <Typography
                        noWrap
                        component="span"
                        fontSize="inherit"
                        fontWeight="inherit"
                        color={(theme) => theme.palette.semantic.text.primary}
                    >
                        {rpmFormatted || '-'}
                    </Typography>
                </Badge>
            </Stack>
        </Stack>
    );
}

export default React.memo(AboutManifest);
