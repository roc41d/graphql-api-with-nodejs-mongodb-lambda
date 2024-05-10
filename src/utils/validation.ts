import { Validator } from 'node-input-validator';

interface ValidationRules {
    [key: string]: string;
}

interface InputData {
    [key: string]: any;
}

async function validateInput(data: InputData, rules: ValidationRules): Promise<any> {
    const validator = new Validator(data, rules);
    const matched = await validator.check();

    if (!matched) {
        throw new Error(JSON.stringify(validator.errors));
    }

    return data;
}

export default validateInput;