import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    axios.get("api/book").then((res) => console.log(res.data));
  }, []);

  return (
    <>
      <div className="w-full h-screen text-4xl text-blue-700 flex items-center justify-center">
        Hello world!
      </div>
    </>
  );
}

export default App;
