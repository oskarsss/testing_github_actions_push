import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import LeftStyled from '@/views/fleet/drivers/Details/components/Left/styled';
import { useRouter } from 'next/router';
import type { TFunction } from '@/@types/next-intl';
import navigateToPage from '@/utils/navigateToPage';
import type { MouseEvent } from 'react';

type Props = {
    t: TFunction;
    title: string;
};

export default function LeftNavigate({
    t,
    title
}: Props) {
    const router = useRouter();

    const onClick = (e: MouseEvent) => {
        navigateToPage(
            typeof router.query?.from === 'string'
                ? router.query.from
                : router.pathname.split('/').slice(0, -1).join('/'),
            e
        );
    };

    const is_from = !!router.query?.from;
    return (
        <LeftStyled.Navigate onClick={onClick}>
            <div>
                <ArrowBackIcon color="action" />
            </div>
            <Typography>{is_from ? t('common:button.back') : title}</Typography>
        </LeftStyled.Navigate>
    );
}
