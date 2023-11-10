import { useState } from "react";

export default function useOnChange() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return { setValue, value, handleChange };
}
