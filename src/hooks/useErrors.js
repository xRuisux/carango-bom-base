import { useState } from 'react';

function useErrors(validations) {

    const initialState = createInitialState(validations);

    const [errors, setErrors] = useState(initialState);

    function validateFields(event) {
        const { name, value } = event.target;
        const newState = { ...errors };
        newState[name] = validations[name](value);
        setErrors(newState);
    }

    function allFieldsValid() {
        for (let field in errors) {
            if (!errors[field].valid) {
                return false;
            }
        }

        return true;
    }

    return [errors, validateFields, allFieldsValid];
}

function createInitialState(validations) {
    const initialState = {};
    for (let field in validations) {
        initialState[field] = { valid: true, text: "" };
    }

    return initialState;
}

export default useErrors;