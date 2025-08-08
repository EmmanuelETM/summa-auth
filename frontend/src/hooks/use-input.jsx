import { useState, useRef } from 'react';

function useInput(initialValue) {

  const [value, setValue] = useState(initialValue);
  const elementRef = useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const setFocus = () => {
    if (elementRef.current) {
      elementRef.current.focus();
    }
  };

  return { value, setValue, handleChange, elementRef, setFocus};
}

export default useInput;
