import FormControl from '@mui/material/FormControl';
import { Control, Controller, ErrorOption, FieldValues, Path } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import { CSSProperties } from 'react';
import { Button, IconButton, InputLabel, SxProps, Theme } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { getPublicURL } from '@/configs/storage';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import SYSTEM from '@/@system';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';

// import SYSTEM_ASSETS_CONFIG from '@/@system/system-assets-config';
const { SmallLightIcon } = SYSTEM.ASSETS;

const Wrapper = styled('div')(() => ({
    display       : 'flex',
    alignItems    : 'center',
    gap           : '10px',
    justifyContent: 'space-between',
    width         : '100%'
}));

const Icon = styled('div')<{ name: string }>(({ name }) => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    overflow      : 'hidden',
    flexShrink    : 0,
    borderRadius  : 6,
    width         : 56,
    height        : 56,
    background    : name.includes('dark') ? '#1C1C1EFF' : '#FFFFFF',
    border        : '1px solid grey',
    img           : {
        maxWidth    : 'inherit',
        width       : 'inherit',
        objectFit   : 'contain',
        borderRadius: '6px',
        height      : 'inherit'
    },
    svg: {
        width : 'inherit',
        height: 'inherit'
    }
}));

const Error = styled(FormHelperText)(({ theme }) => ({
    color     : theme.palette.semantic.text.error,
    position  : 'absolute',
    bottom    : '-1.1rem',
    whiteSpace: 'nowrap'
}));

interface TextInputProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    name: Path<TFieldValues>;
    label: IntlMessageKey;
    labelWithoutTranslate?: string;
    sx?: SxProps<Theme>;
    required?: boolean;
    isEdit: boolean;
    uploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileInput<TFieldValues extends FieldValues = FieldValues>({
    control,
    errors,
    label,
    labelWithoutTranslate,
    name,
    sx,
    required,
    isEdit,
    uploadFile
}: TextInputProps<TFieldValues>) {
    const { t } = useAppTranslation();
    const formatLabel = labelWithoutTranslate || t(label);
    return (
        <FormControl
            variant="standard"
            sx={{
                flexShrink: 0,
                ...sx
            }}
        >
            <InputLabel
                shrink
                required={required}
                style={{
                    top     : '-20px',
                    overflow: 'initial'
                }}
                htmlFor="standard-adornment-amount"
            >
                {formatLabel}
            </InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Wrapper>
                        <Badge
                            invisible={!field.value || !isEdit}
                            badgeContent={(
                                <Tooltip
                                    title={`${t('common:button.delete')} ${formatLabel}`}
                                    disableInteractive
                                >
                                    <IconButton
                                        sx={{
                                            backgroundColor: (theme) =>
                                                theme.palette.semantic.border.secondary,
                                            padding: '2px',
                                            opacity: 0.9
                                        }}
                                        onClick={() => field.onChange('')}
                                    >
                                        <CloseIcon sx={{ fontSize: '12px' }} />
                                    </IconButton>
                                </Tooltip>
                            )}
                        >
                            <Icon name={name}>
                                {field.value ? (
                                    <img
                                        src={getPublicURL(field.value)}
                                        alt={label}
                                    />
                                ) : (
                                    <SmallLightIcon />
                                )}
                            </Icon>
                        </Badge>

                        {isEdit && (
                            <>
                                <div>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={uploadFile}
                                        name={name}
                                        value=""
                                        id={`${name}-button-file`}
                                        type="file"
                                    />
                                    {/* eslint-disable-next-line max-len */}
                                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                    <label htmlFor={`${name}-button-file`}>
                                        <Button
                                            variant="outlined"
                                            component="span"
                                            sx={{ padding: '6px 10px' }}
                                        >
                                            <AddPhotoAlternateIcon sx={{ mr: '8px' }} />
                                            {t('common:button.upload')}
                                        </Button>
                                    </label>
                                </div>
                                {errors[name] && (
                                    <Error id={`stepper-linear-${name}`}>
                                        <span>{errors[name]?.message}</span>
                                    </Error>
                                )}
                            </>
                        )}
                    </Wrapper>
                )}
            />
        </FormControl>
    );
}
