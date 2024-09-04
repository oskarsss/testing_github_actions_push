import React, { PropsWithChildren } from 'react';
import { useColumnAdjistContext } from './ColumnWidthAdjustProvider';

type Props = PropsWithChildren;

const ColumnWidthAdjustRenderer = ({ children }: Props) => {
    const { adjusterRef } = useColumnAdjistContext();
    return (
        <div
            style={{
                display: 'flex'
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>{children}</div>
            <div
                ref={adjusterRef}
                style={{ height: '100%', minHeight: 10, minWidth: 15 }}
            />
        </div>
    );
};

export default ColumnWidthAdjustRenderer;
