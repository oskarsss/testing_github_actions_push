import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import { Control, ErrorOption, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import Typography from '@mui/material/Typography';
import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import { DefaultValues } from '@/views/accounting/settlements/dialogs/send-settlement/helpers';

export enum EntityType {
    DRIVER = 'Driver',
    VENDOR = 'Vendor'
}

type Props = {
    control: Control<DefaultValues>;
    errors: { [P in keyof DefaultValues]?: ErrorOption };
    type: EntityType;
    text?: string;
    openEditDialog: () => void;
    name: Path<DefaultValues>;
    sendBy?: 'email' | 'sms';
};

function SendSettlementOptionalMarkup({
    control,
    errors,
    type,
    text,
    name,
    sendBy = 'email',
    openEditDialog
}: Props) {
    const { t } = useTranslation();
    return (
        <>
            <CheckboxInput
                name={name}
                control={control}
                errors={errors}
                disabled={!text}
                label={`modals:settlements.send_settlement.fields.labels.${sendBy}_to`}
                translateOptions={{
                    type: type.toLowerCase()
                }}
                formControlSx={{
                    '.MuiFormControlLabel-label': {
                        fontWeight: 500
                    }
                }}
            />

            <Stack
                flexDirection="row"
                alignItems="center"
                gap="4px"
            >
                <Typography
                    variant="body1"
                    fontStyle="normal"
                    fontWeight={500}
                    lineHeight="24px"
                    fontSize="16px"
                    color="semantic.text.secondary"
                    textAlign="right"
                    noWrap
                >
                    {text || t(`modals:settlements.send_settlement.empty.no_${sendBy}`)}
                </Typography>
                <IconButtonWithTooltip
                    tooltip="modals:settlements.send_settlement.tooltip_open_edit_type"
                    translateOptions={{ type }}
                    onClick={openEditDialog}
                    padding="2px"
                    icon={<EditIcon sx={{ fontSize: '16px' }} />}
                />
            </Stack>
        </>
    );
}

export default memo(SendSettlementOptionalMarkup);
