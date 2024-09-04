import DialogComponents from '@/@core/ui-kits/common-dialog';
import { Control, useWatch } from 'react-hook-form';

import { DefaultValues } from '@/views/accounting/settlements/dialogs/send-settlement/helpers';

type Props = {
    control: Control<DefaultValues>;
    sendTo: 'vendor' | 'driver';
    dialogClose: () => void;
    isLoading: boolean;
};

export default function SendSettlementControllers({
    control,
    sendTo,
    dialogClose,
    isLoading
}: Props) {
    const optionEmailToDriver = useWatch({ control, name: 'option_email_to_driver' });
    const optionEmailToVendor = useWatch({ control, name: 'option_email_to_vendor' });
    const optionSmsToDriver = useWatch({ control, name: 'option_sms_to_driver' });

    const submitDisabled = !optionEmailToDriver && !optionEmailToVendor && !optionSmsToDriver;

    return (
        <DialogComponents.DefaultActions
            onCancel={dialogClose}
            submitLoading={isLoading}
            submitDisabled={submitDisabled}
            submitText={`modals:settlements.send_settlement.buttons.send_to_${sendTo}`}
            sx={{ mt: 0 }}
        />
    );
}
