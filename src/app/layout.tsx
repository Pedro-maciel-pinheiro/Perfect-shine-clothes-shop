import { CartProvider } from "@/components/cart/cart-context";

import { WelcomeToast } from "@/components/welcome-toast";

import { getCart } from "@/lib/shopify";
import { ensureStartsWith } from "@/lib/utils";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer/footer";
import { perfectshine_font } from "@/fonts/font";

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";
const twitterCreator = TWITTER_CREATOR
  ? ensureStartsWith(TWITTER_CREATOR, "@")
  : undefined;
const twitterSite = TWITTER_SITE
  ? ensureStartsWith(TWITTER_SITE, "https://")
  : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: "summary_large_image",
        creator: twitterCreator,
        site: twitterSite,
      },
    }),
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cartId = (await cookies()).get("cartId")?.value;
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart(cartId);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={perfectshine_font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider cartPromise={cart}>
            <Navbar />
            <main >
              {children}
              <Toaster closeButton />
              <WelcomeToast />
            </main>
            <Footer/>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
