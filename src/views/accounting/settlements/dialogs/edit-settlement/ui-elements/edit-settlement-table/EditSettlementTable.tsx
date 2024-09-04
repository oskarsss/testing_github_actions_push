/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable max-len */
import { MouseEvent, useMemo } from 'react';
import SettlementsTypes from '@/store/accounting/settlements/types';
import SettlementRecurringTransactionGrpcService from '@/@grpcServices/services/settlements-service/settlement-recurring-transactions.service';
import { useStableArray } from '@/hooks/useStable';
import { Column, ColumnsConfig, PropsForAction } from './types';
import { Wrapper } from './EditSettlementTable.styled';
import EmptySectionContent from './components/EmptySectionContent';
import TableContent from './components/TableContent';
import { useEditSettlementContext } from '../../EditSettlement';

export type SectionNameType =
    | keyof Pick<
          SettlementsTypes.CycleSettlementDetails.Settlement,
          | 'manifestsInfo'
          | 'fuelInfo'
          | 'tollsInfo'
          | 'driverRecurringTransactionsInfo'
          | 'transactionsInfo'

          //   | 'loadsInfo' // TODO: DELETE THIS
      >;

type Props = {
    columnsConfig: ColumnsConfig;
    executeAction: (name: string, props: PropsForAction) => void;
    sectionName: SectionNameType;
    turnOffAssignInfo?: boolean;
    totalsAssign?: Record<string, string>;
};

export default function EditSettlementTable({
    columnsConfig,
    executeAction,
    sectionName,
    turnOffAssignInfo = false,
    totalsAssign
}: Props) {
    const {
        settlement,
        isDisabledEdit
    } = useEditSettlementContext();

    const recurringTransactions =
        SettlementRecurringTransactionGrpcService.endpoints.getRecurringTransactions.useQueryState(
            {}
        );
    const recurringTransactionsData = useStableArray(
        recurringTransactions.data?.recurringTransactions
    );

    const [assigned, unassigned]: [any[], any[]] = useMemo(() => {
        const items = columnsConfig.getItems(settlement, recurringTransactionsData);
        if (turnOffAssignInfo) {
            return [items, []];
        }
        const assigned = items.filter((item) => item.settlementId);
        const unassigned = items.filter((item) => !item.settlementId);
        return [assigned, unassigned];
    }, [columnsConfig, settlement, recurringTransactionsData, turnOffAssignInfo]);

    const isEmptySection = assigned.length === 0 && unassigned.length === 0;

    return (
        <EditSettlementTableView
            assigned={assigned}
            columnsConfig={columnsConfig}
            executeAction={executeAction}
            isDisabledEdit={isDisabledEdit}
            isEmptySection={isEmptySection}
            sectionName={sectionName}
            unassigned={unassigned}
            totalsAssign={totalsAssign}
        />
    );
}

type CustomTableViewProps = {
    columnsConfig: ColumnsConfig;
    executeAction: (name: string, props: PropsForAction) => void;
    assigned: any[];
    unassigned: any[];
    sectionName: SectionNameType;
    isDisabledEdit: boolean;
    isEmptySection: boolean;
    style?: React.CSSProperties;
    totalsAssign?: Record<string, string>;
};

export function EditSettlementTableView({
    columnsConfig,
    executeAction,
    assigned,
    sectionName,
    unassigned,
    isDisabledEdit,
    isEmptySection,
    style = {},
    totalsAssign
}: CustomTableViewProps) {
    const onClickCell = (event: MouseEvent<HTMLTableCellElement>, column: Column, row: unknown) => {
        if (!isDisabledEdit) {
            if (column.onClick) {
                column.onClick(row, {
                    executeAction,
                    event
                });
            }
        }
    };

    return (
        <Wrapper
            style={style}
            elevation={0}
        >
            {!isEmptySection ? (
                <TableContent
                    isDisabledEdit={isDisabledEdit}
                    executeAction={executeAction}
                    assigned_array={assigned}
                    unassigned_array={unassigned}
                    columnsConfig={columnsConfig}
                    onClickCell={onClickCell}
                    totalsAssign={totalsAssign}
                />
            ) : (
                <EmptySectionContent sectionName={sectionName} />
            )}
        </Wrapper>
    );
}
