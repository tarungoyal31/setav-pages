import {Button} from "@mui/material";
import CustomToolbar from "./widget/toolbar/Toolbar.tsx";

function App() {
  return (
    <main>
      <CustomToolbar />
      <h1>My todos</h1>
      <Button onClick={() => console.log("Increased")}>+ new</Button>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
