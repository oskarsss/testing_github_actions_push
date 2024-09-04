import { ReactNode } from 'react';
import CenterStyled from '../styled';

type Props = {
    children: ReactNode;
};

export default function Tabs({ children }: Props) {
    return <CenterStyled.ContentBlock>{children}</CenterStyled.ContentBlock>;
}
