
import style from './../../styles/FormInput.module.css'
import type { ZodString} from "zod/v3";
import useValidate from "../../hooks/validateInput.hook";
import clsx from 'clsx';

type FormInput = {
    name : string
    schema : ZodString
    onChange : (field : string, isValid : boolean) => void
};

 const FormInput = ({name, schema, onChange} : FormInput) => {
    const [isValid, values, messages, changeValue]  = useValidate(schema);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeValue(e);
        onChange(name, isValid);
      };

    return (
        <div>
            <label htmlFor={name} className={style.label}>{name}</label>
            <input type={name === "name"? "text" : name} placeholder={name} className={clsx(
                style.input,
                isValid ? style.valid : style.invalid
            )} value={values} onChange={handleChange} />
            {!isValid && (
                <div className={style.error}>
                    <ul>
                        {messages.map((str) => <li>{str}</li>)}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default FormInput