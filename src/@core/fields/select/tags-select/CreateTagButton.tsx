import { IconButton, Tooltip } from '@mui/material';
import { MouseEvent } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

type Props = {
    onCreateTag: (event: MouseEvent<HTMLButtonElement | HTMLDivElement | HTMLElement>) => void;
};

export default function CreateTagButton({ onCreateTag }: Props) {
    const { t } = useAppTranslation();
    return (
        <Tooltip title={t('core:selects.tag.tooltip')}>
            <IconButton
                size="small"
                onClick={onCreateTag}
                onKeyDown={(e) => e.stopPropagation()}
                sx={{
                    padding  : '4px',
                    position : 'absolute',
                    right    : '35px',
                    top      : '50%',
                    transform: 'translate(0, -50%)'
                }}
                aria-label="Add Tag"
            >
                <AddCircleOutlineOutlinedIcon color="primary" />
            </IconButton>
        </Tooltip>
    );
}
