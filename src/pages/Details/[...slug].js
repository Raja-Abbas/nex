import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';

const fetchMDXContent = async (slug) => {
  try {
    const content = await import(`../../content/${slug}.mdx`);
    return content.default;
  } catch (error) {
    throw new Error(`Could not fetch MDX file: ${slug}`);
  }
};

const DetailsPage = () => {
  const { slug } = useParams();
  const [Content, setContent] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const mdxContent = await fetchMDXContent(slug);
        setContent(() => mdxContent);
      } catch (error) {
        console.error(error);
      }
    };
    loadContent();
  }, [slug]);

  if (!Content) return <div>Loading...</div>;

  return (
    <MDXProvider>
    <div className="prose prose-xl prose-a:text-white prose-a:font-[200] prose-a:text-[32px] prose-a:leading-[24px] prose-strong:color-[#0080E1] prose-strong:color-[#0080E1] prose-strong:font-[16px] prose-strong:leading-[24px] prose-th:text-[#0080E1] prose-th:text-[24px] prose-th:leading-[18px] p prose-li:ml-[-14px]  prose-li:text-[#333] prose-li:font-[300] prose-li:text-[15px] prose-li:leading-[24px] prose-headings:text-[#0080E1] prose-h1:font-[800] prose-h1:text-[24px] prose-h1:leading-[30px] prose-h3:font-[500] prose-h3:text-[24px] prose:leading-[30px]  prose-h2:font-[500] prose-h2:leading-[30px] prose-h2:text-[24px]  prose-h4:font-[500] prose-h4:text-[24px] prose-h4:leading-[24px] prose-p:text-[#333] prose-p:text-[15px] prose-p:font-[300] prose-p:leading-[24px] ">
      <Content />
    </div>
  </MDXProvider>
  );
};

export default DetailsPage;
