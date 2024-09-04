import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';

type Props = {
    truck: TruckModel_Truck;
};

export default function OptionName({ truck }: Props) {
    const drivers = useDriversMap();
    const driverId = truck.drivers.find((dr) => dr.primary)?.driverId || '';
    const driver = drivers[driverId];
    const { t } = useAppTranslation('modals');
    return (
        <Stack direction="column">
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                width="100%"
            >
                <Typography variant="body1">#{truck.referenceId}</Typography>

                <Divider
                    orientation="vertical"
                    sx={{
                        margin    : 0,
                        height    : '12px',
                        width     : '2px',
                        background: (theme) => theme.palette.semantic.text.primary
                    }}
                />

                <Typography
                    variant="body1"
                    fontWeight={500}
                    lineHeight="20px"
                >
                    {driver
                        ? `${driver.firstName} ${driver.lastName}`
                        : t('settings.integrations.vehicles.menu.assign.option_name.empty_driver')}
                </Typography>
            </Stack>
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
            >
                <Typography variant="body2">{truck.year}</Typography>
                <Typography variant="body2">
                    {truck.model.charAt(0).toUpperCase() + truck.model.slice(1)}
                </Typography>
                <Typography variant="body2">
                    {truck.make.charAt(0).toUpperCase() + truck.make.slice(1)}
                </Typography>
            </Stack>
        </Stack>
    );
}
