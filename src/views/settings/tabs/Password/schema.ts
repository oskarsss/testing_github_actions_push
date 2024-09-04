import * as yup from 'yup';

export default yup.object().shape({
    current_password: yup
        .string()
        .min(5, 'Password must be at least 5 characters')
        .max(40, 'Password maximum 40 characters')
        .required(),
    new_password: yup
        .string()
        .min(5, 'Password must be at least 5 characters')
        .max(40, 'Password maximum 40 characters')
        .required(),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref('new_password'), undefined], 'Passwords must match')
        .required()
});
