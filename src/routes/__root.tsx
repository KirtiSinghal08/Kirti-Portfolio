import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kirti Singhal" },
      { name: "description", content: "Portfolio" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2000);
    const hideTimer = setTimeout(() => setShowIntro(false), 3100);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {showIntro && (
        <div style={{
          position: 'fixed', inset: 0, background: '#0a0a0a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', zIndex: 9999,
          opacity: fadeOut ? 0 : 1,
          transition: 'opacity 0.9s ease',
          pointerEvents: 'none',
        }}>
          <div style={{
            fontSize: 'clamp(60px, 14vw, 140px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#f0ede6',
            fontFamily: 'Georgia, serif',
            lineHeight: 1,
            animation: 'riseIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
          }}>
            KIRTI SINGHAL
          </div>
          <div style={{
            width: fadeOut ? 0 : 80,
            height: '1px',
            background: '#f0ede6',
            margin: '20px auto',
            transition: 'width 0.6s ease',
          }} />
          <div style={{
            fontSize: 'clamp(11px, 2vw, 14px)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#888',
            fontFamily: 'Helvetica Neue, sans-serif',
            marginTop: '4px',
            animation: 'fadeUp 0.7s ease 0.9s both',
          }}>
            Portfolio · 2026
          </div>
          <style>{`
            @keyframes riseIn {
              from { opacity: 0; transform: translateY(40px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeUp {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
        </div>
      )}
      <Outlet />
    </>
  );
}