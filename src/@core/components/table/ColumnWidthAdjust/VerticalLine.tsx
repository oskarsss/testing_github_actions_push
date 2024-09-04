import React from 'react';
import { useColumnAdjistContext } from './ColumnWidthAdjustProvider';
import s from './styles.module.scss';

const VerticalLine = () => {
    const { lineRef } = useColumnAdjistContext();
    return (
        <div
            ref={lineRef}
            style={{
                position  : 'absolute',
                top       : 0,
                bottom    : 0,
                left      : 0,
                zIndex    : 2,
                display   : 'none',
                paddingTop: 30
            }}
        >
            <div
                className={[s.blocks, s.vl_blocks, s.show_blocks].join(' ')}
                style={{
                    width          : 4,
                    height         : '100%',
                    backgroundColor: '#bebebe',
                    transform      : 'translateX(-2px)'
                }}
            />
        </div>
    );
};

export default VerticalLine;
