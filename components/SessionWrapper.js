"use client";

import { SessionProvider } from "next-auth/react";

export default function App({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
  // This setup ensures that authentication-related information (like user session data) is accessible to all the child components of App.
}

// SessionProvider is a component provided by the next-auth library. It is used to manage and provide authentication sessions throughout your application. By wrapping your application with SessionProvider, you make session information available to all components within your app.
