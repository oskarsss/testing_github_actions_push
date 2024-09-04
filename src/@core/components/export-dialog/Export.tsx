import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { reset_config } from '@/configs/reset-from-config';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useDownloadFile } from '@/hooks/useDownloadFile';
import Export from '@/store/export/types';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import ExportGrpcService from '@/@grpcServices/services/export.service';
import EntityFilters from '@/@core/components/filters/filter-button/types';
import { FilterIdMap } from '@/@core/components/filters/types';
import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useExportConfig } from '@/store/export/hooks';
import FirstStep from './FirstStep/FirstStep';
import SecondStep from './SecondStep/SecondStep';
import { DownloadExportRequest_FilterValue, ExporterID } from '../../../../proto_data/ts/v1/export';
import { FilterModel_FilterID } from '../../../../proto_data/ts/v1/models/model_filter_type';
import { ExportDialogStyled } from './styled';

type Props = {
    exporter_id: Export.ExporterId;
    filters?: EntityFilters.Filter[];
    selectedFilters?: Record<string, string[] | string | number | boolean | object>;
};

export const useExportDialog = hookFabric(ExportDialog, (props) => (
    <DialogComponents.DialogWrapper
        padding="0px"
        maxWidth="575px"
        paperStyle={{ overflow: 'hidden' }}
        {...props}
    />
));

export default function ExportDialog({
    exporter_id,
    filters,
    selectedFilters
}: Props) {
    const dialog = useExportDialog(true);
    const [step, setStep] = useState(1);
    const downloadFile = useDownloadFile();

    const {
        exporter,
        isLoading
    } = useExportConfig(exporter_id);

    const [downloadExport, {
        isLoading: loadingDownload,
        isError,
        data
    }] =
        ExportGrpcService.useDownloadExportMutation();

    const values: Export.FormValues = useMemo(() => {
        let exporterTypeId = '';
        const selectedFiltersLocal = {} as Export.FormValues['selectedFilters'];
        if (exporter?.types) {
            exporterTypeId = exporter.types[0]?.exporterTypeId || '';
            const filters = exporter.types.map((type) => type.filters).flat();
            if (filters && selectedFilters) {
                Object.values(filters).forEach((filter) => {
                    if (filter.filterId === FilterModel_FilterID.FILTER_UNSPECIFIED) return;

                    const filterType = FilterIdMap[filter.filterId];
                    if (!filterType || !(filterType in selectedFilters)) return;

                    let value = selectedFilters[filterType];
                    if (!value) return;

                    if (typeof value === 'string' && value.length) {
                        value = [value];
                    }
                    if (!Array.isArray(value) || !value?.length) return;
                    if (typeof value?.[0] === 'number') {
                        value = value.map((v) => v.toString());
                    }
                    selectedFiltersLocal[`${FilterIdMap[filter.filterId]}`] = value as string[];
                });
            }
        }
        return {
            exporterTypeId,
            columns        : exporter?.types[0]?.columns?.map((column) => column.columnId) || [],
            exporterId     : ExporterID[exporter_id],
            selectedFilters: selectedFiltersLocal
        };
    }, [exporter?.types, exporter_id, selectedFilters]);

    const {
        control,
        reset,
        setError,
        getValues,
        handleSubmit,
        formState: { errors }
    } = useForm<Export.FormValues>({
        values
    });

    useEffect(() => {
        if (exporter?.types?.length === 1 && !exporter.types[0].filters?.length) {
            const type_id = exporter.types[0].exporterTypeId;
            setStep(2);
            downloadExport({
                exporterId    : ExporterID[exporter_id],
                exporterTypeId: type_id,
                filterValues  : [],
                columns       : []
            })
                .unwrap()
                .then((res) => {
                    if (!res?.filePath) return;
                    downloadFile(res.filePath, `${exporter_id}-${type_id}`);
                });
        }
    }, [exporter?.types?.length]);

    const handleClose = () => {
        reset({}, reset_config);
        dialog.close();
    };

    const download = () => {
        if (data?.filePath) {
            const type_id = getValues('exporterTypeId');
            downloadFile(data.filePath, `${exporter_id}-${type_id}`);
        }
    };

    const submit = (data: Export.FormValues) => {
        const {
            exporterId,
            exporterTypeId,
            columns,
            selectedFilters
        } = data;

        let isValid = true;

        const filters =
            exporter?.types.find((type) => type.exporterTypeId === exporterTypeId)?.filters || [];

        filters.forEach((param) => {
            if (param.required) {
                if (
                    param.filterId === FilterModel_FilterID.FILTER_UNSPECIFIED &&
                    !columns?.length
                ) {
                    isValid = false;
                    setError('columns', { message: 'The field is required' });
                } else if (!selectedFilters[FilterIdMap[param.filterId]]?.length) {
                    isValid = false;
                    setError(`selectedFilters.${FilterIdMap[param.filterId]}`, {
                        message: 'The field is required'
                    });
                }
            }
        });

        if (!isValid) return;

        setStep(2);

        const filterValues: DownloadExportRequest_FilterValue[] = filters
            .filter((f) => f.filterId !== FilterModel_FilterID.FILTER_UNSPECIFIED)
            .map((filter) => {
                const filterType = FilterIdMap[filter.filterId];
                return {
                    filterId: filter.filterId,
                    value   : selectedFilters?.[filterType] || []
                };
            });

        downloadExport({
            exporterId,
            exporterTypeId,
            filterValues,
            columns
        })
            .unwrap()
            .then((res) => {
                downloadFile(res.filePath, `${exporter_id}-${exporterId}`);
            });
    };

    if (isLoading) {
        return (
            <div style={{ padding: '16px' }}>
                <DialogComponents.Header title="Exports" />
                <ExportDialogStyled.Divider />
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    minHeight="300px"
                >
                    <CircularProgress />
                </Stack>
            </div>
        );
    }

    return (
        <DialogComponents.Form
            onSubmit={handleSubmit(submit)}
            style={{
                overflow     : 'hidden',
                display      : 'flex',
                flexDirection: 'column',
                padding      : '16px'
            }}
        >
            <DialogComponents.Header title={`Exports ${exporter?.label || ''} info`} />
            <ExportDialogStyled.Divider />

            {step === 1 ? (
                <FirstStep
                    filters={filters}
                    control={control}
                    errors={errors}
                    types={exporter?.types}
                />
            ) : (
                <SecondStep
                    isLoading={loadingDownload}
                    isError={isError}
                    download={download}
                    exporter_id={exporter_id}
                />
            )}

            <ExportDialogStyled.Divider />
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={handleClose} />
                {step === 1 && (
                    <DialogComponents.SubmitButton
                        loading={loadingDownload}
                        disabled={!exporter?.types?.length}
                        text="core:export_dialog.button.export"
                    />
                )}
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
