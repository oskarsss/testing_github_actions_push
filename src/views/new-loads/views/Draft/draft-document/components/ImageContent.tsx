import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import React from 'react';

//

type Props = {
    src: string;
    alt: string;
    isLoading?: boolean;
};

function ImageContent({
    src,
    alt,
    isLoading
}: Props) {
    if (isLoading) {
        return <Preloader />;
    }
    return (
        <div>
            <img
                style={{
                    width    : '100%',
                    height   : '100%',
                    objectFit: 'contain'
                }}
                src={src}
                alt={alt}
            />
        </div>
    );
}
export default ImageContent;
