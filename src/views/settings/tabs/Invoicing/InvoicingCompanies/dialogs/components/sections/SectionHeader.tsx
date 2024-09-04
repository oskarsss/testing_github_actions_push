import { Grid, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    startIcon: ReactNode;
    title: IntlMessageKey;
};

export default function SectionHeader({
    startIcon,
    title
}: Props) {
    const { t } = useAppTranslation();
    return (
        <Grid
            item
            container
            direction="row"
            alignItems="center"
            gap="8px"
            xs={12}
        >
            {startIcon}

            <Typography
                fontSize="16px"
                fontWeight={600}
            >
                {t(title)}
            </Typography>
        </Grid>
    );
}
