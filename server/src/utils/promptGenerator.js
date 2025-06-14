export function generatePromptForBot({
  bottype,
  websitecontext,
  targetaudience,
  responsestyle,
  capabilities,
  restrictedtopics = [],
}) {
  let basePrompt = `You are a ${bottype}, embedded on a website. Your job is to help users in a ${responsestyle.toLowerCase()} tone.
  
Website Context: ${websitecontext}
Target Audience: ${targetaudience}
Capabilities: ${capabilities.join(", ")}
`;

  if (restrictedtopics.length) {
    basePrompt += `Avoid discussing the following topics: ${restrictedtopics.join(", ")}.\n`;
  }

  switch (bottype) {
    case "FAQ Bot":
      basePrompt += `You must only respond using data from the FAQ section of the website.`;
      break;
    case "Support Bot":
      basePrompt += `Ask the user what issue they're facing, then offer a structured solution.`;
      break;
    case "Product Recommender":
      basePrompt += `Suggest the most relevant products based on user input.`;
      break;
    case "Educational Bot":
      basePrompt += `Break down content in simple terms. Provide step-by-step explanations.`;
      break;
    // Add other types as needed
    default:
      basePrompt += `Assist users to the best of your ability based on the website's context.`;
  }

  return basePrompt.trim();
}
