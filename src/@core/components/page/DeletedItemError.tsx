import VectorIcons from '@/@core/icons/vector_icons';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import { useRouter } from 'next/router';
import React, { ComponentProps } from 'react';

type Props = {
    pathname?: string;
    onClick?: () => void;
    text: string;
} & Omit<
    ComponentProps<typeof FallbackContent>,
    'onClick' | 'firstText' | 'size' | 'secondText' | 'icon'
>;

function DeletedItemError({
    buttonText = 'pages:deleted_item.fallback.button_text',
    pathname,
    onClick,
    text,
    ...props
}: Props) {
    const router = useRouter();
    const handleClick = () => {
        if (onClick) {
            onClick();
            return;
        }
        router.push(pathname || router.pathname.split('/').slice(0, -1).join('/'));
    };

    return (
        <FallbackContent
            {...props}
            icon={<VectorIcons.Cone />}
            onClick={handleClick}
            buttonText={buttonText}
            firstText="pages:deleted_item.fallback.first_text"
            secondText="pages:deleted_item.fallback.second_text"
            translateOptions={{
                firstText : { text },
                secondText: { text }
            }}
        />
    );
}

export default DeletedItemError;
