/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Stack, styled, Typography, useTheme } from '@mui/material';
import React, { MouseEvent, ReactElement } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey, IntlOptions } from '@/@types/next-intl';

const NotFoundWrapper = styled('div')({
    width         : '100%',
    height        : '100%',
    display       : 'flex',
    flexDirection : 'column',
    alignItems    : 'center',
    justifyContent: 'center',

    position: 'absolute',
    top     : 0,
    left    : 0,
    right   : 0,
    bottom  : 0
});

const FontSize = {
    small: {
        firstText : '16px',
        secondText: '12px'
    },
    medium: {
        firstText : '20px',
        secondText: '14px'
    },
    large: {
        firstText : '24px',
        secondText: '16px'
    }
};

export type FallbackCreateClickAction = (event: MouseEvent<HTMLSpanElement>) => void;

type Props = {
    onClick?: FallbackCreateClickAction;
    icon?: React.ReactNode;
    firstText: ReactElement | IntlMessageKey;
    secondText?: ReactElement | IntlMessageKey;
    buttonText?: IntlMessageKey;
    textAfterButton?: IntlMessageKey;
    styles?: React.CSSProperties;
    size?: 'small' | 'medium' | 'large';
    translateOptions?: {
        firstText?: IntlOptions;
        secondText?: IntlOptions;
    };
};

export default function FallbackContent({
    onClick,
    buttonText,
    textAfterButton,
    firstText,
    secondText,
    icon,
    styles = {},
    size = 'large',
    translateOptions
}: Props) {
    const { t } = useAppTranslation();
    const theme = useTheme();

    const isFirstTextString = typeof firstText === 'string';
    const isSecondTextString = secondText && typeof secondText === 'string';

    return (
        <NotFoundWrapper style={styles}>
            {icon}
            <Stack direction="column">
                <Typography
                    variant="body1"
                    fontSize={FontSize[size].firstText}
                    textAlign="center"
                    fontWeight={600}
                >
                    {isFirstTextString ? t(firstText, translateOptions?.firstText) : firstText}
                    {buttonText && (
                        <span
                            onClick={onClick}
                            style={{
                                color : theme.palette.semantic.text.brand.primary,
                                cursor: 'pointer'
                            }}
                        >
                            {` ${t(buttonText)} `}
                        </span>
                    )}
                    {textAfterButton && t(textAfterButton)}
                </Typography>
                <Typography
                    variant="body2"
                    fontSize={FontSize[size].secondText}
                    textAlign="center"
                    fontWeight={400}
                >
                    {isSecondTextString ? t(secondText, translateOptions?.secondText) : secondText}
                </Typography>
            </Stack>
        </NotFoundWrapper>
    );
}
