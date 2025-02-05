import "./App.css";
import Welcome from "./components/Welcome";
import { Router } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router";
import Camera from './components/Camera';
import Upload from './components/Upload';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <Welcome/>
      )
    },
    {
      path: '/camera',
      element: (
        <Upload/>
        // <Camera/>
      )
    }
  ]
)

function App() {
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
