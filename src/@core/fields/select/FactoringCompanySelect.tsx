import React, { useMemo, CSSProperties } from 'react';
import { Control, Controller, ErrorOption, Path, FieldValues } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { InputProps } from '@mui/material/Input/Input';
import { styled, useTheme } from '@mui/material/styles';
import { FactoringCompanyModel } from '@proto/models/model_factoring_company';
import { getPublicURL } from '@/configs/storage';
import createMap from '@/utils/create-map';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import FactoringCompaniesGrpcService from '@/@grpcServices/services/factoring-companies/factoring-companies.service';

type CompanyAvatarProps = {
    name: FactoringCompanyModel['name'];
    logo_url: FactoringCompanyModel['logoFileId'];
};
function CompanyAvatar({
    name,
    logo_url
}: CompanyAvatarProps) {
    return (
        <Avatar
            alt={name}
            sx={{
                borderRadius: logo_url ? 0 : '50%',
                margin      : '0 4px',
                img         : {
                    objectFit: 'contain'
                }
            }}
            src={getPublicURL(logo_url)}
        />
    );
}

export const TextFieldFactoringCompany = styled(TextField)<{ value?: { logoFileId: string } }>(
    ({
        variant,
        InputProps,
        value
    }) =>
        // eslint-disable-next-line no-nested-ternary
        variant === 'standard'
            ? {
                '.MuiInputBase-root': {
                    maxHeight: '32px'
                },
                '.MuiAutocomplete-inputRoot': {
                    padding: '0 !important'
                },
                '.MuiFormLabel-root': {
                    marginLeft: value?.logoFileId ? '48px' : '0'
                },
                '.MuiInputBase-input': {
                    marginTop: '-4px',
                    cursor   : InputProps?.style?.cursor
                },
                '.MuiAvatar-root': {
                    marginTop: '-24px'
                },
                '.MuiSvgIcon-root': {
                    marginTop: '-4px'
                }
            }
            : variant === 'outlined'
                ? {
                    '.MuiFormLabel-root': {
                        marginLeft: value?.logoFileId ? '48px' : '0'
                    },
                    '.MuiInputBase-root': {
                        paddingRight: '9px !important'
                    },
                    '.MuiInputBase-input': {
                        // marginTop: '-4px',
                        cursor: InputProps?.style?.cursor
                    }

                    // '.MuiAvatar-root': {
                    //     marginTop: '-24px'
                    // },
                    // '.MuiSvgIcon-root': {
                    //     marginTop: '-4px'
                    // }
                }
                : {
                    '.MuiInputBase-input': {
                        marginLeft: value?.logoFileId ? '4px' : '7px',
                        marginTop : '18px',
                        cursor    : InputProps?.style?.cursor
                    },
                    '.MuiTextField-root': {
                        padding: '5px 5px'
                    },
                    '.MuiAutocomplete-inputRoot': {
                        borderRadius: '5px',
                        padding     : '0 !important'
                    },
                    '.MuiFormLabel-root': {
                        marginLeft: value?.logoFileId ? '44px' : ''
                    }
                }
);

const defaultOption = { factoringCompanyId: '', name: 'None', logoFileId: '' };

interface IProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors?: { [P in keyof TFieldValues]?: ErrorOption };
    name: Path<TFieldValues>;
    label?: IntlMessageKey;
    width?: CSSProperties['width'];
    InputProps?: InputProps['inputProps'];
    variant?: 'standard' | 'filled' | 'outlined';
    size?: 'small' | 'medium';
    disabled?: boolean;
    readOnly?: boolean;
    disableUnderline?: boolean;
    required?: boolean;
}

export default function FactoringCompanySelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    errors,
    label = 'core:selects.factoring_company.label',
    name,
    width = '250px',
    variant = 'standard',
    size = 'medium',
    readOnly = false,
    disableUnderline = true,
    required = false
}: IProps<TFieldValues>) {
    const { t } = useAppTranslation();
    const theme = useTheme();

    const { factoringCompanies } =
        FactoringCompaniesGrpcService.endpoints.getFactoringCompanies.useQuery(
            {},
            {
                selectFromResult: (result) => ({
                    ...result,
                    factoringCompanies: result.data?.factoringCompanies || []
                })
            }
        );
    const options = useMemo(() => {
        const connected_factoring_companies = factoringCompanies
            .filter(({ deleted }) => !deleted)
            .map(({
                factoringCompanyId,
                name,
                logoFileId
            }) => ({
                factoringCompanyId,
                name,
                logoFileId
            }));

        return required
            ? connected_factoring_companies
            : [{ ...defaultOption }, ...connected_factoring_companies];
    }, [factoringCompanies, required]);

    const company_by_id = useMemo(() => createMap(options, 'factoringCompanyId'), [options]);

    return (
        <FormControl
            style={{ width }}
            variant={variant}
        >
            <Controller
                name={name}
                control={control}
                render={({ field: {
                    onChange,
                    onBlur,
                    value
                } }) => (
                    <Autocomplete
                        options={options}
                        isOptionEqualToValue={(option, val) =>
                            option.factoringCompanyId === String(val)}
                        getOptionLabel={(option) => {
                            if (typeof option === 'string' && company_by_id[option]) {
                                return company_by_id[option].name;
                            }
                            return '';
                        }}
                        value={value}
                        openOnFocus
                        readOnly={readOnly}
                        renderOption={(props, option) => (
                            <Box
                                {...props}
                                key={option.factoringCompanyId}
                                component="li"
                                sx={{
                                    display       : 'flex',
                                    alignItems    : 'center',
                                    justifyContent: 'flex-start'
                                }}
                            >
                                <CompanyAvatar
                                    name={option.name}
                                    logo_url={option.logoFileId}
                                />
                                <span
                                    style={{
                                        marginLeft: '4px',
                                        color     : theme.palette.semantic.text.secondary
                                    }}
                                >
                                    {option.name}
                                </span>
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextFieldFactoringCompany
                                {...params}
                                variant={variant}
                                required={required}
                                size={size}
                                style={{ width: '100%' }}
                                InputLabelProps={{
                                    ...params.InputLabelProps,
                                    style: { cursor: readOnly ? 'default' : 'pointer' }
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                    disableUnderline,
                                    readOnly      : true,
                                    style         : { cursor: readOnly ? 'default' : 'pointer' },
                                    startAdornment: value?.logoFileId && (
                                        <CompanyAvatar
                                            name={value.name}
                                            logo_url={value.logoFileId}
                                        />
                                    ),
                                    endAdornment: (
                                        <SwapHorizIcon
                                            fontSize="large"
                                            sx={{
                                                color: readOnly
                                                    ? 'transparent'
                                                    : theme.palette.semantic.text.secondary,
                                                borderRadius: '50%',
                                                padding     : '5px'
                                            }}
                                        />
                                    )
                                }}
                                label={t(label)}
                                error={errors && Boolean(errors[name])}
                                onKeyDown={(e) => {
                                    e.stopPropagation();
                                }}
                            />
                        )}
                        onChange={(e, data) => {
                            if (!Array.isArray(data)) {
                                onChange(
                                    data
                                        ? data.factoringCompanyId
                                        : defaultOption.factoringCompanyId
                                );
                            }
                        }}
                        onBlur={onBlur}
                    />
                )}
            />
            {errors && errors[name] && (
                <FormHelperText
                    error
                    sx={{ color: 'error.main' }}
                    id={`stepper-linear-${name}`}
                >
                    <span>{errors[name]?.message}</span>
                </FormHelperText>
            )}
        </FormControl>
    );
}
