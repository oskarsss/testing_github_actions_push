import React, { useMemo, CSSProperties } from 'react';
import { Control, Controller, ErrorOption, Path, FieldValues } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { InputProps } from '@mui/material/Input/Input';
import { useTheme } from '@mui/material/styles';
import { getPublicURL } from '@/configs/storage';
import createMap from '@/utils/create-map';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import { TextFieldFactoringCompany } from '@/@core/fields/select/FactoringCompanySelect';
import InvoicingCompanyGrpcService from '@/@grpcServices/services/settings-service/invoicing-company.service';
import { useStableArray } from '@/hooks/useStable';

type CompanyAvatarProps = {
    name: string;
    logo_url: string;
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

export default function InvoicingCompanySelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    errors,
    label = 'core:selects.invoicing_company.label',
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

    const { data } = InvoicingCompanyGrpcService.useGetInvoicingCompaniesQuery({});
    const invoicingCompanies = useStableArray(data?.invoicingCompany);

    const options = useMemo(() => {
        const defaultOption = { invoicingCompanyId: '', name: t('common:none'), logoUrl: '' };
        const connected_factoring_companies = invoicingCompanies
            .filter(({ deleted }) => !deleted)
            .map(({
                invoicingCompanyId,
                name,
                logoUrl
            }) => ({
                invoicingCompanyId,
                name,
                logoUrl
            }));

        return required
            ? connected_factoring_companies
            : [{ ...defaultOption }, ...connected_factoring_companies];
    }, [invoicingCompanies, required, t]);

    const company_by_id = useMemo(() => createMap(options, 'invoicingCompanyId'), [options]);

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
                            option.invoicingCompanyId === String(val)}
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
                                key={option.invoicingCompanyId}
                                component="li"
                                sx={{
                                    display       : 'flex',
                                    alignItems    : 'center',
                                    justifyContent: 'flex-start'
                                }}
                            >
                                <CompanyAvatar
                                    name={option.name}
                                    logo_url={option.logoUrl}
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
                                onChange(data ? data.invoicingCompanyId : '');
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
