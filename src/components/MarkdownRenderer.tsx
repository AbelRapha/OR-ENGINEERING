import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const rawMarkup = React.useMemo(() => {
    const html = marked.parse(content);
    return DOMPurify.sanitize(html);
  }, [content]);

  return (
    <div 
      className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none mx-auto"
      dangerouslySetInnerHTML={{ __html: rawMarkup }} 
    />
  );
};

export default MarkdownRenderer;