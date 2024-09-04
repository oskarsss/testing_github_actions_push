import { IconButton, SxProps, Theme, useMediaQuery } from '@mui/material';
import { MouseEvent, ReactNode, useMemo } from 'react';
import { hasNonEmptyArray } from '@/utils/has-non-empty-array';
import Tooltip from '@mui/material/Tooltip';
import VectorIcons from '@/@core/icons/vector_icons';
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import AddIcon from '@mui/icons-material/Add';
import type Export from '@/store/export/types';
import { useExportDialog } from '@/@core/components/export-dialog/Export';
import IosShareIcon from '@mui/icons-material/IosShare';
import ImportType from '@/store/import/types';
import { useImportDialog } from '@/@core/components/import-dialog';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { applyTestId } from '@/configs/tests';
import useAdvancedUpdateFilters from '@/hooks/useAdvancedUpdateFilters';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import MenuComponents from '@/@core/ui-kits/menus';
import LoadDraftsGrpcService from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';
import { useNewLoadsDialog } from '@/views/new-loads/NewLoads';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import useUpdateSearchFilters from '@/hooks/search-params-filters/useUpdateSearchFilters';
import EntitiyFilters from '@/@core/components/filters/filter-button/types';

export const ButtonPrimary = styled(MuiButton)(() => ({
    fontWeight    : 500,
    minHeight     : 48,
    display       : 'flex',
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems    : 'center',
    whiteSpace    : 'nowrap',
    fontSize      : 16,
    borderRadius  : 8,
    minWidth      : 120,

    // boxShadow     : '0 12px 48px rgba(34, 103, 255, 0.2) !important',
    // '&:hover': {
    //     boxShadow: '0 12px 48px rgba(34, 103, 255, 0.35) !important'
    // },

    '.MuiSvgIcon-root': {
        width : '24px',
        height: '24px'
    }
}));

type PrimaryProps = {
    size?: 'small' | 'medium' | 'large';
    sx?: SxProps<Theme>;
    icon?: ReactNode;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    title: IntlMessageKey;
    testID?: string;
    variant?: 'text' | 'outlined' | 'contained';
    disabled?: boolean;
};

/**
 * is the Primary button has variant = 'contained' by default.
 */
function Primary({
    size = 'small',
    sx,
    icon,
    onClick,
    title,
    testID,
    disabled = false,
    variant = 'contained'
}: PrimaryProps) {
    const { t } = useAppTranslation();
    return (
        <ButtonPrimary
            {...applyTestId(testID)}
            variant={variant}
            disabled={disabled}
            size={size}
            color="primary"
            startIcon={icon}
            onClick={onClick}
            sx={sx}
        >
            {t(title)}
        </ButtonPrimary>
    );
}

type ButtonSize = 'small' | 'medium' | 'large';

type SecondaryProps = {
    size?: ButtonSize;
    icon: ReactNode;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    title: IntlMessageKey;
    testID?: string;
    variant?: 'text' | 'outlined' | 'contained';
    disabled?: boolean;
};

const ButtonSecondary = styled(MuiButton)<{ size: ButtonSize }>(({ size }) => ({
    height      : size === 'medium' ? 48 : 40,
    flexShrink  : 0,
    fontSize    : '16px',
    borderRadius: '8px',
    padding     : '2px 16px',

    '.MuiSvgIcon-root': {
        width : '24px',
        height: '24px'
    }
}));

const ButtonIcon = styled(IconButton)(({ theme }) => ({
    height      : 48,
    width       : 48,
    minWidth    : 48,
    flexShrink  : 0,
    borderRadius: '8px',
    padding     : '2px',
    border      : `1px solid ${theme.palette.semantic.border.brand.primary}`,

    '.MuiSvgIcon-root': {
        width : '24px',
        height: '24px'
    }
}));

/**
 * is the Secondary button has variant = 'outlined' by default.
 */
function Secondary({
    size = 'medium',
    icon,
    onClick,
    title,
    testID,
    disabled = false,
    variant = 'outlined'
}: SecondaryProps) {
    const { t } = useAppTranslation();
    return (
        <ButtonSecondary
            {...applyTestId(testID)}
            variant={variant}
            disabled={disabled}
            size={size}
            startIcon={icon}
            onClick={onClick}
        >
            {t(title)}
        </ButtonSecondary>
    );
}

const ButtonFilter = styled(MuiButton, {
    shouldForwardProp: (prop) => prop !== 'isDirty'
})<{ isDirty: boolean }>(({
    theme,
    isDirty
}) => ({
    padding   : '4px 8px',
    lineHeight: 1.5,
    minWidth  : '32px',
    minHeight : '40px',

    '.MuiButton-startIcon': {
        margin: 0,
        svg   : {
            path: {
                fill: isDirty
                    ? theme.palette.semantic.foreground.brand.primary
                    : theme.palette.semantic.text.disabled
            }
        }
    }
}));

const WrapClearFilter = styled('div')({
    margin : '0 0 0 auto',
    display: 'flex'
});

const TextBtn = styled('span')(() => ({
    position  : 'relative',
    top       : '1px',
    marginLeft: '4px'
}));

type ClearFilterProps = {
    filter_id: string;
    default_filters: object;
    selected_filters: object;
    updateType?: 'redux' | 'search';
};

/**
 * checks for filter changes and clears if clicked.
 */
function ClearFilter({
    filter_id,
    default_filters,
    selected_filters,
    updateType = 'search'
}: ClearFilterProps) {
    const { t } = useAppTranslation();
    const show_text_btn = useMediaQuery('(min-width: 2100px)');
    const updateFilters = useAdvancedUpdateFilters({ filter_id });

    const updateSearchFilters = useUpdateSearchFilters(default_filters);

    const clearFilters = () => {
        if (updateType === 'search') {
            updateSearchFilters(default_filters);
            return;
        }
        updateFilters(default_filters);
    };

    const isDirty = useMemo(() => {
        if (
            'start_date' in selected_filters &&
            'end_date' in selected_filters &&
            'start_date' in default_filters &&
            'end_date' in default_filters
        ) {
            return (
                selected_filters.start_date !== default_filters.start_date ||
                selected_filters.end_date !== default_filters.end_date ||
                hasNonEmptyArray(selected_filters)
            );
        }
        if (
            'start_at' in selected_filters &&
            'end_at' in selected_filters &&
            'start_at' in default_filters &&
            'end_at' in default_filters
        ) {
            return (
                selected_filters.start_at !== default_filters.start_at ||
                selected_filters.end_at !== default_filters.end_at ||
                hasNonEmptyArray(selected_filters)
            );
        }

        return hasNonEmptyArray(selected_filters);
    }, [selected_filters]);

    return (
        <Tooltip
            disableInteractive
            title={t('core:filters.clear_filters')}
        >
            <WrapClearFilter>
                <ButtonFilter
                    disabled={!isDirty}
                    onClick={clearFilters}
                    startIcon={<VectorIcons.Garbage />}
                    isDirty={isDirty}
                >
                    {show_text_btn && <TextBtn>{t('core:filters.clear_filters')}</TextBtn>}
                </ButtonFilter>
            </WrapClearFilter>
        </Tooltip>
    );
}

type CreateLoadProps = {
    testID?: string;
};

/**
 * is opens the New Load dialog.
 */
function CreateLoad({ testID }: CreateLoadProps) {
    const [createDraft, { isLoading }] = LoadDraftsGrpcService.useCreateDraftMutation();

    const newLoadsDialog = useNewLoadsDialog();

    const createLoad = () => {
        createDraft(true);
        newLoadsDialog.open({});
    };

    return (
        <PageHeadersKit.Buttons.Primary
            disabled={isLoading}
            onClick={createLoad}
            icon={<AddIcon />}
            title="core:basic.page_headers.buttons.new_load"
            size="medium"
            testID={testID}
        />
    );
}

type ExportProps = {
    exporter_id: Export.ExporterId;
    filters?: EntitiyFilters.MergedFilters;
    testID?: string;
    size?: ButtonSize;
    isNotImplemented?: boolean;
    selectedFilters?: any;
};

/**
 * is opens the Export dialog.
 */
function Export({
    exporter_id,
    filters,
    testID,
    size = 'medium',
    isNotImplemented,
    selectedFilters
}: ExportProps) {
    const dialog = useExportDialog();
    const { t } = useAppTranslation();

    const exportHandler = () => {
        dialog.open({
            exporter_id,
            filters,
            selectedFilters
        });
    };

    return (
        <Tooltip
            title={t('common:coming_soon')}
            disableHoverListener={!isNotImplemented}
            disableInteractive
        >
            {/* <span> */}
            <PageHeadersKit.Buttons.Secondary
                testID={testID}
                onClick={exportHandler}
                icon={<IosShareIcon />}
                size={size}
                title="core:basic.page_headers.buttons.export"

                // disabled={isNotImplemented}
            />
            {/* </span> */}
        </Tooltip>
    );
}

type ImportProps = {
    category_id?: ImportType.CategoryId;
    isShowSelectType?: boolean;
    testID?: string;
    size?: ButtonSize;
    isNotImplemented?: boolean;
};

/**
 * is opens the Import dialog.
 */
function Import({
    category_id,
    isShowSelectType = true,
    testID,
    size,
    isNotImplemented
}: ImportProps) {
    const importDialog = useImportDialog();
    const { t } = useAppTranslation();

    const importHandler = () => {
        importDialog.open({
            category_id,
            isShowSelectType
        });
    };

    return (
        <Tooltip
            title={t('common:coming_soon')}
            disableHoverListener={!isNotImplemented}
            disableInteractive
        >
            <span>
                <PageHeadersKit.Buttons.Secondary
                    testID={testID}
                    onClick={importHandler}
                    icon={<ExitToAppIcon />}
                    size={size}
                    disabled={isNotImplemented}
                    title="core:basic.page_headers.buttons.import"
                />
            </span>
        </Tooltip>
    );
}

const useMoreMenu = menuHookFabric(MoreImportAndExportMenu);

type MoreImportAndExportMenuProps = {
    export_item?: Omit<ExportProps, 'size' | 'testID'>;
    import_item?: Omit<ImportProps, 'testID'>;
};

function MoreImportAndExportMenu({
    export_item,
    import_item
}: MoreImportAndExportMenuProps) {
    const { t } = useAppTranslation();
    const importDialog = useImportDialog();
    const exportDialog = useExportDialog();
    const menu = useMoreMenu(true);

    if (!export_item && !import_item) {
        return null;
    }

    const onClickExport = () => {
        if (export_item) {
            exportDialog.open(export_item);
        }
        menu.close();
    };

    const onClickImport = () => {
        if (import_item) {
            importDialog.open(import_item);
        }
        menu.close();
    };

    return (
        <>
            {export_item && (
                <Tooltip
                    title={t('common:coming_soon')}
                    disableHoverListener={!export_item.isNotImplemented}
                    disableInteractive
                >
                    <span>
                        <MenuComponents.Item
                            Icon={(
                                <IosShareIcon
                                    color={export_item.isNotImplemented ? 'disabled' : 'primary'}
                                />
                            )}
                            onClick={onClickExport}
                            disabled={export_item.isNotImplemented}
                            text="core:basic.page_headers.buttons.export"
                        />
                    </span>
                </Tooltip>
            )}
            {import_item && (
                <Tooltip
                    title={t('common:coming_soon')}
                    disableHoverListener={!import_item.isNotImplemented}
                    disableInteractive
                >
                    <span>
                        <MenuComponents.Item
                            Icon={(
                                <ExitToAppIcon
                                    color={import_item.isNotImplemented ? 'disabled' : 'primary'}
                                />
                            )}
                            onClick={onClickImport}
                            disabled={import_item.isNotImplemented}
                            text="core:basic.page_headers.buttons.import"
                        />
                    </span>
                </Tooltip>
            )}
        </>
    );
}

function MoreImportAndExport({
    export_item,
    import_item
}: MoreImportAndExportMenuProps) {
    const menu = useMoreMenu();
    const onClick = (event: MouseEvent<HTMLButtonElement>) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        menu.open({
            export_item,
            import_item
        })({ ...event, clientY: bounds.bottom + 5, clientX: bounds.left });
    };
    return (
        <ButtonIcon onClick={onClick}>
            <MoreVertIcon color="primary" />
        </ButtonIcon>
    );
}

/**
 * ### Vektor Header Buttons Components:
 * #### Buttons:
 * - `ClearFilter` - is a checks for filter changes and clears if clicked.
 * - `Export` - is opens the Export dialog.
 * - `Import` - is opens the Import dialog.
 * - `Primary` - is the Primary button has variant = 'contained' by default.
 * - `Secondary` - is the Secondary button has variant = 'outlined' by default.
 * - `MoreImportAndExport` - is a button that opens a menu with Import and Export options.
 */
const HeaderButtons = {
    ClearFilter,
    CreateLoad,
    Export,
    Import,
    Primary,
    Secondary,
    MoreImportAndExport
};

export default HeaderButtons;
