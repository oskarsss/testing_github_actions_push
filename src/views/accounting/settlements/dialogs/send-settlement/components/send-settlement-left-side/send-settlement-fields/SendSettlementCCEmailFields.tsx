import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { Control, ErrorOption } from 'react-hook-form';
import { DefaultValues } from '@/views/accounting/settlements/dialogs/send-settlement/helpers';
import { useMemo } from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import { Typography } from '@mui/material';
import openNewWindow from '@/utils/open-new-window';
import EditIcon from '@mui/icons-material/Edit';
import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import { useSettings } from '@/store/settings/hooks';

type Props = {
    control: Control<DefaultValues>;
    errors: { [P in keyof DefaultValues]?: ErrorOption };
};

export default function SendSettlementCCEmailFields({
    control,
    errors
}: Props) {
    const { settlementsSections } = useSettings();

    const defaultEmails = useMemo(() => {
        if (!settlementsSections?.ccEmails) return [];
        return settlementsSections.ccEmails;
    }, [settlementsSections?.ccEmails]);

    const onEditEmails = () => openNewWindow('settings/settlements');

    return (
        <>
            <DialogComponents.Field
                xs={12}
                sx={{
                    display       : 'flex',
                    alignItems    : 'center',
                    justifyContent: 'space-between'
                }}
            >
                <CheckboxInput
                    name="option_email_to_cc_emails"
                    control={control}
                    errors={errors}
                    disabled={!defaultEmails.length}
                    label="modals:settlements.send_settlement.fields.labels.cc_email"
                    formControlSx={{
                        '.MuiFormControlLabel-label': {
                            fontWeight: 500
                        }
                    }}
                />

                <IconButtonWithTooltip
                    tooltip="common:tooltips.open_in_new_tab"
                    onClick={onEditEmails}
                    padding="2px"
                    icon={<EditIcon sx={{ fontSize: '16px' }} />}
                />
            </DialogComponents.Field>
            {defaultEmails.map((email) => (
                <DialogComponents.Field
                    key={email}
                    xs={12}
                    sx={{
                        display   : 'flex',
                        alignItems: 'center',
                        gap       : '6px'
                    }}
                >
                    <VectorIcons.CornerDownRightIcon
                        color="disabled"
                        sx={{ ml: '24px' }}
                    />
                    <Typography
                        fontSize="16px"
                        fontWeight={500}
                        lineHeight={1.3}
                    >
                        {email}
                    </Typography>
                </DialogComponents.Field>
            ))}
        </>
    );
}
