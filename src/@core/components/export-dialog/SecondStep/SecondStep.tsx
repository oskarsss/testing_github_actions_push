/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */

import CircularProgress from '@mui/material/CircularProgress';
import { ExportDialogStyled } from '@/@core/components/export-dialog/styled';
import Export from '@/store/export/types';
import { useTheme } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

import { useAppTranslation } from '@/hooks/useAppTranslation';

// @ts-ignore
import DarkLoader from '../../../../../public/loading_animation/dark_exporting.mp4';

// @ts-ignore
import LightLoader from '../../../../../public/loading_animation/light_exporting.mp4';

type Props = {
    isLoading: boolean;
    isError: boolean;
    download: () => void;
    exporter_id: Export.ExporterId;
};

export default function SecondStep({
    isLoading,
    isError,
    download,
    exporter_id
}: Props) {
    const { mode } = useTheme().palette;
    const { t } = useAppTranslation('core');

    if (exporter_id === 'INVOICES_EXPORTER' && isLoading) {
        return (
            <ExportDialogStyled.Container.SecondStep sx={{ margin: '0px -16px', width: 'auto' }}>
                <CardMedia
                    component="video"
                    src={mode === 'light' ? LightLoader : DarkLoader}
                    autoPlay
                    loop
                    muted
                    style={{
                        width : '100%',
                        height: '100%'
                    }}
                />
            </ExportDialogStyled.Container.SecondStep>
        );
    }

    if (isLoading) {
        return (
            <ExportDialogStyled.Container.SecondStep>
                <CircularProgress />
                <p>Preparing export...</p>
            </ExportDialogStyled.Container.SecondStep>
        );
    }

    if (isError) {
        return (
            <ExportDialogStyled.Container.SecondStep>
                <p>Something went wrong. Please try again.</p>
            </ExportDialogStyled.Container.SecondStep>
        );
    }

    return (
        <ExportDialogStyled.Container.SecondStep>
            <p>
                {t('export_dialog.success')}{' '}
                <span onClick={download}>{t('export_dialog.success_link')}</span>
            </p>
        </ExportDialogStyled.Container.SecondStep>
    );
}
