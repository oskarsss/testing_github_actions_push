import Stack from '@mui/material/Stack';
import { Box, Skeleton } from '@mui/material';
import TableEditorComponents from '@/@core/components/table/TableEditor/TableEditorComponents';
import { useRef, useState, useEffect } from 'react';

const LENGTH = 8;
const getRandomWidth = () => {
    const arr = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < LENGTH; i++) {
        const random = Math.floor(Math.random() * 3);
        if (random === 0) {
            arr.push(100);
        } else if (random === 1) {
            arr.push(70);
        } else {
            arr.push(85);
        }
    }
    return arr;
};

export default function Accordion() {
    const isFirstRender = useRef(true);
    const [widths, setWidths] = useState([100, 70, 250, 85]);

    useEffect(() => {
        if (isFirstRender.current) {
            setWidths(getRandomWidth());
            isFirstRender.current = false;
        }
    }, []);

    return (
        <TableEditorComponents.Accordion.Skeleton>
            <Stack direction="column">
                <Box
                    sx={{
                        padding: '12px 14px 12px 24px'
                    }}
                >
                    <Skeleton
                        variant="text"
                        width="150px"
                        sx={{ fontSize: '1rem' }}
                    />
                </Box>
                <TableEditorComponents.Accordion.DetailsStack
                    sx={{
                        padding: '12px 14px 24px 24px'
                    }}
                >
                    {Array.from({ length: LENGTH }).map((_, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Skeleton
                            sx={{
                                flex          : '1 0 auto',
                                display       : 'flex',
                                flexDirection : 'row',
                                justifyContent: 'center',
                                alignItems    : 'center',
                                padding       : '4px 8px 4px 0',
                                borderRadius  : '4px',
                                margin        : '5px'
                            }}
                            // eslint-disable-next-line react/no-array-index-key
                            key={i}
                            variant="rectangular"
                            width={`${widths[i]}px`}
                            height="30px"
                        />
                    ))}
                </TableEditorComponents.Accordion.DetailsStack>
            </Stack>
        </TableEditorComponents.Accordion.Skeleton>
    );
}
