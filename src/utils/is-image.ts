import { FileModel_MimeType } from '@proto/models/model_file';

function isImage(mimeType: FileModel_MimeType) {
    return [
        FileModel_MimeType.GIF,
        FileModel_MimeType.JPG,
        FileModel_MimeType.JPEG,
        FileModel_MimeType.PNG,
        FileModel_MimeType.WEBP,
        FileModel_MimeType.SVG
    ].includes(mimeType);
}

export default isImage;
