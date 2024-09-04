import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import CellWithMultipleLines from '@/@core/components/cell-with-multiple-lines/CellWithMultipleLines';
import { React } from 'mdi-material-ui';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { PreparedListItem } from '../manifest-details-table/ManifestDetailsTable';
import manifestDetailsColumns from '../manifest-details-table/ManifestDetailsColumns';

type Props = {
    item: PreparedListItem;
};

export default function CommonInfo({ item }: Props) {
    const { t } = useAppTranslation();
    return (
        <>
            <MiniTableStyled.Cell
                min_width={manifestDetailsColumns.first}
                hasMaxWidth
            />
            <MiniTableStyled.Cell
                min_width={manifestDetailsColumns.second}
                hasMaxWidth
            />
            <MiniTableStyled.Cell
                min_width={manifestDetailsColumns.emptyMi}
                hasMaxWidth
                sx={{
                    overflow    : 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace  : 'nowrap'
                }}
                flex_start
            >
                {item.emptyMiles && (
                    <CellWithMultipleLines
                        info={`${item.emptyMiles}`}
                        subInfo={t(
                            'modals:settlements.edit_settlement.table.manifests.auto_distance',
                            {
                                distance: item.autoEmptyMiles
                            }
                        )}
                    />
                )}
            </MiniTableStyled.Cell>
            <MiniTableStyled.Cell
                min_width={manifestDetailsColumns.loadedMi}
                hasMaxWidth
                sx={{
                    overflow    : 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace  : 'nowrap'
                }}
                flex_start
            >
                {item.loadedMiles && (
                    <CellWithMultipleLines
                        info={`${item.loadedMiles}`}
                        subInfo={t(
                            'modals:settlements.edit_settlement.table.manifests.auto_distance',
                            {
                                distance: item.autoLoadedMiles
                            }
                        )}
                    />
                )}
            </MiniTableStyled.Cell>
        </>
    );
}
