import React, { useState } from 'react';
import Container from '@/views/settings/components/Container/Container';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import Table from './components/Table/Table';

export default function Documents() {
    const [value, setValue] = useState<DocumentModel_DocumentEntityType | ''>('');

    return (
        <Container
            sx={{
                '& .MuiTableCell-head': {
                    verticalAlign: 'top'
                }
            }}
        >
            <Table
                value={value}
                setValue={setValue}
            />
        </Container>
    );
}
