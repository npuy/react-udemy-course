import { Outlet } from "react-router";

export const AdminLayout = () => {
  return (
    <div className="bg-zinc-500">
      <Outlet />
    </div>
  );
};
