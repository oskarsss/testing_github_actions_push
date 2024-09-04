import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { applyTestId, TestIDs } from '@/configs/tests';
import DriverPartner from '@/views/fleet/trucks/Details/components/Right/components/DriverPartners/DriverPartner';
import type TrucksTypes from '@/store/fleet/trucks/types';
import { memo } from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    id: string;
    primaryDriverId: string;
    onRemove: (config: { truckId: string; driverId: string }) => Promise<unknown>;
    onSelect: (isPrimaryDriverSelect: boolean) => void;
};

const PrimaryDriverPartner = ({
    id,
    primaryDriverId,
    onSelect,
    onRemove
}: Props) => {
    const { t } = useAppTranslation();
    const { palette } = useTheme();
    return (
        <RightStyled.IconBlock>
            <Box>
                <Typography>{t('trucks:profile.right.primary_driver.title')}</Typography>

                {!primaryDriverId ? (
                    <Button
                        onClick={() => onSelect(true)}
                        startIcon={<AddIcon />}
                        {...applyTestId(TestIDs.pages.truckProfile.buttons.assignDriver)}
                    >
                        {t('common:button.assign')}
                    </Button>
                ) : (
                    <Button
                        onClick={() => onSelect(true)}
                        startIcon={(
                            <VectorIcons.LoadIcons.Switch
                                style={{ fill: palette.semantic.foreground.brand.primary }}
                            />
                        )}
                    >
                        {t('common:button.change')}
                    </Button>
                )}
            </Box>
            {id && primaryDriverId ? (
                <DriverPartner
                    id={id}
                    partner_id={primaryDriverId}
                    onRemove={onRemove}
                    removeBtnTestId={TestIDs.pages.truckProfile.buttons.removeDriver}
                    is_primary
                />
            ) : (
                <RightStyled.EmptyElement variant="body2">
                    {t('trucks:profile.right.primary_driver.no_drivers')}
                </RightStyled.EmptyElement>
            )}
        </RightStyled.IconBlock>
    );
};

export default memo(PrimaryDriverPartner);
