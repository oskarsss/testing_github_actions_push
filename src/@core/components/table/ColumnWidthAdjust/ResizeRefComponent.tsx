/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { type MutableRefObject, type MouseEventHandler, useCallback, useRef } from 'react';
import { PageModel_View_Column_Type } from '@proto/models/model_page';
import { useColumnAdjistContext } from './ColumnWidthAdjustProvider';
import s from './styles.module.scss';

type Props = {
    wrapperRef: MutableRefObject<HTMLDivElement>;
    col_id: string;
    col_type: PageModel_View_Column_Type;
    isLastStickyCell?: boolean;
};

export function ResizeRefComponent({
    wrapperRef,
    col_id,
    col_type,
    isLastStickyCell
}: Props) {
    const {
        contextExist,
        followCursor,
        startAdjusting
    } = useColumnAdjistContext();

    const resizeRef = useRef<HTMLDivElement | null>(null);

    const removeClass = () => {
        resizeRef.current?.classList.remove(s.show_blocks);
    };

    const onMouseLeave = () => {
        if (!contextExist) {
            return;
        }

        if (!followCursor.current) {
            removeClass();
        }
    };

    const addClassList = () => {
        if (!contextExist) {
            return;
        }

        if (!followCursor.current) {
            resizeRef.current?.classList.add(s.show_blocks);
        }
    };

    const mouseDown = useCallback<MouseEventHandler<HTMLDivElement>>(
        (ev) => {
            if (wrapperRef.current) {
                const {
                    left: clientX_left,
                    right: clientX_right
                } =
                    wrapperRef.current.getBoundingClientRect();
                startAdjusting({
                    clientX_left,
                    clientX_right,
                    startX    : ev.clientX,
                    col_id,
                    col_type,
                    getLeftPos: () => wrapperRef.current.getBoundingClientRect().left,
                    removeClass
                });
            }
        },
        [startAdjusting, col_id, col_type]
    );

    if (!col_id || !col_type || !contextExist) {
        return null;
    }

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
            ref={resizeRef}
            className={s.blocks}
            style={{
                position  : 'absolute',
                width     : 16,
                right     : isLastStickyCell ? 4 : 0,
                height    : '100%',
                cursor    : 'col-resize',
                zIndex    : 10,
                transform : 'translateX(50%)',
                userSelect: 'none'
            }}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            onMouseDown={mouseDown}
            onMouseEnter={addClassList}
            onMouseLeave={onMouseLeave}
        />
    );
}
