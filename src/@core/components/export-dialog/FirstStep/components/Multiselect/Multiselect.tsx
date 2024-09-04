import { Container } from '@/@core/components/export-dialog/FirstStep/components/Multiselect/styled';
import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { Control, useController } from 'react-hook-form';
import { ExportDialogStyled } from '@/@core/components/export-dialog/styled';
import FormHelperText from '@mui/material/FormHelperText';
import Selections from '@/@core/components/export-dialog/FirstStep/components/Multiselect/Selections';
import Export from '@/store/export/types';
import { GetExportConfigReply_Exporter_Type_Column } from '../../../../../../../proto_data/ts/v1/export';

const options = [
    {
        label: 'Default',
        id   : 'default'
    },
    {
        label: 'Custom',
        id   : 'custom'
    }
];

type Props = {
    control: Control<Export.FormValues>;
    columns: GetExportConfigReply_Exporter_Type_Column[];
};

export default function Multiselect({
    control,
    columns
}: Props) {
    const [selected, setSelected] = useState<string>(options[0].id);
    const {
        field: { onChange },
        fieldState: { error }
    } = useController({ control, name: 'columns' });

    useEffect(() => {
        onChange(selected === options[0].id ? columns.map((item) => item.columnId) : []);
    }, [selected, columns]);

    return (
        <>
            <ExportDialogStyled.Divider />
            <Container>
                <h5>Columns</h5>
                <FormControl fullWidth>
                    <Select
                        size="small"
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                    >
                        {options.map((option) => (
                            <MenuItem
                                key={option.id}
                                value={option.id}
                            >
                                {option.id === 'default'
                                    ? `${option.label} (${columns?.length})`
                                    : option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {!!error && (
                        <FormHelperText sx={{ color: 'error.main' }}>
                            <span>{error.message}</span>
                        </FormHelperText>
                    )}
                </FormControl>
                {selected === 'custom' ? (
                    <Selections
                        control={control}
                        columns={columns}
                    />
                ) : (
                    <p>{columns?.map((item) => item.label).join(', ')}</p>
                )}
            </Container>
        </>
    );
}
