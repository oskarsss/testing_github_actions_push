import { IconButton, Tooltip } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';
import { applyTestId } from '@/configs/tests';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    testID?: string;
};

export default function DeleteItemButton({ testID }: Props) {
    const { t } = useAppTranslation();
    return (
        <Tooltip title={t('new_loads:draft.form.tooltips.delete_item')}>
            <IconButton
                sx={{ padding: 0 }}
                aria-label="Delete"
                {...applyTestId(testID)}
            >
                <VectorIcons.TrashIcon
                    sx={{
                        fontSize: '18px',
                        path    : {
                            fill: (theme) => theme.palette.semantic.foreground.primary
                        }
                    }}
                />
            </IconButton>
        </Tooltip>
    );
}
