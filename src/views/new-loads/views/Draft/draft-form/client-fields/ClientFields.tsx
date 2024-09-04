import React from 'react';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { DraftsActions } from '@/store/drafts/slice';
import CommonRadioGroups from '@/@core/ui-kits/basic/common-radio-groups/CommonRadioGroups';
import { LOAD_CLIENT_RADIO_GROUP_CONFIG } from '@/configs/load-client-radio-groups-config';
import { DraftsLoadOwnerSelector } from '@/store/drafts/selectors';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Step1Icon from '../../../../icons/Step1Icon';
import { StepContainer, StepTitle } from '../../styled';
import ClientSelectGroup from './ClientSelectGroup';
import { useDraftFormContext } from '../../Draft';

const ClientFields = () => {
    const loadOwner = useAppSelector(DraftsLoadOwnerSelector);
    const { t } = useAppTranslation();

    const dispatch = useAppDispatch();

    const { setValue } = useDraftFormContext();

    return (
        <StepContainer>
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <StepTitle>
                    <Step1Icon />
                    {t('new_loads:draft.form.steps.1')}
                </StepTitle>
                <CommonRadioGroups
                    radioValue={loadOwner === 'broker' ? 'broker_id' : 'customer_id'}
                    setRadioValue={(value) => {
                        // setRadioValue(value);
                        if (value === 'broker_id') setValue('customerId', '');
                        else setValue('brokerId', '');
                        dispatch(
                            DraftsActions.SetLoadOwner(
                                value === 'broker_id' ? 'broker' : 'customer'
                            )
                        );
                    }}
                    config={LOAD_CLIENT_RADIO_GROUP_CONFIG}
                />
            </Stack>
            <Grid
                container
                spacing={4}
                marginTop="8px"
            >
                <ClientSelectGroup
                    radioGroupValue={loadOwner === 'broker' ? 'broker_id' : 'customer_id'}
                />
            </Grid>
        </StepContainer>
    );
};

export default ClientFields;
