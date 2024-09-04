import { useEffect, useState } from 'react';
import moment from 'moment-timezone';

import { useAccountCompanies } from '@/store/app/hooks';
import { Indicator } from './styled';

const timeNow = (timezone: string) =>
    moment.tz(timezone).diff(moment.tz(timezone).hours(0).minutes(0), 'minutes');

type Props = {
    widthOneMin: number;
};

const NowIndicator = ({ widthOneMin }: Props) => {
    const { timezone } = useAccountCompanies();

    const [currentTime, setCurrentTime] = useState(timeNow(timezone));

    useEffect(() => {
        const intervalIdx = setInterval(
            () => setCurrentTime(timeNow(timezone)),
            60000 // widthOneMin
        );
        return () => {
            clearInterval(intervalIdx);
        };
    }, [timezone]);

    return <Indicator style={{ left: currentTime * widthOneMin }} />;
};

export default NowIndicator;
