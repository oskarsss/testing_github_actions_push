// ** React Imports
import { useEffect } from 'react';

// ** Emotion Imports
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

// ** RTL Plugin
import stylisRTLPlugin from 'stylis-plugin-rtl';
import { LayoutSettingsType } from '@/context/LayoutSettingsContext';

const styleCache = () =>
    createCache({
        key          : 'rtl',
        prepend      : true,
        stylisPlugins: [stylisRTLPlugin]
    });

type Props = {
    children: React.ReactNode;
    direction: LayoutSettingsType['direction'];
};

const Direction = ({
    children,
    direction
}: Props) => {
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.dir = direction!;
    }, [direction]);

    if (direction === 'rtl') {
        return <CacheProvider value={styleCache()}>{children}</CacheProvider>;
    }

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
};

export default Direction;
