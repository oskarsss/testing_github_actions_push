import { ReactNode } from 'react';
import AuthContainersStyled from '@/views/auth/components/AuthContainer/styled';
import { CardMedia, useMediaQuery } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

// @ts-ignore
import ROUTE_MATE_LOADER from '../../../../../public/loading_animation/ROUTE_MATE_AUTH.webm';

// @ts-ignore
import HERO_LOADER from '../../../../../public/loading_animation/HERO_AUTH.webm';

const LOADER_CONFIG = {
    ROUTE_MATE: ROUTE_MATE_LOADER,
    HERO      : HERO_LOADER,
    VEKTOR    : ''
};

type Props = {
    children: ReactNode;
};

const LOADER = LOADER_CONFIG[process.env.NEXT_PUBLIC_SYSTEM_THEME_TOKEN || 'VEKTOR'];

const isRouteMate = process.env.NEXT_PUBLIC_SYSTEM_THEME_TOKEN === 'ROUTE_MATE';
const isVektor = process.env.NEXT_PUBLIC_SYSTEM_THEME_TOKEN === 'VEKTOR';

export default function AuthContainer({ children }: Props) {
    const { t } = useAppTranslation('auth');
    const media = useMediaQuery('(min-width: 1024px)');
    return (
        <AuthContainersStyled.Section turnOffBgImage={!isVektor}>
            <AuthContainersStyled.Container>{children}</AuthContainersStyled.Container>
            {media && !isVektor && (
                <CardMedia
                    component="video"
                    src={LOADER}
                    autoPlay
                    loop
                    muted
                    style={{
                        width: '45%',

                        objectFit     : 'cover',
                        objectPosition: 'top',
                        top           : 0
                    }}
                />
            )}
            {isVektor && (
                <AuthContainersStyled.TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        `“${t('container.first_text')}”`,
                        1200, // wait 1s before replacing "Mice" with "Hamsters"
                        `${t('container.second_text')}`,
                        1200,
                        `${t('container.third_text')}`,
                        1200,
                        `${t('container.fourth_text')}`,
                        1200,
                        `${t('container.fifth_text')}`,
                        1200,
                        `${t('container.sixth_text')}`,
                        1200
                    ]}
                    wrapper="h4"
                    speed={80}
                    preRenderFirstString
                    omitDeletionAnimation
                    repeat={Infinity}
                />
            )}
        </AuthContainersStyled.Section>
    );
}
