import { ComponentProps } from 'react';

import { Wrapper } from '@/views/settings/components/styled';

type Props = ComponentProps<typeof Wrapper>;

export default function Container(props: Props) {
    return <Wrapper {...props} />;
}
