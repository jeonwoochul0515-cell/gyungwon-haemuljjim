import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const MenuPage = lazy(() => import("./pages/MenuPage"));
const StoresPage = lazy(() => import("./pages/StoresPage"));
const FranchisePage = lazy(() => import("./pages/FranchisePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));

function PageFallback() {
  return (
    <div className="container-x flex min-h-[40vh] items-center justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-red border-t-transparent" />
    </div>
  );
}

function L({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageFallback />}>{children}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <L><AboutPage /></L> },
      { path: "menu", element: <L><MenuPage /></L> },
      { path: "stores", element: <L><StoresPage /></L> },
      { path: "franchise", element: <L><FranchisePage /></L> },
      { path: "contact", element: <L><ContactPage /></L> },
      { path: "privacy", element: <L><PrivacyPage /></L> },
      { path: "terms", element: <L><TermsPage /></L> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
