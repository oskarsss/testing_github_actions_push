import LeftTrailerStyled from '@/views/fleet/trailers/Details/components/Left/styled';
import { Box, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import LeftStyled from '@/views/fleet/drivers/Details/components/Left/styled';
import { applyTestId } from '@/configs/tests';
import EditIcon from '@mui/icons-material/Edit';
import { ReactNode } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    render_status_chip: () => ReactNode;
    avatar_icon: ReactNode;
    type_icon: ReactNode;
    tooltip_type_text: IntlMessageKey;
    reference_id: string;
    onEdit: () => void;
    render_online_icon?: () => ReactNode;
    test_id: string;
};

export default function HeaderTopContentMarkup({
    render_status_chip,
    avatar_icon,
    type_icon,
    tooltip_type_text,
    reference_id,
    onEdit,
    render_online_icon,
    test_id
}: Props) {
    const { t } = useAppTranslation();

    return (
        <LeftTrailerStyled.Header>
            <LeftTrailerStyled.HeaderContentInfo>
                <div style={{ position: 'relative' }}>
                    <LeftTrailerStyled.AvatarStyle alt={reference_id}>
                        {avatar_icon}
                    </LeftTrailerStyled.AvatarStyle>

                    <Tooltip
                        title={t(`${tooltip_type_text}`)}
                        sx={{ marginLeft: '90px' }}
                    >
                        <LeftTrailerStyled.TypeIcon>{type_icon}</LeftTrailerStyled.TypeIcon>
                    </Tooltip>
                </div>

                <Box overflow="hidden">
                    <Box
                        display="flex"
                        alignItems="end"
                        gap="5px"
                        marginBottom="5px"
                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                        >
                            {reference_id}
                        </Typography>

                        {render_online_icon && render_online_icon()}
                    </Box>

                    {render_status_chip()}
                </Box>
            </LeftTrailerStyled.HeaderContentInfo>

            <LeftTrailerStyled.Button>
                <LeftStyled.IconButton
                    onClick={onEdit}
                    {...applyTestId(test_id)}
                >
                    <EditIcon color="primary" />
                </LeftStyled.IconButton>

                <Typography
                    variant="body1"
                    fontWeight={500}
                >
                    {t('common:button.edit')}
                </Typography>
            </LeftTrailerStyled.Button>
        </LeftTrailerStyled.Header>
    );
}
