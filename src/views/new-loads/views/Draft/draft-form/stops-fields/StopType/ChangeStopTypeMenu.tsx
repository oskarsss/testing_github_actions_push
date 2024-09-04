import { memo } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { applyTestId, TestIDs } from '@/configs/tests';
import { LoadModel_Stop_Type } from '@proto/models/model_load';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { LOAD_STOP_TYPE_TO_GRPC_ENUM } from '@/models/loads/load-mappings';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { LoadStopTypesEnum } from '@/models/loads/load-stop';
import { STOP_TYPE_OPTIONS_ARRAY } from '../stops-types-config';

type Props = {
    onChange: (val: LoadModel_Stop_Type) => void;
};

export const useChangeTypeMenu = menuHookFabric(ChangeTypeMenu);

function ChangeTypeMenu({ onChange }: Props) {
    const { t } = useAppTranslation();
    const menu = useChangeTypeMenu(true);

    const onClick = (value: LoadStopTypesEnum) => () => {
        onChange(LOAD_STOP_TYPE_TO_GRPC_ENUM[value]);
        menu.close();
    };

    return (
        <>
            {STOP_TYPE_OPTIONS_ARRAY.map(({
                value,
                label
            }) => (
                <MenuItem
                    key={value}
                    onClick={onClick(value)}
                    {...applyTestId(TestIDs.components.select.stopChangeType.optionPrefix)}
                >
                    {label(t)}
                </MenuItem>
            ))}
        </>
    );
}

export default memo(ChangeTypeMenu);
