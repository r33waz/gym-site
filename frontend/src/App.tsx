import Login from "./module/public/login/login";
import useOptions from "./hooks/useOptions";

function App() {
  const users = [
    { id: 1, name: "John Doe", age: 10 },
    { id: 2, name: "Jane Smith", age: 20 },
  ];

  const options = useOptions(users, "age", "id");

  return (
    <>
      <Login />
    </>
  );
}

export default App;
