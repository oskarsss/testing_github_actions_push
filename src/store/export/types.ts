import { FilterKeys } from '@/@core/components/filters/types';
import { ExporterID } from '../../../proto_data/ts/v1/export';

namespace Export {
    export type FormValues = {
        exporterId: ExporterID;
        exporterTypeId: string;
        columns: string[];
        selectedFilters: Partial<Record<FilterKeys, string[]>>;
    };

    export type ExporterId = keyof typeof ExporterID;
}

export default Export;
