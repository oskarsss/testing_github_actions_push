import { useEffect, useMemo, useState } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import LoadingButton from '@mui/lab/LoadingButton';
import Fade from '@mui/material/Fade';
import Import from '@/store/import/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ImportActions } from '@/store/import/slice';
import VectorIcons from '@/@core/icons/vector_icons';
import FileTitle from '@/@core/components/import-dialog/steps/StepFirst/components/FileTitle';
import { useRetrieveFileStream } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import { saveAs } from 'file-saver';
import { getImportType, saveImportType } from '../../../helpers';
import FileTypeSelect from './FileTypeSelect';
import Upload from './Upload';
import {
    BottomNext,
    Container,
    DownloadBlock,
    Title,
    ContentWrapper,
    UploadFilesContainer,
    UploadFileItem
} from '../styled';
import { ProcessorID } from '../../../../../../../proto_data/ts/v1/import';

const default_type: Import.ProcessorType = {
    name         : '',
    description  : '',
    requiredFiles: [],
    processorId  : ProcessorID.PROCESSOR_UNKNOWN,
    icon         : '',
    sampleFileUrl: ''
};

type Props = {
    categories: Import.Category[];
    extractData: () => void;
};

export default function Content({
    categories,
    extractData
}: Props) {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();
    const [sampleFileUrl, setSampleFileUrl] = useState('');

    const {
        data,
        isLoading
    } = useRetrieveFileStream(sampleFileUrl);

    useEffect(() => {
        if (data.blobUrl) {
            saveAs(data.blobUrl, 'sample_file');
        }
    }, [data.blobUrl]);

    // const [getFile, { isLoading }] = StorageGrpcService.useLazyOldRetrieveFileQuery();
    const category_id = useAppSelector((state) => state.import.category_id);
    const processor_id = useAppSelector((state) => state.import.processor_id);

    const show_button_next = useAppSelector((state) => {
        const files = state.import.files_map[state.import.category_id]?.files || {};
        return Object.keys(files).length > 0;
    });

    const processors = useMemo(() => {
        const category = categories.find(({ categoryId }) => categoryId === category_id);
        if (category && category.processors.length > 0) {
            return category.processors;
        }
        return [default_type];
    }, [categories, category_id]);

    const selected_processor = useMemo(() => {
        const processor = processors.find(({ processorId }) => processorId === processor_id);
        return processor || processors[0];
    }, [processors, processor_id]);

    const onDownloadSampleFile = () => {
        if (!selected_processor.sampleFileUrl) {
            return;
        }
        setSampleFileUrl(selected_processor.sampleFileUrl);
    };

    const onClickNext = () => {
        saveImportType(category_id, processor_id);
        extractData();
        dispatch(ImportActions.SetActiveStep(1));
    };

    useEffect(() => {
        const typeId = getImportType(category_id);
        dispatch(
            ImportActions.UpdateProcessorId({
                processor_id:
                    typeId === ProcessorID.PROCESSOR_UNKNOWN
                        ? processors[0]?.processorId || ProcessorID.PROCESSOR_UNKNOWN
                        : typeId
            })
        );
    }, [processors]);

    return (
        <Fade
            in
            timeout={500}
        >
            <ContentWrapper>
                <Container>
                    <DownloadBlock>
                        <FileTypeSelect processors={processors} />
                        <Tooltip
                            title={!selected_processor.sampleFileUrl ? 'No sample file' : ''}
                            disableInteractive
                        >
                            <LoadingButton
                                variant="outlined"
                                startIcon={<VectorIcons.Download />}
                                loading={isLoading}
                                disabled={!selected_processor.sampleFileUrl}
                                loadingIndicator="Downloading…"
                                onClick={onDownloadSampleFile}
                                sx={{
                                    '&:disabled': {
                                        svg: {
                                            opacity: 0.3
                                        }
                                    }
                                }}
                            >
                                {t('core:import.button.download')}
                            </LoadingButton>
                        </Tooltip>
                    </DownloadBlock>

                    <Title>
                        {t('core:import.step.first.desc')}
                        <span>{t('core:import.step.first.descr')} </span>
                        {selected_processor.name}
                        <span>{` - ${selected_processor.description}`}</span>
                    </Title>

                    <UploadFilesContainer>
                        {selected_processor.requiredFiles.map((required_file) => (
                            <UploadFileItem key={required_file.id}>
                                <FileTitle
                                    title={required_file.name}
                                    links={required_file.links}
                                />
                                <Upload
                                    category_id={category_id}
                                    required_file={required_file}
                                />
                            </UploadFileItem>
                        ))}
                    </UploadFilesContainer>
                </Container>

                <BottomNext>
                    {show_button_next && (
                        <Button
                            variant="contained"
                            onClick={onClickNext}
                        >
                            {t('common:button.next')}
                        </Button>
                    )}
                </BottomNext>
            </ContentWrapper>
        </Fade>
    );
}
