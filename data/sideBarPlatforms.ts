import TwitterIcon from "/public/platformIcons/Twitter.png";
import TikTokIcon from "../public/platformIcons/TikTokPng.png";
import YouTubeIcon from "../public/platformIcons/YouTube.png";
import InstagramIcon from "../public/platformIcons/Instagram.png";
import LinkedInIcon from "../public/platformIcons/LinkedIn.png";
import FacebookIcon from "../public/platformIcons/Facebook.png";

const platforms = [
  {
    name: "YouTube",
    icon: "/platformIcons/youtube1.png",
    color: "#FF0000",

    items: [
      "YouTube Video",
      "YouTube Short",
      "YouTube Title",
      "YouTube Description",
      "YouTube Tag",
      "YouTube Thumbnail",
    ],
    title:[
      "YouTube Video Ideas",
      "YouTube Short Ideas",
      "YouTube Title",
      "YouTube Description",
      "YouTube Tag",
      "YouTube Thumbnail Ideas",
    ]
  },
  {
    name: "Twitter",
    icon: "/platformIcons/twitterHQ.png",
    color: "#1DA1F2",
    items: ["Twitter Tweet", "Twitter Hashtag", "Twitter Bio"],
    title:["Twitter Tweet", "Twitter Hashtag", "Twitter Bio"]
  },
  {
    name: "Instagram",
    icon: "/platformIcons/instagramHiQi.png",
    color: "#C13584",
    items: [
      "Instagram Reel",
      "Instagram Caption",
      "Instagram Bio",
      "Instagram Hashtag",
    ],
    title: [
      "Instagram Reel Ideas",
      "Instagram Caption",
      "Instagram Bio",
      "Instagram Hashtag",
    ],
  },
  {
    name: "LinkedIn",
    icon: "/platformIcons/linkednHQ.png",
    color: "#0077B5",
    items: [
      "LinkedIn Post",
      "LinkedIn Profile Optimization",
      
    ],
    title: [
      "LinkedIn Post",
      "LinkedIn Profile Optimization",
      
    ],
  },

  {
    name: "Facebook",
    icon: "/platformIcons/facebookHiQ.png",
    color: "#4267B2",
    items: ["Facebook Post", "Facebook Ad Copy", "Facebook Page Description"],
    title: ["Facebook Post", "Facebook Ad Copy", "Facebook Page Description"],
  },
  {
    name: "TikTok",
    icon: "/platformIcons/tiktokHQ.png",
    color: "#FE2C55",
    items: ["TikTok Video", "TikTok Hashtag", "TikTok Caption"],
    title: ["TikTok Video Ideas", "TikTok Hashtag", "TikTok Caption"],
  },
  // {
  //   name: "General",
  //   icon: '/platformIcons/general.png',
  //   color: "#FE2C55",
  //   items: ["Rewrite", "Repurpose"]
  // }
];

export default platforms;
