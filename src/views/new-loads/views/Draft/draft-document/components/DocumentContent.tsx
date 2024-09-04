import React from 'react';
import {
    ChoosePdfButton,
    UploadFileTitle,
    SelectedContainer
} from '@/views/new-loads/views/Draft/styled';
import Image from 'next/image';
import { useTheme } from '@mui/material';
import SYSTEM from '@/@system';
import useExtractFile from '@/views/new-loads/hooks/useExtractFile';
import useFiles from '@/views/new-loads/hooks/useFiles';
import { useDraftFormContext } from '@/views/new-loads/views/Draft/Draft';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import VEKTOR_LIGHT_IMAGE from './assets/vektor/NewLoadUploadPdfNewMode.png';
import VEKTOR_DARK_IMAGE from './assets/vektor/NewLoadUploadPdfDarkMode.png';
import ROUTE_MATE_LIGHT_IMAGE from './assets/route-mate/light-image.jpg';
import ROUTE_MATE_DARK_IMAGE from './assets/route-mate/dark-image.jpg';
import HERO_LIGHT_IMAGE from './assets/hero/light-image.jpg';
import HERO_DARK_IMAGE from './assets/hero/dark-image.jpg';

const ASSETS_CONFIG = {
    VEKTOR: {
        DARK_IMAGE : VEKTOR_DARK_IMAGE,
        LIGHT_IMAGE: VEKTOR_LIGHT_IMAGE
    },
    ROUTE_MATE: {
        LIGHT_IMAGE: ROUTE_MATE_LIGHT_IMAGE,
        DARK_IMAGE : ROUTE_MATE_DARK_IMAGE
    },
    TEST: {
        LIGHT_IMAGE: ROUTE_MATE_LIGHT_IMAGE,
        DARK_IMAGE : ROUTE_MATE_DARK_IMAGE
    },
    HERO: {
        LIGHT_IMAGE: HERO_LIGHT_IMAGE,
        DARK_IMAGE : HERO_DARK_IMAGE
    }
};

const assets = ASSETS_CONFIG[process.env.NEXT_PUBLIC_SYSTEM_THEME_TOKEN || 'VEKTOR'];

function DocumentContent() {
    const isLightMode = useTheme().palette.isLight;
    const { t } = useAppTranslation('new_loads');

    const {
        setValue,
        reset,
        getValues
    } = useDraftFormContext();

    const onExtract = useExtractFile({
        getValues,
        reset
    });

    const {
        getInputProps,
        open
    } = useFiles({
        merge        : true,
        location     : 'drafts/files',
        onResCallback: (data) => {
            const { url } = data.paths[0];
            setValue('rateConUrl', url);
            setValue('rateConFileName', data.paths[0].name);
            onExtract(url);
        },
        dropzoneOptions: {
            noClick: true
        }
    });

    return (
        <SelectedContainer>
            <Image
                alt="PDF"
                width={400}
                height={400}
                src={isLightMode ? assets.LIGHT_IMAGE : assets.DARK_IMAGE}
            />
            <UploadFileTitle>
                {t('draft.document.drop_zone.title')}
                <ChoosePdfButton
                    variant="text"
                    size="small"
                    onClick={open}
                >
                    {t('draft.document.drop_zone.button')}
                </ChoosePdfButton>
                {t('draft.document.drop_zone.after_button')}
            </UploadFileTitle>
            <p>{t('draft.document.drop_zone.description', { name: SYSTEM.AI_NAME })}</p>
            <input {...getInputProps()} />
        </SelectedContainer>
    );
}

export default DocumentContent;
