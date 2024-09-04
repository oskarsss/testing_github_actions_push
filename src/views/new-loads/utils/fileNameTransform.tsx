import { Tooltip } from '@mui/material';

const fileNameTransform = (file_name: string) => {
    if (file_name && file_name.length > 15) {
        return (
            <Tooltip title={file_name}>
                <span>
                    {file_name.slice(0, 5)}...{file_name.slice(-7)}
                </span>
            </Tooltip>
        );
    }
    return file_name;
};

export default fileNameTransform;
