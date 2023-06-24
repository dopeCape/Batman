import { NextPage } from "next";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TikTokIcon from "@material-ui/icons/ThumbUp";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Button } from "@material-ui/core";

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

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "15px ",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  cardContent: {
    textAlign: "center",
    margin: "20px 2px",
    backgroundColor: "white",
    color: "black",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    maxWidth: "350px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
  },
  descriptionCard: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up(600)]: {
      flexDirection: "row",
    },
  },

  cardItemTitle: {
    color: "black",
    fontWeight: "bolder",
    marginBottom: "20px",
  },

  iconCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    fontSize: 48,
    marginBottom: theme.spacing(2),
  },
}));

const Home: NextPage = () => {
  const classes = useStyles();

  return (
    <Grid>
      <Grid>
        <Card className={classes.card}>
          <Typography variant="h6" component="h2" className={classes.iconCard}>
            <YouTubeIcon />
            <h3>YouTube</h3>
          </Typography>
          <div className={classes.descriptionCard}>
            {youtubeContent.map((content) => {
              return (
                <CardContent key={content.id} className={classes.cardContent}>
                  <Typography variant="body2" className={classes.cardItemTitle}>
                    {content.title}
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    {content.content}
                  </Typography>
                </CardContent>
              );
            })}
          </div>
        </Card>
        <Card className={classes.card}>
          <Typography variant="h6" component="h2" className={classes.iconCard}>
            <TwitterIcon />
            <h3>Twitter</h3>
          </Typography>
          <div className={classes.descriptionCard}>
            {tiktokContent.map((content) => {
              return (
                <CardContent key={content.id} className={classes.cardContent}>
                  <Typography variant="body2" className={classes.cardItemTitle}>
                    {content.title}
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    {content.content}
                  </Typography>
                </CardContent>
              );
            })}
          </div>
        </Card>
        <Card className={classes.card}>
          <Typography variant="h6" component="h2" className={classes.iconCard}>
            <LinkedInIcon />
            <h3>LinkedIn</h3>
          </Typography>
          <div className={classes.descriptionCard}>
            {linkedInContent.map((content) => {
              return (
                <CardContent key={content.id} className={classes.cardContent}>
                  <Typography variant="body2" className={classes.cardItemTitle}>
                    {content.title}
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    {content.content}
                  </Typography>
                </CardContent>
              );
            })}
          </div>
        </Card>
        <Card className={classes.card}>
          <Typography variant="h6" component="h2" className={classes.iconCard}>
            <TikTokIcon />
            <h3>TikTok</h3>
          </Typography>
          <div className={classes.descriptionCard}>
            {tiktokContent.map((content) => {
              return (
                <CardContent key={content.id} className={classes.cardContent}>
                  <Typography variant="body2" className={classes.cardItemTitle}>
                    {content.title}
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    {content.content}
                  </Typography>
                </CardContent>
              );
            })}
          </div>
        </Card>
        <Card className={classes.card}>
          <Typography variant="h6" component="h2" className={classes.iconCard}>
            <InstagramIcon />
            <h3>Instagram</h3>
          </Typography>
          <div className={classes.descriptionCard}>
            {InstagramContent.map((content) => {
              return (
                <CardContent key={content.id} className={classes.cardContent}>
                  <Typography variant="body2" className={classes.cardItemTitle}>
                    {content.title}
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    {content.content}
                  </Typography>
                </CardContent>
              );
            })}
          </div>
        </Card>{" "}
      </Grid>
    </Grid>
  );
};

export default Home;
