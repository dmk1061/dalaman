const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { remark } = require('remark');
const html = require('remark-html');

async function test() {
    const filePath = path.join(process.cwd(), 'content', 'locations', 'dacha', 'transport.md');
    console.log('Testing file:', filePath);

    if (!fs.existsSync(filePath)) {
        console.error('File does not exist!');
        return;
    }

    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        console.log('File read, size:', fileContents.length);

        const { data, content } = matter(fileContents);
        console.log('Frontmatter:', data);

        console.log('Starting remark processing...');
        const processedContent = await remark()
            .use(html)
            .process(content);
        const contentHtml = processedContent.toString();

        console.log('Success! HTML length:', contentHtml.length);
    } catch (err) {
        console.error('FAILED:', err);
    }
}

test();
