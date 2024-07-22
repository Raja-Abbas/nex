// src/content/mdxMapping.js
const mdxMapping = {
  "anythingllm": () => import('./anythingllm.mdx'),
  "django": () => import('./django.mdx'),
  "flask": () => import('./flask.mdx'),
  "strapi": () => import('./strapi.mdx'),
  "mysql": () => import('./mysql.mdx'),
  "postgresql": () => import('./postgresql.mdx'),
  "flowise-railway": () => import('./flowise-railway.mdx'),
  "librechat": () => import('./librechat.mdx'),
  "langflow-1-0": () => import('./langflow-1-0.mdx'),
  "langflow": () => import('./langflow.mdx'),
  "dialoqbase": () => import('./dialoqbase.mdx'),
  "liama-index": () => import('./liama-index.mdx'),
  "dify": () => import('./dify.mdx'),
  "chatbot-ui": () => import('./chatbot-ui.mdx'),
  // Add more mappings as needed
};

export default mdxMapping;
