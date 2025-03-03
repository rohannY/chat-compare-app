import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { default: Landing } = await import("./landing/index");
      return {
        Component: (props) => <Landing {...props} />,
      };
    },
  },
  {
    path: "/docs",
    lazy: async () => {
      const { default: AppShell } = await import("./dashboard/page");
      const { Outlet } = await import("react-router-dom");
      return {
        Component: (props) => (
          <AppShell {...props}>
            <Outlet />
          </AppShell>
        ),
      };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: ChatComponent } = await import("./page/chat");
          return {
            Component: (props) => <ChatComponent {...props} />,
          };
        },
      },
      {
        path: "models/:model-name",
        lazy: async () => {
          const { default: ModelComponent } = await import(
            "./dashboard/models/page"
          );
          return {
            Component: (props) => <ModelComponent {...props} />,
          };
        },
      },
    ],
  },
]);

export default router;
