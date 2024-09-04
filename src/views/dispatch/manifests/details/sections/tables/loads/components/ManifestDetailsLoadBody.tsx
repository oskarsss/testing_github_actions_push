import { ManifestModel_Load } from '@proto/models/model_manifest';
import { Stack } from '@mui/material';
import ManifestDetailsLoadBodyDocuments from '@/views/dispatch/manifests/details/sections/tables/loads/components/ManifestDetailsLoadBodyDocuments';
import ManifestDetailsLoadBodyInvoicing from '@/views/dispatch/manifests/details/sections/tables/loads/components/ManifestDetailsLoadBodyInvoicing';

type Props = {
    load: ManifestModel_Load;
};
export default function ManifestDetailsLoadBody({ load }: Props) {
    return (
        <Stack
            overflow="hidden"
            height="290px"
            width="100%"
            flexDirection="row"
            gap="16px"
            mt="16px"
        >
            <ManifestDetailsLoadBodyDocuments load={load} />
            <ManifestDetailsLoadBodyInvoicing load={load} />
        </Stack>
    );
}
