import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@/@core/fields/select/BrokerSelect/styled';

type Props = {
    onClick: (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
};

export default function CustomAutocompleteClearButton({ onClick }: Props) {
    return (
        <IconButton
            size="small"
            onClick={onClick}
            onKeyDown={(e) => e.stopPropagation()}
            sx={{
                padding: '3px',
                opacity: 0.7
            }}
        >
            <CloseIcon sx={{ fontSize: '20px' }} />
        </IconButton>
    );
}
