import { NextPage } from "next";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TikTokIcon from "@material-ui/icons/ThumbUp";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";

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
];

const youtubeContent = [
  {
      id: "m1",
      title: "YouTube is a great platform",
      content: "Twitter is an online social networking and microblogging platform where users can post and interact with messages known as 'tweets'. It is a popular platform for real-time information and social networking.",
  },
  {
    id: "m1",
    title: "YouTube is a great platform",
    content: "Twitter is an online social networking and microblogging platform where users can post and interact with messages known as 'tweets'. It is a popular platform for real-time information and social networking.",
  },
  {
    id: "m1",
    title: "YouTube is a great platform",
    content: "Twitter is an online social networking and microblogging platform where users can post and interact with messages known as 'tweets'. It is a popular platform for real-time information and social networking.",
  },
]

const tiktokContent = [
    {
      id: "m1",
      title: "Tiktok is a great platform",
      content: "TikTok is a short-form video-sharing platform known for its creative and entertaining content. Users can create and share short videos with various effects, filters, and music.",
    },
    {
      id: "m1",
      title: "Tiktok is a great platform",
      content: "Instagram is a photo and video-sharing social networ platform. Users can post photos and videos, follow other users, explore content, and interact through comments and likes.",
    },
    {
      id: "m1",
      title: "Tiktok is a great platform",
      content: "TikTok is a short-form video-sharing platform known for its creative and entertaining content. Users can create and share short videos with various effects, filters, and music.",
    },
    {
      id: "m1",
      title: "Tiktok is a great platform",
      content: "Instagram is a photo and video-sharing social networ platform. Users can post photos and videos, follow other users, explore content, and interact through comments and likes.",
    },
]

const InstagramContent = [
  {
    id: "m1",
    title: "Instagram is a great platform",
    content: "Instagram is a short-form video-sharing platform known for its creative and entertaining content. Users can create and share short videos with various effects, filters, and music.",
  },
  {
    id: "m2",
    title: "Instagram is a great platform",
    content: "Instagram is a short-form video-sharing platform known for its creative and entertaining content. Users can create and share short videos with various effects, filters, and music.",
  },
  {
    id: "m1",
    title: "Instagram is a great platform",
    content: "Instagram is a short-form video-sharing platform known for its creative and entertaining content. Users can create and share short videos with various effects, filters, and music.",
  },
  {
    id: "m2",
    title: "Instagram is a great platform",
    content: "Instagram is a short-form video-sharing platform known for its creative and entertaining content. Users can create and share short videos with various effects, filters, and music.",
  },
]

const linkedInContent = [
  {
    id: "m2",
    title: "LinkedIn is a great platform",
    content: "LinkedIn is a professional networking platform where users can create a profile, connect with colleagues and professionals, and share content related to their career and industry."
  },
  {
    id: "m2",
    title: "LinkedIn is a great platform",
    content: "LinkedIn is a professional networking platform where users can create a profile, connect with colleagues and professionals, and share content related to their career and industry."
  },
  {
    id: "m2",
    title: "LinkedIn is a great platform",
    content: "LinkedIn is a professional networking platform where users can create a profile, connect with colleagues and professionals, and share content related to their career and industry."
  },
  {
    id: "m2",
    title: "LinkedIn is a great platform",
    content: "LinkedIn is a professional networking platform where users can create a profile, connect with colleagues and professionals, and share content related to their career and industry."
  },
]

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "15px",
    padding: "15px",
    // height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    textAlign: "center",
    // marginTop: "100px",
    margin: "20px 2px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    maxWidth: "350px"
  },
  descriptionCard: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up(600)]: {
      flexDirection: "row"
    }
  },

  cardItemTitle: {
    color: "black",
    fontWeight: "bolder",
    marginBottom: "20px"
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
        <Grid item>
            <Card className={classes.card}>
                <Typography variant="h6" component="h2" className={classes.iconCard}>
                    <YouTubeIcon />
                    <h3>YouTube</h3>
                </Typography>
                <div className={classes.descriptionCard}>
                  {youtubeContent.map(content => {
                    return <CardContent key={content.id} className={classes.cardContent}>
                              <Typography variant="body2" className={classes.cardItemTitle}>{content.title}</Typography>
                              <Typography variant="body2">{content.content}</Typography>
                            </CardContent>
                  })}
                </div>
            </Card>
            <Card className={classes.card}>
              <Typography variant="h6" component="h2" className={classes.iconCard}>
                  <TwitterIcon />
                  <h3>Twitter</h3>
              </Typography>
              <div className={classes.descriptionCard}>
                {tiktokContent.map(content => {
                  return <CardContent key={content.id} className={classes.cardContent}>
                            <Typography variant="body2" className={classes.cardItemTitle}>{content.title}</Typography>
                            <Typography variant="body2">{content.content}</Typography>
                          </CardContent>
                })}
              </div>
            </Card>
            <Card className={classes.card}>
              <Typography variant="h6" component="h2" className={classes.iconCard}>
                  <LinkedInIcon />
                  <h3>LinkedIn</h3>
              </Typography>
              <div className={classes.descriptionCard}>
                {linkedInContent.map(content => {
                  return <CardContent key={content.id} className={classes.cardContent}>
                            <Typography variant="body2" className={classes.cardItemTitle}>{content.title}</Typography>
                            <Typography variant="body2">{content.content}</Typography>
                          </CardContent>
                })}
              </div>
            </Card>
            <Card className={classes.card}>
              <Typography variant="h6" component="h2" className={classes.iconCard}>
                  <TikTokIcon />
                  <h3>TikTok</h3>
              </Typography>
              <div className={classes.descriptionCard}>
                {tiktokContent.map(content => {
                  return <CardContent key={content.id} className={classes.cardContent}>
                            <Typography variant="body2" className={classes.cardItemTitle}>{content.title}</Typography>
                            <Typography variant="body2">{content.content}</Typography>
                          </CardContent>
                })}
              </div>
            </Card>
            <Card className={classes.card}>
              <Typography variant="h6" component="h2" className={classes.iconCard}>
                  <InstagramIcon />
                  <h3>Instagram</h3>
              </Typography>
              <div className={classes.descriptionCard}>
                {InstagramContent.map(content => {
                  return <CardContent key={content.id} className={classes.cardContent}>
                            <Typography variant="body2" className={classes.cardItemTitle}>{content.title}</Typography>
                            <Typography variant="body2">{content.content}</Typography>
                          </CardContent>
                })}
              </div>
            </Card> */
        </Grid>
    </Grid>
  );
};

export default Home;