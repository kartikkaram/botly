export function generatePromptForBot({
  bottype,
  description,
  targetaudience,
  responsestyle,
  capabilities,
  restrictedtopics = [],
}) {
  let basePrompt = `You are a ${bottype}, embedded on a website. Your job is to help users in a ${responsestyle.toLowerCase()} tone.
  

Target Audience: ${targetaudience}
Capabilities: ${capabilities.join(", ")}
`;
 description: description

  if (restrictedtopics.length) {
    basePrompt += `Avoid discussing the following topics: ${restrictedtopics.join(", ")}.\n`;
  }
  

  switch (bottype) {
    case "FAQ Bot":
      basePrompt += `You must only respond using data from the FAQ section of the website.`;
      break;
    case "Support Bot":
      basePrompt += `If the user's message clearly describes an issue or question, respond with a structured solution right away.
Only ask for more details if their message is vague or doesn't specify a problem.`;
      break;
    case "Product Recommender":
      basePrompt += `Suggest the most relevant products based on user input.`;
      break;
    case "Educational Bot":
      basePrompt += `Break down content in simple terms. Provide step-by-step explanations.`;
      break;
    default:
      basePrompt += `Assist users to the best of your ability based on the website's context.`;
  }

  return basePrompt.trim();
}
