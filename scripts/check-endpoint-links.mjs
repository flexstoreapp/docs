import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const spec = JSON.parse(readFileSync('.vitepress/openapi.json', 'utf-8'));
const referenceDir = 'developer/api/reference';

const slug = (summary) =>
    summary
        .toLowerCase()
        .replace(/&/g, '')
        .replace(/[^a-z0-9 -]/g, '')
        .trim()
        .replace(/\s+/g, '-');

const pageForTag = new Map();

for (const file of readdirSync(referenceDir).filter((name) => name.endsWith('.md'))) {
    const title = readFileSync(join(referenceDir, file), 'utf-8').match(/^title: (.+)$/m);

    if (title) {
        pageForTag.set(title[1], `/developer/api/reference/${file.slice(0, -3)}`);
    }
}

const anchors = new Set();

for (const [path, operations] of Object.entries(spec.paths)) {
    for (const operation of Object.values(operations)) {
        if (!operation?.operationId) {
            continue;
        }

        const page = pageForTag.get(operation.tags[0]);

        if (!page) {
            console.error(`No reference page for tag "${operation.tags[0]}" (${path})`);
            process.exitCode = 1;

            continue;
        }

        anchors.add(`${page}#${slug(operation.summary)}`);
    }
}

for (const file of readdirSync('developer/api').filter((name) => name.endsWith('.md'))) {
    const contents = readFileSync(join('developer/api', file), 'utf-8');

    for (const [, link] of contents.matchAll(/\]\((\/developer\/api\/reference\/[a-z-]+#[a-z0-9-]+)\)/g)) {
        if (!anchors.has(link)) {
            console.error(`developer/api/${file} links to ${link}, which no operation generates.`);
            process.exitCode = 1;
        }
    }
}

if (!process.exitCode) {
    console.log('Endpoint links resolve to operations.');
}
