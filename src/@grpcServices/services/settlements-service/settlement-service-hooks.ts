import SettlementTransactionsGrpcService from '@/@grpcServices/services/settlements-service/settlement-transactions.service';
import { SettlementTransactionCategoryModel_EntityType } from '@proto/models/model_settlement.transaction_category';
import { useStableArray } from '@/hooks/useStable';

type SettlementTransactionsHistory = {
    entityType: SettlementTransactionCategoryModel_EntityType;
    entityId: string;
};

export default function useSettlementTransactionsHistory({
    entityType,
    entityId
}: SettlementTransactionsHistory) {
    const {
        data,
        ...rest
    } =
        SettlementTransactionsGrpcService.useSettlementTransactionsHistoryGetQuery({
            entityId,
            entityType
        });

    const transactionsHistory = useStableArray(data?.transactionsInfo?.transactions);
    const totalAmount = data?.transactionsInfo?.totalAmount ?? '0$';

    return {
        transactionsHistory,
        totalAmount,
        ...rest
    };
}
