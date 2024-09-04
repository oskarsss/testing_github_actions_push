import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';

const Container = styled(Stack)(({ theme }) => ({
    borderRadius   : '8px',
    flexDirection  : 'column',
    width          : '50%',
    border         : `1px solid ${theme.palette.semantic.border.secondary}`,
    backgroundColor: theme.palette.semantic.background.white
}));

const FirstRowContainer = styled(Stack)(({ theme }) => ({
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems    : 'center',
    overflow      : 'hidden',
    gap           : '4px',
    padding       : '0 24px',
    height        : '52px',
    borderBottom  : `1px solid ${theme.palette.semantic.border.secondary}`
}));

const IconWrap = styled('div')({
    flexShrink: 0,
    minWidth  : '34px'
});

const FirstRowTitle = ({ title }: { title: IntlMessageKey }) => {
    const { t } = useAppTranslation();
    return (
        <Typography
            variant="body1"
            textTransform="uppercase"
            fontWeight={500}
        >
            {t(title)}
        </Typography>
    );
};

const EmptyState = ({ title }: { title: IntlMessageKey }) => {
    const { t } = useAppTranslation();
    return (
        <Typography
            variant="body1"
            color="text.secondary"
            fontSize="14px"
            textAlign="center"
            width="100%"
            fontWeight={400}
        >
            {t(title)}
        </Typography>
    );
};

const SecondRowContainer = styled(FirstRowContainer)({
    height      : '64px',
    borderBottom: 'none'
});

const SecondRowWrap = styled(Stack)({
    flexDirection: 'row',
    alignItems   : 'center',
    gap          : '12px'
});

const CardComponents = {
    Container,
    FirstRow: {
        Container: FirstRowContainer,
        Title    : FirstRowTitle
    },
    SecondRow: {
        Container: SecondRowContainer,
        Wrap     : SecondRowWrap,
        IconWrap,
        EmptyState
    }
};

export default CardComponents;
