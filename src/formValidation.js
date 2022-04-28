
export function nameValidation(name, value, setInputErrors) {
    const regex = new RegExp("[a-zA-Z]");
    if(regex.test(value))
    {
        setInputErrors((prev) => {
            return { ...prev, name: false };
          });
    }else
    {
        setInputErrors((prev) => {
            return { ...prev, name: true };
          });
    }
  };

  export function emailValidation(name, value, setInputErrors) {
    const regex = new RegExp("[a-zA-Z]");
    if(regex.test(value))
    {
        setInputErrors((prev) => {
            return { ...prev, name: true };
          });
    }else
    {
        setInputErrors((prev) => {
            return { ...prev, name: false };
          });
    }
  };

  export function phoneValidation(name, value, setInputErrors) {
    const regex = new RegExp("[a-zA-Z]");
    if(regex.test(value))
    {
        setInputErrors((prev) => {
            return { ...prev, name: true };
          });
    }else
    {
        setInputErrors((prev) => {
            return { ...prev, name: false };
          });
    }
  };

  export function alphaNumericValidation(name, value, setInputErrors) {
    const regex = new RegExp("[a-zA-Z]");
    if(regex.test(value))
    {
        setInputErrors((prev) => {
            return { ...prev, name: true };
          });
    }else
    {
        setInputErrors((prev) => {
            return { ...prev, name: false };
          });
    }
  };