import { Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey, IntlOptions } from '@/@types/next-intl';

const TitleWrapper = styled('div')(({ theme }) => ({
    display   : 'flex',
    alignItems: 'center',
    gap       : '10px',
    svg       : {
        width : 30,
        height: 30,
        fill  : theme.palette.semantic.foreground.primary
    }
}));

type Props = {
    Icon: ReactNode;
    title: IntlMessageKey;
    translateOptions?: IntlOptions;
    maxWidth?: number;
};

/**
 * is a Title has text and icon.
 */
export default function HeaderTitle({
    Icon,
    title,
    translateOptions,
    maxWidth = 160
}: Props) {
    const { t } = useAppTranslation();

    return (
        <Fade in>
            <TitleWrapper>
                {Icon}
                <Typography
                    fontSize="20px"
                    lineHeight="24px"
                    fontWeight={700}
                    minWidth={maxWidth}
                    maxWidth={maxWidth}
                >
                    {t(title, translateOptions)}
                </Typography>
            </TitleWrapper>
        </Fade>
    );
}
