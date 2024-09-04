import { useRef } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { FactoringCompanyModel } from '@proto/models/model_factoring_company';
import PDFContent from '@/@core/ui-kits/basic/pdf-content/PDFContent';
import { useRetrieveFileStream } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import { FileModel_MimeType } from '@proto/models/model_file';
import ImageContent from '@/@core/ui-kits/basic/image-content/ImageContent';
import { styled } from '@mui/material/styles';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';

const Content = styled('div')(() => ({
    height  : '100%',
    padding : 0,
    overflow: 'hidden'
}));

type Props = {
    url: FactoringCompanyModel['noaFileId'];
    name: FactoringCompanyModel['name'];
};

export const useViewNoaDialog = hookFabric(ViewNoaDialog, (props) => (
    <DialogComponents.DialogWrapper
        paperStyle={{
            maxWidth: '1500px',
            height  : '900px'
        }}
        {...props}
    />
));

export default function ViewNoaDialog({
    url,
    name
}: Props) {
    const { t } = useAppTranslation();
    const {
        data,
        isLoading
    } = useRetrieveFileStream(url);
    const result = usePrivateFileUrl(url);

    const ref = useRef<HTMLDivElement>(null);
    const src = result.url;

    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
                padding="15px"
            >
                <Stack direction="row">
                    <Typography variant="h6">
                        {t('modals:settings.invoicing.factoring_companies.noa.header.title')} &nbsp;
                    </Typography>
                    <Typography
                        fontWeight={700}
                        variant="h6"
                    >
                        {name}
                    </Typography>
                </Stack>
            </Stack>

            <Content ref={ref}>
                {data.mimeType === FileModel_MimeType.PDF && result ? (
                    <PDFContent
                        blobUrl={src}
                        fileName={name}
                        isLoading={isLoading}
                    />
                ) : (
                    <ImageContent
                        blobUrl={src}
                        fileName={name}
                        fullHeight
                        fullWidth
                        isLoading={isLoading}
                    />
                )}
            </Content>
        </>
    );
}
