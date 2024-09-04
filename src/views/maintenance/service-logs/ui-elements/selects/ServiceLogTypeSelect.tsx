import { type Control, type FieldValues, type Path, useController } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import { ServiceLogModel_ServiceLogType } from '@proto/models/model_service_log';
import ChipDotIcon from '@/@core/fields/chip-select/components/ChipDotIcon';
import { MAINTENANCE_TYPE_COLORS } from '@/@core/theme/entities/maintenance/type';
import { Typography } from '@mui/material';

type Option = {
    value: ServiceLogModel_ServiceLogType;
    label: IntlMessageKey;
};

export interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
}

export default function ServiceLogTypeSelect<TFieldValues extends FieldValues = FieldValues>({
    control
}: Props<TFieldValues>) {
    const { t } = useAppTranslation();
    const {
        field: {
            value,
            onChange,
            onBlur
        },
        fieldState: { error }
    } = useController({ name: 'type' as Path<TFieldValues>, control });

    const options: Option[] = [
        {
            value: ServiceLogModel_ServiceLogType.PLANNED,
            label: t('state_info:maintenance.type.planned')
        },
        {
            value: ServiceLogModel_ServiceLogType.UNPLANNED,
            label: t('state_info:maintenance.type.unplanned')
        },
        {
            value: ServiceLogModel_ServiceLogType.EMERGENCY,
            label: t('state_info:maintenance.type.emergency')
        }
    ];

    const colorType = MAINTENANCE_TYPE_COLORS[value];

    return (
        <FormControl
            style={{ width: '100%' }}
            size="small"
            variant="filled"
        >
            <InputLabel
                required
                htmlFor="select-input-type"
                id="select-input-type"
            >
                {t('fields:type.label')}
            </InputLabel>
            <Select
                id="select-input-type"
                variant="filled"
                value={value}
                label={t('fields:type.label')}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                onBlur={onBlur}
                labelId="select-input-type"
                sx={{
                    backgroundColor: ({ palette }) =>
                        palette.utility.foreground[colorType].tertiary,
                    fontWeight: 500,

                    '.MuiSelect-select': {
                        display   : 'flex',
                        alignItems: 'center',
                        gap       : '4px',

                        svg: {
                            width : '16px',
                            height: '16px',

                            color: ({ palette }) => palette.utility.foreground[colorType].primary
                        }
                    }
                }}
                aria-describedby="select-input-type"
                error={Boolean(error)}
                size="small"
            >
                {options.map((option) => (
                    <MenuItem
                        value={option.value}
                        key={option.value}
                        sx={{
                            gap: '4px',
                            svg: {
                                width : '16px',
                                height: '16px',
                                color : ({ palette }) =>
                                    `${
                                        palette.utility.foreground[
                                            MAINTENANCE_TYPE_COLORS[option.value]
                                        ].primary
                                    } !important`
                            }
                        }}
                    >
                        <ChipDotIcon />

                        <Typography
                            variant="body1"
                            fontSize="16px"
                            fontWeight={500}
                            color={`semantic.text.${MAINTENANCE_TYPE_COLORS[option.value]}`}
                        >
                            {option.label}
                        </Typography>
                    </MenuItem>
                ))}
            </Select>

            {error && (
                <FormHelperText
                    sx={{ color: 'error.main' }}
                    id="select-input-type"
                >
                    <span>{error?.message}</span>
                </FormHelperText>
            )}
        </FormControl>
    );
}
