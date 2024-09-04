import TextInput from '@/@core/fields/inputs/TextInput';
import { useForm } from 'react-hook-form';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import TableTypes from '@/@core/components/table/types';
import PagesGrpcService from '@/@grpcServices/services/pages.service';
import { PageModel_Page } from '@proto/models/model_page';

function formattingName(name?: string, length = 16) {
    if (!name) return '';
    if (name.length <= length) return name;
    return `${name.slice(0, length - 2)}...`;
}

type DefaultValues = {
    name: string;
};

type Props = {
    mode: 'add' | 'edit' | 'duplicate' | null;
    page: PageModel_Page;
    view?: TableTypes.View;
    selectLastItem?: () => void;
};

export const useViewDialog = hookFabric(ViewDialog);

function ViewDialog({
    page,
    view,
    mode,
    selectLastItem
}: Props) {
    const [addView, { isLoading: isLoadingAdd }] = PagesGrpcService.useCreatePageViewMutation();
    const [updateView, { isLoading: isLoadingUpdate }] =
        PagesGrpcService.useUpdatePageViewMutation();
    const [duplicateView, { isLoading: isLoadingDuplicate }] =
        PagesGrpcService.useDuplicateViewMutation();

    const viewDialog = useViewDialog(true);

    const isLoading = isLoadingAdd || isLoadingUpdate || isLoadingDuplicate;

    const isAdding = mode === 'add';
    const isEditing = mode === 'edit';
    const isDuplicating = mode === 'duplicate';

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<DefaultValues>({
        defaultValues: {
            name: ''
        },
        values: {
            name: view?.name || ''
        }
    });

    const onCloseDialog = () => {
        reset();
        viewDialog.close();
    };

    const submitForm = ({ name }: DefaultValues) => {
        const viewId = view?.viewId;
        switch (mode) {
        case 'add':
            addView({
                page,
                name
            })
                .unwrap()
                .then(onCloseDialog);
            break;
        case 'edit':
            if (viewId) {
                updateView({
                    page,
                    viewId,
                    name
                })
                    .unwrap()
                    .then(onCloseDialog);
            }
            break;
        case 'duplicate':
            if (viewId) {
                duplicateView({
                    page,
                    sourceViewId: viewId,
                    name
                })
                    .unwrap()
                    .then(() => {
                        selectLastItem?.();
                        onCloseDialog();
                    });
            }
            break;
        default:
            break;
        }
    };

    const headerText = () => {
        if (isAdding) return 'core:table.table_editor.menus.view_menu.titles.add';
        if (isEditing) return 'core:table.table_editor.menus.view_menu.titles.edit';
        if (isDuplicating) return 'core:table.table_editor.menus.view_menu.titles.duplicate';
        return '';
    };

    const confirmText = () => {
        if (isAdding) return 'core:table.table_editor.menus.view_menu.submit_text.add';
        if (isEditing) return 'core:table.table_editor.menus.view_menu.submit_text.edit';
        if (isDuplicating) return 'core:table.table_editor.menus.view_menu.submit_text.duplicate';
        return '';
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submitForm)}>
            <DialogComponents.Header
                title={headerText()}
                translationOptions={{ name: formattingName(view?.name, 18) }}
            />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        label="fields:name.label"
                        placeholder="core:table.table_editor.menus.view_menu.fields.name"
                        name="name"
                        width="100%"
                        errors={errors}
                        control={control}
                        autoFocus
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.DefaultActions
                onCancel={onCloseDialog}
                submitLoading={isLoading}
                submitText={confirmText()}
            />
        </DialogComponents.Form>
    );
}
