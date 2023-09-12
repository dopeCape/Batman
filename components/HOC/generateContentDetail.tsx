import { generateText } from "@/services/API";
import {
  InstagramContent,
  LinkedInContent,
  TiktokContent,
  TwitterContent,
  YoutubeContent,
} from "../GenerateComponents/PlatformContent";

// components/withLayout.tsx
export type PlatformType =
  | "youtube"
  | "linkedin"
  | "twitter"
  | "instagram"
  | "tiktok";

export default async function generateContentDetail(
  platformType: PlatformType,
  title: string,
  //   selected: Array<{ [key: string]: string }>
  selected: { [key: string]: string }
): Promise<JSX.Element> {
  if (platformType === "youtube") {
    const [outline, seoDescription, tags, thumbnailIdeas] = await Promise.all([
      generateOutline(title),
      generateSeoDescription(title),
      generateTags(title),
      generateThumbnailIdeas(title),
    ]);

    return (
      <YoutubeContent
        title={title}
        outline={outline}
        seoDescription={seoDescription}
        tags={seoDescription}
      />
    );
  }
  if (platformType == "twitter") {
    const content = await generateTweetOutline(
      title,
      selected.niche,
      selected.audience,
      selected.postType,
      selected.keywords,
      selected.tone
    );

    return <TwitterContent content={content} />;
  }
  if (platformType == "instagram") {
    const content = await Promise.all([
      generateContentIdea(title),
      generateScript(title),
      generateAudioSuggestion(title),
      generateCaptionsAndHashtags(title),
    ]);

    return <InstagramContent content={content} />;
  }
  if (platformType == "tiktok") {
    const content = await generateTiktokContentIdea(
      title,
      selected.contentLength,
      selected.niche,
      selected.audience,
      selected.keywords
    );
    return <TiktokContent content={content} />;
  }
  if (platformType == "linkedin") {
    const content = await generateLinkedInOutline(
      title,
      selected.industry,
      selected.audience,
      selected.postType,
      selected.keywords
    );
    return <LinkedInContent content={content} />;
  }

  return <></>;
}

async function generateContent(
  promptText: string,
  maxToken: number,
  callback?: Function
) {
  const generatedText = await generateText(promptText, 3000);
  if (callback == undefined) {
    return generatedText;
  }
  return callback(generatedText);
}

// YOUTUBE
async function generateOutline(ideaTitle: string) {
  const promptText = `Create an outline for a YouTube video with the title "${ideaTitle}". Format the outline to include 1.The length of the content as Length, 2. Topics that should be covered as Topics, 3. A script that for the content with a limited of the length of content.`;

  const generatedText = await generateText(promptText, 3000);
  return generatedText;
}
async function generateSeoDescription(ideaTitle: string) {
  const promptText = `Create an SEO-optimized description for a YouTube video with the title "${ideaTitle}". The description should be in the optimal range of 200-300 words.`;

  const generatedText = await generateText(promptText, 300);
  return generatedText;
}

async function generateTags(ideaTitle: string) {
  const promptText = `Generate 5-10 relevant hashtags for a YouTube video with the title "${ideaTitle}".`;

  const generatedText = await generateText(promptText, 100);
  return generatedText;
}

async function generateThumbnailIdeas(ideaTitle: string) {
  const promptText = `Suggest 3 ideas for creating a highly engaging thumbnail for a YouTube video with the title "${ideaTitle}".`;

  const generatedText = await generateText(promptText, 100);
  return generatedText;
}

//Twitter

async function generateTweetOutline(
  ideaTitle: string,
  niche: string,
  audience: string,
  postType: string,
  keywords: string,
  tone: string
) {
  let promptText = `Help me create an engaging tweet with ${ideaTitle}`;

  if (niche) {
    promptText += ` for ${niche} professionals`;
  }

  if (audience) {
    promptText += ` who are ${audience}`;
  }

  if (keywords) {
    promptText += ` and interested in ${keywords}`;
  }

  if (tone) {
    promptText += ` and with the ${tone} tone`;
  }

  promptText += ".";

  if (postType) {
    switch (postType) {
      case "tweet":
        promptText +=
          " Compose a tweet that provides a concise insight or shares an interesting fact related to the topic. Use engaging language and consider incorporating relevant hashtags, mentions, or links to external resources.";
        break;
      case "threads":
        promptText +=
          " Create a Twitter thread that dives deeper into the subject matter. Start with a captivating introduction and then break down the topic into smaller, easily digestible parts. Use multimedia (such as images, GIFs, or videos) to enhance the content and encourage retweets and likes.";
        break;
      default:
        console.error(`Invalid post type: ${postType}`);
        return "";
    }
  }

  promptText += " The tweet should be within Twitter's character limit.";

  const generatedText = await generateText(promptText, 280);
  return generatedText;
}

// Instagram

async function generateContentIdea(ideaTitle: string) {
  const promptText = `Create a clear and engaging content idea for an Instagram Reel with the title "${ideaTitle}". Make sure it is relevant to the niche and resonates with the target audience.`;

  const generatedText = await generateText(promptText, 100);
  return generatedText;
}

async function generateScript(ideaTitle: string) {
  const promptText = `Prepare a script, if necessary, for any dialogue, voiceover, or text that will appear in an Instagram Reel with the title "${ideaTitle}".`;

  const generatedText = await generateText(promptText, 100);
  return generatedText;
}

async function generateAudioSuggestion(ideaTitle: string) {
  const promptText = `Suggest appropriate audio, such as background music or sound effects, to enhance an Instagram Reel with the title "${ideaTitle}".`;

  const generatedText = await generateText(promptText, 50);
  return generatedText;
}

async function generateCaptionsAndHashtags(ideaTitle: string) {
  const promptText = `Write an engaging caption for an Instagram Reel with the title "${ideaTitle}" and include relevant hashtags to increase its discoverability.`;

  const generatedText = await generateText(promptText, 100);
  return generatedText;
}

//TikTok

async function generateTiktokContentIdea(
  ideaTitle: string,
  length: string,
  niche: string,
  audience: string,
  keywords: string
) {
  let promptText = `Create a clear and engaging content idea for a TikTok video with the title "${ideaTitle}".`;

  if (length) {
    promptText += ` The video should be around ${length}.`;
  }

  if (niche) {
    promptText += ` Make sure it is relevant to the ${niche} niche`;
  }

  if (audience) {
    promptText += ` and resonates with the ${audience} target audience`;
  }

  if (keywords) {
    promptText += `, incorporating the keywords: ${keywords}`;
  }

  promptText +=
    ". And also add relevant hashtags that can be used and also songs/music that will go along with the content";

  const generatedText = await generateText(promptText, 2000);
  return generatedText;
}

//LinkedIn

async function generateLinkedInOutline(
  ideaTitle: string,
  industry: string,
  audience: string,
  postType: string,
  keywords: string
) {
  let promptText = `Help me create an engaging LinkedIn post with ${ideaTitle}`;

  if (industry) {
    promptText += ` for ${industry} professionals`;
  }

  if (audience) {
    promptText += ` who are ${audience}`;
  }

  if (keywords) {
    promptText += ` and interested in ${keywords}`;
  }

  promptText += ".";

  if (postType) {
    switch (postType) {
      case "Industry Insights":
        promptText +=
          " Share an in-depth analysis of a recent development or trend in your industry. Offer your unique perspective and discuss its implications for professionals in your field.";
        break;
      case "Expert Interviews":
        promptText +=
          " Conduct interviews with experts or thought leaders in your industry and share the key takeaways. This provides valuable insights for your network and can help foster connections with influential professionals.";
        break;
      case "Career Advice":
        promptText +=
          " Share tips and advice on various aspects of career development, such as networking, job hunting, interviewing, or professional skill-building. Tailor the advice to the needs and interests of your target audience.";
        break;
      case "Case Studies":
        promptText +=
          " Share case studies from your own professional experience, showcasing how you or your company tackled a particular challenge, implemented a new strategy, or achieved impressive results. Explain the lessons learned and how others can apply those lessons to their own situations.";
        break;
      case "Thought Leadership Articles":
        promptText +=
          " Write and publish long-form articles on LinkedIn that explore a specific topic or issue in your industry. Provide your insights, opinions, and predictions, and encourage discussion and debate among your network.";
        break;
      default:
        console.error(`Invalid post type: ${postType}`);
        return "";
    }
  }

  promptText += " Length of the post should be between 500-1000 words.";

  const generatedText = await generateText(promptText, 3000);
  return generatedText;
}
