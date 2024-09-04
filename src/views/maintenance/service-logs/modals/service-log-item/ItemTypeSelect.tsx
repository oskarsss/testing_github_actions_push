import { type Control, type Path, useController } from 'react-hook-form';
import { type DefaultValues } from '@/views/maintenance/service-logs/modals/service-log-item/service-log-item-utils';
import { memo, useMemo } from 'react';
import { useServiceLogItemTypesMap } from '@/store/hash_maps/hooks';
import { isEqual } from 'lodash';
import CustomAutocomplete, {
    type Option
} from '@/@core/fields/select/components/CustomAutocomplete';
import createMap from '@/utils/create-map';
import { useCreateServiceLogItemTypeDialog } from '@/views/maintenance/service-logs/modals/service-log-item-type/CreateServiceLogItemType';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    control: Control<DefaultValues>;
};

function ItemTypeSelect({ control }: Props) {
    const { t } = useAppTranslation();
    const serviceLogItemTypes = useServiceLogItemTypesMap();
    const createServiceLogItemType = useCreateServiceLogItemTypeDialog();

    const {
        field: { onChange }
    } = useController({
        name: 'itemTypeId' as Path<DefaultValues>,
        control
    });

    const openServiceLogItemTypeDialog = () => {
        createServiceLogItemType.open({
            onSuccessfulCreate: (typeId) => onChange(typeId)
        });
    };

    const {
        options,
        typesById
    } = useMemo(() => {
        const options: Option[] = Object.values(serviceLogItemTypes)
            .filter((type) => !type.deleted)
            .map((type) => ({
                id  : type.itemTypeId,
                name: type.name
            }));

        return {
            options,
            typesById: createMap(options, 'id')
        };
    }, [serviceLogItemTypes]);

    return (
        <CustomAutocomplete
            control={control}
            entities_by_id={typesById}
            label="maintenance:service_logs.modals.create_item.fields.service_item.label"
            width="100%"
            name="itemTypeId"
            options={options}
            onAdd={openServiceLogItemTypeDialog}
            inputProps={{
                placeholder: t(
                    'maintenance:service_logs.modals.create_item.fields.service_item.placeholder'
                )
            }}
        />
    );
}

export default memo(ItemTypeSelect, isEqual);
