import { MouseEvent, useState } from 'react';

export type AnchorPosition = {
    top: number;
    left: number;
};

export type MenuAnchor = {
    anchorEl: HTMLElement | null;
    anchorPosition: AnchorPosition;
};

export default function useAnchorMenu() {
    const [open, setOpen] = useState(false);
    const [anchorMenu, setAnchorMenu] = useState<MenuAnchor>({
        anchorEl      : null,
        anchorPosition: {
            top : 0,
            left: 0
        }
    });

    const add = (event: MouseEvent<HTMLButtonElement | HTMLDivElement | HTMLElement>) => {
        setAnchorMenu({
            anchorEl      : event.currentTarget,
            anchorPosition: {
                top : event.clientY - 6,
                left: event.clientX + 2
            }
        });
        setOpen(true);
    };

    const onClose = () => {
        setAnchorMenu({ ...anchorMenu, anchorEl: null });
        setOpen(false);
    };

    return { open, anchorMenu, add, onClose };
}
