import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import VectorIcons from '@/@core/icons/vector_icons';
import { renderError } from '@/utils/render-error';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import React, { ComponentProps } from 'react';
import { useRouter } from 'next/router';
import { SerializedError } from '@reduxjs/toolkit';

type Props = {
    error?: FetchBaseQueryError | SerializedError | string;
    pathname?: string;
    onClick?: () => void;
} & Omit<ComponentProps<typeof FallbackContent>, 'onClick' | 'firstText' | 'size'>;

export default function ErrorDetailsPage({
    error,
    buttonText = 'pages:deleted_item.fallback.button_text',
    pathname,
    onClick,
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
            firstText={<span>{renderError((error as FetchBaseQueryError) || {})}</span>}
        />
    );
}
