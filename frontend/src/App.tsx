import { useState } from "react";
import GenericInput from "./components/common/GenericInput";
import GenericSelect from "./components/common/GenericSelect";
import useSelectOptions from "./hooks/useOptions";

function App() {
  const [selected, setSelected] = useState<string | number>("");
  const users = [
    { id: 1, name: "John Doe", age: 10 },
    { id: 2, name: "Jane Smith", age: 20 },
  ];

  const useOptions = useSelectOptions(users, "age", "id");

  return (
    <>
      <div className="flex justify-center w-full border-cyan-400 border">
        <GenericSelect
          label="Select Data"
          options={useOptions}
          onChange={(e) => {
            setSelected(e);
            console.log(e);
          }}
          value={selected}
        />
        <GenericInput />
      </div>
    </>
  );
}

export default App;
