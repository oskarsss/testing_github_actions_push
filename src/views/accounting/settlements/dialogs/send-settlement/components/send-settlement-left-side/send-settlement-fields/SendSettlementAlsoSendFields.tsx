import DialogComponents from '@/@core/ui-kits/common-dialog';
import VectorIcons from '@/@core/icons/vector_icons';
import SendSettlementOptionalMarkup, {
    EntityType
} from '@/views/accounting/settlements/dialogs/send-settlement/components/send-settlement-left-side/SendSettlementOptionalMarkup';
import { useEditDriverDialog } from '@/views/fleet/drivers/dialogs/EditDriver/EditDriver';
import { useEditVendorDialog } from '@/views/fleet/vendors/dialogs/EditVendor/EditVendor';
import { Control, ErrorOption } from 'react-hook-form';
import { formatPhoneNumber } from '@/utils/formatting';
import { DefaultValues } from '@/views/accounting/settlements/dialogs/send-settlement/helpers';
import SendSettlementCCEmailFields from '@/views/accounting/settlements/dialogs/send-settlement/components/send-settlement-left-side/send-settlement-fields/SendSettlementCCEmailFields';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    control: Control<DefaultValues>;
    errors: { [P in keyof DefaultValues]?: ErrorOption };
    driverId: string;
    vendorId: string;
    driverEmail?: string;
    vendorEmail?: string;
    driverPhone?: string;
};

export default function SendSettlementAlsoSendFields({
    control,
    errors,
    driverId,
    vendorId,
    driverEmail = '',
    vendorEmail = '',
    driverPhone = ''
}: Props) {
    const { t } = useAppTranslation();
    const editDriverDialog = useEditDriverDialog();
    const editVendorDialog = useEditVendorDialog();

    const openEditDriverDialog = () => editDriverDialog.open({ driver_id: driverId });
    const openEditVendorDialog = () => editVendorDialog.open({ vendor_id: vendorId });

    return (
        <DialogComponents.Fields rowSpacing={2}>
            <DialogComponents.SectionTitle
                startIcon={<VectorIcons.FullDialogIcons.SendIcon color="primary" />}
                title={t('modals:settlements.send_settlement.titles.also_send')}
            />
            <DialogComponents.Field
                xs={12}
                sx={{
                    display       : 'flex',
                    alignItems    : 'center',
                    justifyContent: 'space-between'
                }}
            >
                <SendSettlementOptionalMarkup
                    control={control}
                    errors={errors}
                    name="option_email_to_driver"
                    type={EntityType.DRIVER}
                    text={driverEmail}
                    openEditDialog={openEditDriverDialog}
                />
            </DialogComponents.Field>

            <DialogComponents.Field
                xs={12}
                sx={{
                    display       : 'flex',
                    alignItems    : 'center',
                    justifyContent: 'space-between'
                }}
            >
                <SendSettlementOptionalMarkup
                    control={control}
                    errors={errors}
                    name="option_sms_to_driver"
                    openEditDialog={openEditDriverDialog}
                    text={driverPhone ? formatPhoneNumber(driverPhone) : ''}
                    type={EntityType.DRIVER}
                    sendBy="sms"
                />
            </DialogComponents.Field>

            {vendorId && (
                <DialogComponents.Field
                    xs={12}
                    sx={{
                        display       : 'flex',
                        alignItems    : 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <SendSettlementOptionalMarkup
                        control={control}
                        errors={errors}
                        name="option_email_to_vendor"
                        type={EntityType.VENDOR}
                        text={vendorEmail}
                        openEditDialog={openEditVendorDialog}
                    />
                </DialogComponents.Field>
            )}
            <SendSettlementCCEmailFields
                control={control}
                errors={errors}
            />
        </DialogComponents.Fields>
    );
}
