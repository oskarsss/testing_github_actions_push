import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { applyTestId } from '@/configs/tests';
import { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    onClick: () => void;
    disabled: boolean;
    title: IntlMessageKey;
    type: 'arrow_up' | 'arrow_down' | 'delete';
    testId?: string;
};

const icon_components = {
    arrow_up  : <ArrowUpwardOutlinedIcon />,
    arrow_down: <ArrowDownwardOutlinedIcon />,
    delete    : <DeleteIcon />
};

const IndicatorButton = ({
    onClick,
    disabled,
    title,
    type,
    testId = ''
}: Props) => {
    const { t } = useAppTranslation();
    const translatedTitle = t(title);
    return (
        <Tooltip title={translatedTitle}>
            <span>
                <IconButton
                    aria-label={translatedTitle.toLowerCase()}
                    disabled={disabled}
                    onClick={onClick}
                    {...applyTestId(testId)}
                >
                    {icon_components[type]}
                </IconButton>
            </span>
        </Tooltip>
    );
};

export default IndicatorButton;
