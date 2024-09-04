import DialogComponents from '@/@core/ui-kits/common-dialog';
import NumericInput from '@/@core/fields/inputs/NumericInput';
import { TestIDs } from '@/configs/tests';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack, Typography } from '@mui/material';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { useFMCSABrokers } from '@/store/streams/brokers';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { Control, UseFormClearErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { isEqual } from 'lodash';
import type { DefaultValues } from './create-broker-utils';

type Props = {
    control: Control<DefaultValues>;
    watch: UseFormWatch<DefaultValues>;
    setValue: UseFormSetValue<DefaultValues>;
    clearErrors: UseFormClearErrors<DefaultValues>;
};

function BrokerMc({
    control,
    watch,
    setValue,
    clearErrors
}: Props) {
    const { t } = useAppTranslation();
    const [searchValue, setSearchValue] = useState(0);
    const [isInfoMessageShown, setIsInfoMessageShown] = useState(false);

    const {
        data: fmcsa_brokers,
        isFetching: isFMCSABrokersFetching
    } = useFMCSABrokers({
        search: `${searchValue}`,
        skip  : !searchValue
    });

    const changeBrokerMc = useCallback(
        (value: number) => {
            if (!fmcsa_brokers || isFMCSABrokersFetching) return;
            const broker = fmcsa_brokers?.find((b) => b.mc === value);

            if (!broker) {
                setValue('name', '');
                setValue('phoneNumber', '');
                setValue('email', '');
                setValue('address', '');
                setIsInfoMessageShown(true);
            } else {
                setValue('name', broker.name);
                setValue('phoneNumber', broker.phone);
                setValue('email', broker.email);
                setValue('address', broker.address);
                clearErrors('email');
                clearErrors('address');
                setIsInfoMessageShown(false);
            }
        },
        [clearErrors, fmcsa_brokers, isFMCSABrokersFetching, setValue]
    );

    const debouncedValue = useMemo(() => debounce((value) => setSearchValue(value.mc), 800), []);

    useEffect(() => {
        const subscription = watch((value) => {
            setIsInfoMessageShown(false);
            debouncedValue(value);
        });
        return () => subscription.unsubscribe();
    }, [debouncedValue, watch]);

    useEffect(() => {
        if (searchValue) {
            changeBrokerMc(searchValue);
        }
    }, [changeBrokerMc, searchValue]);

    return (
        <DialogComponents.Field xs={12}>
            <NumericInput
                control={control}
                name="mc"
                label="fields:mc.label"
                placeholder="fields:mc.placeholder"
                testID={TestIDs.pages.brokerDialog.fields.mc}
                allowNegative={false}
                decimalScale={0}
                step={1}
                autoFocus
                endAdornment={isFMCSABrokersFetching ? <CircularProgress size="20px" /> : undefined}
            />

            {isInfoMessageShown && (
                <Stack
                    direction="row"
                    alignItems="center"
                    gap="4px"
                    padding="3px 12px"
                    border="1px solid"
                    borderColor="semantic.foreground.brand.tertiary"
                    borderRadius="4px"
                    marginTop="10px"
                >
                    <InfoSharpIcon
                        sx={{
                            fontSize: '16px',
                            color   : 'semantic.foreground.brand.primary'
                        }}
                    />

                    <Typography
                        variant="body2"
                        fontSize="12px"
                        fontWeight={500}
                        color="semantic.text.brand.primary"
                    >
                        {t('modals:brokers.add.broker_not_found')}
                    </Typography>
                </Stack>
            )}
        </DialogComponents.Field>
    );
}

export default memo(BrokerMc, isEqual);
