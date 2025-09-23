import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";

export const HerosApp = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};
