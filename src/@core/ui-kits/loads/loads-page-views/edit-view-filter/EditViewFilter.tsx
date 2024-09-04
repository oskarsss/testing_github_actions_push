import * as yup from 'yup';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MenuComponents from '@/@core/ui-kits/menus';
import TextInput from '@/@core/fields/inputs/TextInput';
import { Divider, Wrap } from '@/@core/ui-kits/loads/loads-page-views/edit-view-filter/styled';
import DragDropFilter from '@/@core/ui-kits/loads/loads-page-views/edit-view-filter/DragDropFilter';
import { LoadsView } from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';

type DefaultValues = {
    name: string;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    name: yup.string().max(32).required('Name is required')
});

export const useEditViewMenu = menuHookFabric(EditViewFilter, { cleanContentOnClose: true });

type Props = {
    view: LoadsView;
    views: LoadsView[];
    updateViewsAction: (views: LoadsView[]) => void;
    deleteViewAction: (viewId: string) => void;
};

function EditViewFilter({
    view,
    views,
    updateViewsAction,
    deleteViewAction
}: Props) {
    const menuEditView = useEditViewMenu(true);

    const [sortedViews, setSortedViews] = useState<LoadsView[]>(views);

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultValues>({
        defaultValues: { name: view.name },
        resolver     : yupResolver(schema)
    });

    const submit = (data: DefaultValues) => {
        const updatedViews = sortedViews.map((item) => {
            if (item.view_id === view.view_id) {
                return { ...view, ...data };
            }
            return item;
        });
        updateViewsAction(updatedViews);
        menuEditView.close();
    };

    const onDelete = () => {
        menuEditView.close();
        deleteViewAction(view.view_id);
    };

    const onSorting = (views: LoadsView[]) => {
        updateViewsAction(views);
        setSortedViews(views);
    };

    return (
        <MenuComponents.Form
            width={416}
            padding={0}
            onSubmit={handleSubmit(submit)}
        >
            <Wrap style={{ paddingBottom: 0 }}>
                <MenuComponents.FormHeader text="core:basic.edit_filter_view.title" />
            </Wrap>
            <Divider />

            <Wrap>
                <MenuComponents.Field xs={12}>
                    <TextInput
                        required
                        label="fields:name.label"
                        name="name"
                        control={control}
                        errors={errors}
                        placeholder="fields:name.placeholder"
                        width="100%"
                    />
                </MenuComponents.Field>
            </Wrap>

            <Divider />
            <DragDropFilter
                sortedViews={sortedViews}
                setSortedViews={onSorting}
            />
            <Divider />

            <Wrap>
                <MenuComponents.ActionsWrapper>
                    <MenuComponents.CancelButton onCancel={menuEditView.close} />
                    {view.view_id !== 'default' && view.view_id !== 'default_active' && (
                        <MenuComponents.DeleteButton
                            onClick={onDelete}
                            loading={false}
                        />
                    )}
                    <MenuComponents.SubmitButton
                        text="common:button.update"
                        loading={false}
                        disabled={!isDirty}
                    />
                </MenuComponents.ActionsWrapper>
            </Wrap>
        </MenuComponents.Form>
    );
}
