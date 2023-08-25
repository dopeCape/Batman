import Instagram from "@/components/GenerateComponents/PlatformContent/Instagram"





export function setPrompt(title:string, input:string, targetAudience?:string, tone?:string | null, keywords?:string, industry?:string | null, postType?:string | null){
        if(title=="Youtube Video" || title=="Youtube Short" || title=="TikTok Video" || title=="Instagram reel"){
            return `Generate one engaging ${title} Idea for ${input} ${targetAudience?`for target audience ${targetAudience}`:null}. ${tone?`The post should have the tone ${tone}`:null} ${keywords?`and focus on the following keywords: ${keywords}`:null}. Get creative and come up with fun, informative, and captivating ideas that will resonate with the target audience! The output should be in the below form. 1.Title 2.Descriptio 3.Hashtags 4.Thumbnail Ideas`
        }
        else if(title=="Instagram Caption" || title=="TikTok Caption"){
            return `Generate scroll-stopping ${title} for the topic ${input}, ${keywords?`for the keywords ${keywords}`:null}, ${tone?`with the tone ${tone}`:null} ${ targetAudience?`for the target audience ${targetAudience}`:null} that makes them stop, look, and like.`
        }
        else if(title=="Youtube Description"){
            return `Generate an impressive Youtube video description that showcases ${input} ${tone?`in a tone [Tone]`:null},  ${keywords?`with ${keywords}`:null} ${ targetAudience?`targeting the audience ${targetAudience}`:null} that entice viewers to click and watch your videos.`
        }
        else if(title=="Youtube Tag" ||title=="Instagram Hashtag" || title=="TikTok Hashtag" || title=="Twitter Hashtag"){
            return `Generate 30 perfect ${title} for ${input} to boost the posts' reach and engagement`
        }
        else if(title=="Youtube Title" || title=='Instagram caption' || title=="TikTok Caption"){
            return `Generate 5 scroll stopping ${title} for a video about ${input}. ${keywords?`for the keywords ${keywords}`:null}.${tone?`with the tone ${tone}`:null}, ${ targetAudience?`targetting a target audience ${targetAudience}`:null}`
        }
        else if(title=="Youtube Thumbnail"){
            return `Generate 1 Youtube Thumbnail Ideas for ${input},${tone?`with the tone [Tone]`:null}  , ${ targetAudience?`targetting a target audience ${targetAudience}`:null} that captures the viewers' attention and increase click-through rates that makes the YouTube video stand out.`
        }
        else if(title=="Instagram Bio" || title=="Twitter Bio" || title=="LinkedIn Profile Optimization"){
            return `Generate an impressive ${title}  that showcases ${input} ${tone?`in a tone [Tone]`:null}, ${keywords?`with keywords ${keywords}`:null}  ${ targetAudience?`targetting a target audience ${targetAudience}`:null} and attracts followers.`
        }
        else if(title=="LinkedIn Post"){
            return `Generate an engaging LinkedIn  Post ${postType ?`of the type ${postType}`:null}, ${industry?`related to the industry ${industry}`:null} that showcases [Whats the post is about] ${tone?`with the tone [Tone]`:null},  ${keywords?`with keywords ${keywords}`:null} ${ targetAudience?`targetting a target audience ${targetAudience}`:null}. `
        }
        else if(title=="Twitter Tweet"){
            return `Generate an attention-grabbing Tweet on the topic ${input}, ${targetAudience?`for the target audience [Target Audience]`:null}, ${tone?`with the tone ${tone}`:null},${keywords?`with keywords ${keywords}`:null} that resonate with your followers and gain retweets. `
        }
        else if(title=="Facebook Page Description"){
            return `Generate an impressive Facebook Page Description description that showcases ${input} ${tone?`in a tone [Tone]`:null},  ${keywords?`with ${keywords}`:null} ${ targetAudience?`targeting the audience ${targetAudience}`:null} and attracts followers.`
        }
        else if(title=="Facebook Post"){
            return `Generate an engaging Facebook Post that showcases ${input} ${tone?`in a tone [Tone]`:null},${keywords?`with ${keywords}`:null} ${ targetAudience?`targeting the audience ${targetAudience}`:null} that sparks conversations and drives interactions.`
        }else if(title == "Facebook Ad Copy"){
            return `Generate a compelling Facebook Ad copy about ${input}, ${tone?`in a tone [Tone]`:null}, ${keywords?`with ${keywords}`:null}, ${ targetAudience?`for targeting the audience ${targetAudience}`:null}, that compels the target audience to take action.`
        }

        else if(title == "Rewrite"){
            return `Rewrite the post to .`
        }
        else if(title == "Repurpose"){
            return `Repurpose the post to .`
        }
}


export function TokensNeeded(title:string){
    if(title=="Youtube Video" || title=="Youtube Short" || title=="TikTok Video" || title=="Instagram reel"){
        return `20`
    }
    else if(title == "Facebook Post" || title=="Facebook Ad Copy" || title=="LinkedIn Post"){
        return `10`
    }
    else if(title=="Instagram Bio" || title=="Twitter Bio" || title=="Instagram Caption" || title=="TikTok Hashtag" || title=="Instagram Hashtag" || title=="TikTok Caption" || title=="Youtube Title" || title=="Youtube Description"){
        return `5`
    }
    else if(title=="Youtube Tag" || title=="Youtube Thumbnail" || title=="Facebook Page Description" || title=="Twitter Tweet" || title=="Twitter Hashtag" || title=="Twitter Bio" || title=="LinkedIn Profile Optimization"){
        return `5`
    }
    else{
        return `0`
    }
}

