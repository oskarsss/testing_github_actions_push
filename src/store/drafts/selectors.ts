import { RootState } from '../types';

export const DraftSelectedDraftIdSelector = (state: RootState) => state.drafts.selectedDraftId;

export const DraftExtractByDefaultSelector = (state: RootState) =>
    state.drafts.extract.extractByDefault;

export const DraftIsCreatingSelector = (state: RootState) => state.drafts.isCreateLoading;

export const DraftsLoadOwnerSelector = (state: RootState) => state.drafts.loadOwner;

export const DraftsHasDuplicateErrorSelector = (state: RootState) => state.drafts.hasDuplicateError;

export const DraftsIsUploadingDocumentSelector = (state: RootState) =>
    state.drafts.isUploadingDocument;

export const DraftsIsExtractingSelector = (state: RootState) =>
    state.drafts.extract.isExtractLoading;

export const DraftsSameFriendlyManifestId = (state: RootState) =>
    state.drafts.sameFriendlyManifestId;
