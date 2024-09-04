import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import CommonTabs, { Options } from '@/@core/ui-kits/basic/common-tabs/CommonTabs';

type Props = {
    views: Options[];
    viewId: string | number;
    setViewId: (id: string) => void;
};

export default function Header({
    viewId,
    setViewId,
    views
}: Props) {
    return (
        <Stack
            direction="column"
            justifyContent="space-between"
            pt={3}
        >
            <Box>
                <CommonTabs
                    value={viewId}
                    onChange={(_, value) => setViewId(value)}
                    options={views}
                    aria_label="table editor tabs"
                    slots={{
                        tabsSx: { borderRadius: '8px' }
                    }}
                />
            </Box>
        </Stack>
    );
}
