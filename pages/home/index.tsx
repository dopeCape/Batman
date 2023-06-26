import { NextPage } from "next";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TikTokIcon from "@mui/icons-material/ThumbUp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Button from'@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import styled  from "styled-components";
import { Alert, CardActionArea } from '@mui/material';
const socialMediaPlatforms = [
  {
    id: 1,
    name: "YouTube",
    icon: <YouTubeIcon />,
    content:
      "YouTube is a video-sharing platform where users can upload, watch, and interact with videos. It offers a wide range of content, including music videos, tutorials, vlogs, and more.",
  },
  {
    id: 2,
    name: "TikTok",
    icon: <TikTokIcon />,
    content:
      "TikTok is a short-form video-sharing platform known for its creative and entertaining content. Users can create and share short videos with various effects, filters, and music.",
  },
  {
    id: 3,
    name: "Instagram",
    icon: <InstagramIcon />,
    content:
      "Instagram is a photo and video-sharing social networ platform. Users can post photos and videos, follow other users, explore content, and interact through comments and likes.",
  },
  {
    id: 4,
    name: "LinkedIn",
    icon: <LinkedInIcon />,
    content:
      "LinkedIn is a professional networking platform where users can create a profile, connect with colleagues and professionals, and share content related to their career and industry.",
  },
  {
    id: 5,
    name: "Twitter",
    icon: <TwitterIcon />,
    content:
      "Twitter is an online social networking and microblogging platform where users can post and interact with messages known as 'tweets'. It is a popular platform for real-time information and social networking.",
  },
  {
    id: 6,
    name: "Facebook",
    icon: <TwitterIcon />,
    content:
      "Facebook is an online social networking and microblogging platform where users can post and interact with messages known as 'tweets'. It is a popular platform for real-time information and social networking.",
  },
];

const youtubeContent = [
  {
    id: "m1",
    title: "Youtube Video Ideas",
    content: "Unlock a treasure trove of creative video concepts to captivate and grow your YouTube audience.",
  },
  {
    id: "m1",
    title: "Youtube Shorts Ideas",
    content: "Dive into bite-sized content creation with compelling ideas for YouTube Shorts that leave a lasting impact.",
  },
  {
    id: "m1",
    title: "YouTube Titles",
    content: "Optimize your video titles to attract more viewers and enhance engagement.",
  },
  {
    id: "m1",
    title: "YouTube Descriptions",
    content: "Write compelling descriptions that entice viewers to click and watch your videos.",
  },
  {
    id: "m1",
    title: "YouTube Tags",
    content: "Discover relevant tags to optimize your videos for better search rankings.",
  },
  {
    id: "m1",
    title: "Youtube Thumbnail Ideas",
    content: "Grab viewers' attention and increase click-through rates with eye-catching thumbnail ideas that make your YouTube videos stand out.",
  },
];

const tiktokContent = [
  {
    id: "m1",
    title: "TikTok Video Ideas",
    content: "Unleash your creativity with trending video ideas that captivate your audience.",
  },
  {
    id: "m1",
    title: "TikTok Hashtags",
    content: "Find the right hashtags to amplify your content and gain more visibility.",
  },
  {
    id: "m1",
    title: "TikTok Captions",
    content: "Craft catchy captions that complement your TikTok videos and boost engagement.",
  },
];

const InstagramContent = [
  {
    id: "m1",
    title: "Instagram Reels Ideas",
    content: "Ignite your creativity and engage your audience with captivating Instagram Reel Ideas",
  },
  {
    id: "m2",
    title: "Instagram Captions",
    content:
      "Write scroll-stopping captions that encourage people to stop, look, and like.",
  },
  {
    id: "m1",
    title: "Instagram Hashtags",
    content:
      "Discover the perfect hashtags to boost your posts' reach and engagement.",
  },
  {
    id: "m2",
    title: "Instagram Bio",
    content:
      "Create an impressive bio that showcases your personality and attracts followers.",
  },
];

const linkedInContent = [
  {
    id: "m2",
    title: "LinkedIn Post Ideas",
    content: "Generate professional post ideas to share industry insights and build connections.",
  },
  {
    id: "m2",
    title: "LinkedIn Profile Optimization",
    content: "Optimize your profile to impress potential employers or clients and stand out.",
  },
  {
    id: "m2",
    title: "LinkedIn Articles",
    content: "Craft well-written articles that establish you as an authoritative voice in your field.",
  },
];

const twitterContent = [
  {
    id: "m2",
    title: "Twitter Tweets",
    content: "Compose attention-grabbing tweets that resonate with your followers and gain retweets.",
  },
  {
    id: "m2",
    title: "Twitter Hashtags",
    content: "Discover popular hashtags to increase your tweets' visibility and reach.",
  },
  {
    id: "m2",
    title: "Twitter Bio",
    content: "Create a compelling bio that showcases your uniqueness and attracts followers.",
  },
];

const facebookContent = [
  {
    id: "m2",
    title: "Facebook Post Ideas",
    content: "Generate engaging post ideas that spark conversations and drive interactions.",
  },
  {
    id: "m2",
    title: "Facebook Ad Copy",
    content: "Create compelling ad copy that compels your target audience to take action.",
  },
  {
    id: "m2",
    title: "Facebook Page Description",
    content: "Craft an enticing page description that accurately represents your brand.",
  },
];


const Cards = styled(Card)`
  margin: 15px;
  padding: 15px;
  display: flex;
  flex-Direction: column;
  justify-Content: center;
  align-Items: center;
`;

const CardContents = styled(Card)`
  text-align: center;
  margin: 10px 4px;
  backgroundColor: white;
  color: black;
  align-items: center;
  justify-content: center;
  borderRadius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 20px;
  max-width: 350px;
  box-shadow: 0 16px 22px rgba(0, 0, 0, 0.4);
`;

const DescriptionCard = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start
`;



const CardItemTitle = styled.h1`
  color: black;
  font-weight: bolder;
  margin-bottom: 15px;
  margin-top: 15px;
  align-self: center;
  text-align: center;

`;

const IconCard = styled(Card)`
  display: flex;
  flexDirection: column;
`;

const Icon = styled(Typography)`
  fontSize: 48px;
  marginBottom: 2px;
`


const Home: NextPage = () => {


  return (
    <Grid>
      <Grid>
        <Cards>
          <CardItemTitle>
            <YouTubeIcon />
            <h3>YouTube</h3>
          </CardItemTitle>
          <DescriptionCard>
            
            {youtubeContent.slice(0, 4).map((content, index) => {
              
                return (
                  <CardContents key={content.id} >
                    
                    <CardItemTitle>
                      {content.title}
                    </CardItemTitle>
                    <Typography variant="body2" color="textPrimary">
                      {content.content}
                    </Typography>
                    
                  </CardContents>
                );
              
              
              
            })}
          </DescriptionCard>
          <DescriptionCard>
            {youtubeContent.slice(4, 6).map((content, index) => {
              
                return (
                  <CardContents key={content.id} >
                    <CardItemTitle>
                      {content.title}
                    </CardItemTitle>
                    <Typography variant="body2" color="textPrimary">
                      {content.content}
                    </Typography>
                  </CardContents>
                );
              
              
              
            })}
          </DescriptionCard>
        </Cards>
        <Cards>
          <CardItemTitle >
            <TwitterIcon />
            <h3>Twitter</h3>
          </CardItemTitle>
          <DescriptionCard>
            {tiktokContent.map((content) => {
              return (
                <CardContents key={content.id}>
                  <CardItemTitle >
                    {content.title}
                  </CardItemTitle>
                  <Typography variant="body2" color="textPrimary">
                    {content.content}
                  </Typography>
                </CardContents>
              );
            })}
          </DescriptionCard>
        </Cards>
        <Cards>
          <CardItemTitle>
            <LinkedInIcon />
            <h3>LinkedIn</h3>
          </CardItemTitle>
          <DescriptionCard>
            {linkedInContent.map((content) => {
              return (
                <CardContents key={content.id} >
                  <CardItemTitle>
                    {content.title}
                  </CardItemTitle>
                  <Typography variant="body2" color="textPrimary">
                    {content.content}
                  </Typography>
                </CardContents>
              );
            })}
          </DescriptionCard>
        </Cards>
        <Cards>
          <CardItemTitle>
            <TikTokIcon />
            <h3>TikTok</h3>
          </CardItemTitle>
          <DescriptionCard>
            {tiktokContent.map((content) => {
              return (
                <CardContents key={content.id} >
                  <CardItemTitle>
                    {content.title}
                  </CardItemTitle>
                  <Typography variant="body2" color="textPrimary">
                    {content.content}
                  </Typography>
                </CardContents>
              );
            })}
          </DescriptionCard>
        </Cards>
        <Cards>
          <CardItemTitle>
            <InstagramIcon />
            <h3>Instagram</h3>
          </CardItemTitle>
          <DescriptionCard >
            {InstagramContent.map((content) => {
              return (
                <CardContents>
                  <CardItemTitle>
                    {content.title}
                  </CardItemTitle>
                  <Typography variant="body2" color="textPrimary">
                    {content.content}
                  </Typography>
                </CardContents>
              );
            })}
          </DescriptionCard>
        </Cards>{" "}
      </Grid>
    </Grid>
  );
};

export default Home;

