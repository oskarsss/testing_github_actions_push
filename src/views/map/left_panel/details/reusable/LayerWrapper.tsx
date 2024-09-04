import { ReactNode } from 'react';
import { Back, Wrapper } from '@/views/map/left_panel/details/styled';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { MapActions } from '@/store/map/slice';
import { useAppDispatch } from '@/store/hooks';
import { useMapSelectedView } from '@/store/map/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    children: ReactNode;
    type: 'truck' | 'trailer' | 'driver';
};

export default function LayerWrapper({
    children,
    type
}: Props) {
    const dispatch = useAppDispatch();
    const { selectView } = useMapSelectedView();
    const { t } = useAppTranslation();

    const handleBack = () => {
        if (type === 'truck') {
            selectView('trucks');
            dispatch(MapActions.updateSelected({ truck_id: '' }));
        }
        if (type === 'trailer') {
            selectView('trailers');
            dispatch(MapActions.updateSelected({ trailer_id: '' }));
        }
        if (type === 'driver') {
            selectView('drivers');
            dispatch(MapActions.updateSelected({ driver_id: '' }));
        }
    };

    return (
        <Wrapper>
            <Back
                variant="outlined"
                startIcon={<ArrowBackIosIcon color="secondary" />}
                onClick={handleBack}
            >
                {t('common:button.close')}
            </Back>
            {children}
        </Wrapper>
    );
}
