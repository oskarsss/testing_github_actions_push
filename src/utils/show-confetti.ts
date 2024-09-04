// eslint-disable-next-line import/no-extraneous-dependencies
import { confetti } from 'tsparticles-confetti';

const count = 200;
const defaults = {
    position: {
        x: 50,
        y: 100
    }
};

const options: Record<string, Record<string, number>> = {
    0.25: {
        spread       : 26,
        startVelocity: 55
    },
    0.2: {
        spread: 60
    },
    0.35: {
        spread: 100,
        decay : 0.91,
        scalar: 0.8
    },
    0.1: {
        spread       : 120,
        startVelocity: 25,
        decay        : 0.92,
        scalar       : 1.2
    },
    0.101: {
        spread       : 120,
        startVelocity: 45
    }
};

const fire = (particleRatio: string, opts: Record<string, number>) => {
    confetti({ ...defaults, ...opts, particleCount: Math.floor(count * Number(particleRatio)) });
};

export const realisticLookConfetti = () => {
    Object.keys(options).forEach((key) => {
        fire(key, options[key]);
    });
};

export const showConfetti = async (count: number, src: string) => {
    await confetti({
        spread  : 90,
        gravity : 0.5,
        count,
        scalar  : 6,
        position: {
            x: 50,
            y: 100
        },
        shapes      : ['image'],
        shapeOptions: {
            image: [
                {
                    src
                }
            ]
        },
        zIndex                 : 2000,
        disableForReducedMotion: true
    });
};
