import {
    Link,
    Links,
    RequiredFileTitle
} from '@/@core/components/import-dialog/steps/StepFirst/styled';
import Tooltip from '@mui/material/Tooltip';
import { GetImportConfigReply_Category_Processor_RequiredFile_Link } from '../../../../../../../proto_data/ts/v1/import';

type Props = {
    title: string;
    links: GetImportConfigReply_Category_Processor_RequiredFile_Link[];
};

export default function FileTitle({
    title,
    links
}: Props) {
    return (
        <RequiredFileTitle>
            <h5>{title}</h5>
            <Links>
                {links?.map((link) => (
                    <Tooltip
                        title={link.hover}
                        key={link.url}
                    >
                        <Link
                            href={link.url}
                            target="_blank"
                        >
                            {link.label}
                        </Link>
                    </Tooltip>
                ))}
            </Links>
        </RequiredFileTitle>
    );
}
