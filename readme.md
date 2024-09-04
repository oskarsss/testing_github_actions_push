<h1>Vektor TMS</h1>

<h6>Prod</h6>
https://app.vektortms.com

<h6>Staging</h6>
https://staging.vektortms.com

<h1>Props</h1>

Preferred way for props is to use `Props` when they are not exported and keep the format of variables same

![](https://storage.googleapis.com/vektor/code_guidelines/secured_434567890HSDYU213786125S!%25%23E%26%5E!*(%26)123/props_code.png?v=1)

<h1>State</h1>


<h2>Styled Components</h2>
При использовании `styled` компонентов - если нет нужды писать ButtonStyled>, ListStyled> etc - тогда не пишите пожалуйста так! просто Button, List, Item etc

<h2>Typescript RTK </h2>
Для запросов пожалуйста пишите так:

```
GetTrucksRequest
GetTrucksRespone

UpdateTruckRequest
UpdateTruckResponse
```

только так - без никаких "I"


Redux / RTK
используем только SLICES! - не используем старые REDUCERS

<h2>Стиль кода для компонентов</h2>
Пишите код в блоке если линия длинная что бы лучше читалось
правильная весряи СЛЕВА!!

![](https://storage.googleapis.com/vektor/code_guidelines/secured_434567890HSDYU213786125S!%25%23E%26%5E!*(%26)123/code_block.jpg?v=1)

<h2>snake_case for variables.  user_id, id, max_length</h2>

<h2>camelCase for functions.  onClick, getUserId, getUserName, getMaxLength</h2>

<h2>Forms</h2>
Please check <CreateBrokerMenu> component for example
type of form MUST be included in createBrokerUtils of yup
Example:

```javascript
type FormValues = {
    mc: number;
    phone_number: string;
    email: string;
}

const createBrokerUtils: ObjectSchema<FormValues> = yup.object().shape({
    mc          : yup.number().required(),
    email       : yup.string().email().defined(),
    phone_number: yup.string().required()
});

const default_values : FormValues = {
    mc          : 0,
    phone_number: '',
    email       : ''
};

type Props = {
    onAdded: (broker: BrokerRow) => void;
    anchorEl?: HTMLElement | null;
    anchorPosition?: {
        top: number;
        left: number;
    };
    onClose: () => void;
};

export default ({
    onAdded,
    anchorEl,
    onClose,
    anchorPosition
}: Props) => {
```

<h2>Button with icon</h2>
Иконка должна быть в начале кнопки, а не в конце
