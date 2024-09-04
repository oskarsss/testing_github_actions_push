import { DocumentCreateRequest } from '@proto/documents';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import FallbackContent, {
    FallbackCreateClickAction
} from '../../ui-kits/basic/fallback-content/FallbackContent';
import { useChooseDocumentTypeDialog } from './menus/ChooseDocumentType';
import { useDocumentsContext } from './Documents';

const Icon = () => {
    const { palette } = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="121"
            height="121"
            viewBox="0 0 121 121"
            fill="none"
        >
            <path
                d="M30.5 110.5C39.8374 110.5 47.6803 104.101 49.8829 95.4494C50.5641 92.7733 52.7386 90.5 55.5 90.5H90.5V25.5C90.5 17.2157 83.7843 10.5 75.5 10.5H25.5C17.2157 10.5 10.5 17.2157 10.5 25.5V90.5C10.5 101.546 19.4543 110.5 30.5 110.5Z"
                fill={palette.semantic.foreground.six}
            />
            <path
                d="M90.5 110.5C101.21 110.5 109.954 102.081 110.475 91.4999C110.503 90.9482 110.052 90.5 109.5 90.5H90.5H51.5C50.9477 90.5 50.5026 90.9482 50.4754 91.4999C49.9545 102.081 41.2104 110.5 30.5 110.5H90.5Z"
                fill={palette.semantic.foreground.primary}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M53 39.25C48.1675 39.25 44.25 43.1675 44.25 48C44.25 52.8325 48.1675 56.75 53 56.75C57.8325 56.75 61.75 52.8325 61.75 48C61.75 43.1675 57.8325 39.25 53 39.25ZM36.75 48C36.75 39.0254 44.0254 31.75 53 31.75C61.9746 31.75 69.25 39.0254 69.25 48C69.25 56.9746 61.9746 64.25 53 64.25C49.8713 64.25 46.9491 63.3658 44.4697 61.8336L38.1517 68.1516C36.6872 69.6161 34.3128 69.6161 32.8483 68.1516C31.3839 66.6872 31.3839 64.3128 32.8483 62.8483L39.1664 56.5303C37.6342 54.0509 36.75 51.1287 36.75 48Z"
                fill={palette.semantic.foreground.primary}
            />
        </svg>
    );
};

type Props = {
    handleTabChange: (document_id: string) => void;

    // onAdded: (document: DocumentCreateRequest) => void;
};

export default function DocumentsEmptyState({ handleTabChange }: Props) {
    const chooseDocumentTypeDialog = useChooseDocumentTypeDialog();

    const {
        entityId,
        entityType,
        documentsList
    } = useDocumentsContext();

    const exclude_document_types = useMemo(
        () => documentsList.map((doc) => doc.documentTypeId),
        [documentsList]
    );

    const onAdded = (document: DocumentCreateRequest) => {
        handleTabChange(document.documentTypeId);
    };

    const addDocumentOnEmptyScreen: FallbackCreateClickAction = () => {
        chooseDocumentTypeDialog.open({
            entity_id  : entityId,
            entity_type: entityType,
            isDialog   : true,
            exclude_document_types,
            onAdded
        });
    };

    return (
        <FallbackContent
            icon={<Icon />}
            onClick={addDocumentOnEmptyScreen}
            buttonText="core:documents.empty_state.button_text"
            firstText="core:documents.empty_state.first_text"
            secondText="core:documents.empty_state.second_text"
        />
    );
}
