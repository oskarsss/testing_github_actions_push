import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LeftStyled from '@/views/fleet/drivers/Details/components/Left/styled';
import CopyText from '@/@core/components/copy-text/CopyText';
import { IntlMessageKey, TFunction } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    icon?: ReactNode;
    title: IntlMessageKey;
    variant?: 'inherit' | 'body1' | 'body2' | 'subtitle1' | 'subtitle2' | 'caption';
    isCopy?: boolean;
    text: string | number | ReturnType<TFunction>;
};

export default function Item({
    icon,
    title,
    variant = 'body2',
    isCopy = false,
    text
}: Props) {
    const { t } = useAppTranslation();

    return isCopy ? (
        <CopyText text={text}>
            <LeftStyled.IconBlock>
                <Box>
                    {icon}
                    <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                    >
                        {t(title)}
                    </Typography>
                </Box>
                <Typography variant={variant}>{text}</Typography>
            </LeftStyled.IconBlock>
        </CopyText>
    ) : (
        <LeftStyled.IconBlock>
            <Box>
                {icon}
                <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                >
                    {t(title)}
                </Typography>
            </Box>
            <Typography variant={variant}>{text}</Typography>
        </LeftStyled.IconBlock>
    );
}
