import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Fade } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { memo, type MouseEvent } from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import { applyTestId } from '@/configs/tests';
import navigateToPage from '@/utils/navigateToPage';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type TrailerProps = {
    id: string | undefined;
    Icon: JSX.Element;
    title: string;
    button_text: string;
    blockIcon?: string | JSX.Element | null;
    reference_id?: string | null;
    type_name?: string | null;
    onDeleteEntity: (event: MouseEvent<HTMLButtonElement>) => void;
    isLoading: boolean;
    onSelect: (e: MouseEvent<HTMLButtonElement>) => void;
    testOptions?: Record<string, string | undefined>;
};

const Trailer = ({
    id,
    Icon,
    title,
    blockIcon,
    reference_id,
    type_name,
    button_text,
    onDeleteEntity,
    isLoading,
    onSelect,
    testOptions = {
        assignTestId: '',
        removeTestId: ''
    }
}: TrailerProps) => {
    const { t } = useAppTranslation();

    const moveToDetails = (id: string, e: MouseEvent) => {
        navigateToPage(`/${title === 'Trailer' ? 'trailers' : 'trucks'}/${id}`, e);
    };

    return (
        <RightStyled.IconBlock>
            <Box>
                {Icon}
                <Typography variant="subtitle1">{title}</Typography>
            </Box>
            {id ? (
                <Fade in>
                    <div>
                        <RightStyled.Info>
                            {blockIcon}
                            <Typography
                                variant="caption"
                                fontWeight="bold"
                                marginRight={2}
                            >
                                #{reference_id}
                            </Typography>
                            <Typography variant="caption">{type_name}</Typography>
                        </RightStyled.Info>
                        <RightStyled.Buttons>
                            <Button
                                startIcon={<VectorIcons.DetailsIcons.SwitchSettings />}
                                onClick={(e) => moveToDetails(id, e)}
                            >
                                {t('common:button.view')}
                            </Button>
                            <Button
                                startIcon={<DeleteForeverIcon color="action" />}
                                onClick={onDeleteEntity}
                                disabled={isLoading}
                                {...applyTestId(testOptions.removeTestId)}
                            >
                                {t('common:button.remove')}
                            </Button>
                        </RightStyled.Buttons>
                    </div>
                </Fade>
            ) : (
                <Button
                    startIcon={<AddIcon />}
                    onClick={onSelect}
                    {...applyTestId(testOptions.assignTestId)}
                >
                    {button_text}
                </Button>
            )}
        </RightStyled.IconBlock>
    );
};

export default memo(Trailer);
