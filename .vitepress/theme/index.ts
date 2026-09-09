import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { theme as openapiTheme, useOpenapi, useTheme } from 'vitepress-openapi/client';
import 'vitepress-openapi/dist/style.css';

import openapiEn from '../../node_modules/vitepress-openapi/src/locales/en.json';
import spec from '../openapi.json';

import './custom.css';

const gaId = 'G-YEEGM3QNR0';

/*
 * The code-sample generator builds its request from the Playground's state, and the
 * Playground only switches a parameter on when the spec marks it required. These two
 * headers apply to every endpoint but are optional, so they were missing from every
 * sample. Switch just these on, by name: switching on every optional parameter would
 * put the whole filter set into a listing endpoint's URL.
 */
const sampleHeaders = ['Accept-Language', 'X-Currency'];

function includeSampleHeaders(): void {
    for (const group of document.querySelectorAll('.OAPathContentEnd')) {
        for (const toggle of group.querySelectorAll('[role="checkbox"][aria-checked="false"]')) {
            const label = toggle.closest('div')?.textContent?.trim() ?? '';

            if (sampleHeaders.some((header) => label.startsWith(header))) {
                (toggle as HTMLElement).click();
            }
        }
    }
}

export default {
    extends: DefaultTheme,
    async enhanceApp(ctx) {
        useOpenapi({ spec });

        useTheme({
            headingLevels: { h1: 2, h2: 3, h3: 4, h4: 5 },
            jsonViewer: { renderer: 'shiki' },
            operation: { cols: 1, hiddenSlots: ['try-it', 'branding', 'footer'] },
            i18n: { messages: { en: { ...openapiEn, Samples: 'Request samples' } } },
            codeSamples: {
                availableLanguages: [
                    { lang: 'curl', label: 'cURL', target: 'shell', client: 'curl', highlighter: 'bash', icon: 'curl' },
                    {
                        lang: 'javascript',
                        label: 'JavaScript',
                        target: 'js',
                        client: 'fetch',
                        highlighter: 'javascript',
                        icon: '.js',
                    },
                    { lang: 'php', label: 'PHP', target: 'php', client: 'guzzle', highlighter: 'php', icon: '.php' },
                    {
                        lang: 'python',
                        label: 'Python',
                        target: 'python',
                        client: 'requests',
                        highlighter: 'python',
                        icon: '.py',
                    },
                ],
            },
        });

        await openapiTheme.enhanceApp(ctx);

        if (import.meta.env.SSR) {
            return;
        }

        const observer = new MutationObserver(() => includeSampleHeaders());
        observer.observe(document.body, { childList: true, subtree: true });
        includeSampleHeaders();

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
