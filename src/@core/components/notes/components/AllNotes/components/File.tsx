/* eslint-disable max-len */
import Notes from '@/store/notes/types';
import { FileContainer } from '@/@core/components/notes/components/AllNotes/AllNotes.styled';
import { useDownloadFile } from '@/hooks/useDownloadFile';
import { Button, Stack, Typography } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type FileProps = {
    file: Notes.NoteType['files'][0];
    size: 'small' | 'medium';
    is_it_me: boolean;
};
export default function File({
    file,
    size,
    is_it_me
}: FileProps) {
    const downloadFile = useDownloadFile();
    const { t } = useAppTranslation();

    const saveFile = () => {
        downloadFile(file.url, file.name);
    };

    return (
        <>
            <FileContainer>
                <Stack
                    direction="column"
                    overflow="hidden"
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        overflow="hidden"
                    >
                        <Typography
                            fontSize="12px"
                            variant="body1"
                            align="center"
                            fontWeight={600}
                            lineHeight="17px"
                            color={is_it_me ? '#FFFFFF' : 'text.primary'}
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                        >
                            {file.name}
                        </Typography>
                    </Stack>
                </Stack>
            </FileContainer>

            <Button
                size={size}
                onClick={saveFile}
                color="primary"
                sx={{
                    fontSize: 10,
                    width   : 'auto',
                    ...(is_it_me
                        ? {
                            color: '#FFFFFF',

                            '&:hover': {
                                color          : (theme) => theme.palette.semantic.foreground.brand.primary,
                                backgroundColor: '#FFFFFF'
                            }
                        }
                        : {})
                }}
                startIcon={(
                    <VectorIcons.SaveFile
                        size={16}
                        fill="currentColor"
                    />
                )}
            >
                <span>{t('common:button.download')}</span>
            </Button>
        </>
    );
}
