'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes('welcome-toast=2')) {
      toast('Welcome to My Shopify project', {
        id: 'welcome-toast',
        duration: Infinity,
        onDismiss: () => {
          document.cookie = 'welcome-toast=2; max-age=31536000; path=/';
        },
        description: (
          <>
            This is a high-performance, SSR storefront powered by Shopify, Next.js{' '}
            <a
              href="https://github.com/Pedro-maciel-pinheiro/Perfect-shine-clothes-shop"
              className="text-violet-500 hover:underline"
              target="_blank"
            >
              Github Repository
            </a>
            .
          </>
        )
      });
    }
  }, []);

  return null;
}
