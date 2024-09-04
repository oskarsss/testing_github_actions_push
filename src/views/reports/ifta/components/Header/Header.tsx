import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { IftaIcon } from '@/@core/icons/custom-nav-icons/icons';
import RefreshPeriods from './RefreshPeriods';

export default function IftaHeader() {
    return (
        <PageHeadersKit.Header
            topLeft={(
                <PageHeadersKit.Title
                    title="ifta:header.title"
                    Icon={<IftaIcon />}
                />
            )}
            topRight={<RefreshPeriods />}
            sx={{
                background: (theme) => theme.palette.semantic.background.white
            }}
        />
    );
}
