import { Fade, Stack, Typography } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';
import React from 'react';

type Props = {
    buttonText: string;
    onClick: () => void;
};

export default function DownloadDocumentsEmptyScreen({
    onClick,
    buttonText
}: Props) {
    return (
        <Fade in>
            <Stack
                minHeight="250px"
                justifyContent="center"
                alignItems="center"
            >
                <Stack alignItems="center">
                    <VectorIcons.NoDocumentIcon sx={{ marginBottom: '12px', fontSize: '80px' }} />
                    <Typography
                        align="center"
                        fontWeight={600}
                        mb="4px"
                    >
                        No Documents
                    </Typography>
                    <Typography
                        color="text.secondary"
                        fontWeight={500}
                        fontSize={14}
                    >
                        Upload documents by going to
                    </Typography>
                    <Typography
                        color="primary"
                        fontWeight={600}
                        fontSize={14}
                        style={{ cursor: 'pointer' }}
                        onClick={onClick}
                    >
                        {`Edit ${buttonText}`}
                    </Typography>
                </Stack>
            </Stack>
        </Fade>
    );
}
