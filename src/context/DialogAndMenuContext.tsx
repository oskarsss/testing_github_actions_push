import React, {
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState
} from 'react';

type DefaultProps = Record<string, any>;

type RenderListItem<PropsType extends DefaultProps = DefaultProps> = {
    Wrapper: React.FunctionComponent<PropsWithChildren>;
    WrpapperProps: PropsType;
    Content: JSX.Element | null;
    key: string;
    opened: number;
};

type AddWrapper<PropsType extends DefaultProps = DefaultProps> = (config: {
    Wrapper: React.FunctionComponent<PropsWithChildren<PropsType>>;
    Content?: JSX.Element;
    Props: PropsType;
    key: string;
}) => void;

type EditWrapper<PropsType extends DefaultProps = DefaultProps> = (config: {
    Wrapper?: React.FunctionComponent<PropsWithChildren<PropsType>>;
    Props?: Partial<PropsType>;
    setProps?: (props: PropsType) => PropsType;
    open?: boolean;
    key: string;
}) => void;

type RemoveWrapper = (key: string) => void;

type SetContent = (key: string, content: JSX.Element) => void;

type RemoveContent = (key: string) => void;

type ContextValues<PropsType extends DefaultProps = object> = {
    addWrapper: AddWrapper<PropsType>;
    editWrapper: EditWrapper<Partial<PropsType>>;
    removeWrapper: RemoveWrapper;
    setContent: SetContent;
    removeContent: RemoveContent;
};

const getLastOpened = (list: Map<string, RenderListItem>) => {
    const opened = Math.max(...[...list.values()].map(({ opened }) => opened));
    return opened;
};

const ExternalRenderContext = createContext<ContextValues<any>>({
    addWrapper   : () => {},
    editWrapper  : () => {},
    removeWrapper: () => {},
    setContent   : () => {},
    removeContent: () => {}
});

export function useMenuAndDialogContext<PropsType extends DefaultProps>() {
    return useContext<ContextValues<PropsType>>(ExternalRenderContext);
}

const DialogAndMenuProvider = ({ children }: PropsWithChildren) => {
    const [renderedList, setRenderedList] = useState<Map<string, RenderListItem>>(new Map());

    const addWrapper: AddWrapper = useCallback(({
        Wrapper,
        Props,
        Content = null,
        key
    }) => {
        setRenderedList((prev) => {
            const list = new Map(prev);
            list.set(key, {
                Wrapper,
                opened       : 0,
                WrpapperProps: Props,
                Content,
                key
            });
            return list;
        });
    }, []);

    const editWrapper: EditWrapper = useCallback(({
        Wrapper,
        Props,
        setProps,
        open,
        key
    }) => {
        setRenderedList((prev) => {
            const list = new Map(prev);
            const item = list.get(key);
            if (item) {
                const newOpen = open ? getLastOpened(prev) + 1 : 0;
                const newProps = setProps ? setProps(item?.WrpapperProps) : null;
                const itemCopy = {
                    ...item,
                    WrpapperProps: newProps || { ...item.WrpapperProps, ...Props },
                    Wrapper      : Wrapper || item.Wrapper,
                    opened       : open !== undefined ? newOpen : item.opened
                };
                list.set(key, itemCopy);
            }
            return list;
        });
    }, []);

    const removeWrapper: RemoveWrapper = useCallback((key) => {
        setRenderedList((prev) => {
            const list = new Map(prev);
            list.delete(key);
            return list;
        });
    }, []);

    const setContent: SetContent = useCallback((key, content) => {
        setRenderedList((prev) => {
            const list = new Map(prev);
            const item = list.get(key);
            if (item) {
                item.Content = content;
                item.opened = getLastOpened(prev) + 1;
                item.WrpapperProps.open = Boolean(item.opened);
                item.key = item.opened ? `${key}-${item.opened}` : key;
            }
            return list;
        });
    }, []);

    const removeContent: RemoveContent = useCallback((key) => {
        setRenderedList((prev) => {
            const list = new Map(prev);
            const item = list.get(key);
            if (item) {
                item.Content = null;
                item.opened = 0;
                item.key = key;
            }
            return list;
        });
    }, []);

    const value = useMemo(
        () => ({
            addWrapper,
            editWrapper,
            removeWrapper,
            setContent,
            removeContent
        }),
        [addWrapper, editWrapper, removeWrapper, setContent, removeContent]
    );

    const sortedList = useMemo(() => {
        const listCopy = [...renderedList.values()];

        listCopy.sort((a, b) => (b.opened > a.opened ? -1 : 1));
        return listCopy;
    }, [renderedList]);

    return (
        <ExternalRenderContext.Provider value={value}>
            {children}
            {sortedList.map(({
                Wrapper,
                WrpapperProps,
                Content,
                key
            }) => (
                <Wrapper
                    key={key}
                    {...WrpapperProps}
                >
                    {Content}
                </Wrapper>
            ))}
        </ExternalRenderContext.Provider>
    );
};

export default DialogAndMenuProvider;
