import { useState } from "react";
import { ZodError, ZodString } from "zod/v3";

const useValidate = (schema: ZodString) => {
  const [isValid, setValid] = useState(false);
  const [values, setValue] = useState("");
  const [messages, setMessages] = useState(Array<string>);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valeur = e.currentTarget.value;
    setValue(valeur);
    const data = schema.safeParse(valeur);
    if (data.success) {
      setValid(true);
      setMessages([]);
    } else {
      setValid(false);
      const error = data.error as ZodError;
      setMessages(error.errors.map((err) => err.message));
    }
  };

  return [isValid, values, messages, changeValue] as const;
};

export default useValidate;
