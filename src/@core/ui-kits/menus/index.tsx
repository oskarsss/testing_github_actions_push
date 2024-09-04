import Actions from './components/Actions';
import Wrappers from './components/Wrappers';
import List from './components/List';
import Form from './components/Form';

/**
 * ### Vektor Menus All Components:
 * #### Wrappers:
 * - `MenuWrapper` - is a Menu component.
 * #### Actions:
 * - `ActionsWrapper` - is a component that contains buttons.
 * - `DeleteButton` - is a delete button.
 * - `CancelButton` - is a cancel button.
 * - `SubmitButton` - is a save button type submit.
 * #### List:
 * - `List` - is a component that contains list items.
 * - `MenuItem` - is a component that contains list item.
 * - `DangerItem` - is a component that contains list item with danger style.
 * #### Form:
 * - `Fields` - is a wrapper for Fields components.
 * - `Field` - is a wrapper for input. You can use it in Fields component.
 * - `Form` - is a form.
 * - `FormHeader` - is a form header.
 */
const MenuComponents = {
    ...Actions,
    ...Wrappers,
    ...List,
    ...Form
};
export default MenuComponents;
