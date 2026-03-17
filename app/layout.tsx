import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { EyeTrackingProvider } from "@/contexts/EyeTrackingContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ErrorReporter from "@/components/ErrorReporter";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Nathan Wituk — UI/UX Designer",
  description:
    "Portfolio of Nathan Wituk, a Kansas-based UI/UX and visual designer studying Interaction Design at the University of Kansas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Force light mode — clear any stored dark preference */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{localStorage.removeItem('theme');document.documentElement.classList.remove('dark');}catch(e){}`,
          }}
        />
      </head>
      <body className={`${instrumentSans.variable} antialiased`}>
        <ThemeProvider>
          <EyeTrackingProvider>
            <ErrorReporter />
            {children}
          </EyeTrackingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
