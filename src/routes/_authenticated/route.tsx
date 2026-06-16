import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { auth } from "@/integrations/firebase/client";

function getCurrentUser(): Promise<any> {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const user = auth.currentUser || (await getCurrentUser());
    if (!user) {
      throw redirect({ to: "/auth", search: { mode: "login" } as any });
    }
    return { user };
  },
  component: () => <Outlet />,
});
