import React, { useState } from 'react';
import RotateIcon from '@mui/icons-material/Rotate90DegreesCw';
import Tooltip from '@mui/material/Tooltip';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import DocumentsGrpcService from '@/@grpcServices/services/app-sevices/documents-services/documents.service';
import DocumentsComponents from '../styled';
import { useDocumentsContext } from '../../../Documents';

type Props = {
    document_id: string;
    versionNumber?: number;
    hidden?: boolean;
};

const DEGREE = 90;

export default function DocumentRotateButton({
    document_id,
    versionNumber,
    hidden
}: Props) {
    const { t } = useAppTranslation('core');
    const [degreeRotate, setDegreeRotate] = useState(90);
    const [rotate, { isLoading }] = DocumentsGrpcService.useRotatePhotoMutation();
    const {
        entityId,
        entityType
    } = useDocumentsContext();

    const rotatePhoto = () => {
        if (!versionNumber) return;
        rotate({
            entityType,
            entityId,
            documentTypeId: document_id,
            degree        : degreeRotate,
            versionNumber
        })
            .unwrap()
            .then(() => {
                setDegreeRotate((prevState) => prevState + DEGREE);
            });
    };

    if (hidden) return null;

    return (
        <Tooltip title={t('documents.tooltips.rotate_right')}>
            <DocumentsComponents.RotateButton
                variant="text"
                onClick={rotatePhoto}
                loading={isLoading}
            >
                <RotateIcon />
            </DocumentsComponents.RotateButton>
        </Tooltip>
    );
}
