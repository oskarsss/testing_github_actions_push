import { useAppSelector } from '@/store/hooks';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { useDownloadFile } from '@/hooks/useDownloadFile';
import { Container, Button } from './styled';

export default function DownloadFiles({ style = {} }) {
    const file_list = useAppSelector(
        (state) => state.import.files_map[state.import.category_id]?.files || {}
    );
    const downloadFile = useDownloadFile();
    return (
        <Container style={style}>
            {Object.values(file_list).map((file) =>
                file.map(({
                    file_path,
                    file_name
                }) => (
                    <Button
                        key={file_path}
                        variant="contained"
                        onClick={() => downloadFile(file_path, file_name)}
                    >
                        <FileCopyIcon />
                        <p>{file_name}</p>
                    </Button>
                )))}
        </Container>
    );
}
