import Header from './components/Header';
import Wrappers from './components/Wrappers';
import Form from './components/Form';
import Actions from './components/Actions';
import FetchingProcess from './components/FetchingProcess';

/**
 * ### Vektor Dialogs All Components:
 * #### Wrappers:
 * - `DialogWrapper` - is a Dialog component.
 * #### Actions:
 * - `ActionsWrapper` - is a component that contains buttons.
 * - `DeleteButton` - is a delete button.
 * - `CancelButton` - is a cancel button.
 * - `SubmitButton` - is a save button type submit.
 * #### Form:
 * - `Fields` - is a wrapper for Fields components.
 * - `Field` - is a wrapper for input. You can use it in Fields component.
 * - `Form` - is a form.
 * #### Header:
 * - `Header` - is a header component.
 * - `SubHeader` - is a subheader component.
 */

const DialogComponents = {
    ...Header,
    ...Wrappers,
    ...Form,
    ...Actions,
    ...FetchingProcess
};

export default DialogComponents;
