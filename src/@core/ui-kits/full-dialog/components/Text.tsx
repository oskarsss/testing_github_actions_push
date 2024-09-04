/* eslint-disable import/no-anonymous-default-export */
import Copy from '@/@core/components/copy-text/CopyText';

type CopyTextProps = {
    text: string;
};

function CopyText({ text }: CopyTextProps) {
    return (
        <Copy text={text}>
            <span>{text}</span>
        </Copy>
    );
}
function Space() {
    return <>&nbsp;</>;
}

function Slashed() {
    return (
        <>
            <Space />
            <span>/</span>
            <Space />
        </>
    );
}

function Hashtag() {
    return (
        <>
            <Space />
            <span>#</span>
        </>
    );
}

export default {
    CopyText,
    Space,
    Slashed,
    Hashtag
};
