import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { theme as openapiTheme, useOpenapi, useTheme } from 'vitepress-openapi/client';
import 'vitepress-openapi/dist/style.css';

import spec from '../openapi.json';

import './custom.css';

const gaId = 'G-YEEGM3QNR0';

export default {
    extends: DefaultTheme,
    async enhanceApp(ctx) {
        useOpenapi({ spec });

        useTheme({
            headingLevels: { h1: 2, h2: 3, h3: 4, h4: 5 },
            jsonViewer: { renderer: 'shiki' },
            operation: { cols: 1, hiddenSlots: ['playground', 'try-it', 'branding', 'footer'] },
            codeSamples: {
                availableLanguages: [
                    { lang: 'curl', label: 'cURL', target: 'shell', client: 'curl', highlighter: 'bash', icon: 'curl' },
                    { lang: 'javascript', label: 'JavaScript', target: 'js', client: 'fetch', highlighter: 'javascript', icon: '.js' },
                    { lang: 'php', label: 'PHP', target: 'php', client: 'guzzle', highlighter: 'php', icon: '.php' },
                    { lang: 'python', label: 'Python', target: 'python', client: 'requests', highlighter: 'python', icon: '.py' },
                ],
            },
        });

        await openapiTheme.enhanceApp(ctx);

        if (import.meta.env.SSR) {
            return;
        }

        const { router } = ctx;
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
