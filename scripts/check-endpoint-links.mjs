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

// Reference pages carry prose headings as well as operations, and both are linkable.
const headingAnchors = new Set();

const registerPages = (dir, urlPrefix, tagPrefix) => {
    for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
        const contents = readFileSync(join(dir, file), 'utf-8');
        const page = `${urlPrefix}/${file.slice(0, -3)}`;
        const title = contents.match(/^title: (.+)$/m);

        if (title) {
            pageForTag.set(tagPrefix + title[1], page);
        }

        for (const [, heading] of contents.matchAll(/^#{2,3} (.+)$/gm)) {
            headingAnchors.add(`${page}#${slug(heading)}`);
        }
    }
};

registerPages(referenceDir, '/developer/api/reference', '');
registerPages(`${referenceDir}/admin`, '/developer/api/reference/admin', 'Admin ');

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

let links = 0;

for (const file of readdirSync('developer/api').filter((name) => name.endsWith('.md'))) {
    const contents = readFileSync(join('developer/api', file), 'utf-8');

    for (const [, link] of contents.matchAll(/\]\((\/developer\/api\/reference\/[a-z-]+#[a-z0-9-]+)\)/g)) {
        links++;

        if (!anchors.has(link) && !headingAnchors.has(link)) {
            console.error(`developer/api/${file} links to ${link}, which is neither an operation nor a heading there.`);
            process.exitCode = 1;
        }
    }
}

if (!process.exitCode) {
    console.log(`Every operation has a reference page. ${links} endpoint links checked.`);
}
