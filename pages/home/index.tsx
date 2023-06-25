import { NextPage } from "next";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TikTokIcon from "@material-ui/icons/ThumbUp";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Button } from "@material-ui/core";
import Link from "next/link";

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
    link: "/generate/youtube",
    content:
      "Twitter is an online social networking and microblogging platform where users can post and interact with messages known as 'tweets'. It is a popular platform for real-time information and social networking.",
  },
  {
    id: "m1",
    title: "YouTube is a great platform",
    link: "/generate/instagram",
    content:
      "Twitter is an online social networking and microblogging platform where users can post and interact with messages known as 'tweets'. It is a popular platform for real-time information and social networking.",
  },
  {
    id: "m1",
    title: "YouTube is a great platform",
    link: "/generate/youtube",
    content:
      "Twitter is an online social networking and microblogging platform where users can post and interact with messages known as 'tweets'. It is a popular platform for real-time information and social networking.",
  },
  //   {
  //     id: "m1",
  //     title: "YouTube is a great platform",
  //     content:
  //       "Twitter is an online social networking and microblogging platform where users can post and interact with messages known as 'tweets'. It is a popular platform for real-time information and social networking.",
  //   },
];

const tiktokContent = [
  {
    id: "m1",
    title: "Tiktok is a great platform",
    link: "/generate/youtube",
    content:
      "TikTok is a short-form video-sharing platform known for its creative and entertaining content. Users can create and share short videos with various effects, filters, and music.",
  },
  {
    id: "m1",
    title: "Tiktok is a great platform",
    link: "/generate/instagram",
    content:
      "Instagram is a photo and video-sharing social networ platform. Users can post photos and videos, follow other users, explore content, and interact through comments and likes.",
  },
  {
    id: "m1",
    title: "Tiktok is a great platform",
    link: "/generate/youtube",
    content:
      "TikTok is a short-form video-sharing platform known for its creative and entertaining content. Users can create and share short videos with various effects, filters, and music.",
  },
  {
    id: "m1",
    title: "Tiktok is a great platform",
    link: "/generate/instagram",
    content:
      "Instagram is a photo and video-sharing social networ platform. Users can post photos and videos, follow other users, explore content, and interact through comments and likes.",
  },
];

const InstagramContent = [
  {
    id: "m1",
    title: "Instagram is a great platform",
    link: "/generate/tiktok",
    content:
      "Instagram is a short-form video-sharing platform known for its creative and entertaining content. Users can create and share short videos with various effects, filters, and music.",
  },
  {
    id: "m2",
    title: "Instagram is a great platform",
    link: "/generate/instagram",
    content:
      "Instagram is a short-form video-sharing platform known for its creative and entertaining content. Users can create and share short videos with various effects, filters, and music.",
  },
  {
    id: "m1",
    title: "Instagram is a great platform",
    link: "/generate/youtube",
    content:
      "Instagram is a short-form video-sharing platform known for its creative and entertaining content. Users can create and share short videos with various effects, filters, and music.",
  },
  {
    id: "m2",
    title: "Instagram is a great platform",
    link: "/generate/instagram",
    content:
      "Instagram is a short-form video-sharing platform known for its creative and entertaining content. Users can create and share short videos with various effects, filters, and music.",
  },
];

const linkedInContent = [
  {
    id: "m2",
    title: "LinkedIn is a great platform",
    link: "/generate/tiktok",
    content:
      "LinkedIn is a professional networking platform where users can create a profile, connect with colleagues and professionals, and share content related to their career and industry.",
  },
  {
    id: "m2",
    title: "LinkedIn is a great platform",
    link: "/generate/youtube",
    content:
      "LinkedIn is a professional networking platform where users can create a profile, connect with colleagues and professionals, and share content related to their career and industry.",
  },
  {
    id: "m2",
    title: "LinkedIn is a great platform",
    link: "/generate/tiktok",
    content:
      "LinkedIn is a professional networking platform where users can create a profile, connect with colleagues and professionals, and share content related to their career and industry.",
  },
  {
    id: "m2",
    title: "LinkedIn is a great platform",
    link: "/generate/youtube",
    content:
      "LinkedIn is a professional networking platform where users can create a profile, connect with colleagues and professionals, and share content related to their career and industry.",
  },
];

const useStyles = makeStyles((theme) => ({
  containCard: {
    display: "flex",
    justifyContent: "center",
  },

  card: {
    margin: "15px ",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  subCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    maxWidth: "1920px",
  },

  cardContent: {
    textAlign: "center",
    margin: "20px 10px",
    backgroundColor: "white",
    color: "black",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    minWidth: "300px",
    maxWidth: "300px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
  },
  descriptionCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    [theme.breakpoints.up(600)]: {
      flexDirection: "row",
      alignItems: "start",
    },
    [theme.breakpoints.up(960)]: {
      flexDirection: "row",
      justifyContent: "start",
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
    <div className={classes.containCard}>
      <Grid className={classes.subCard}>
        <Card className={classes.card}>
          <Typography variant="h6" component="h2" className={classes.iconCard}>
            <YouTubeIcon />
            <h3>YouTube</h3>
          </Typography>
          <div className={classes.descriptionCard}>
            {youtubeContent.map((content) => {
              return (
                <CardContent key={content.id} className={classes.cardContent}>
                  <button>
                    <Link href={content.link}>
                      <Typography
                        variant="body2"
                        className={classes.cardItemTitle}
                      >
                        {content.title}
                      </Typography>
                      <Typography variant="body2" color="textPrimary">
                        {content.content}
                      </Typography>
                    </Link>
                  </button>
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
                  <button>
                    <Link href={content.link}>
                      <Typography
                        variant="body2"
                        className={classes.cardItemTitle}
                      >
                        {content.title}
                      </Typography>
                      <Typography variant="body2" color="textPrimary">
                        {content.content}
                      </Typography>
                    </Link>
                  </button>
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
                  <button>
                    <Link href={content.link}>
                      <Typography
                        variant="body2"
                        className={classes.cardItemTitle}
                      >
                        {content.title}
                      </Typography>
                      <Typography variant="body2" color="textPrimary">
                        {content.content}
                      </Typography>
                    </Link>
                  </button>
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
                  <button>
                    <Link href={content.link}>
                      <Typography
                        variant="body2"
                        className={classes.cardItemTitle}
                      >
                        {content.title}
                      </Typography>
                      <Typography variant="body2" color="textPrimary">
                        {content.content}
                      </Typography>
                    </Link>
                  </button>
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
                  <button>
                    <Link href={content.link}>
                      <Typography
                        variant="body2"
                        className={classes.cardItemTitle}
                      >
                        {content.title}
                      </Typography>
                      <Typography variant="body2" color="textPrimary">
                        {content.content}
                      </Typography>
                    </Link>
                  </button>
                </CardContent>
              );
            })}
          </div>
        </Card>{" "}
      </Grid>
    </div>
  );
};

export default Home;
