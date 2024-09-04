import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback } from 'react';
import DraftsTypes from '@/store/drafts/types';
import LoadDraftsGrpcService from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';
import { UseFormGetValues, UseFormReset } from 'react-hook-form';
import {
    DraftExtractByDefaultSelector,
    DraftSelectedDraftIdSelector
} from '@/store/drafts/selectors';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { api } from '@/store/api';
import { generateInvoiceItem, generateStopItem } from '../utils/default-value-generators';

type Props = {
    getValues: UseFormGetValues<DraftsTypes.Fields>;
    reset: UseFormReset<DraftsTypes.Fields>;
};

export const newLoadDefaultValue: DraftsTypes.Fields = {
    customerId             : '',
    dispatcherId           : '',
    brokerId               : '',
    note                   : '',
    commodity              : '',
    invoiceNote            : '',
    equipmentTypeId        : '',
    emptyMiles             : 0,
    loadedMiles            : 0,
    rateConUrl             : '',
    rateConFileName        : '',
    referenceId            : '',
    settlementRevenueTypeId: '',
    typeId                 : '',
    invoiceItems           : [generateInvoiceItem()],
    weight                 : 42000,
    temperature            : 0,
    stops                  : [generateStopItem('pickup', 1), generateStopItem('dropoff', 2)],
    brokerContactEmail     : ''
};

export default function useExtractFile({
    getValues,
    reset
}: Props) {
    const selectedDraftId = useAppSelector(DraftSelectedDraftIdSelector);
    const extractByDefault = useAppSelector(DraftExtractByDefaultSelector);
    const dispatch = useAppDispatch();
    const [startExtract] = LoadDraftsGrpcService.useStartExtractMutation();
    const { t } = useAppTranslation();

    return useCallback(
        async (url: string) => {
            if (!extractByDefault) return;
            try {
                await startExtract({
                    fileName   : getValues('rateConFileName'),
                    filePath   : url,
                    loadDraftId: selectedDraftId
                }).unwrap();
                dispatch(api.util.invalidateTags([{ id: selectedDraftId, type: 'draft' }]));
            } catch (error) {
                toast.error(t('common:error'));
            }
        },
        [extractByDefault, startExtract, getValues, selectedDraftId, dispatch, t]
    );
}
