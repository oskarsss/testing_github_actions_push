import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LeftStyled from '@/views/fleet/drivers/Details/components/Left/styled';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    fuel_discounts_enabled: boolean;
    icon: ReactNode;
};

export default function Fuel({
    fuel_discounts_enabled,
    icon
}: Props) {
    const { t } = useAppTranslation();
    return (
        <LeftStyled.IconBlock>
            <Box>
                {icon}
                <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                >
                    {t('trucks:profile.left.info.fuel.title')}
                </Typography>
            </Box>

            <LeftStyled.FuelDiscount>
                {fuel_discounts_enabled ? (
                    <VectorIcons.LoadIcons.CircleCheck />
                ) : (
                    <VectorIcons.LoadIcons.CircleCross />
                )}
                <Typography variant="body2">
                    {t(
                        `trucks:profile.left.info.fuel.${
                            fuel_discounts_enabled ? 'enabled' : 'disabled'
                        }`
                    )}
                </Typography>
            </LeftStyled.FuelDiscount>
        </LeftStyled.IconBlock>
    );
}
