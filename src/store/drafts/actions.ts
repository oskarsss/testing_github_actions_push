import LoadDraftsGrpcService, {
    LS_SELECTED_DRAFT_ID
} from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';
import { AppThunkAction } from '../types';
import { DraftsActions } from './slice';

export const selectInitialDraft =
    (drafts?: { loadDraftId: string }[]): AppThunkAction<void> =>
        (dispatch, getState) => {
            if (!drafts || !drafts.length) return;
            const { selectedDraftId } = getState().drafts;
            const storedDraftId = localStorage.getItem(LS_SELECTED_DRAFT_ID);
            if (
                !selectedDraftId &&
            storedDraftId &&
            drafts.some((draft) => draft.loadDraftId === storedDraftId)
            ) {
                dispatch(DraftsActions.SetSelectedDraftId(storedDraftId));
                return;
            }

            if (!drafts.some((draft) => draft.loadDraftId === selectedDraftId)) {
                dispatch(DraftsActions.SetSelectedDraftId(drafts[0].loadDraftId));
            }
        };

const getNewSelectedDraftId =
    (loadDraftId: string): AppThunkAction<string | null> =>
        (_, getState) => {
            const { selectedDraftId } = getState().drafts;
            const { data } = LoadDraftsGrpcService.endpoints.getDrafts.select({})(getState());
            const drafts = data?.loadDrafts || [];
            if (!drafts || drafts.length <= 1) return null;
            if (loadDraftId === selectedDraftId) {
                const index = drafts.findIndex((draft) => draft.loadDraftId === selectedDraftId);
                if (index < 0 || (!index && drafts.length === 1)) {
                    return null;
                }
                const nextIndex = index + 1 === drafts.length ? index - 1 : index + 1;
                const draft_id = drafts[nextIndex].loadDraftId;
                return draft_id;
            }
            return selectedDraftId;
        };

const deleteSelectedDraftId =
    (id: string | null): AppThunkAction<boolean> =>
        (dispatch) => {
            if (id === null) {
                dispatch(DraftsActions.SetSelectedDraftId(''));
                localStorage.removeItem(LS_SELECTED_DRAFT_ID);
            } else {
                dispatch(DraftsActions.SetSelectedDraftId(id));
                localStorage.setItem(LS_SELECTED_DRAFT_ID, id);
            }

            return !id;
        };

export const deleteDraftPreareAction =
    (draftId: string): AppThunkAction<boolean> =>
        (dispatch) => {
            const result = dispatch(getNewSelectedDraftId(draftId));
            return dispatch(deleteSelectedDraftId(result));
        };
