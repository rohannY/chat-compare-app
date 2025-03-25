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
      const AppShell = await import("./dashboard/layout");
      return { Component: AppShell.default };
    },
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("./dashboard/intro/page")).default,
        }),
      },
      {
        path: "/docs/chat",
        lazy: async () => ({
          Component: (await import("./dashboard/chat/page")).default,
        }),
      },
      {
        path: "/docs/models/:model-name",
        lazy: async () => ({
          Component: (await import("./dashboard/models/page")).default,
        }),
      },
    ],
  },
  {
    path: "*",
    lazy: async () => ({
      Component: (await import("./not-found")).default,
    }),
  },
]);

export default router;
