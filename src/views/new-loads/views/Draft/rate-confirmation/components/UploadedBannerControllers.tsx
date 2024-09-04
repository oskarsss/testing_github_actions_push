import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import { useWatch } from 'react-hook-form';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import StorageGrpcService from '@/@grpcServices/services/app-sevices/storage-service/storage.service';

import { useDownloadFile } from '@/hooks/useDownloadFile';
import {
    DraftsIsExtractingSelector,
    DraftsIsUploadingDocumentSelector
} from '@/store/drafts/selectors';

import useFiles from '@/views/new-loads/hooks/useFiles';
import useExtractFile from '@/views/new-loads/hooks/useExtractFile';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import UploadButtonStyled from '../UploadButtonStyled.styled';
import { useDraftFormContext } from '../../Draft';

export default function UploadedBannerControllers() {
    const isLoading = useAppSelector(DraftsIsUploadingDocumentSelector);
    const isExtractLoading = useAppSelector(DraftsIsExtractingSelector);

    const [removeFile] = StorageGrpcService.useDeleteFileMutation();
    const { t } = useAppTranslation();

    const downloadFile = useDownloadFile();

    const {
        setValue,
        getValues,
        reset,
        control
    } = useDraftFormContext();

    const onExtract = useExtractFile({
        getValues,
        reset
    });

    const {
        getInputProps,
        open
    } = useFiles({
        merge        : true,
        location     : 'drafts/files',
        onResCallback: (data) => {
            const { url } = data.paths[0];
            setValue('rateConUrl', url);
            setValue('rateConFileName', data.paths[0].name);
            onExtract(url);
        }
    });

    const file_name = useWatch({ control, name: 'rateConFileName' });
    const rate_con_url = useWatch({ control, name: 'rateConUrl' });

    const onDeleteFile = () => {
        setValue('rateConUrl', '');

        removeFile({ fileId: rate_con_url });
    };

    const onDownloadFile = () => {
        if (rate_con_url && file_name) {
            downloadFile(rate_con_url, file_name);
        }
    };

    const isDisabled = isLoading || isExtractLoading;

    return (
        <UploadButtonStyled.Button>
            <Stack
                direction="row"
                spacing={3}
                alignItems="center"
                flex="3 1 0"
                overflow="hidden"
            >
                <UploadButtonStyled.UploadIcon>
                    <CheckOutlinedIcon color="primary" />
                </UploadButtonStyled.UploadIcon>
                <Typography
                    noWrap
                    fontWeight={600}
                    fontSize="18px"
                    textOverflow="ellipsis"
                    sx={{
                        color: ({ palette }) => palette.semantic.text.white
                    }}
                >
                    {file_name}
                </Typography>
            </Stack>

            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="flex-end"
                flex="1 0 0"
            >
                {rate_con_url && (
                    <Tooltip title={t('new_loads:draft.rate_confirmation.tooltips.download_file')}>
                        <span>
                            <IconButton
                                disabled={isDisabled}
                                aria-label="download"
                                sx={{
                                    color           : 'wheat',
                                    height          : 44,
                                    minWidth        : 44,
                                    maxWidth        : 44,
                                    borderRadius    : '50%',
                                    '&.Mui-disabled': {
                                        color: 'wheat'
                                    }
                                }}
                                onClick={onDownloadFile}
                            >
                                <DownloadIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                )}
                <Tooltip title={t('new_loads:draft.rate_confirmation.tooltips.replace_file')}>
                    <span>
                        <IconButton
                            disabled={isDisabled}
                            aria-label="replace"
                            sx={{
                                color           : 'wheat',
                                height          : 44,
                                minWidth        : 44,
                                maxWidth        : 44,
                                borderRadius    : '50%',
                                '&.Mui-disabled': {
                                    color: 'wheat'
                                }
                            }}
                            onClick={open}
                        >
                            <RepeatOutlinedIcon />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title={t('new_loads:draft.rate_confirmation.tooltips.delete_file')}>
                    <span>
                        <IconButton
                            disabled={isDisabled}
                            aria-label="delete"
                            sx={{
                                color           : 'wheat',
                                height          : 44,
                                minWidth        : 44,
                                maxWidth        : 44,
                                borderRadius    : '50%',
                                '&.Mui-disabled': {
                                    color: 'wheat'
                                }
                            }}
                            onClick={onDeleteFile}
                        >
                            <DeleteIcon
                                sx={{
                                    padding: 0
                                }}
                            />
                        </IconButton>
                    </span>
                </Tooltip>
            </Stack>
            <input {...getInputProps()} />
        </UploadButtonStyled.Button>
    );
}
