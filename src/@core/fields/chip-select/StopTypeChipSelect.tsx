import React from 'react';
import ChipSelect from '@/@core/fields/chip-select/components/ChipSelect';
import ChipSelectTypes from '@/@core/fields/chip-select/components/types';
import { LoadStopTypes, LoadStopTypesEnum } from '@/models/loads/load-stop';
import {
    MANIFEST_STOP_TYPE_COLORS,
    MANIFEST_STOP_TYPE_ICONS
} from '@/@core/theme/entities/manifests/stop-type';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import { LoadModel_Stop_Type } from '@proto/models/model_load';
import { ManifestStopTypes, ManifestStopTypesEnum } from '@/models/manifests/manifest-stop';
import { ManifestModel_ManifestStop_Type } from '@proto/models/model_manifest';
import { LOAD_STOP_TYPE_COLORS, LOAD_STOP_TYPE_ICONS } from '@/@core/theme/entities/load/stop_type';

type Props<T extends ManifestsTypes.OriginType> = {
    type:
        | ManifestsTypes.PreparedStop['loadStopType']
        | ManifestsTypes.PreparedStop['manifestStopType'];
    originType: T;
} & ChipSelectTypes.OtherProps;

function StopTypeChipSelect<T extends ManifestsTypes.OriginType>({
    type,
    originType,
    ...rest
}: Props<T>) {
    const onChangeLoadType: ChipSelectTypes.OnChange<LoadStopTypesEnum> = (type) => {};

    if (originType === ManifestsTypes.OriginType.LOAD) {
        return (
            <ChipSelect
                status={LoadStopTypes[type as LoadModel_Stop_Type]}
                options={Object.values(LoadStopTypesEnum)}
                status_prefix="state_info:stop.type"
                onChange={onChangeLoadType}
                custom_icons={LOAD_STOP_TYPE_ICONS}
                custom_colors={LOAD_STOP_TYPE_COLORS}
                {...rest}
            />
        );
    }

    const onChangeManifestType: ChipSelectTypes.OnChange<ManifestStopTypesEnum> = (type) => {};

    return (
        <ChipSelect
            status={ManifestStopTypes[type as ManifestModel_ManifestStop_Type]}
            options={Object.values(ManifestStopTypesEnum)}
            status_prefix="state_info:stop.type"
            onChange={onChangeManifestType}
            custom_icons={MANIFEST_STOP_TYPE_ICONS}
            custom_colors={MANIFEST_STOP_TYPE_COLORS}
            {...rest}
        />
    );
}

export default StopTypeChipSelect;
