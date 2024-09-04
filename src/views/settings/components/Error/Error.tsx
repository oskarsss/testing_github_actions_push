import { renderGrpcError } from '@/utils/render-error';
import { RpcError } from 'grpc-web';
import { Container } from './styled';

type Props = {
    error: RpcError | null;
};
export default function Error({ error }: Props) {
    return (
        <Container>
            <p>{renderGrpcError(error)}</p>
        </Container>
    );
}
