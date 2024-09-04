import { IntlMessageKey } from '@/@types/next-intl';
import { Box, styled, Typography } from '@mui/material';
import { TFunction } from 'i18next';
import React, { ReactNode } from 'react';
import CopyText from '@/@core/components/copy-text/CopyText';

type Props = {
    icon?: ReactNode;
    title: string;
    variant?: 'inherit' | 'body1' | 'body2' | 'subtitle1' | 'subtitle2' | 'caption';
    text: string | number | ReturnType<TFunction>;
    isCopy?: boolean;
};

const IconBlock = styled('div')(({ theme }) => ({
    width         : '100%',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : 16,
    padding       : '12px 24px',
    borderBottom  : `1px solid ${theme.palette.semantic.border.secondary}`,
    '.MuiBox-root': {
        width     : 'fit-content',
        display   : 'flex',
        alignItems: 'center',
        gap       : 10,
        svg       : {
            width : 19,
            height: 19,
            fill  : theme.palette.semantic.foreground.primary
        }
    },
    '.MuiTypography-root': {
        width: 'fit-content'
    },
    '.MuiTypography-body1': {
        fontSize  : 16,
        textAlign : 'right',
        color     : '#285FF6',
        fontWeight: 700
    },
    '.MuiTypography-body2': {
        fontSize : 16,
        textAlign: 'right',
        color    : theme.palette.semantic.text.primary
    },
    '.MuiFormGroup-root': {
        '.MuiFormControlLabel-root': {
            '.MuiTypography-body1': {
                fontWeight: 400,
                color     : theme.palette.semantic.text.primary
            }
        }
    }
}));

export default function InfoItem({
    icon,
    title,
    variant = 'body2',
    text,
    isCopy = false
}: Props) {
    if (isCopy && text) {
        return (
            <CopyText text={text}>
                <IconBlock>
                    <Box>
                        {icon}
                        <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                        >
                            {title}
                        </Typography>
                    </Box>
                    <Typography variant={variant}>{text}</Typography>
                </IconBlock>
            </CopyText>
        );
    }

    return (
        <IconBlock>
            <Box>
                {icon}
                <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                >
                    {title}
                </Typography>
            </Box>
            <Typography variant={variant}>{text || '-'}</Typography>
        </IconBlock>
    );
}
