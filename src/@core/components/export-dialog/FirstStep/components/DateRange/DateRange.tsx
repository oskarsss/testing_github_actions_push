import { Control, useController } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { ExportDialogStyled } from '@/@core/components/export-dialog/styled';
import FormControl from '@mui/material/FormControl';
import { Radio, RadioGroup } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import options from '@/@core/components/export-dialog/FirstStep/components/DateRange/options';
import Export from '@/store/export/types';
import { FilterIdMap } from '@/@core/components/filters/types';
import RangeInput from '@/@core/components/export-dialog/FirstStep/components/DateRange/RangeInput';
import { useAppSelector } from '@/store/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { FilterModel_FilterID } from '../../../../../../../proto_data/ts/v1/models/model_filter_type';

type Props = {
    startAtID: FilterModel_FilterID;
    endAtID: FilterModel_FilterID;
    control: Control<Export.FormValues>;
};

const DateRange = ({
    startAtID,
    endAtID,
    control
}: Props) => {
    const [selected, setSelected] = useState<string>('all');
    const { t } = useAppTranslation();

    const {
        field: {
            onChange: setStartAt,
            value: startAt
        },
        fieldState: { error: startAtError }
    } = useController({ control, name: `selectedFilters.${FilterIdMap[startAtID]}` });

    const {
        field: {
            onChange: setEndAt,
            value: endAt
        },
        fieldState: { error: endAtError }
    } = useController({ control, name: `selectedFilters.${FilterIdMap[endAtID]}` });

    useEffect(() => {
        if (startAt?.[0] && endAt?.[0] && selected === 'all') {
            setSelected('custom');
        }
    }, [startAt, endAt, selected]);

    const onChangeDateRange = (id: string, start_at: string, end_at: string) => {
        setSelected(id);
        setStartAt([start_at]);
        setEndAt([end_at]);
    };

    return (
        <ExportDialogStyled.Container.DateRange>
            <h5>Date range</h5>
            <FormControl
                component="fieldset"
                size="small"
                fullWidth
            >
                <RadioGroup>
                    {options.map((item) => (
                        <FormControlLabel
                            key={item.id}
                            onClick={() => onChangeDateRange(item.id, item.start_at, item.end_at)}
                            checked={selected.includes(item.id)}
                            control={<Radio />}
                            label={(
                                <>
                                    <p>{t(item.title)}</p>
                                    <span>{t(item.sub_title)}</span>
                                </>
                            )}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
            {selected === 'custom' && (
                <RangeInput
                    onChangeDateRange={onChangeDateRange}
                    start_date={startAt?.[0] || ''}
                    end_date={endAt?.[0] || ''}
                    error={startAtError || endAtError}
                />
            )}
        </ExportDialogStyled.Container.DateRange>
    );
};

export default DateRange;
