import { Control, useController } from 'react-hook-form';
import Export from '@/store/export/types';
import { ContainerSelections } from '@/@core/components/export-dialog/FirstStep/components/Multiselect/styled';
import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { GetExportConfigReply_Exporter_Type_Column } from '../../../../../../../proto_data/ts/v1/export';

type Props = {
    control: Control<Export.FormValues>;
    columns: GetExportConfigReply_Exporter_Type_Column[];
};

const Selections = ({
    control,
    columns
}: Props) => {
    const {
        field: {
            value,
            onChange
        }
    } = useController({
        control,
        name: 'columns'
    });

    return (
        <ContainerSelections>
            {columns?.map((item) => (
                <FormControlLabel
                    label={item.label}
                    control={(
                        <Checkbox
                            onChange={(e) =>
                                onChange(
                                    e.target.checked
                                        ? [...value, item.columnId]
                                        : value.filter((id) => id !== item.columnId)
                                )}
                            checked={value?.includes(item.columnId)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    )}
                />
            ))}
        </ContainerSelections>
    );
};

export default Selections;
