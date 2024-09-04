import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import { styled } from '@mui/material/styles';
import Documents from '@/store/documents/types';
import SettingsEmptyScreen, { FallbackType } from '@/views/settings/components/SettingsEmptyScreen';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import TableHeader from './TableHeader';
import TableDropableContent from './TableDropableContent';

const TableWrapperStyled = styled('div')({
    width    : '100%',
    height   : '100%',
    marginTop: 0,
    overflow : 'auto',
    overflowX: 'auto',
    display  : 'flex',
    flexFlow : 'column',
    flex     : '1 1 100%',
    position : 'relative',
    border   : 'none'
});

const reorder = (
    list: Documents.DocumentType[],
    startIndex: number,
    endIndex: number
): Documents.DocumentType[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

type Props = {
    isLoading: boolean;
    value: DocumentModel_DocumentEntityType | '';
    isChangeOrder: boolean;
    entityDocumentTypes: Documents.DocumentType[];
    setEntityDocumentTypes: (value: Documents.DocumentType[]) => void;
    openTypeDialog: () => void;
};

export default function TableWrapper({
    isLoading,
    value,
    isChangeOrder,
    entityDocumentTypes,
    setEntityDocumentTypes,
    openTypeDialog
}: Props) {
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(entityDocumentTypes, result.source.index, result.destination.index);

        setEntityDocumentTypes(items);
    };

    if (isLoading) {
        return (
            <Preloader
                sx={{
                    height: '100%'
                }}
            />
        );
    }

    if (!entityDocumentTypes.length) {
        return (
            <SettingsEmptyScreen
                type={FallbackType.DOCUMENT_TYPES}
                onClickFallback={openTypeDialog}
            />
        );
    }

    return (
        <TableWrapperStyled>
            <DragDropContext onDragEnd={onDragEnd}>
                <MiniTableStyled.Container sx={{ overflow: 'auto' }}>
                    <MiniTableStyled.CommonTable
                        stickyHeader
                        size="small"
                        width="100%"
                    >
                        <TableHeader
                            value={value}
                            isChangeOrder={isChangeOrder}
                        />

                        <TableDropableContent
                            value={value}
                            isChangeOrder={isChangeOrder}
                            entityDocumentTypes={entityDocumentTypes}
                        />
                    </MiniTableStyled.CommonTable>
                </MiniTableStyled.Container>
            </DragDropContext>
        </TableWrapperStyled>
    );
}
