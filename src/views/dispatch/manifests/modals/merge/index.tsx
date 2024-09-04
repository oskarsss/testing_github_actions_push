import ManifestSelect from '@/@core/fields/select/manifests-select';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import navigateToPage from '@/utils/navigateToPage';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ManifestsModalsIcons from '../icons';

type Props = {
    manifestId: string;
    onSuccessMerge?: (manifestId: string) => void;
};

type DefaultValues = {
    mergedManifestId: string;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    mergedManifestId: yup.string().required('common:validation.required')
});

export const useMergeManifestsDialog = hookFabric(Merge, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="500px"
        {...props}
    />
));

function Merge({
    manifestId,
    onSuccessMerge
}: Props) {
    const [trigger, { isLoading }] = ManifestsGrpcService.useMergeManifestsMutation();

    const dialog = useMergeManifestsDialog(true);
    const methods = useForm<DefaultValues>({
        defaultValues: {
            mergedManifestId: ''
        },
        resolver: yupResolver(schema)
    });

    const submit = async (data: DefaultValues) => {
        const res = await trigger({
            toManifestId: data.mergedManifestId,
            manifestIds : [manifestId]
        }).unwrap();

        const resManifestId = res.manifest?.manifestId || '';
        if (onSuccessMerge) {
            onSuccessMerge(resManifestId);
        } else {
            navigateToPage(`/dispatch/manifests/${resManifestId}`);
        }

        dialog.close();
    };

    return (
        <DialogComponents.Form onSubmit={methods.handleSubmit(submit)}>
            <DialogComponents.Header title="modals:manifests.merge.title" />
            <DialogComponents.Fields rowSpacing={4}>
                <DialogComponents.SectionTitle
                    startIcon={<ManifestsModalsIcons.Manifest color="primary" />}
                    title="modals:manifests.sections.manifest"
                />
                <DialogComponents.Field xs={12}>
                    <ManifestSelect
                        name="mergedManifestId"
                        label="core:selects.manifest"
                        control={methods.control}
                        skipManifestId={manifestId}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    disabled={!methods.formState.isDirty}
                    text="common:button.confirm"
                    loading={isLoading}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
