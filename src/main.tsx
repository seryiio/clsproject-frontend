// main.tsx o App.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import OrdenNavVelocidadOptima from "./pages/velocidadOptima/OrdenNavVelocidadOptima";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OrdenNavVelocidadOptima />,
    action: async ({ request }) => {
      const formData = await request.formData();
      Object.fromEntries(formData);
      return null;
    },
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <header className="flex justify-end items-center h-full m-4 p-4 bg-white shadow-2xl rounded-xl">
      <h1>Bienvenido <strong>SERGIO NICOLAS HUAMÁN CHENG</strong> al Portal de Flota</h1>
    </header>
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
      </main>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </SidebarProvider>
  </>
);
