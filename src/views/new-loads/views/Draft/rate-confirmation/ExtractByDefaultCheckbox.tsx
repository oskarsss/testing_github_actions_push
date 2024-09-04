import FormControlLabel from '@mui/material/FormControlLabel';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { DraftsActions } from '@/store/drafts/slice';
import {
    DraftExtractByDefaultSelector,
    DraftsIsExtractingSelector,
    DraftsSameFriendlyManifestId
} from '@/store/drafts/selectors';
import { ChangeEvent } from 'react';
import SYSTEM from '@/@system';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const ExtractByDefault = () => {
    const extractByDefault = useAppSelector(DraftExtractByDefaultSelector);
    const sameFriendlyManifestId = useAppSelector(DraftsSameFriendlyManifestId);
    const { t } = useAppTranslation();

    const isExtractLoading = useAppSelector(DraftsIsExtractingSelector);

    const dispatch = useAppDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(DraftsActions.SetExtractByDefault(Boolean(event.target.checked)));
    };

    const toggleSameFriendlyManifestId = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(DraftsActions.ToggleSameFriendlyManifestId());
    };

    return (
        <>
            <FormControlLabel
                control={(
                    <Checkbox
                        name="process_uploaded"
                        checked={extractByDefault}
                        onChange={handleChange}
                        disabled={isExtractLoading}
                    />
                )}
                label={t('new_loads:draft.rate_confirmation.labels.extract_data', {
                    name: SYSTEM.AI_NAME
                })}
                sx={{
                    margin: '4px',
                    gap   : '6px'
                }}
            />
            {/* <FormControlLabel
                control={(
                    <Checkbox
                        checked={sameFriendlyManifestId}
                        onChange={toggleSameFriendlyManifestId}
                    />
                )}
                label="Create the order with the same ID as the next manifest."
                sx={{
                    margin: '4px',
                    gap   : '6px'
                }}
            /> */}
        </>
    );
};

export default ExtractByDefault;
