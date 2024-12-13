export const revalidate = 60;
export const dynamicParams = false;

import { labelQuestions } from "@/services/config";
import { generateFaqByLabel } from "@/services/gemini";

const LabelFaqsPage: React.FC<IPageParams<{ label: string }>> = async ({
  params,
}) => {
  const { label } = await params;
  const result = await generateFaqByLabel(label);
  return <div dangerouslySetInnerHTML={{ __html: result }}></div>;
};

export async function generateStaticParams() {
  return Object.keys(labelQuestions).map((label) => ({ label }));
}

export default LabelFaqsPage;
