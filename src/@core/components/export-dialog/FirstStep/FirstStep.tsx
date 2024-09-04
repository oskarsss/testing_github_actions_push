import DialogComponents from '@/@core/ui-kits/common-dialog';
import Parameters from '@/@core/components/export-dialog/FirstStep/Parameters';
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import { ExportDialogStyled } from '@/@core/components/export-dialog/styled';
import PerfectScrollbar from 'react-perfect-scrollbar';
import EntityFilters from '@/@core/components/filters/filter-button/types';
import Export from '@/store/export/types';
import { GetExportConfigReply_Exporter_Type } from '../../../../../proto_data/ts/v1/export';

type Props = {
    filters?: EntityFilters.Filter[];
    control: Control<Export.FormValues>;
    errors: FieldErrors<Export.FormValues>;
    types: GetExportConfigReply_Exporter_Type[] | undefined;
};

export default function FirstStep({
    control,
    errors,
    filters,
    types
}: Props) {
    if (!types) {
        return (
            <DialogComponents.FailedFetching
                style={{ minHeight: '250px' }}
                firstText="core:export_dialog.failed_fetch"
            />
        );
    }

    return (
        <PerfectScrollbar
            options={{
                wheelSpeed      : 1,
                wheelPropagation: false,
                suppressScrollX : true
            }}
            style={{
                padding    : '16px 16px 16px 0',
                marginRight: '-16px',
                minHeight  : '250px'
            }}
        >
            <DialogComponents.Fields>
                {types.length > 1 && (
                    <DialogComponents.Field xs={12}>
                        <SelectInput
                            width="100%"
                            variant="outlined"
                            label="common:type"
                            errors={errors}
                            IconComponent={ExportDialogStyled.KeyboardArrowDownIcon}
                            control={control}
                            name="exporterTypeId"
                            options={types.map((t) => ({ id: t.exporterTypeId, label: t.label }))}
                            required
                        />
                    </DialogComponents.Field>
                )}
                <Parameters
                    filters={filters}
                    control={control}
                    types={types}
                />
            </DialogComponents.Fields>
        </PerfectScrollbar>
    );
}
