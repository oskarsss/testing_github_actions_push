import AvatarMui from '@mui/material/Avatar';
import { CSSProperties } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    url: string;
    fullName: string | null;
    styles: CSSProperties;
};

export default function Avatar({
    url,
    fullName,
    styles
}: Props) {
    const { t } = useAppTranslation();

    return (
        <AvatarMui
            alt={fullName || t('not_available')}
            src={url}
            sx={{ ...styles }}
        >
            {(fullName || t('not_available')).charAt(0).toUpperCase()}
        </AvatarMui>
    );
}
