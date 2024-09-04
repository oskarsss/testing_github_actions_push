/* eslint-disable import/no-duplicates */
import {
    MouseEvent,
    ChangeEvent,
    MutableRefObject,
    SyntheticEvent,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import Checkbox from '@/@core/components/table/TableEditor/reused-components/Checkbox';
import TableEditorComponents, {
    Text
} from '@/@core/components/table/TableEditor/TableEditorComponents';
import { Box, Button, Typography } from '@mui/material';
import {
    useTableEditorContext,
    useTableEditorPropsContext,
    useTableEditorQueryContext
} from '@/@core/components/table/TableEditor/context';

import { useFieldMenu } from '@/@core/components/table/TableEditor/menus/FieldMenu/FieldMenu';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ScrollBar from 'react-perfect-scrollbar';
import Stack from '@mui/material/Stack';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import {
    FIELD_ENTITY_TYPE_TO_DOCUMENT_ENTITY_TYPE,
    TRANSLATE_FIELD_ENTITY_TYPE,
    TRANSLATE_PAGE_TYPE
} from '@/@core/components/table/TableEditor/table-editor-configs';
import { FieldGetReply_Field } from '@proto/field';
import { FieldModel_EntityType } from '@proto/models/model_field';
import PageColumnsFields from '@/@core/components/table/TableEditor/components/TableView/components/PageColumnsFields';
import Search from './Search';
import Accordion from './Accordion';
import ButtonGroup from './ButtonGroup';

export default function PageColumns() {
    const fieldMenu = useFieldMenu();
    const scrollBarRef: MutableRefObject<null | ScrollBar> = useRef<null | ScrollBar>(null);

    const router = useRouter();

    const isSettlementsPage = router.asPath.includes('settlements');

    const {
        page,
        viewId
    } = useTableEditorPropsContext();
    const {
        selectedViewColumns,
        updateCheckedInColumns
    } = useTableEditorContext();
    const {
        entities,
        documentTypes,
        fields
    } = useTableEditorQueryContext();

    const selectedViewColumnsIds = useMemo(
        () => selectedViewColumns.map((column) => column.columnId),
        [selectedViewColumns]
    );

    const {
        columns,
        categories
    } = useTableEditorQueryContext();

    const { t } = useAppTranslation();

    const [entity_type, setEntityType] = useState(
        FieldModel_EntityType.FIELD_ENTITY_TYPE_UNSPECIFIED
    );
    const [searchValue, setSearchValue] = useState('');
    const [expanded, setExpanded] = useState<(FieldModel_EntityType | string)[]>([
        ...entities.slice(0, 1),
        'columns',
        'settlementsCategory'
    ]);

    useEffect(() => {
        setSearchValue('');
    }, [viewId]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleChangeAccordion =
        (panel: FieldModel_EntityType | string) =>
            (_: SyntheticEvent<unknown>, isExpanded: boolean) => {
                setExpanded((prevState) =>
                    isExpanded ? [...prevState, panel] : prevState.filter((p) => p !== panel));
            };

    const openEditFieldMenu = (
        event: MouseEvent<HTMLDivElement | HTMLButtonElement>,
        field: FieldGetReply_Field
    ) => {
        fieldMenu.open({
            field,
            entities,
            page
        })(event);
    };

    const openAddFieldMenu = (
        event: MouseEvent<HTMLDivElement | HTMLButtonElement>,
        entity_type: FieldModel_EntityType
    ) => {
        setEntityType(entity_type);
        fieldMenu.open({
            entities,
            page,
            defaultValues: {
                entity_type
            }
        })(event);
    };

    const filteredAvailableCategories = useMemo(() => {
        if (searchValue.trim() === '') return categories;
        return categories.filter((category) =>
            category.name.toLowerCase().includes(searchValue.toLowerCase()));
    }, [categories, searchValue]);

    const filteredAvailableColumns = useMemo(() => {
        if (searchValue.trim() === '') return columns;
        return columns.filter((column) =>
            column.name.toLowerCase().includes(searchValue.toLowerCase()));
    }, [searchValue, columns]);

    const filteredAvailableFields = useMemo(() => {
        if (searchValue.trim() === '') return fields;
        return fields.filter((field) =>
            field.name.toLowerCase().includes(searchValue.toLowerCase()));
    }, [fields, searchValue]);

    const filteredAvailableDocumentTypes = useMemo(() => {
        if (searchValue.trim() === '') return documentTypes;
        return documentTypes.filter((doc) =>
            doc.title.toLowerCase().includes(searchValue.toLowerCase()));
    }, [searchValue, documentTypes]);

    const checkedIcon = useMemo(() => <AssignmentTurnedInIcon />, []);
    const unCheckedIcon = useMemo(() => <ContentPasteIcon />, []);

    return (
        <>
            <Search
                searchValue={searchValue}
                handleChange={handleChange}
            />
            <PerfectScrollbar
                options={{
                    wheelSpeed      : 1,
                    wheelPropagation: false
                }}
                style={{ width: '100%', marginTop: '8px' }}
                ref={(ref) => {
                    scrollBarRef.current = ref;
                }}
            >
                <Box mt="16px">
                    <Accordion
                        entity_type="columns"
                        title={t('core:table.table_editor.columns.main_title', {
                            page: t(TRANSLATE_PAGE_TYPE[page])
                        })}
                        expanded={expanded.includes('columns')}
                        onChange={handleChangeAccordion('columns')}
                    >
                        <Stack
                            spacing={{
                                xs: 1,
                                sm: 2
                            }}
                            direction="row"
                            useFlexGap
                            flexWrap="wrap"
                            sx={{ padding: '12px 14px 24px 24px' }}
                        >
                            {filteredAvailableColumns.length > 0 ? (
                                filteredAvailableColumns.map((col) => (
                                    <Checkbox
                                        key={col.columnId}
                                        name={col.name}
                                        unique_key={col.columnId}
                                        isChecked={selectedViewColumnsIds.includes(col.columnId)}
                                        onChange={updateCheckedInColumns}
                                        sx={{ pr: '8px' }}
                                    />
                                ))
                            ) : (
                                <Text>{t('core:table.table_editor.columns.no_results')}</Text>
                            )}
                        </Stack>
                    </Accordion>

                    {/* OTHER COLUMNS, CUSTOM FIELDS AND DOC TYPESs */}

                    <>
                        {entities.map((entity_type) => (
                            <Accordion
                                entity_type={entity_type}
                                key={entity_type}
                                title={t('core:table.table_editor.columns.title', {
                                    entityType: t(TRANSLATE_FIELD_ENTITY_TYPE[entity_type])
                                })}
                                expanded={expanded.includes(entity_type)}
                                onChange={handleChangeAccordion(entity_type)}
                            >
                                <TableEditorComponents.SubSection>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="500"
                                    >
                                        {t('core:table.table_editor.columns.sub_title', {
                                            entityType: t(TRANSLATE_FIELD_ENTITY_TYPE[entity_type])
                                        })}
                                    </Typography>
                                </TableEditorComponents.SubSection>
                                <Stack
                                    spacing={{
                                        xs: 1,
                                        sm: 2
                                    }}
                                    direction="row"
                                    useFlexGap
                                    flexWrap="wrap"
                                    sx={{ padding: '12px 14px 24px 24px' }}
                                >
                                    {filteredAvailableDocumentTypes.length > 0 ? (
                                        filteredAvailableDocumentTypes
                                            .filter(
                                                (doc_type) =>
                                                    doc_type.entityType ===
                                                    FIELD_ENTITY_TYPE_TO_DOCUMENT_ENTITY_TYPE[
                                                        entity_type
                                                    ]
                                            )
                                            .map((doc_type) => (
                                                <Checkbox
                                                    key={doc_type.documentTypeId}
                                                    isChecked={selectedViewColumnsIds.includes(
                                                        doc_type.documentTypeId
                                                    )}
                                                    unique_key={doc_type.documentTypeId}
                                                    name={doc_type.title}
                                                    icon={unCheckedIcon}
                                                    checkedIcon={checkedIcon}
                                                    onChange={updateCheckedInColumns}
                                                    sx={{ pr: '8px' }}
                                                />
                                            ))
                                    ) : (
                                        <Text>
                                            {t('core:table.table_editor.columns.no_results')}
                                        </Text>
                                    )}
                                </Stack>
                                <TableEditorComponents.SubSection>
                                    {t('core:table.table_editor.columns.custom_fields')}
                                    <Button
                                        size="small"
                                        onClick={(event) => openAddFieldMenu(event, entity_type)}
                                        startIcon={<AddIcon fontSize="small" />}
                                    >
                                        {t('common:button.add')}
                                    </Button>
                                </TableEditorComponents.SubSection>

                                <PageColumnsFields
                                    openEditFieldMenu={openEditFieldMenu}
                                    updateCheckedInColumns={updateCheckedInColumns}
                                    emptyText={t('core:table.table_editor.columns.no_results')}
                                    selectedViewColumnsIds={selectedViewColumnsIds}
                                    fields={filteredAvailableFields.filter((el) =>
                                        el.type ? el.entityType === entity_type : true)}
                                />
                            </Accordion>
                        ))}
                    </>

                    {/* CATEGORIES */}
                    {isSettlementsPage && (
                        <Accordion
                            entity_type="settlementsCategory"
                            key={entity_type}
                            title="Categories"
                            expanded={expanded.includes('settlementsCategory')}
                            onChange={handleChangeAccordion('settlementsCategory')}
                        >
                            {filteredAvailableCategories.length > 0 ? (
                                filteredAvailableCategories.map((category) => (
                                    <Checkbox
                                        key={category.transactionCategoryId}
                                        isChecked={selectedViewColumnsIds.includes(
                                            category.transactionCategoryId
                                        )}
                                        unique_key={category.transactionCategoryId}
                                        name={category.name}
                                        icon={unCheckedIcon}
                                        checkedIcon={checkedIcon}
                                        onChange={updateCheckedInColumns}
                                        sx={{ pr: '8px' }}
                                    />
                                ))
                            ) : (
                                <Text>{t('core:table.table_editor.columns.no_results')}</Text>
                            )}
                        </Accordion>
                    )}
                </Box>
            </PerfectScrollbar>
            <ButtonGroup />
        </>
    );
}
