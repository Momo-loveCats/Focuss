import React, { useState } from "react";
import { ZodError, ZodString } from "zod/v3";

const useValidate = (schema: ZodString) => {
  const [isValid, setValid] = useState(false);
  const [values, setValue] = useState("");
  const [messages, setMessages] = useState(Array<string>);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valeur = e.currentTarget.value;
    setValue(valeur);
    setMessages([]);
    const data = schema.safeParse(valeur);
    if (data.success) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const changeFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const valeur = e.currentTarget.value;
    const data = schema.safeParse(valeur);
    if (data.success) {
      setValid(true);
      setMessages([]);
    } else {
      setValid(false);
      const error = data.error as ZodError;
      setMessages(error.errors.map((err) => err.message));
    }

    if (valeur === "") {
      setMessages([]);
    }
  };

  return [isValid, values, messages, changeValue, changeFocus] as const;
};

export default useValidate;
