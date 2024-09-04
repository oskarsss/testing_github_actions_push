import { cloneElement, useState, MouseEvent, ReactElement } from 'react';
import useCopyToClipboard from '@/utils/copy-to-clipboard';
import { Tooltip } from '@mui/material';
import type { TFunction } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type DefaultTFuncReturn = ReturnType<TFunction>;

type Props = {
    text: string | number | DefaultTFuncReturn | undefined;
    children: ReactElement;
};
export default function CopyText({
    text,
    children
}: Props) {
    const [, setIsHover] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const copy = useCopyToClipboard();
    const { t } = useAppTranslation('core');

    if (!text) {
        return children;
    }

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
        setTimeout(() => {
            setIsClick(false);
        }, 500);
    };

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();

        copy(`${text}`, `${t('copy_text.tooltip_copied')} ${text}`);
        setIsClick(true);
    };

    return (
        <Tooltip
            title={t(!isClick ? 'copy_text.tooltip_copy' : 'copy_text.tooltip_copied')}
            placement="top"
            disableInteractive
        >
            {cloneElement(children, {
                onMouseEnter: () => {
                    handleMouseEnter();
                },
                onMouseLeave: () => {
                    handleMouseLeave();
                },
                onClick: (e: MouseEvent) => {
                    handleClick(e);
                },
                style: { ...(children.props?.style || {}), cursor: 'pointer' }
            })}
        </Tooltip>
    );
}
