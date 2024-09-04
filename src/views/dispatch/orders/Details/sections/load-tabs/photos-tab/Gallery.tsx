// import { useTheme } from '@mui/material/styles';
// import React from 'react';
// import 'lightbox.js-react/dist/index.css';
// import { SlideshowLightbox } from 'lightbox.js-react';

// import { RetrieveLoadReply_Vehicle } from '@proto/loads';
// import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';

// type Props = {
//     item: RetrieveLoadReply_Vehicle;
// };

// function Image({
//     src,
//     alt
// }: { src: string; alt: string }) {
//     const { url } = usePrivateFileUrl(src);
//     return (
//         <img
//             style={{
//                 objectFit: 'cover',
//                 width    : 'calc(50% - 1px)',
//                 height   : '200px'
//             }}
//             src={url}
//             alt={alt}
//             loading="lazy"
//         />
//     );
// }

// export default function Gallery({ item }: Props) {
//     const theme = useTheme().palette.mode === 'dark' ? 'night' : 'day';

//     const data = item.photosUrl.map((url) => ({
//         src: url,
//         alt: `${item.make} ${item.model}`
//     }));

//     return (
//         <SlideshowLightbox
//             key={`${theme}-${item.vehicleId}`}
//             showThumbnails={false}
//             showThumbnailIcon={false}
//             lightboxIdentifier="lightbox1"
//             images={data}
//             theme={theme}
//             framework="next"
//             className="slideshowLightboxLoadDetails"
//         >
//             {data.map(({
//                 src,
//                 alt
//             }, index) => (
//                 <Image
//                     key={src}
//                     alt={alt}
//                     src={src}
//                 />
//             ))}
//         </SlideshowLightbox>
//     );
// }
