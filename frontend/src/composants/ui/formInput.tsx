
import style from './../../styles/FormInput.module.css'
import type { ZodString} from "zod/v3";
import useValidate from "../../hooks/validateInput.hook";
import clsx from 'clsx';
import type React from 'react';

type FormInput = {
    name : string
    schema : ZodString
    onChange : (field : string, isValid : boolean) => void
};

 const FormInput = ({name, schema, onChange} : FormInput) => {
    const [isValid, values, messages, changeValue, changeFocus]  = useValidate(schema);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeValue(e);
      };

    const handleBlur = (e : React.FocusEvent<HTMLInputElement>) => {
        changeFocus(e);
        onChange(name, isValid);
    }

    return (
        <div>
            <label htmlFor={name} className={style.label}>{name}</label>
            <input type={name === "name"? "text" : name} placeholder={name} className={clsx(
                style.input,
                isValid || values === ""? style.valid : style.invalid
            )} value={values} onChange={handleChange} onBlur={handleBlur} />
            {!isValid && (
                <div className={style.error}>
                    <ul>
                        {messages.map((str, index) => <li key={index}>{str}</li>)}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default FormInput