import { ManifestModel_Load } from '@proto/models/model_manifest';
import { MutableRefObject, useState } from 'react';
import { Stack } from '@mui/material';
import ManifestDetailsLoadHeader from '@/views/dispatch/manifests/details/sections/tables/loads/components/ManifestDetailsLoadHeader';
import Collapse from '@mui/material/Collapse';
import ManifestDetailsLoadBody from '@/views/dispatch/manifests/details/sections/tables/loads/components/ManifestDetailsLoadBody';
import PerfectScrollbar from 'react-perfect-scrollbar';

type Props = {
    load: ManifestModel_Load;
    index: number;
    scrollBarRef: MutableRefObject<PerfectScrollbar | null>;
};

export default function ManifestDetailsLoad({
    load,
    index,
    scrollBarRef
}: Props) {
    const [expanded, setExpanded] = useState(true);

    const toggleExpanded = () => {
        scrollBarRef.current?.updateScroll();
        setExpanded((prev) => !prev);
    };

    return (
        <Stack>
            <ManifestDetailsLoadHeader
                load={load}
                toggleExpanded={toggleExpanded}
                expanded={expanded}
                index={index}
            />
            <Collapse in={expanded}>
                <ManifestDetailsLoadBody load={load} />
            </Collapse>
        </Stack>
    );
}
