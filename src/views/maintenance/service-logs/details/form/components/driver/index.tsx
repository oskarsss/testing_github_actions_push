import { memo } from 'react';
import DriverHeader from './DriverHeader';
import Table from './table';

type Props = {
    driverId: string;
};

function Driver({ driverId }: Props) {
    return (
        <>
            <DriverHeader driverId={driverId} />

            <Table driverId={driverId} />
        </>
    );
}

export default memo(Driver);
