import Actions from './components/Actions';
import Form from './components/Form';
import Header from './components/Header';
import Text from './components/Text';
import FetchingProcess from './components/FetchingProcess';
import Dialog from './components/Dialog';
import Content from './components/Content';

const FullDialog = {
    ...Actions,
    ...Form,
    ...Header,
    ...Text,
    ...Dialog,
    ...FetchingProcess,
    ...Content
};

export default FullDialog;
