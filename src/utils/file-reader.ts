import toast from 'react-hot-toast';

export function fileReader<T extends File>(
    file: T
): Promise<{ uint8Array: Uint8Array; fileType: string }> {
    return new Promise((resolve, reject) => {
        file.arrayBuffer()
            .then((arrayBuffer) => {
                const uint8Array = new Uint8Array(arrayBuffer);
                resolve({ uint8Array, fileType: file.type });
            })
            .catch((error) => {
                console.debug('Error reading file:', error);
                toast.error('Error reading file', {
                    position: 'top-right',
                    duration: 2500
                });
                reject(error);
            });
    });
}

export function readMultipleFiles(
    files: File[]
): Promise<{ uint8Array: Uint8Array; fileType: string }[]> {
    return Promise.all(files.map((file) => fileReader(file)));
}
