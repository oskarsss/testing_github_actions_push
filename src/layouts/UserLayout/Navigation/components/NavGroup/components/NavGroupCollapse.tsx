/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import NavGroupItem from '@/layouts/UserLayout/Navigation/components/NavGroupItem/NavGroupItem';
import { Children, Item } from '@/layouts/UserLayout/Navigation/components/NavLink/NavLink';
import NavGroupStyled from '../styled';

type Props = {
    item: Item;
    parent?: Item;
    isGroupActive: boolean;
    navCollapsed: boolean;
    hasListItem: (children: Children) => number | boolean;
};

export default function NavGroupCollapse({
    item,
    parent,
    navCollapsed,
    isGroupActive,
    hasListItem
}: Props) {
    return (
        <NavGroupStyled.CollapseContainer
            component="ul"
            onClick={(e) => e.stopPropagation()}
            in={isGroupActive && !navCollapsed}
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
            })}
        </NavGroupStyled.CollapseContainer>
    );
}
