import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import { memo, ReactElement, ReactNode } from 'react';
import MiniTableDefaultEmptyState from '@/@core/ui-kits/basic/mini-table/components/MiniTableDefaultEmptyState';
import { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    colSpan: number;
    customNoItemContent?: ReactNode;
    text?: IntlMessageKey | ReactElement;
};

const MiniTableNoItems = ({
    colSpan,
    customNoItemContent,
    text
}: Props) => (
    <MiniTableStyled.Row
        tabIndex={-1}
        shadow={false}
        sx={{
            ...(customNoItemContent && { border: 'none !important' })
        }}
    >
        <MiniTableStyled.Cell
            padding="none"
            colSpan={colSpan}
            height={50}
            sx={{
                ...(customNoItemContent && { borderBottom: 'none !important' })
            }}
        >
            {customNoItemContent ?? <MiniTableDefaultEmptyState text={text} />}
        </MiniTableStyled.Cell>
    </MiniTableStyled.Row>
);

export default memo(MiniTableNoItems);
