import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import converter from 'openapi-to-postmanv2';
import { defineConfig } from 'vitepress';

const openapiPath = join(import.meta.dirname, 'openapi.json');

/** Keeps only the paths a half of the API owns, then drops the components nothing reaches. */
function specForAudience(admin: boolean): string {
    const spec = JSON.parse(readFileSync(openapiPath, 'utf-8'));

    spec.paths = Object.fromEntries(Object.entries(spec.paths).filter(([path]) => path.startsWith('/admin') === admin));

    const reached = new Set<string>();
    const visit = (node: unknown): void => {
        if (Array.isArray(node)) {
            node.forEach(visit);

            return;
        }

        if (!node || typeof node !== 'object') {
            return;
        }

        for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
            if (key === '$ref' && typeof value === 'string') {
                const [, group, name] = value.split('/').slice(1);

                if (reached.has(`${group}/${name}`)) {
                    continue;
                }

                reached.add(`${group}/${name}`);
                visit(spec.components?.[group]?.[name]);

                continue;
            }

            visit(value);
        }
    };

    // Postman saves one example per response, and the shared 4xx refs alone outnumber
    // everything else, which pushes the converter into a shallower faking depth.
    for (const operations of Object.values(spec.paths) as Record<string, any>[]) {
        for (const operation of Object.values(operations)) {
            if (!operation?.responses) {
                continue;
            }

            operation.responses = Object.fromEntries(
                Object.entries(operation.responses).filter(([status]) => status.startsWith('2')),
            );
        }
    }

    visit(spec.paths);

    // Security schemes are named by `security`, never by $ref, so the walk above never reaches them.
    for (const operations of Object.values(spec.paths) as Record<string, any>[]) {
        for (const operation of Object.values(operations)) {
            for (const requirement of operation?.security ?? []) {
                Object.keys(requirement).forEach((name) => reached.add(`securitySchemes/${name}`));
            }
        }
    }

    for (const group of Object.keys(spec.components ?? {})) {
        spec.components[group] = Object.fromEntries(
            Object.entries(spec.components[group]).filter(([name]) => reached.has(`${group}/${name}`)),
        );
    }

    spec.tags = (spec.tags ?? []).filter((tag: { name: string }) => tag.name.startsWith('Admin ') === admin);

    return JSON.stringify(spec);
}

async function postmanCollection(admin: boolean): Promise<string> {
    const collection = await new Promise<any>((resolve, reject) => {
        converter.convert(
            { type: 'string', data: specForAudience(admin) },
            { folderStrategy: 'Tags', requestParametersResolution: 'Example' },
            (error: { message: string } | null, result: any) => {
                if (error || !result?.result) {
                    reject(new Error(error?.message ?? result?.reason ?? 'conversion failed'));

                    return;
                }

                resolve(result.output[0].data);
            },
        );
    });

    collection.info.name = admin ? 'FlexStore Admin API' : 'FlexStore Storefront API';
    collection.info.description = admin
        ? 'Set baseUrl to your store, for example https://your-store.com/api/v1.\n\n' +
          'Run Admin Authentication > Log in as staff first, then paste the returned token into the bearerToken variable. ' +
          'Every endpoint is gated by the same permission as the matching admin screen.'
        : 'Set baseUrl to your store, for example https://your-store.com/api/v1.\n\n' +
          'Run Authentication > Log in first, then paste the returned token into the bearerToken variable. ' +
          'Cart and checkout requests share the cartToken variable: copy the token from the first cart response into it.';

    collection.variable = [
        { key: 'baseUrl', value: 'https://your-store.com/api/v1' },
        { key: 'bearerToken', value: '' },
        ...(admin
            ? []
            : [
                  { key: 'cartToken', value: '' },
                  { key: 'visitorId', value: '8f1d3b2a-5c4e-4f6a-9b7c-1d2e3f4a5b6c' },
              ]),
    ];

    const useVariables = (items: any[]): void => {
        for (const item of items) {
            if (item.item) {
                useVariables(item.item);

                continue;
            }

            for (const header of item.request?.header ?? []) {
                if (header.key === 'X-Cart-Token') {
                    header.value = '{{cartToken}}';
                }

                if (header.key === 'X-Visitor-Id') {
                    header.value = '{{visitorId}}';
                }
            }
        }
    };

    useVariables(collection.item);

    return JSON.stringify(collection, null, 2);
}

const downloads: Record<string, () => Promise<string>> = {
    '/openapi.json': async () => readFileSync(openapiPath, 'utf-8'),
    '/flexstore.postman_collection.json': () => postmanCollection(false),
    '/flexstore-admin.postman_collection.json': () => postmanCollection(true),
};

// The spec is imported by the theme, so it cannot live in public/. Both files are
// still published at the URLs below.
const serveDownloads = {
    name: 'flexstore-downloads',
    configureServer(server: {
        middlewares: { use: (path: string, handler: (req: unknown, res: any) => void) => void };
    }) {
        for (const [path, build] of Object.entries(downloads)) {
            server.middlewares.use(path, (_req, res) => {
                build().then((body) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(body);
                });
            });
        }
    },
};

const gaId = 'G-YEEGM3QNR0';

const gaHead: [string, Record<string, string>, string][] = [
    [
        'script',
        {},
        `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.__gaLocal = location.protocol === 'file:' || /^(localhost|127\\.0\\.0\\.1|\\[::1\\]|0\\.0\\.0\\.0)$/.test(location.hostname) || /\\.local$|\\.localhost$/.test(location.hostname);
if (!window.__gaLocal) {
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=${gaId}';
  document.head.appendChild(s);
  gtag('js', new Date());
  gtag('config', '${gaId}');
}`,
    ],
];

export default defineConfig({
    vite: { plugins: [serveDownloads] },
    async buildEnd(siteConfig) {
        for (const [path, build] of Object.entries(downloads)) {
            writeFileSync(join(siteConfig.outDir, path.slice(1)), await build());
        }
    },
    title: 'FlexStore',
    description: 'FlexStore Documentation',
    srcExclude: ['README.md'],
    head: [['link', { rel: 'icon', href: '/favicon.png' }], ...gaHead],
    themeConfig: {
        logo: { light: '/logo.svg', dark: '/logo-dark.svg' },
        siteTitle: false,
        search: { provider: 'local' },
        sidebar: [
            { text: 'Introduction', link: '/introduction' },
            { text: 'Installation', link: '/installation' },
            { text: 'Updates', link: '/updates-and-upgrades' },
            { text: 'Security', link: '/security' },
            { text: 'Translating Content', link: '/translating-content' },
            { text: 'Translating the Interface', link: '/translating-interface' },
            { text: 'Multi-Currency', link: '/multi-currency' },
            { text: 'Shared Payment Links', link: '/shared-payment-links' },
            {
                text: 'Main',
                collapsed: false,
                items: [
                    { text: 'Dashboard', link: '/dashboard' },
                    {
                        text: 'Orders',
                        link: '/orders',
                        collapsed: true,
                        items: [
                            { text: 'Returns', link: '/returns' },
                            { text: 'Abandoned Checkouts', link: '/abandoned-checkouts' },
                        ],
                    },
                    {
                        text: 'Products',
                        link: '/products',
                        collapsed: true,
                        items: [
                            { text: 'Inventory', link: '/inventory' },
                            { text: 'Search Synonyms', link: '/search-synonyms' },
                        ],
                    },
                    { text: 'Categories', link: '/categories' },
                    { text: 'Brands', link: '/brands' },
                    { text: 'Blog', link: '/blog' },
                    { text: 'Coupons', link: '/coupons' },
                    { text: 'Flash Sales', link: '/flash-sales' },
                    { text: 'Customers', link: '/customers' },
                    { text: 'Reviews', link: '/reviews' },
                    { text: 'Reports', link: '/reports' },
                ],
            },
            {
                text: 'System',
                collapsed: false,
                items: [
                    { text: 'Account', link: '/account' },
                    { text: 'Staff', link: '/staff' },
                    { text: 'Roles', link: '/roles' },
                    { text: 'Regions', link: '/regions' },
                    { text: 'Storefront', link: '/storefront' },
                ],
            },
            {
                text: 'Settings',
                collapsed: false,
                items: [
                    { text: 'General', link: '/settings-general' },
                    { text: 'Store', link: '/settings-store' },
                    { text: 'Language', link: '/settings-languages' },
                    { text: 'Currency', link: '/settings-currencies' },
                    { text: 'Shipping', link: '/settings-shipping' },
                    { text: 'Tax', link: '/settings-taxes' },
                    { text: 'Payment', link: '/settings-payments' },
                    { text: 'Checkout', link: '/settings-checkout' },
                    { text: 'Newsletter', link: '/settings-newsletter' },
                    { text: 'Mail', link: '/settings-mail' },
                    { text: 'Notification', link: '/settings-notification' },
                    { text: 'Policy', link: '/settings-policy' },
                    { text: 'SEO', link: '/settings-seo' },
                    { text: 'Integration', link: '/settings-integration' },
                    { text: 'System', link: '/settings-system' },
                ],
            },
            {
                text: 'Developer',
                collapsed: true,
                items: [
                    { text: 'Installation', link: '/developer/installation' },
                    { text: 'SSR', link: '/developer/ssr' },
                    { text: 'Admin Path Prefix', link: '/developer/admin-path' },
                    { text: 'Checkout Flow', link: '/developer/checkout-flow' },
                    { text: 'Money & Currency', link: '/developer/money-and-currency' },
                    { text: 'Shipping Drivers', link: '/developer/shipping-drivers' },
                    { text: 'Payment Drivers', link: '/developer/payment-drivers' },
                    { text: 'Newsletter Drivers', link: '/developer/newsletter-drivers' },
                    { text: 'Storefront Sections', link: '/developer/storefront-sections' },
                ],
            },
            {
                text: 'API',
                link: '/developer/api/',
                collapsed: true,
                items: [
                    { text: 'Conventions', link: '/developer/api/conventions' },
                    {
                        text: 'Storefront',
                        link: '/developer/api/storefront',
                        collapsed: true,
                        items: [
                            { text: 'Authentication', link: '/developer/api/reference/authentication' },
                            { text: 'Configuration', link: '/developer/api/reference/configuration' },
                            { text: 'Homepage', link: '/developer/api/reference/homepage' },
                            { text: 'Address Rules', link: '/developer/api/reference/address-rules' },
                            { text: 'Policies', link: '/developer/api/reference/policies' },
                            { text: 'Newsletter', link: '/developer/api/reference/newsletter' },
                            { text: 'Products', link: '/developer/api/reference/products' },
                            { text: 'Categories', link: '/developer/api/reference/categories' },
                            { text: 'Brands', link: '/developer/api/reference/brands' },
                            { text: 'Reviews', link: '/developer/api/reference/reviews' },
                            { text: 'Flash Sales', link: '/developer/api/reference/flash-sales' },
                            { text: 'Blog', link: '/developer/api/reference/blog' },
                            { text: 'Cart', link: '/developer/api/reference/cart' },
                            { text: 'Checkout', link: '/developer/api/reference/checkout' },
                            { text: 'Payment Links', link: '/developer/api/reference/payment-links' },
                            {
                                text: 'Account',
                                collapsed: true,
                                items: [
                                    { text: 'Profile', link: '/developer/api/reference/profile' },
                                    { text: 'Orders', link: '/developer/api/reference/orders' },
                                    { text: 'Returns', link: '/developer/api/reference/returns' },
                                    { text: 'Downloads', link: '/developer/api/reference/downloads' },
                                    { text: 'Addresses', link: '/developer/api/reference/addresses' },
                                    { text: 'Wishlist', link: '/developer/api/reference/wishlist' },
                                    { text: 'Compare', link: '/developer/api/reference/compare' },
                                ],
                            },
                        ],
                    },
                    {
                        text: 'Admin',
                        link: '/developer/api/admin',
                        collapsed: true,
                        items: [
                            { text: 'Authentication', link: '/developer/api/reference/admin/authentication' },
                            { text: 'Configuration', link: '/developer/api/reference/admin/configuration' },
                            { text: 'Dashboard', link: '/developer/api/reference/admin/dashboard' },
                            {
                                text: 'Orders',
                                link: '/developer/api/reference/admin/orders',
                                collapsed: true,
                                items: [
                                    { text: 'Returns', link: '/developer/api/reference/admin/returns' },
                                    {
                                        text: 'Abandoned Checkouts',
                                        link: '/developer/api/reference/admin/abandoned-checkouts',
                                    },
                                ],
                            },
                            {
                                text: 'Products',
                                link: '/developer/api/reference/admin/products',
                                collapsed: true,
                                items: [
                                    { text: 'Inventory', link: '/developer/api/reference/admin/inventory' },
                                    { text: 'Search Synonyms', link: '/developer/api/reference/admin/search-synonyms' },
                                ],
                            },
                            { text: 'Categories', link: '/developer/api/reference/admin/categories' },
                            { text: 'Brands', link: '/developer/api/reference/admin/brands' },
                            { text: 'Blog Posts', link: '/developer/api/reference/admin/blog-posts' },
                            { text: 'Coupons', link: '/developer/api/reference/admin/coupons' },
                            { text: 'Flash Sales', link: '/developer/api/reference/admin/flash-sales' },
                            { text: 'Customers', link: '/developer/api/reference/admin/customers' },
                            { text: 'Reviews', link: '/developer/api/reference/admin/reviews' },
                            { text: 'Reports', link: '/developer/api/reference/admin/reports' },
                            { text: 'Media', link: '/developer/api/reference/admin/media' },
                        ],
                    },
                ],
            },
        ],
    },
});
