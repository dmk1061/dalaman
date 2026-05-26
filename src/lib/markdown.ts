import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function getMarkdownData(filePath: string, locale?: string) {
    let targetPath = filePath;

    if (locale && locale !== 'ru') {
        const ext = path.extname(filePath);
        const base = filePath.slice(0, -ext.length);
        const localizedPath = `${base}.${locale}${ext}`;
        if (fs.existsSync(localizedPath)) {
            targetPath = localizedPath;
        }
    }

    if (!fs.existsSync(targetPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(targetPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
        .use(html as any)
        .process(content);
    const contentHtml = processedContent.toString();

    return {
        ...data,
        contentHtml,
    };
}

export function getLocationData(location: string) {
    const locationDir = path.join(process.cwd(), 'content', 'locations', location);

    const infoPath = path.join(locationDir, 'info.md');
    const beachesPath = path.join(locationDir, 'beaches.md');
    const sightsPath = path.join(locationDir, 'sights.md');
    const transportPath = path.join(locationDir, 'transport.md');

    return {
        infoPath,
        beachesPath,
        sightsPath,
        transportPath,
    };
}

