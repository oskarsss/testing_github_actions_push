import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Import from '@/store/import/types';
import { ImportActions } from '@/store/import/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ProcessorID } from '../../../../../../../proto_data/ts/v1/import';

type Props = {
    processors: Import.ProcessorType[];
};
export default function FileTypeSelect({ processors }: Props) {
    const dispatch = useAppDispatch();
    const processor_id = useAppSelector((state) => state.import.processor_id);
    const { t } = useAppTranslation();

    const handleChange = (event: SelectChangeEvent) => {
        const processor_id = Number(event.target.value) as ProcessorID;
        dispatch(ImportActions.UpdateProcessorId({ processor_id }));
    };

    return (
        <FormControl
            variant="standard"
            fullWidth
        >
            <InputLabel id="select-label">{t('core:import.step.first.select')}</InputLabel>
            <Select
                labelId="select-label"
                id="select-label"
                IconComponent={KeyboardArrowDownIcon}
                value={processor_id.toString()}
                label={t('core:import.step.first.select')}
                onChange={handleChange}
            >
                {processors.map(({
                    processorId,
                    name
                }) => (
                    <MenuItem
                        value={processorId.toString()}
                        key={processorId.toString()}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
