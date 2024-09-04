import { useMemo } from 'react';
import ExportGrpcService from '@/@grpcServices/services/export.service';
import { useStableArray } from '@/hooks/useStable';
import Export from '@/store/export/types';
import { ExporterID } from '../../../proto_data/ts/v1/export';

export function useExportConfig(exporter_id: Export.ExporterId) {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } =
        ExportGrpcService.useGetExportConfigQuery({});

    const exporters = useStableArray(data?.exporters);

    const exporter = useMemo(
        () => exporters?.find((exporter) => exporter.exporterId === ExporterID[exporter_id]),
        [exporters, exporter_id]
    );

    return {
        exporters,
        exporter,
        isLoading,
        isSuccess,
        isError,
        error
    };
}
