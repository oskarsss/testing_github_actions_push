import React, { createContext, PropsWithChildren, useCallback, useContext, useMemo } from 'react';
import TableTypes from '@/@core/components/table/types';
import FieldsGrpcService from '@/@grpcServices/services/fields.service';

type ContextType = {
    onClick: TableTypes.executeAction;
};
export const TableContext = createContext<ContextType>({
    onClick: (name: string, props: object) => {}
});

export const useTableContext = () => useContext(TableContext);

type Props<T, I extends boolean> = PropsWithChildren & {
    executeAction: TableTypes.executeAction<T, I>;
};

export default function TableContextProvider<
    TableRowType extends object = object,
    WithEvent extends boolean = false
>({
    children,
    executeAction
}: Props<TableRowType, WithEvent>) {
    const [updateField] = FieldsGrpcService.useSetFieldValueMutation();

    const onClick = useCallback(
        (name: string, props: any) => {
            switch (name) {
            case 'update_field':
                updateField(props.field);
                break;
            default:
                executeAction(name, props);
                break;
            }
        },
        [executeAction]
    );

    const value = useMemo(
        () => ({
            onClick
        }),
        [onClick]
    );

    return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
}
