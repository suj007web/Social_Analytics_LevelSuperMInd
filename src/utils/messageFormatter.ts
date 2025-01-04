export const formatAnalysisPrompt = (
  message: string,
  platform: string,
  targetAudience: string,
  postType?: string
): string => {
  return `For ${platform} platform targeting age group ${targetAudience}, for post type ${postType} analyze this message: ${message}`;
};