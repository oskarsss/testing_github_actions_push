import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import VectorIcons from '@/@core/icons/vector_icons';
import React from 'react';
import type { IntlMessageKey } from '@/@types/next-intl';

type ErrorProps = {
    onClick: () => void;
    message?: string;
};

const Error = ({
    onClick,
    message
}: ErrorProps) => (
    <FallbackContent
        icon={<VectorIcons.Cone />}
        onClick={onClick}
        buttonText="common:button.refetch"
        firstText={message ? <span>{message}</span> : 'common:something_went_wrong'}
    />
);

export default Error;
