import { defineConfig } from 'vitepress';

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
            { text: 'Updates & Upgrades', link: '/updates-and-upgrades' },
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
                        items: [
                            { text: 'Returns', link: '/returns' },
                            { text: 'Abandoned Checkouts', link: '/abandoned-checkouts' },
                        ],
                    },
                    {
                        text: 'Products',
                        link: '/products',
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
                collapsed: false,
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
        ],
    },
});
