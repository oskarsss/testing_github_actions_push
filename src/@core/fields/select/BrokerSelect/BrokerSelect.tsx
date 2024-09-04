/* eslint-disable react/jsx-no-duplicate-props */
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { useActiveBrokers } from '@/store/dispatch/brokers/hooks';
import {
    CSSProperties,
    HTMLAttributes,
    SyntheticEvent,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { useCreateBrokerDialog } from '@/views/dispatch/brokers/dialogs/create-broker/CreateBroker';
import { NoOptionsText } from '@/@core/fields/select/components/CustomAutocomplete';
import BrokersTypes from '@/store/dispatch/brokers/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { applyTestId, TestKey } from '@/configs/tests';
import {
    AutocompleteRenderInputParams,
    AutocompleteRenderOptionState
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { Autocomplete, Popper } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import BrokerSelectOption, { Option } from '@/@core/fields/select/BrokerSelect/BrokerSelectOption';
import { useFMCSABrokers } from '@/store/streams/brokers';
import { BrokerGetReply_Broker, GetFMCSABrokersReply_Broker } from '@proto/brokers';
import useDebounce from '@/hooks/useDebounce';
import { useEditBrokerDialog } from '@/views/dispatch/brokers/dialogs/EditBroker/EditBroker';
import InputAdornment from '@mui/material/InputAdornment';
import createMap from '@/utils/create-map';
import CustomAutocompleteClearButton from '@/@core/fields/select/components/CustomAutocompleteClearButton';
import CustomAutocompleteAddButton from '@/@core/fields/select/components/CustomAutocompleteAddButton';

export type OptionObjects = Record<string, Option>;

export interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    width?: CSSProperties['width'];
    required?: boolean;
    inputTestID?: string;
    optionTestId?: string;
    name?: Path<TFieldValues>;
    onChangeAction?: (value: string) => void;
}

const createBrokerOption = (
    broker: BrokerGetReply_Broker | GetFMCSABrokersReply_Broker
): Option => ({
    nameAndMc  : 'nameAndMc' in broker ? broker.nameAndMc : `${broker.name} (${broker.mc})`,
    name       : broker.name || 'N/A',
    mc         : broker.mc,
    email      : broker.email,
    id         : 'brokerId' in broker ? broker.brokerId : `${broker.mc}`,
    phoneNumber: 'phoneNumber' in broker ? broker.phoneNumber : broker.phone,
    address    : 'brokerId' in broker ? broker.address : broker.addressShort,
    active     : broker.active,
    added      : 'brokerId' in broker,
    dot        : broker.dot
});

export default function BrokerSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    width = '100%',
    required = false,
    optionTestId,
    inputTestID,
    name,
    onChangeAction
}: Props<TFieldValues>) {
    const { t } = useAppTranslation();
    const {
        brokers,
        isLoading
    } = useActiveBrokers();
    const createBrokerMenu = useCreateBrokerDialog();
    const editBrokerDialog = useEditBrokerDialog();
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue.replace('N/A ', ''), 500);

    const [brokersMapById, brokersMapByDot] = useMemo(() => {
        const brokers_object_by_dot: Record<number, BrokerGetReply_Broker> = {};
        const brokers_object_by_id: Record<string, Option> = {};
        brokers.forEach((broker) => {
            brokers_object_by_dot[broker.dot] = broker;
            brokers_object_by_id[broker.brokerId] = createBrokerOption(broker);
        });

        return [brokers_object_by_id, brokers_object_by_dot];
    }, [brokers]);

    const { data: fmcsa_brokers } = useFMCSABrokers({ search: debouncedValue });

    const {
        field: {
            value,
            onBlur,
            onChange
        },
        formState: { errors }
    } = useController({
        name: name || ('broker_id' as Path<TFieldValues>),
        control
    });

    const selectedValue = brokersMapById[value as string];

    useEffect(() => {
        if (!isLoading && brokers.length) {
            setSearchValue((prev) =>
                !prev && selectedValue?.nameAndMc
                    ? `${selectedValue.name} (${selectedValue.mc})`
                    : prev);
        }
    }, [brokersMapById, brokers, isLoading, selectedValue?.nameAndMc]);

    const all_brokers_options = useMemo(() => {
        const fmcsa_arr = searchValue
            ? fmcsa_brokers.filter((broker) => !brokersMapByDot[broker.dot])
            : [];
        return [...brokers, ...fmcsa_arr].map(createBrokerOption);
    }, [brokers, fmcsa_brokers, Boolean(searchValue), brokersMapByDot]);

    const brokers_by_id = useMemo(
        () => createMap(all_brokers_options, 'id'),
        [all_brokers_options]
    );

    const setCreatedBroker = (broker: Pick<Option, 'id' | 'name' | 'mc'>) => {
        onChange(broker.id);
        setSearchValue(`${broker.name} (${broker.mc})`);
    };

    const inputRef = useRef<HTMLInputElement>(null);
    const [entered_value, setEnteredValue] = useState<string>('');

    const onAddBroker = () => {
        inputRef.current?.blur();
        createBrokerMenu.open({
            onAdded: setCreatedBroker
        });
    };

    const renderNoOptionText = () => (
        <NoOptionsText onClick={onAddBroker}>
            <AddIcon />
            {t('core:selects.autocomplete.no_options.create.first_text')}
            {entered_value && <span>"{entered_value}"</span>}
            {t('entity:broker')}
        </NoOptionsText>
    );

    const getOptionLabel = (option: Option) => {
        if (typeof option === 'string') {
            if (option === '') {
                return '';
            }

            const broker = brokers_by_id[option];
            if (broker) {
                return broker.nameAndMc;
            }
        }
        return option.nameAndMc;
    };

    const onEditBroker = (brokerId: string) => {
        inputRef.current?.blur();
        editBrokerDialog.open({
            brokerId,
            onSuccessfulEdit: (data) => {
                if (value === brokerId) {
                    setSearchValue(`${data.name} (${data.mc})`);
                    onChange(brokerId);
                    onChangeAction?.(brokerId);
                }
            }
        });
    };

    const renderOption = (
        props: HTMLAttributes<HTMLLIElement>,
        option: Option,
        { inputValue }: AutocompleteRenderOptionState
    ) => {
        const updatedProps = { ...props, key: option.dot };
        return (
            <Box
                component="li"
                {...updatedProps}
                {...applyTestId(optionTestId)}
            >
                <BrokerSelectOption
                    {...updatedProps}
                    inputValue={inputValue}
                    option={option}
                    onEditBroker={onEditBroker}
                />
            </Box>
        );
    };

    const clearValue = () => {
        onChange('');
        setSearchValue('');
    };

    const renderInput = (params: AutocompleteRenderInputParams) => (
        <TextField
            {...params}
            inputRef={inputRef}
            required={required}
            size="small"
            variant="filled"
            InputProps={{
                ...params.InputProps,
                endAdornment: (
                    <InputAdornment
                        position="end"
                        sx={{
                            ml: 0
                        }}
                    >
                        {value && <CustomAutocompleteClearButton onClick={clearValue} />}
                        <CustomAutocompleteAddButton
                            onClick={onAddBroker}
                            label={t('entity:broker')}
                        />
                        {params.InputProps.endAdornment}
                    </InputAdornment>
                )
            }}
            inputProps={{
                ...params.inputProps,
                [TestKey]: inputTestID
            }}
            InputLabelProps={{
                shrink: true
            }}
            onChange={(e) => {
                setSearchValue(e.target.value);
            }}
            label={t('entity:broker')}
            error={Boolean(errors.broker_id)}
            onKeyDown={(e) => e.stopPropagation()}
        />
    );

    const renderError = () => (
        <FormHelperText
            error
            id="select-input-broker_id"
        >
            <span>{errors.broker_id?.message as string}</span>
        </FormHelperText>
    );

    const handleChange = (e: SyntheticEvent<Element>, data: Option | null) => {
        if (data?.added === true) {
            onChange(data ? data.id : '');
            setSearchValue(`${data.name} (${data.mc})`);
            onChangeAction?.(data.id);
        }
        if (data?.added === false) {
            createBrokerMenu.open({
                onAdded: setCreatedBroker,
                broker : data
            });
        }
        if (!data) {
            clearValue();
        }
    };

    return (
        <FormControl style={{ width }}>
            <Autocomplete
                options={all_brokers_options}
                loading={isLoading}
                multiple={false}
                getOptionLabel={(option) => getOptionLabel(option)}
                filterOptions={(options, state) => {
                    const filtered = options.filter((option) =>
                        `${option.name} (${option.mc}) ${option.address} ${option.dot} ${option.phoneNumber}`
                            .toLowerCase()
                            .includes(searchValue.toLowerCase()));
                    return filtered;
                }}
                isOptionEqualToValue={(option, value) => {
                    if (typeof option === 'string') {
                        return option === `${value.name} (${value.mc})`;
                    }
                    return option.dot === value.dot;
                }}
                ListboxProps={{
                    id: 'broker_options'
                }}
                value={selectedValue || null}
                inputValue={searchValue}
                openOnFocus
                disableClearable
                noOptionsText={renderNoOptionText()}
                renderOption={renderOption}
                renderInput={renderInput}
                onChange={handleChange}
                onBlur={onBlur}
                onInputChange={(e, value) => setEnteredValue(value)}
                PopperComponent={BrokerPopper}
            />
            {errors.broker_id && renderError()}
        </FormControl>
    );
}

function BrokerPopper(props: any) {
    return (
        <Popper
            {...props}
            style={{ width: 500 }}
            placement="bottom-start"
            data-search-id="broker_options"
        />
    );
}
