import Lottie from 'lottie-react';
import animationData from './loading-lottie.json';

type Props = {
    isLoading: boolean;
};

export default function Loading({ isLoading }: Props) {
    if (!isLoading) {
        return null;
    }

    return (
        <div
            style={{
                width         : '100%',
                height        : '100%',
                display       : 'flex',
                flexDirection : 'row',
                alignItems    : 'center',
                justifyContent: 'center',
                position      : 'absolute',
                top           : 0,
                left          : 0,
                right         : 0,
                bottom        : 0
            }}
        >
            <Lottie
                animationData={animationData}
                loop
            />
        </div>
    );
}
