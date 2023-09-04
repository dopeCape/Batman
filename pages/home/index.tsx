import { NextPage } from "next";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TikTokIcon from "@mui/icons-material/ThumbUp";
import Grade from "@mui/icons-material/Grade";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import { useRouter } from "next/router";
// import youtubeContent from "@/data/youtube";
// import tiktokContent from "@/data/tiktok";
// import InstagramContent from "@/data/instagram";
// import linkedInContent from "@/data/linkedin";
// import twitterContent from "@/data/twitter";
// import facebookContent from "@/data/facebook";
// import generalContent from "@/data/general";
// import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { CardContent } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
// import { makeStyles } from "@mui/styles";
// import { Button } from "@material-ui/core";
import Link from "next/link";
import { auth } from "@/firebase";
import youtubeContent from "@/data/youtube";
import tiktokContent from "@/data/tiktok";
import InstagramContent from "@/data/instagram";
import linkedInContent from "@/data/linkedin";
import twitterContent from "@/data/twitter";
import facebookContent from "@/data/facebook";
import generalContent from "@/data/general";
import { useState, useEffect } from "react";

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

const Cards = styled(Card)`
  margin: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardContents = styled(Card)`
  text-align: center;
  margin: 10px 4px;
  backgroundcolor: white;
  cursor: pointer;
  color: black;
  align-items: center;
  justify-content: center;
  borderradius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 10px;
  max-width: 350px;
  height: 200px;
`;

const DescriptionCard = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  @media (max-width: 768px) {
    flex-direction: column;
    align-self: center;
  }
`;

const CardItemTitle = styled.h1`
  color: black;
  font-weight: bolder;
  margin-bottom: 15px;
  margin-top: 15px;
  align-self: center;
  text-align: center;
`;



// const Home: NextPage = () => {
//   const router = useRouter();

//   return (
//     <Grid>
//       <Grid>
//         <Cards>
//           <CardItemTitle>
//             <YouTubeIcon htmlColor="#FF0000" />
//             <h3>YouTube</h3>
//           </CardItemTitle>
//           <DescriptionCard>
//             {youtubeContent.slice(0, 4).map((content) => {
//               return (
//                 <CardContents
//                   onClick={() => {
//                     if (content.comp == "video") {
//                       router.push({
//                         pathname: "/home/VideoGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "caption") {
//                       router.push({
//                         pathname: "/home/CaptionGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "desc") {
//                       router.push({
//                         pathname: "/home/DescGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     }
//                   }}
//                   key={content.id}
//                 >
//                   <CardItemTitle>{content.title}</CardItemTitle>
//                   <Typography variant="body1" color="GrayText">
//                     {content.content}
//                   </Typography>
//                 </CardContents>
//               );
//             })}
//           </DescriptionCard>
//           <DescriptionCard>
//             {youtubeContent.slice(4, 6).map((content, index) => {
//               return (
//                 <CardContents
//                   onClick={() => {
//                     if (content.comp == "video") {
//                       router.push({
//                         pathname: "/home/VideoGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "caption") {
//                       router.push({
//                         pathname: "/home/CaptionGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "desc") {
//                       router.push({
//                         pathname: "/home/DescGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "hashtag") {
//                       router.push({
//                         pathname: "/home/HashtagGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "thumbnail") {
//                       router.push({
//                         pathname: "/home/ThumbGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     }
//                   }}
//                   key={content.id}
//                 >
//                   <CardItemTitle>{content.title}</CardItemTitle>
//                   <Typography variant="body1" color="GrayText">
//                     {content.content}
//                   </Typography>
//                 </CardContents>
//               );
//             })}
//           </DescriptionCard>
//         </Cards>
//         <Cards>
//           <CardItemTitle>
//             <TwitterIcon htmlColor="#1DA1F2" />
//             <h3>Twitter</h3>
//           </CardItemTitle>
//           <DescriptionCard>
//             {twitterContent.map((content) => {
//               return (
//                 <CardContents
//                   onClick={() => {
//                     if (content.comp == "tweet") {
//                       router.push({
//                         pathname: "/home/Tweet",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "caption") {
//                       router.push({
//                         pathname: "/home/CaptionGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "desc") {
//                       router.push({
//                         pathname: "/home/DescGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "hashtag") {
//                       router.push({
//                         pathname: "/home/HashtagGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "bio") {
//                       router.push({
//                         pathname: "/home/BioGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     }
//                   }}
//                   key={content.id}
//                 >
//                   <CardItemTitle>{content.title}</CardItemTitle>
//                   <Typography variant="body1" color="GrayText">
//                     {content.content}
//                   </Typography>
//                 </CardContents>
//               );
//             })}
//           </DescriptionCard>
//         </Cards>
//         <Cards>
//           <CardItemTitle>
//             <LinkedInIcon htmlColor="#0077B5" />
//             <h3>LinkedIn</h3>
//           </CardItemTitle>
//           <DescriptionCard>
//             {linkedInContent.map((content) => {
//               return (
//                 <CardContents
//                   onClick={() => {
//                     if (content.comp == "LinkedInPost") {
//                       router.push({
//                         pathname: "/home/LinkedInPostGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "caption") {
//                       router.push({
//                         pathname: "/home/CaptionGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "desc") {
//                       router.push({
//                         pathname: "/home/DescGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "bio") {
//                       router.push({
//                         pathname: "/home/BioGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     }
//                   }}
//                   key={content.id}
//                 >
//                   <CardItemTitle>{content.title}</CardItemTitle>
//                   <Typography variant="body1" color="GrayText">
//                     {content.content}
//                   </Typography>
//                 </CardContents>
//               );
//             })}
//           </DescriptionCard>
//         </Cards>
//         <Cards>
//           <CardItemTitle>
//             <TikTokIcon htmlColor="#FE2C55" />
//             <h3>TikTok</h3>
//           </CardItemTitle>
//           <DescriptionCard>
//             {tiktokContent.map((content) => {
//               return (
//                 <CardContents
//                   onClick={() => {
//                     if (content.comp == "video") {
//                       router.push({
//                         pathname: "/home/VideoGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "caption") {
//                       router.push({
//                         pathname: "/home/CaptionGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "desc") {
//                       router.push({
//                         pathname: "/home/DescGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "hashtag") {
//                       router.push({
//                         pathname: "/home/HashtagGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     }
//                   }}
//                   key={content.id}
//                 >
//                   <CardItemTitle>{content.title}</CardItemTitle>
//                   <Typography variant="body1" color="GrayText">
//                     {content.content}
//                   </Typography>
//                 </CardContents>
//               );
//             })}
//           </DescriptionCard>
//         </Cards>
//         <Cards>
//           <CardItemTitle>
//             <FacebookIcon htmlColor="#4267B2" />
//             <h3>Facebook</h3>
//           </CardItemTitle>
//           <DescriptionCard>
//             {facebookContent.map((content) => {
//               return (
//                 <CardContents
//                   onClick={() => {
//                     if (content.comp == "post") {
//                       router.push({
//                         pathname: "/home/VideoGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "caption") {
//                       router.push({
//                         pathname: "/home/CaptionGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "desc") {
//                       router.push({
//                         pathname: "/home/DescGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "hashtag") {
//                       router.push({
//                         pathname: "/home/HashtagGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "adCopy") {
//                       router.push({
//                         pathname: "/home/AdGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     }
//                   }}
//                   key={content.id}
//                 >
//                   <CardItemTitle>{content.title}</CardItemTitle>
//                   <Typography variant="body1" color="GrayText">
//                     {content.content}
//                   </Typography>
//                 </CardContents>
//               );
//             })}
//           </DescriptionCard>
//         </Cards>
//         <Cards>
//           <CardItemTitle>
//             <InstagramIcon htmlColor="	#C13584" />
//             <h3>Instagram</h3>
//           </CardItemTitle>
//           <DescriptionCard>
//             {InstagramContent.map((content) => {
//               return (
//                 <CardContents
//                   onClick={() => {
//                     if (content.comp == "video") {
//                       router.push({
//                         pathname: "/home/VideoGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "caption") {
//                       router.push({
//                         pathname: "/home/CaptionGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "bio") {
//                       router.push({
//                         pathname: "/home/BioGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "desc") {
//                       router.push({
//                         pathname: "/home/DescGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "hashtag") {
//                       router.push({
//                         pathname: "/home/HashtagGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "adCopy") {
//                       router.push({
//                         pathname: "/home/AdGen",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     }
//                   }}
//                   key={content.id}
//                 >
//                   <CardItemTitle>{content.title}</CardItemTitle>
//                   <Typography variant="body1" color="GrayText">
//                     {content.content}
//                   </Typography>
//                 </CardContents>
//               );
//             })}
//           </DescriptionCard>
//         </Cards>{" "}
//         <Cards>
//           <CardItemTitle>
//             <Grade htmlColor="#FFD700" />
//             <h3>General</h3>
//           </CardItemTitle>
//           <DescriptionCard>
//             {generalContent.slice(0, 4).map((content) => {
//               return (
//                 <CardContents
//                   onClick={() => {
//                     if (content.comp == "rewrite") {
//                       router.push({
//                         pathname: "/home/Rewrite",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     } else if (content.comp == "repurpose") {
//                       router.push({
//                         pathname: "/home/Repurpose",
//                         query: {
//                           platform: content.platform,
//                           title: content.title,
//                         },
//                       });
//                     }
//                   }}
//                   key={content.id}
//                 >
//                   <CardItemTitle>{content.title}</CardItemTitle>
//                   <Typography variant="body1" color="GrayText">
//                     {content.content}
//                   </Typography>
//                 </CardContents>
//               );
//             })}
//           </DescriptionCard>
//         </Cards>
//       </Grid>
//     </Grid>
// ];

const youtube = [
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
    {
      id: "m1",
      title: "YouTube is a great platform",
      link: "/generate/youtube",
      content:
        "Twitter is an online social networking and microblogging platform where users can post and interact with messages known as 'tweets'. It is a popular platform for real-time information and social networking.",
    },
];

const tiktok = [
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

const Instagram = [
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

const linkedIn = [
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
  const [user, setUser] = useState<null | any>(null);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user && !user?.uid) {
        window.location.href = "/";
      }
    })
  }, [user]);

  return (
    <Grid className="bg-black h-full flex">
      <Grid>
        <Cards>
          <CardItemTitle>
            <YouTubeIcon htmlColor="#FF0000" />
            <h3>YouTube</h3>
          </CardItemTitle>
          <DescriptionCard>
            {youtubeContent.slice(0, 4).map((content) => {
              return (
                <CardContents
                  onClick={() => {
                    if (content.comp == "video") {
                      router.push({
                        pathname: "/home/VideoGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "caption") {
                      router.push({
                        pathname: "/home/CaptionGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "desc") {
                      router.push({
                        pathname: "/home/DescGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    }
                  }}
                  key={content.id}
                >
                  <CardItemTitle>{content.title}</CardItemTitle>
                  <Typography variant="body1" color="GrayText">
                    {content.content}
                  </Typography>
                </CardContents>
              );
            })}
          </DescriptionCard>
          <DescriptionCard>
            {youtubeContent.slice(4, 6).map((content, index) => {
              return (
                <CardContents
                  onClick={() => {
                    if (content.comp == "video") {
                      router.push({
                        pathname: "/home/VideoGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "caption") {
                      router.push({
                        pathname: "/home/CaptionGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "desc") {
                      router.push({
                        pathname: "/home/DescGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "hashtag") {
                      router.push({
                        pathname: "/home/HashtagGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "thumbnail") {
                      router.push({
                        pathname: "/home/ThumbGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    }
                  }}
                  key={content.id}
                >
                  <CardItemTitle>{content.title}</CardItemTitle>
                  <Typography variant="body1" color="GrayText">
                    {content.content}
                  </Typography>
                </CardContents>
              );
            })}
          </DescriptionCard>
        </Cards>
        <Cards>
          <CardItemTitle>
            <TwitterIcon htmlColor="#1DA1F2" />
            <h3>Twitter</h3>
          </CardItemTitle>
          <DescriptionCard>
            {twitterContent.map((content) => {
              return (
                <CardContents
                  onClick={() => {
                    if (content.comp == "tweet") {
                      router.push({
                        pathname: "/home/Tweet",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "caption") {
                      router.push({
                        pathname: "/home/CaptionGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "desc") {
                      router.push({
                        pathname: "/home/DescGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "hashtag") {
                      router.push({
                        pathname: "/home/HashtagGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "bio") {
                      router.push({
                        pathname: "/home/BioGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    }
                  }}
                  key={content.id}
                >
                  <CardItemTitle>{content.title}</CardItemTitle>
                  <Typography variant="body1" color="GrayText">
                    {content.content}
                  </Typography>
                </CardContents>
              );
            })}
          </DescriptionCard>
        </Cards>
        <Cards>
          <CardItemTitle>
            <LinkedInIcon htmlColor="#0077B5" />
            <h3>LinkedIn</h3>
          </CardItemTitle>
          <DescriptionCard>
            {linkedInContent.map((content) => {
              return (
                <CardContents
                  onClick={() => {
                    if (content.comp == "LinkedInPost") {
                      router.push({
                        pathname: "/home/LinkedInPostGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "caption") {
                      router.push({
                        pathname: "/home/CaptionGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "desc") {
                      router.push({
                        pathname: "/home/DescGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "bio") {
                      router.push({
                        pathname: "/home/BioGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    }
                  }}
                  key={content.id}
                >
                  <CardItemTitle>{content.title}</CardItemTitle>
                  <Typography variant="body1" color="GrayText">
                    {content.content}
                  </Typography>
                </CardContents>
              );
            })}
          </DescriptionCard>
        </Cards>
        <Cards>
          <CardItemTitle>
            <TikTokIcon htmlColor="#FE2C55" />
            <h3>TikTok</h3>
          </CardItemTitle>
          <DescriptionCard>
            {tiktokContent.map((content) => {
              return (
                <CardContents
                  onClick={() => {
                    if (content.comp == "video") {
                      router.push({
                        pathname: "/home/VideoGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "caption") {
                      router.push({
                        pathname: "/home/CaptionGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "desc") {
                      router.push({
                        pathname: "/home/DescGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "hashtag") {
                      router.push({
                        pathname: "/home/HashtagGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    }
                  }}
                  key={content.id}
                >
                  <CardItemTitle>{content.title}</CardItemTitle>
                  <Typography variant="body1" color="GrayText">
                    {content.content}
                  </Typography>
                </CardContents>
              );
            })}
          </DescriptionCard>
        </Cards>
        <Cards>
          <CardItemTitle>
            <FacebookIcon htmlColor="#4267B2" />
            <h3>Facebook</h3>
          </CardItemTitle>
          <DescriptionCard>
            {facebookContent.map((content) => {
              return (
                <CardContents
                  onClick={() => {
                    if (content.comp == "post") {
                      router.push({
                        pathname: "/home/VideoGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "caption") {
                      router.push({
                        pathname: "/home/CaptionGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "desc") {
                      router.push({
                        pathname: "/home/DescGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "hashtag") {
                      router.push({
                        pathname: "/home/HashtagGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "adCopy") {
                      router.push({
                        pathname: "/home/AdGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    }
                  }}
                  key={content.id}
                >
                  <CardItemTitle>{content.title}</CardItemTitle>
                  <Typography variant="body1" color="GrayText">
                    {content.content}
                  </Typography>
                </CardContents>
              );
            })}
          </DescriptionCard>
        </Cards>
        <Cards>
          <CardItemTitle>
            <InstagramIcon htmlColor="	#C13584" />
            <h3>Instagram</h3>
          </CardItemTitle>
          <DescriptionCard>
            {InstagramContent.map((content) => {
              return (
                <CardContents
                  onClick={() => {
                    if (content.comp == "video") {
                      router.push({
                        pathname: "/home/VideoGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "caption") {
                      router.push({
                        pathname: "/home/CaptionGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "bio") {
                      router.push({
                        pathname: "/home/BioGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "desc") {
                      router.push({
                        pathname: "/home/DescGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "hashtag") {
                      router.push({
                        pathname: "/home/HashtagGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "adCopy") {
                      router.push({
                        pathname: "/home/AdGen",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    }
                  }}
                  key={content.id}
                >
                  <CardItemTitle>{content.title}</CardItemTitle>
                  <Typography variant="body1" color="GrayText">
                    {content.content}
                  </Typography>
                </CardContents>
              );
            })}
          </DescriptionCard>
        </Cards>{" "}
        <Cards>
          <CardItemTitle>
            <Grade htmlColor="#FFD700" />
            <h3>General</h3>
          </CardItemTitle>
          <DescriptionCard>
            {generalContent.slice(0, 4).map((content) => {
              return (
                <CardContents
                  onClick={() => {
                    if (content.comp == "rewrite") {
                      router.push({
                        pathname: "/home/Rewrite",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    } else if (content.comp == "repurpose") {
                      router.push({
                        pathname: "/home/Repurpose",
                        query: {
                          platform: content.platform,
                          title: content.title,
                        },
                      });
                    }
                  }}
                  key={content.id}
                >
                  <CardItemTitle>{content.title}</CardItemTitle>
                  <Typography variant="body1" color="GrayText">
                    {content.content}
                  </Typography>
                </CardContents>
              );
            })}
          </DescriptionCard>
        </Cards>
      </Grid>
    </Grid>
  );
};

export default Home;
