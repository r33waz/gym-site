import { useState } from "react";
import GenericInput from "./components/common/GenericInput";
import GenericSelect from "./components/common/GenericSelect";
import useSelectOptions from "./hooks/useOptions";
import Login from "./module/public/login";

function App() {
  const [selected, setSelected] = useState<string | number>("");
  const [inputValue, setInputValue] = useState<string | number>("");
  console.log("🚀 ~ App ~ inputValue:", inputValue);
  const users = [
    { id: 1, name: "John Doe", age: 10 },
    { id: 2, name: "Jane Smith", age: 20 },
  ];

  const useOptions = useSelectOptions(users, "age", "id");

  return (
    <>
      <Login/>
    </>
  );
}

export default App;
