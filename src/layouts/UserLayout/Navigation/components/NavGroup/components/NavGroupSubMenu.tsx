import NavGroupItem from '@/layouts/UserLayout/Navigation/components/NavGroupItem/NavGroupItem';
import type { Children, Item } from '@/layouts/UserLayout/Navigation/components/NavLink/NavLink';
import { Fade, Stack } from '@mui/material';

type Props = {
    item: Item;
    parent?: Item;
    navCollapsed: boolean;
    hasListItem: (children: Children) => number | boolean;
    isMenuOpen: boolean;
};

export default function NavGroupSubMenu({
    item,
    parent,
    navCollapsed,
    hasListItem,
    isMenuOpen
}: Props) {
    return (
        <Fade in={isMenuOpen}>
            <Stack
                zIndex={20}
                position="fixed"
                left={60}
                bgcolor={(theme) => theme.palette.semantic.foreground.white.tertiary}
                width="245px"
                overflow="hidden"
                boxShadow="4px 4px 7px rgba(133, 158, 189, 0.05)"
                border="1px solid rgba(58, 53, 65, 0.12)"
                borderRadius="6px"
            >
                {item.children?.map((el) => {
                    if (hasListItem(el)) {
                        return (
                            <NavGroupItem
                                key={el.id}
                                item={el}
                                parent={item}
                                navCollapsed={navCollapsed}
                                isSubToSub={parent && item.children ? item : undefined}
                            />
                        );
                    }
                    return null;
                })}
            </Stack>
        </Fade>
    );
}
