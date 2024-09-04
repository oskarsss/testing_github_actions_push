import DialogComponents from '@/@core/ui-kits/common-dialog';
import VectorIcons from '@/@core/icons/vector_icons';
import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material';
import { DocumentModel_Type } from '@proto/models/model_document';
import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import { Control, ErrorOption } from 'react-hook-form';

import { DefaultValues } from '@/views/accounting/settlements/dialogs/send-settlement/helpers';
import { useEditRevenueTypeDialog } from '@/views/settings/tabs/Settlements/RevenueTypes/dialogs/RevenueTypeDialog/EditRevenueTypeDialog';
import { useEditDriverDialog } from '@/views/fleet/drivers/dialogs/EditDriver/EditDriver';
import { useRevenueTypesMap } from '@/store/hash_maps/hooks';
import NoRevenueType from '@/views/accounting/settlements/dialogs/send-settlement/components/send-settlement-left-side/empty-screen/NoRevenueType';
import NoAttachmentsDocuments from '@/views/accounting/settlements/dialogs/send-settlement/components/send-settlement-left-side/empty-screen/NoAttachmentsDocuments';

type Props = {
    control: Control<DefaultValues>;
    errors: { [P in keyof DefaultValues]?: ErrorOption };
    documentTypes: DocumentModel_Type[];
    loadIds?: string[];
    revenueTypeId?: string;
    driverId: string;
};

export default function SendSettlementAttachmentsFields({
    documentTypes,
    loadIds,
    control,
    errors,
    revenueTypeId = '',
    driverId
}: Props) {
    const editRevenueTypeDialog = useEditRevenueTypeDialog();
    const editDriverDialog = useEditDriverDialog();
    const revenueType = useRevenueTypesMap(revenueTypeId);

    const openEditDriver = () => {
        editDriverDialog.open({ driver_id: driverId });
    };

    const onOpenEditRevenueTypeDialog = () => {
        if (!revenueType) {
            openEditDriver();
            return;
        }
        editRevenueTypeDialog.open({ type: revenueType });
    };

    return (
        <DialogComponents.Fields
            rowSpacing={2}
            sx={{ flexGrow: 1, alignContent: 'flex-start' }}
        >
            <DialogComponents.Field
                xs={12}
                sx={{
                    display       : 'flex',
                    alignItems    : 'center',
                    justifyContent: 'space-between',
                    height        : 'fit-content'
                }}
            >
                <DialogComponents.SectionTitle
                    startIcon={<VectorIcons.FullDialogIcons.DocumentIcon color="primary" />}
                    title="modals:settlements.send_settlement.titles.attachments"
                />
                <IconButtonWithTooltip
                    tooltip="common:button.edit"
                    onClick={onOpenEditRevenueTypeDialog}
                    padding="2px"
                    icon={<EditIcon sx={{ fontSize: '16px' }} />}
                />
            </DialogComponents.Field>
            {revenueType && !!documentTypes.length && (
                <>
                    <DialogComponents.Field xs={12}>
                        <CheckboxInput
                            name="option_attachment_documents"
                            control={control}
                            errors={errors}
                            disabled={!loadIds?.length}
                            label="modals:settlements.send_settlement.buttons.send_documents"
                            formControlSx={{
                                '.MuiFormControlLabel-label': {
                                    fontWeight: 500
                                }
                            }}
                        />
                    </DialogComponents.Field>
                    {documentTypes.map((option) => (
                        <DialogComponents.Field
                            key={option.documentTypeId}
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
                                {option.title}
                            </Typography>
                        </DialogComponents.Field>
                    ))}
                </>
            )}
            {revenueType && !documentTypes.length && (
                <DialogComponents.Field
                    xs={12}
                    sx={{ height: '90%' }}
                >
                    <NoAttachmentsDocuments />
                </DialogComponents.Field>
            )}
            {!revenueType && (
                <DialogComponents.Field
                    xs={12}
                    sx={{ height: '90%' }}
                >
                    <NoRevenueType driverId={driverId} />
                </DialogComponents.Field>
            )}
        </DialogComponents.Fields>
    );
}
