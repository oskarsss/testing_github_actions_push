import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import AddIcon from '@mui/icons-material/Add';
import { applyTestId } from '@/configs/tests';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import DriverPartner from './DriverPartner';

type Props = {
    id: string;
    drivers: string[];
    onRemove: (config: { truckId: string; driverId: string }) => Promise<unknown>;
    onSelect: (isPrimaryDriverSelect: boolean) => void;
    testOptions?: Record<string, string | undefined>;
};

const DriverPartners = ({
    id,
    drivers,
    onSelect,
    onRemove,
    testOptions = {
        assignTestId: '',
        removeTestId: ''
    }
}: Props) => {
    const { t } = useAppTranslation();

    return (
        <RightStyled.IconBlock>
            <Box>
                <Typography>{t('trucks:profile.right.drivers.title')}</Typography>

                <Button
                    onClick={() => onSelect(false)}
                    startIcon={<AddIcon />}
                    {...applyTestId(testOptions.assignTestId)}
                >
                    {t('common:button.assign')}
                </Button>
            </Box>
            {id && drivers.length > 0 ? (
                drivers.map((driverId) => (
                    <DriverPartner
                        key={driverId}
                        id={id}
                        partner_id={driverId}
                        onRemove={onRemove}
                        removeBtnTestId={testOptions.removeTestId}
                    />
                ))
            ) : (
                <RightStyled.EmptyElement variant="body2">
                    {t('trucks:profile.right.drivers.no_drivers')}
                </RightStyled.EmptyElement>
            )}
        </RightStyled.IconBlock>
    );
};

export default memo(DriverPartners);
