import { useWatch } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import { memo } from 'react';
import { TestIDs, applyTestId } from '@/configs/tests';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import MilesFormat from '../components/InputFormat/MilesFormat';
import ChangeFieldInput from '../components/InputFormat/ChangeFieldInput';
import { useDraftFormContext } from '../../Draft';

type Props = {
    time: string;
    stopsLength: number;
};

function StopsOverview({
    time,
    stopsLength
}: Props) {
    const { control } = useDraftFormContext();
    const { t } = useAppTranslation();

    const emptyMilesValue = useWatch({ name: 'emptyMiles', control });
    const loadedMilesValue = useWatch({ name: 'loadedMiles', control });

    return (
        <Grid
            container
            marginTop="24px"
            spacing={2}
            style={{ padding: '0 1rem', width: '100%' }}
        >
            <Grid
                item
                xs={2}
            >
                <TextField
                    label={t('entity:stops')}
                    value={stopsLength || ''}
                    variant="standard"
                    focused={false}
                    style={{ width: '100%' }}
                    InputProps={{
                        readOnly        : true,
                        disableUnderline: true,
                        inputProps      : {
                            ...applyTestId(TestIDs.pages.createLoad.fields.stops)
                        }
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </Grid>
            <Grid
                item
                xs={2}
            >
                <TextField
                    label={t('common:miles')}
                    value={emptyMilesValue + loadedMilesValue}
                    variant="standard"
                    focused={false}
                    style={{ width: '100%' }}
                    InputProps={{
                        readOnly        : true,
                        inputComponent  : MilesFormat as never,
                        disableUnderline: true,
                        inputProps      : {
                            ...applyTestId(TestIDs.pages.createLoad.fields.miles)
                        }
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </Grid>
            <Grid
                item
                xs={2}
            >
                <ChangeFieldInput
                    name="emptyMiles"
                    label="new_loads:draft.form.fields.empty_miles.label"
                    testID={TestIDs.pages.createLoad.fields.emptyMiles}

                    // key={emptyMilesValue}

                    // value={emptyMilesValue}
                />
            </Grid>
            <Grid
                item
                xs={2}
            >
                <ChangeFieldInput
                    required
                    name="loadedMiles"
                    label="new_loads:draft.form.fields.loaded_miles.label"
                    testID={TestIDs.pages.createLoad.fields.loadedMiles}

                    // key={loadedMilesValue}

                    // value={loadedMilesValue}
                />
            </Grid>
            <Grid
                item
                xs={4}
            >
                <TextField
                    label={t('new_loads:draft.form.fields.time.label')}
                    value={time}
                    variant="standard"
                    focused={false}
                    style={{ width: '100%' }}
                    InputProps={{
                        readOnly        : true,
                        disableUnderline: true,
                        inputProps      : {
                            ...applyTestId(TestIDs.pages.createLoad.fields.time)
                        }
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default memo(StopsOverview);
