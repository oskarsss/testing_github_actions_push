import React from 'react';
import StopItemStyled from '@/views/new-loads/views/Draft/draft-form/stops-fields/StopItem.styled';
import { Path } from 'react-hook-form';
import DraftsTypes from '@/store/drafts/types';
import { LoadModel_Stop_Type } from '@proto/models/model_load';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import { IconButton } from '@mui/material';
import { TestIDs, applyTestId } from '@/configs/tests';
import { LOAD_STOP_TYPE_GRPC_ENUM } from '@/models/loads/load-mappings';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { STOP_TYPE_OPTIONS_MAP } from '../stops-types-config';
import { useDraftFormContext } from '../../../Draft';
import { useChangeTypeMenu } from './ChangeStopTypeMenu';

type Props = {
    name: Path<DraftsTypes.Fields>;
    type: LoadModel_Stop_Type;
};

const StopType = ({
    name,
    type
}: Props) => {
    const { setValue } = useDraftFormContext();
    const changeTypeMenu = useChangeTypeMenu();
    const { t } = useAppTranslation();

    const changeTypeHandler = (value: LoadModel_Stop_Type) => setValue(name, value);

    const openMenu = changeTypeMenu.open({
        onChange: changeTypeHandler
    });
    const option = STOP_TYPE_OPTIONS_MAP[LOAD_STOP_TYPE_GRPC_ENUM[type]];
    return (
        <StopItemStyled.Title>
            {option?.label(t)}
            <IconButton
                aria-label="Change type"
                style={{ marginLeft: 8 }}
                onClick={openMenu}
                {...applyTestId(TestIDs.pages.createLoad.buttons.changeStopType)}
            >
                <SwapHorizOutlinedIcon />
            </IconButton>
        </StopItemStyled.Title>
    );
};

export default StopType;
