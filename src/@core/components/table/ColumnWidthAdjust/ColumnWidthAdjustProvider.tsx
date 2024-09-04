import { useAppDispatch } from '@/store/hooks';
import {
    Api,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta
} from '@reduxjs/toolkit/dist/query';
import { coreModuleName } from '@reduxjs/toolkit/dist/query/core/module';
import { reactHooksModuleName } from '@reduxjs/toolkit/dist/query/react/module';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import React, {
    MutableRefObject,
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';

import { ProvideTagsType } from '@/store/api_tags';
import { minWidthCell } from '@/@core/components/table/configs';
import { PageModel_Page, PageModel_View_Column_Type } from '@proto/models/model_page';
import PagesGrpcService from '@/@grpcServices/services/pages.service';
import { PageRetrieveReply } from '@proto/page';

export type AdjustWidth_PositionConfig = {
    clientX_right: number;
    clientX_left: number;
    startX: number;
    col_id: string;
    col_type: PageModel_View_Column_Type;
    getLeftPos: () => number;
    removeClass: () => void;
};

export type UpdateWidthCallback = (body: { id: string; width: number; view_id: string }) => void;

type ContextType = {
    lineRef: MutableRefObject<HTMLDivElement | null>;
    contentRef: MutableRefObject<HTMLDivElement | null>;
    containerRef: MutableRefObject<HTMLElement | null>;
    adjusterRef: MutableRefObject<HTMLDivElement | null>;
    followCursor: MutableRefObject<boolean>;
    contextExist: boolean;
    updateScroll: () => void;
    startAdjusting: (config: AdjustWidth_PositionConfig) => void;
};

export const ColumnAdjustContext = createContext<ContextType>({
    lineRef       : { current: null },
    contentRef    : { current: null },
    containerRef  : { current: null },
    adjusterRef   : { current: null },
    followCursor  : { current: false },
    contextExist  : false,
    updateScroll  : () => {},
    startAdjusting: () => {}
});

type ApiType = Api<
    BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object & RetryOptions,
        FetchBaseQueryMeta
    >,
    // eslint-disable-next-line @typescript-eslint/ban-types
    {},
    'api',
    ProvideTagsType,
    typeof coreModuleName | typeof reactHooksModuleName
>;

export const useDirectWidthUpdate = (api: ApiType, endpointName?: string, queryArgs?: unknown) => {
    const dispatch = useAppDispatch();
    const updateWidth: UpdateWidthCallback = useCallback(
        ({
            id,
            width,
            view_id
        }) => {
            dispatch(
                api.util.updateQueryData(
                    endpointName as unknown as never,
                    queryArgs as never,
                    (state: PageRetrieveReply) => {
                        const statView = state.views.find((v) => v.viewId === view_id);
                        if (statView) {
                            const column = statView.columns.find((c) => c.columnId === id);
                            if (column) {
                                column.width = width;
                            }
                        }
                    }
                )
            );
        },
        [api.util, dispatch, endpointName, queryArgs]
    );

    return updateWidth;
};

export const useColumnAdjistContext = () => useContext(ColumnAdjustContext);

type Props = PropsWithChildren & {
    tableName?: keyof typeof PageModel_Page;
    view_id: string;
    onUpdateWidth?: UpdateWidthCallback;
};

const ColumnWidthAdjustProvider = ({
    children,
    tableName,
    view_id,
    onUpdateWidth = () => {}
}: Props) => {
    const [updateColumnWidth] = PagesGrpcService.useUpdateTableWidthMutation();
    const [contextExist, setContextExist] = useState(true);
    const lineRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const adjusterRef = useRef<HTMLDivElement>(null);
    const followCursor = useRef(false);
    const newWidth = useRef(0);
    const moveConfig = useRef<AdjustWidth_PositionConfig>({
        clientX_right: 0,
        clientX_left : 0,
        getLeftPos   : () => 0,
        startX       : 0,
        col_id       : '',
        col_type     : PageModel_View_Column_Type.COLUMN_TYPE_UNSPECIFIED,
        removeClass  : () => {}
    });

    const scrollPosition = useRef(0);

    const calculateNewPosition = useCallback((clientX: number) => {
        const diff = moveConfig.current.clientX_right - moveConfig.current.startX;
        const newPosition =
            clientX + diff - (containerRef.current?.getBoundingClientRect().left || 0);
        return newPosition;
    }, []);

    const calculateWidthOnMove = (clientX: number) => {
        const diff = moveConfig.current.clientX_right - moveConfig.current.startX;
        newWidth.current = clientX + diff - moveConfig.current.getLeftPos();
    };

    const expandAdjuster = (position: number) => {
        const contentRight = contentRef.current?.getBoundingClientRect().right || 1000;
        if (position > contentRight - 100) {
            if (adjusterRef.current) {
                adjusterRef.current.style.minWidth = '300px';
                adjusterRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
            }
        }
    };

    const startAdjusting = useCallback((config: AdjustWidth_PositionConfig) => {
        moveConfig.current = config;
        followCursor.current = true;
        if (lineRef.current) {
            const position = calculateNewPosition(config.startX);
            expandAdjuster(position);
            lineRef.current.style.left = `${position}px`;
            lineRef.current.style.display = 'block';
            calculateWidthOnMove(config.startX);
            moveConfig.current.removeClass();
        }
        document.body.classList.add('col-resize-cursor');
    }, []);

    useEffect(() => {
        const listener = (ev: MouseEvent) => {
            if (!followCursor.current) return;
            ev.preventDefault();
            const newPosition = calculateNewPosition(ev.clientX);
            const minimum = moveConfig.current.getLeftPos() + minWidthCell;
            const reCalculatedNewPosition =
                newPosition + (containerRef.current?.getBoundingClientRect().left || 0);
            if (reCalculatedNewPosition < minimum) return;
            expandAdjuster(reCalculatedNewPosition);
            calculateWidthOnMove(ev.clientX);
            const linePosition = `${newPosition}px`;
            if (lineRef.current) {
                lineRef.current.style.left = linePosition;
            }
        };
        window.addEventListener('mousemove', listener);

        const mouseUpListener = (ev: MouseEvent) => {
            if (followCursor.current) {
                followCursor.current = false;
                document.body.classList.remove('col-resize-cursor');
                if (adjusterRef.current) {
                    adjusterRef.current.style.minWidth = '15px';
                }
                if (lineRef.current) {
                    lineRef.current.style.display = 'none';
                    lineRef.current.style.left = '0px';
                }
                calculateWidthOnMove(ev.clientX);
                if (newWidth.current < minWidthCell) {
                    newWidth.current = minWidthCell;
                }
                const lastWidth =
                    moveConfig.current.clientX_right - moveConfig.current.clientX_left;

                if (Math.abs(lastWidth - newWidth.current) < 3) {
                    return;
                }
                const newWidthValue = Math.round(newWidth.current);
                if (tableName) {
                    updateColumnWidth({
                        page    : PageModel_Page[tableName],
                        viewId  : view_id,
                        columnId: moveConfig.current.col_id,
                        type    : moveConfig.current.col_type,
                        width   : newWidthValue
                    });
                }
                onUpdateWidth?.({
                    id   : moveConfig.current.col_id,
                    width: newWidthValue,
                    view_id
                });
            }
        };
        window.addEventListener('mouseup', mouseUpListener);

        return () => {
            window.removeEventListener('mousemove', listener);
            window.removeEventListener('mouseup', mouseUpListener);
        };
    }, [tableName, view_id]);

    const updateScroll = useCallback(() => {
        if (!followCursor.current) return;

        const rectLeft = contentRef.current?.getBoundingClientRect().left || 0;
        const currentWidth = newWidth.current;
        const updatedWidth = rectLeft
            ? currentWidth + (scrollPosition.current - rectLeft)
            : newWidth.current;
        newWidth.current = updatedWidth;
        scrollPosition.current = rectLeft;
    }, []);

    const value = useMemo(
        () => ({
            lineRef,
            contentRef,
            containerRef,
            adjusterRef,
            followCursor,
            contextExist,
            updateScroll,
            startAdjusting
        }),
        []
    );

    return <ColumnAdjustContext.Provider value={value}>{children}</ColumnAdjustContext.Provider>;
};

export default ColumnWidthAdjustProvider;
