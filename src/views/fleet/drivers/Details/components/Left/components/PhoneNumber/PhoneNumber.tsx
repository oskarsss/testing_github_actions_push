import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LeftStyled from '@/views/fleet/drivers/Details/components/Left/styled';
import CopyText from '@/@core/components/copy-text/CopyText';
import LocalPhoneSharpIcon from '@mui/icons-material/LocalPhoneSharp';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useTheme } from '@mui/material';

type Props = {
    text: string;
};

export default function PhoneNumber({ text }: Props) {
    const { t } = useAppTranslation();
    const { palette } = useTheme();

    return (
        <LeftStyled.PhoneNumberBlock>
            <CopyText text={text}>
                <LeftStyled.CopyNumberBlock>
                    <Box>
                        <LocalPhoneSharpIcon color="action" />
                        <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                        >
                            {t('drivers:profile.left.info.phone_number.title')}
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            color: palette.semantic.text.brand.primary
                        }}
                        variant="body1"
                    >
                        {text}
                    </Typography>
                </LeftStyled.CopyNumberBlock>
            </CopyText>
        </LeftStyled.PhoneNumberBlock>
    );
}
