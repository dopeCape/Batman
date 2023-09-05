import Instagram from "@/components/GenerateComponents/PlatformContent/Instagram"





export function setPrompt(title:string, input:string, targetAudience?:string, tone?:string | null, keywords?:string, industry?:string | null, postType?:string | null){
        if(title=="YouTube Video" || title=="YouTube Short" || title=="TikTok Video" || title=="Instagram reel"){
            return `Generate one engaging ${title} Idea for ${input} ${targetAudience?`for target audience ${targetAudience}`:null}. ${tone?`The post should have the tone ${tone}`:null} ${keywords?`and focus on the following keywords: ${keywords}`:null}. Get creative and come up with fun, informative, and captivating ideas that will resonate with the target audience! The output should be in the below form. 1.Title 2.Descriptio 3.Hashtags 4.Thumbnail Ideas`
        }
        else if(title=="Instagram Caption" || title=="TikTok Caption"){
            return `Generate one scroll-stopping ${title} for the topic ${input}, ${keywords?`for the keywords ${keywords}`:null}, ${tone?`with the tone ${tone}`:null} ${ targetAudience?`for the target audience ${targetAudience}`:null} that makes them stop, look, and like.`
        }
        else if(title=="YouTube Description"){
            return `Generate one an impressive YouTube video description that showcases ${input} ${tone?`in a tone [Tone]`:null},  ${keywords?`with ${keywords}`:null} ${ targetAudience?`targeting the audience ${targetAudience}`:null} that entice viewers to click and watch your videos.`
        }
        else if(title=="YouTube Tag" ||title=="Instagram Hashtag" || title=="TikTok Hashtag" || title=="Twitter Hashtag"){
            return `Generate 30 perfect ${title} for ${input} to boost the posts' reach and engagement`
        }
        else if(title=="YouTube Title" || title=='Instagram caption' || title=="TikTok Caption"){
            return `Generate one scroll stopping ${title} for a video about ${input}. ${keywords?`for the keywords ${keywords}`:null}.${tone?`with the tone ${tone}`:null}, ${ targetAudience?`targetting a target audience ${targetAudience}`:null}`
        }
        else if(title=="YouTube Thumbnail"){
            return `Generate 1 YouTube Thumbnail Ideas for ${input},${tone?`with the tone [Tone]`:null}  , ${ targetAudience?`targetting a target audience ${targetAudience}`:null} that captures the viewers' attention and increase click-through rates that makes the YouTube video stand out.`
        }
        else if(title=="Instagram Bio" || title=="Twitter Bio" || title=="LinkedIn Profile Optimization"){
            return `Generate one an impressive ${title}  that showcases ${input} ${tone?`in a tone [Tone]`:null}, ${keywords?`with keywords ${keywords}`:null}  ${ targetAudience?`targetting a target audience ${targetAudience}`:null} and attracts followers.`
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
        else if(title=="LinkedIn Articles"){
            return `Generate an engaging LinkedIn  Article ${postType ?`of the type ${postType}`:null}, ${industry?`related to the industry ${industry}`:null} that showcases [Whats the post is about] ${tone?`with the tone [Tone]`:null},  ${keywords?`with keywords ${keywords}`:null} ${ targetAudience?`targetting a target audience ${targetAudience}`:null}. `
        }

        else if(title == "Rewrite"){
            return `Rewrite the post to .`
        }
        else if(title == "Repurpose"){
            return `Repurpose the post to .`
        }
        else{
            return `A generic error message`
        }
}


export function TokensNeeded(title:string){
    if(title=="YouTube Video" || title=="YouTube Short" || title=="TikTok Video" || title=="Instagram Reel"){
        return `20`
    }
    else if(title == "Facebook Post" || title=="Facebook Ad Copy" || title=="LinkedIn Post" || title=="LinkedIn Articles"){
        return `10`
    }
    else if(title=="Instagram Bio" || title=="Twitter Bio" || title=="Instagram Caption" || title=="TikTok Hashtag" || title=="Instagram Hashtag" || title=="TikTok Caption" || title=="YouTube Title" || title=="YouTube Description"){
        return `5`
    }
    else if(title=="YouTube Tag" || title=="YouTube Thumbnail" || title=="Facebook Page Description" || title=="Twitter Tweet" || title=="Twitter Hashtag" || title=="Twitter Bio" || title=="LinkedIn Profile Optimization"){
        return `5`
    }
    else{
        return `0`
    }
}

export function Descriptions(title:string){
    if(title=="Instagram Reel"){
        return "Ignite your creativity and engage your audience with captivating Instagram Reel Ideas"
    }
    else if(title=="Instagram Caption"){
        return "Write scroll-stopping captions that encourage people to stop, look, and like."
    }
    else if(title=="Instagram Bio"){
        return "Create an impressive bio that showcases your personality and attracts followers."
    }
    else if(title=="Instagram Hashtag"){
        return "Discover the perfect hashtags to boost your posts' reach and engagement."
    }
    else if(title=="YouTube Video"){
        return "Unlock a treasure trove of creative video concepts to captivate and grow your YouTube audience."
    }
    else if(title=="YouTube Short"){
        return "Dive into bite-sized content creation with compelling ideas for YouTube Shorts that leave a lasting impact."
    }
    else if(title=="YouTube Title"){
        return "Optimize your video titles to attract more viewers and enhance engagement."
    }
    else if(title=="YouTube Description"){
        return "Write compelling descriptions that entice viewers to click and watch your videos."
    }
    else if(title=="YouTube Tag"){
        return "Discover relevant tags to optimize your videos for better search rankings."
    }
    else if(title=="YouTube Thumbnail"){
        return "Grab viewers' attention and increase click-through rates with eye-catching thumbnail ideas that make your YouTube videos stand out."
    }
    else if(title=="Twitter Tweet"){
        return "Compose attention-grabbing tweets that resonate with your followers and gain retweets."
    }
    else if(title=="Twitter Hashtag"){
        return "Discover popular hashtags to increase your tweets' visibility and reach."
    }
    else if(title=="Twitter Bio"){
        return "Create a compelling bio that showcases your uniqueness and attracts followers."
    }
    else if(title=="LinkedIn Post"){
        return "Generate professional post ideas to share industry insights and build connections."
    }
    else if(title=="LinkedIn Profile Optimization"){
        return "Optimize your profile to impress potential employers or clients and stand out."
    }
    else if(title=="Facebook Post"){
        return "Generate engaging post ideas that spark conversations and drive interactions."
    }
    else if(title=="Facebook Ad Copy"){
        return "Create compelling ad copy that compels your target audience to take action."
    }
    else if(title=="Facebook Page Description"){
        return "Craft an enticing page description that accurately represents your brand."
    }
    else if(title=="TikTok Video"){
        return "Unleash your creativity with trending video ideas that captivate your audience."
    }
    else if(title=="TikTok Hashtag"){
        return "Find the right hashtags to amplify your content and gain more visibility."
    }
    else if(title=="TikTok Caption"){
        return "Craft catchy captions that complement your TikTok videos and boost engagement."
    }
    else{
        return "Description"
    }
    
}
