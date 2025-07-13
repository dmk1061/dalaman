import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

async function getLocationPageData(location: string, subpage: string) {
    const filePath = path.join(process.cwd(), 'content', 'locations', location, `${subpage}.md`);

    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(fileContents);

        const processedContent = await remark()
            .use(remarkHtml, { sanitize: false })
            .process(matterResult.content);
        const contentHtml = processedContent.toString();

        return {
            title: matterResult.data.title,
            description: matterResult.data.description,
            contentHtml,
        };
    } catch (error) {
        // Если файл не найден, fs.readFileSync выбросит исключение
        console.error(`Could not read file for ${location}/${subpage}:`, error);
        return null;
    }
}


type SubPageProps = {
    params: {
        location: string;
        subpage: string;
    }
}

const LocationSubPage = async ({ params }: SubPageProps) => {
  const { location, subpage } = params;
  const pageData = await getLocationPageData(location, subpage);

  if (!pageData) {
      return (
          <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8">
                  <h1 className="text-4xl font-bold mb-4">Раздел не найден</h1>
                  <p>К сожалению, мы не смогли найти информацию для '{location}/{subpage}'.</p>
              </main>
              <Footer />
          </div>
      )
  }

  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
            <article>
                <h1 className="text-4xl font-bold mb-2">{pageData.title}</h1>
                {pageData.description && <p className="text-lg text-gray-500 mb-8">{pageData.description}</p>}
                <div className="prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} />
            </article>
        </main>
        <Footer />
    </div>
  );
};

export async function generateStaticParams() {
    const locationsDirectory = path.join(process.cwd(), 'content', 'locations');
    const paths = [];

    try {
        const locations = fs.readdirSync(locationsDirectory).filter(item =>
            fs.statSync(path.join(locationsDirectory, item)).isDirectory()
        );

        for (const location of locations) {
            const subpagesDirectory = path.join(locationsDirectory, location);
            const subpageFiles = fs.readdirSync(subpagesDirectory).filter(file => file.endsWith('.md'));

            for (const file of subpageFiles) {
                paths.push({
                    location: location,
                    subpage: file.replace(/\.md$/, '')
                });
            }
        }
    } catch (error) {
        console.log('Could not generate static params for locations, maybe directory does not exist yet', error);
    }


    return paths;
}


export default LocationSubPage; 