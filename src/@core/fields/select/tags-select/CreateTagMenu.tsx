import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTags } from '@/store/tags/hooks';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import MenuComponents from '@/@core/ui-kits/menus';
import TextInput from '@/@core/fields/inputs/TextInput';
import TagsGrpcService from '@/@grpcServices/services/tags.service';
import { TagModel_EntityType } from '@proto/models/model_tag';

type FormValues = {
    name: string;
};

const schema: ObjectSchema<FormValues> = yup.object().shape({
    name: yup.string().trim().required('Name is required')
});

type Props = {
    entityType: keyof typeof TagModel_EntityType;
    addNewTag: (tagId: string) => void;
};

export const useCreateTagMenu = menuHookFabric(CreateTagMenu);

function CreateTagMenu({
    entityType,
    addNewTag
}: Props) {
    const createTagMenu = useCreateTagMenu(true);
    const { tags } = useTags(entityType);
    const [createTag, { isLoading }] = TagsGrpcService.useCreateTagMutation();

    const {
        control,
        reset,
        setError,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm({
        defaultValues: {
            name: ''
        },
        resolver: yupResolver(schema)
    });

    const submit = ({ name }: FormValues) => {
        if (tags.findIndex((tag) => tag.name === name) < 0) {
            createTag({
                entityType: TagModel_EntityType[entityType],
                name
            })
                .unwrap()
                .then((response) => {
                    addNewTag(response.tagId);
                    createTagMenu.close();
                    reset();
                });
        } else {
            setError('name', { message: 'This tag already exists' });
        }
    };

    return (
        <MenuComponents.Form
            width="290px"
            onSubmit={handleSubmit(submit)}
        >
            <MenuComponents.Fields>
                <MenuComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        name="name"
                        label="core:selects.tag.menu.fields.name.label"
                        placeholder="core:selects.tag.menu.fields.name.placeholder"
                        width="100%"
                        size="medium"
                        autoFocus
                        required
                    />
                </MenuComponents.Field>

                <MenuComponents.ActionsWrapper>
                    <MenuComponents.CancelButton onCancel={createTagMenu.close} />
                    <MenuComponents.SubmitButton
                        loading={isLoading}
                        disabled={!isDirty}
                        type="create"
                    />
                </MenuComponents.ActionsWrapper>
            </MenuComponents.Fields>
        </MenuComponents.Form>
    );
}
