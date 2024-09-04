export default function isNotPDF(url: string) {
    return url.toLowerCase().indexOf('.pdf') === -1;
}
