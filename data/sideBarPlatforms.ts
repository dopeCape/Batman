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
  },
  {
    name: "Twitter(X)",
    icon: "/platformIcons/xtwitter.svg",
    color: "#1DA1F2",
    items: ["Twitter(X) Tweet", "Twitter(X) Hashtag", "Twitter(X) Bio"],
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
  },
  {
    name: "LinkedIn",
    icon: "/platformIcons/linkednHQ.png",
    color: "#0077B5",
    items: [
      "LinkedIn Post",
      "LinkedIn Profile Optimization",
      
    ],
  },

  {
    name: "Facebook",
    icon: "/platformIcons/facebookHiQ.png",
    color: "#4267B2",
    items: ["Facebook Post", "Facebook Ad Copy", "Facebook Page Description"],
  },
  {
    name: "TikTok",
    icon: "/platformIcons/tiktokHQ.png",
    color: "#FE2C55",
    items: ["TikTok Video", "TikTok Hashtag", "TikTok Caption"],
  },
  {
    name: "General",
    icon: '/platformIcons/general.png',
    color: "#FE2C55",
    items: ["Rewrite", "Repurpose"]
  }
];

export default platforms;
