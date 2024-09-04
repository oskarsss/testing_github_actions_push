import React from 'react';
import { SectionWrap } from '@/views/settings/components/styled';

type BaseProps = React.HTMLAttributes<HTMLDivElement>;

export default function Section(props: BaseProps) {
    return <SectionWrap {...props} />;
}
