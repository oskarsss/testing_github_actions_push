import { useAppTranslation } from '@/hooks/useAppTranslation';
import VectorIcons from '@/@core/icons/vector_icons';
import { Container, Desc, Title } from './styled';

export default function NoNotes() {
    const { t } = useAppTranslation('core');
    return (
        <Container>
            <VectorIcons.EmptyNotes />
            <Title>{t('notes.no_notes.title')}</Title>
            <Desc>{t('notes.no_notes.desc')}</Desc>
        </Container>
    );
}
