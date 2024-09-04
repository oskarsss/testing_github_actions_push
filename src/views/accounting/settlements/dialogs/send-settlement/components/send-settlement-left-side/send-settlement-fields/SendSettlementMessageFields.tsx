import DialogComponents from '@/@core/ui-kits/common-dialog';
import VectorIcons from '@/@core/icons/vector_icons';
import { Control } from 'react-hook-form';
import { DefaultValues } from '@/views/accounting/settlements/dialogs/send-settlement/helpers';
import SendSettlementsTextField from '@/views/accounting/settlements/dialogs/send-settlement/components/send-settlement-left-side/send-settlement-fields/SendSettlementsTextField';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    control: Control<DefaultValues>;
};

export default function SendSettlementMessageFields({ control }: Props) {
    const { t } = useAppTranslation();

    return (
        <DialogComponents.Fields rowSpacing={2}>
            <DialogComponents.SectionTitle
                startIcon={<VectorIcons.FullDialogIcons.MessageIcon color="primary" />}
                title="modals:settlements.send_settlement.titles.message"
            />
            <DialogComponents.Field xs={12}>
                <SendSettlementsTextField
                    control={control}
                    label={t('modals:settlements.send_settlement.fields.labels.subject')}
                    placeholder={t(
                        'modals:settlements.send_settlement.fields.placeholders.subject'
                    )}
                    maxRows={2}
                    name="subject"
                    multiline
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={12}>
                <SendSettlementsTextField
                    control={control}
                    label={t('modals:settlements.send_settlement.fields.labels.body')}
                    placeholder={t('modals:settlements.send_settlement.fields.placeholders.body')}
                    minRows={2}
                    maxRows={4}
                    name="body"
                    multiline
                />
            </DialogComponents.Field>
        </DialogComponents.Fields>
    );
}
