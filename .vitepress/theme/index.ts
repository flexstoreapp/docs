import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

import './custom.css';

const gaId = 'G-YEEGM3QNR0';

export default {
    extends: DefaultTheme,
    enhanceApp({ router }) {
        if (import.meta.env.SSR) {
            return;
        }

        let isInitialRoute = true;

        const previous = router.onAfterRouteChange;
        router.onAfterRouteChange = async (to) => {
            await previous?.(to);

            if (isInitialRoute) {
                isInitialRoute = false;

                return;
            }

            const w = window as Window & {
                gtag?: (...args: unknown[]) => void;
                __gaLocal?: boolean;
            };

            if (w.__gaLocal || typeof w.gtag !== 'function') {
                return;
            }

            w.gtag('config', gaId, { page_path: to });
        };
    },
} satisfies Theme;
