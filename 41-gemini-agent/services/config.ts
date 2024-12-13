export const system_prompt = `
You're a senior customer support agent for an online store.
You're always helpful and answer customer questions only based on the provided
information. If you don't know the answer - just reply with an excuse that you
don't know. Keep your answers brief and to the point. Be kind and respectful.
Please generate HTML for response.

Use the provided context for your answers. The most relevant information is
at the top. Each piece of information is separated by ---.
`;

export const generateUserRoleMessage = (context: string[], query: string) => {
  return `
  Use the following information:

  \`\`\`
  ${context.join("---")}
  \`\`\`

  to answer the question:
  ${query}
  `;
};

export const faqs: IFAQ[] = [
  {
    label: "RAG",
    question: "What is a Retrieval-Augmented Generation system?",
    answer:
      "A RAG system combines a retrieval mechanism (e.g., a search engine or database query) with a generation model to provide responses that are accurate, relevant, and contextually informed by external knowledge.",
  },
  {
    label: "RAG",
    question:
      "How does a RAG system differ from a regular generative AI model?",
    answer:
      "Unlike standalone generative AI models, which rely only on their pre-trained knowledge, RAG systems incorporate live or updated external data during the response generation process.",
  },
  {
    label: "RAG",
    question:
      "What algorithms are commonly used for the retrieval part in a RAG system?",
    answer:
      "Algorithms such as BM25, dense vector similarity (via transformers like Sentence-BERT), or hybrid models combining sparse and dense retrieval are frequently used.",
  },
  {
    label: "MICROSERVICE",
    question: "What is a microservice?",
    answer: `
      A microservice is a small, independent, and self-contained service that performs a specific function and communicates with other services through APIs.
      How does microservices architecture differ from monolithic architecture?
      Microservices break down applications into smaller, independently deployable components, while monolithic architecture involves building a single, unified application.`,
  },
  {
    label: "MICROSERVICE",
    question: "What are the advantages of using microservices?",
    answer: `Scalability
      Fault isolation
      Easier updates and deployments
      Technology diversity for individual services`,
  },
  {
    label: "MICROSERVICE",
    question: "What technologies are commonly used to build microservices?",
    answer: `
      Programming languages: Java, Python, Node.js, Go
      Frameworks: Spring Boot, NestJS, Flask
      Communication: REST, gRPC, message queues like RabbitMQ or Kafka`,
  },
  {
    label: "NEXT.JS",
    question: "What is Next.js?",
    answer:
      "Next.js is a React-based framework that enables server-side rendering (SSR), static site generation (SSG), and other features for building modern web applications.",
  },
  {
    label: "NEXT.JS",
    question: "Why should I use Next.js over plain React?",
    answer:
      "Next.js provides features like built-in routing, SSR, SSG, API routes, and optimized performance out of the box, reducing the need for additional libraries.",
  },
  {
    label: "NEXT.JS",
    question: "Is Next.js suitable for SEO-friendly applications?",
    answer:
      "Yes, Next.js supports server-side rendering, which improves search engine optimization by serving pre-rendered content to crawlers.",
  },
];

export const labelQuestions: { [key: string]: string } = {
  "NEXT.JS": "What is next.js? (verbose generation)",
  "MICROSERVICE": "What is microservice? (verbose generation)",
  "RAG": "What is retrieval augmented generation? (verbose generation)",
};

export const search = (sentence: string) => {
  const tokens = sentence.split(" ");
  const contextList: string[] = [];
  for (const faq of faqs) {
    for (const word of tokens) {
      if (faq.question.includes(word)) {
        contextList.push(faq.answer);
      }
    }
  }
  return contextList;
};
