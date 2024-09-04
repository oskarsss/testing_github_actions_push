/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { CircularProgress, styled } from '@mui/material';
import React, { ComponentProps } from 'react';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const Wrapper = styled('div')<{ maxWidth?: React.CSSProperties['width'] }>(
    ({ maxWidth = '1500px' }) => ({
        height        : '100%',
        display       : 'flex',
        width         : `min(${maxWidth}, 90vw)`,
        alignItems    : 'center',
        justifyContent: 'center',
        margin        : '0 auto'
    })
);

type FetchingProcessProps = {
    maxWidth?: React.CSSProperties['width'];
};

function FetchingProcess({ maxWidth }: FetchingProcessProps) {
    return (
        <Wrapper maxWidth={maxWidth}>
            <CircularProgress size={30} />
        </Wrapper>
    );
}

type FailedFetchingProps = {
    maxWidth?: React.CSSProperties['width'];
    onClose: () => void;
    onRetry: () => void;
} & Partial<Omit<ComponentProps<typeof FallbackContent>, 'icon' | 'styles' | 'onClick'>>;

function FailedFetching({
    maxWidth,
    firstText = 'common:something_went_wrong',
    buttonText = 'core:dialog.failed_fetching.default.button_text',
    onClose,
    onRetry,
    ...props
}: FailedFetchingProps) {
    const { t } = useAppTranslation();
    return (
        <Wrapper maxWidth={maxWidth}>
            <FallbackContent
                icon={<VectorIcons.Cone />}
                firstText={firstText}
                buttonText={buttonText}
                onClick={onRetry}
                secondText={(
                    <>
                        {t('core:dialog.failed_fetching.default.second_text_first_part')}
                        <span
                            style={{
                                color     : '#2A7DE1',
                                cursor    : 'pointer',
                                fontWeight: 500
                            }}
                            onClick={onClose}
                        >
                            {t('core:dialog.failed_fetching.default.second_text_second_part')}
                        </span>
                    </>
                )}
                {...props}
            />
        </Wrapper>
    );
}

export default {
    FetchingProcess,
    FailedFetching
};
