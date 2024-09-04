import React, { memo } from 'react';
import useFiles from '@/views/new-loads/hooks/useFiles';
import useExtractFile from '@/views/new-loads/hooks/useExtractFile';
import { TestIDs } from '@/configs/tests';
import DraftDropzoneContent from './DraftDropzoneContent';
import { useDraftFormContext } from '../Draft';

type Props = {
    children: React.ReactNode;
};

const DraftDropzone = ({ children }: Props) => {
    const {
        setValue,
        getValues,
        reset
    } = useDraftFormContext();

    const onExtract = useExtractFile({
        getValues,
        reset
    });

    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useFiles({
        merge        : true,
        location     : 'drafts/files',
        onResCallback: (data) => {
            const { url } = data.paths[0];
            setValue('rateConUrl', url);
            setValue('rateConFileName', data.paths[0].name);
            onExtract(url);
        },
        dropzoneOptions: {
            noClick: true
        }
    });

    return (
        <div
            {...getRootProps()}
            id={TestIDs.pages.createLoad.fields.rateConDrop}
            style={{ height: '100%', position: 'relative', overflow: 'hidden' }}
        >
            {children}
            <DraftDropzoneContent isDragActive={isDragActive} />
            <input {...getInputProps()} />
        </div>
    );
};

export default memo(DraftDropzone);
