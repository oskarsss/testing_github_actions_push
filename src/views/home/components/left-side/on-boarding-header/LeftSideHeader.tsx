import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import SYSTEM from '@/@system';
import LeftSideHeaderComponents from '@/views/home/components/left-side/on-boarding-header/LeftSideHeaderComponents';
import openNewTab from '@/utils/openNewTab';
import WavingHandIcon from '@/views/home/components/left-side/on-boarding-header/WavingHandIcon';
import { useWatchFullDemoDialog } from '@/views/home/dialogs/watch-full-demo/WatchFullDemoDialog';

export default function LeftSideHeader() {
    const { t } = useAppTranslation('onboarding');
    const watchFullDemoDialog = useWatchFullDemoDialog();
    const onClickWatchVideo = () => {
        watchFullDemoDialog.open({
            link: SYSTEM.ONBOARDING.VIDEO_LINKS.FULL_WATCH
        });
    };

    return (
        <LeftSideHeaderComponents.Container>
            <LeftSideHeaderComponents.Wrapper>
                <LeftSideHeaderComponents.TitleWrapper>
                    <LeftSideHeaderComponents.Title>
                        {`${t('side.left.header.title')} ${SYSTEM.TITLE}`}
                    </LeftSideHeaderComponents.Title>

                    <WavingHandIcon sx={{ fontSize: '28px' }} />
                </LeftSideHeaderComponents.TitleWrapper>

                <LeftSideHeaderComponents.SubTitle>
                    {t('side.left.header.sub_title')}
                </LeftSideHeaderComponents.SubTitle>
            </LeftSideHeaderComponents.Wrapper>

            {SYSTEM.ONBOARDING.VIDEO_LINKS.FULL_WATCH && (
                <LeftSideHeaderComponents.Button
                    variant="contained"
                    color="primary"
                    onClick={onClickWatchVideo}
                >
                    {t('side.left.header.button')}
                </LeftSideHeaderComponents.Button>
            )}

            {SYSTEM.ASSETS.OnBoardingBanner && (
                <LeftSideHeaderComponents.ImageWrapper>
                    <LeftSideHeaderComponents.Image
                        src={SYSTEM.ASSETS.OnBoardingBanner.src}
                        alt="header-image"
                        width={361}
                        height={101}
                    />
                </LeftSideHeaderComponents.ImageWrapper>
            )}
        </LeftSideHeaderComponents.Container>
    );
}
