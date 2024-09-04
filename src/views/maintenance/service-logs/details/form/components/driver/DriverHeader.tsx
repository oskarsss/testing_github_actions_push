import { memo } from 'react';
import { Grid, Stack, Button, Typography } from '@mui/material';
import FullDialog from '@/@core/ui-kits/full-dialog';
import VectorIcons from '@/@core/icons/vector_icons';
import AddIcon from '@mui/icons-material/Add';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

type Props = {
    driverId: string;
};

function DriverHeader({ driverId }: Props) {
    const { t } = useAppTranslation();

    return (
        <Grid
            item
            container
            direction="row"
            alignItems="center"
            xs={12}
            justifyContent="space-between"
        >
            <Stack
                direction="row"
                alignItems="center"
                gap="15px"
            >
                <VectorIcons.Maintenance.Driver
                    sx={{
                        fontSize: '32px',

                        fill: ({ palette }) => palette.semantic.foreground.brand.primary
                    }}
                />

                <Typography
                    variant="h6"
                    fontWeight={600}
                >
                    {t('entity:driver')}
                </Typography>

                {driverId && (
                    <FormControlLabel
                        control={(
                            <Checkbox
                                onChange={(event) => {}}
                                disabled
                                checked={false}
                            />
                        )}
                        label={t('maintenance:service_logs.common.checkboxes.charge_driver')}
                        sx={{
                            margin                 : 0,
                            gap                    : '6px',
                            alignItems             : 'center',
                            '& .MuiButtonBase-root': {
                                svg: {
                                    height: '14px',
                                    width : '14px'
                                }
                            },
                            '& .MuiTypography-root': {
                                fontSize: '11px'
                            }
                        }}
                    />
                )}
            </Stack>

            {/* // TODO: uncomment this after creating endpoint for it */}
            {/* <Button */}
            {/*     color="primary" */}
            {/*     startIcon={driverId ? <CloseSharpIcon /> : <AddIcon />} */}
            {/* > */}
            {/*     {t(`maintenance:service_logs.common.buttons.${driverId ?
             'unassign_driver' : 'assign_driver'}`)} */}
            {/* </Button> */}
        </Grid>
    );
}

export default memo(DriverHeader);
