import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableEditorComponents from '@/@core/components/table/TableEditor/TableEditorComponents';
import { useMemo, SyntheticEvent, MouseEvent, ReactNode } from 'react';
import Stack from '@mui/material/Stack';
import {
    useTableEditorContext,
    useTableEditorQueryContext
} from '@/@core/components/table/TableEditor/context';
import TableEditorIcons from '@/@core/components/table/TableEditor/icons';
import createMap from '@/utils/create-map';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { FieldModel_EntityType } from '@proto/models/model_field';
import { FIELD_ENTITY_TYPE_TO_DOCUMENT_ENTITY_TYPE } from '@/@core/components/table/TableEditor/table-editor-configs';

type Props = {
    children: ReactNode;
    title: string;
    expanded?: boolean;
    onChange?: (event: SyntheticEvent<unknown>, isExpanded: boolean) => void;
    hasButton?: {
        title: string;
        onClick: (event: MouseEvent<unknown>) => void;
    };
    entity_type: FieldModel_EntityType | 'settlementsCategory' | 'columns';
};

export default function Accordion({
    children,
    onChange,
    title,
    expanded,
    hasButton,
    entity_type
}: Props) {
    const { t } = useAppTranslation();
    const {
        columns,
        categories,
        documentTypes,
        fields
    } = useTableEditorQueryContext();

    const { selectedViewColumns } = useTableEditorContext();

    const amount = useMemo(() => {
        const selectedViewColumnMap = createMap(selectedViewColumns, 'columnId');
        if (entity_type === 'settlementsCategory') {
            return {
                total   : categories.length,
                selected: categories.filter(
                    (category) => category.transactionCategoryId in selectedViewColumnMap
                ).length
            };
        }

        if (entity_type === 'columns') {
            return {
                total   : columns.length,
                selected: columns.filter(({ columnId }) => columnId in selectedViewColumnMap).length
            };
        }

        const entitiesFields = fields.filter(({ entityType }) => entityType === entity_type);

        const selectedFields = entitiesFields.filter(
            ({ fieldId }) => fieldId in selectedViewColumnMap
        );

        const entitiesDocuments = documentTypes.filter(
            ({ entityType }) =>
                entityType === FIELD_ENTITY_TYPE_TO_DOCUMENT_ENTITY_TYPE[entity_type]
        );

        const selectedDocuments = entitiesDocuments.filter(
            ({ documentTypeId }) => documentTypeId in selectedViewColumnMap
        );

        return {
            total   : entitiesDocuments.length + entitiesFields.length,
            selected: selectedDocuments.length + selectedFields.length
        };
    }, [selectedViewColumns, entity_type, fields, documentTypes, categories, columns]);

    return (
        <TableEditorComponents.Accordion.ViewAccordion
            onChange={onChange}
            expanded={expanded && expanded}
            sx={{
                maxHeight: 'none !important'
            }}
        >
            <TableEditorComponents.Accordion.Summary expandIcon={<ExpandMoreIcon />}>
                <Stack
                    direction="row"
                    width="100%"
                    alignItems="center"
                    justifyContent="flex-start"
                >
                    {entity_type === FieldModel_EntityType.FIELD_ENTITY_TYPE_TRUCK && (
                        <TableEditorIcons.TruckAccordion />
                    )}
                    {entity_type === FieldModel_EntityType.FIELD_ENTITY_TYPE_DRIVER && (
                        <TableEditorIcons.DriverAccordion />
                    )}
                    {entity_type === FieldModel_EntityType.FIELD_ENTITY_TYPE_TRAILER && (
                        <TableEditorIcons.TrailerAccordion />
                    )}
                    <Stack direction="column">
                        <Typography
                            variant="subtitle1"
                            fontWeight="500"
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color="text.secondary"
                        >
                            {amount.selected}/{amount.total}{' '}
                            {t('core:table.table_editor.columns.selected')}
                        </Typography>
                    </Stack>
                    {hasButton && (
                        <Button
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                hasButton.onClick(e);
                            }}
                        >
                            {hasButton.title}
                        </Button>
                    )}
                </Stack>
            </TableEditorComponents.Accordion.Summary>
            <TableEditorComponents.Accordion.Details>
                <TableEditorComponents.Accordion.DetailsStack>
                    {children}
                </TableEditorComponents.Accordion.DetailsStack>
            </TableEditorComponents.Accordion.Details>
        </TableEditorComponents.Accordion.ViewAccordion>
    );
}
