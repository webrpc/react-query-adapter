import reactLogo from "./assets/react.svg";
import "./App.css";
import { rpcQueryClient } from "./rpc";

function Users() {
  const { isLoading, isError, data } = rpcQueryClient.useQuery([
    "findUsers",
    { q: "" },
  ]);

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return <div>Error while loading users</div>;
  }

  return (
    <div className="card">
      <ul>
        {data.users.map((u) => (
          <li>{u.USERNAME}</li>
        ))}
      </ul>
    </div>
  );
}

function User() {
  const { isLoading, isError, data } = rpcQueryClient.useQuery([
    "getUser",
    { userID: 1 },
  ]);

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return <div>Error while loading users</div>;
  }

  return (
    <div className="card">
      welcome to the @webrpc/react-query example.
      <p>Username from rpc server: {data.user.USERNAME}</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>webRPC + react-query</h1>
      <User />
      <Users />
    </div>
  );
}

export default App;
