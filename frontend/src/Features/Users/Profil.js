import React from "react";
import cx from "clsx";
// import { makeStyles } from "@material-ui/core/styles";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  //   makeStyles,
  Typography,
} from "@mui/material";
// import  from "@material-ui/core/Box";
// import  from "@material-ui/core/Card";
// import  from "@material-ui/core/CardMedia";
// import  from "@material-ui/core/CardContent";
// import  from "@material-ui/core/IconButton";
import { Share } from "@mui/icons-material";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import AppLayout from "../Layout/AppLayout";
// import  from "@material-ui/icons/FavoriteBorderRounded";
// import  from "@material-ui/icons/Share";
// import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise";
// import { useSlopeCardMediaStyles } from "@mui-treasury/styles/cardMedia/slope";
// import { useN01TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";
// import TextInfoContent from "@mui-treasury/components/content/textInfo";

// import { Root,  } from "@mui-treasury/layout";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 304,
    margin: "auto",
  },
  content: {
    padding: 24,
  },
  avatar: {
    width: 50,
    height: 50,
    border: "2px solid #fff",
    margin: "-48px 32px 0 auto",
    "& > img": {
      margin: 0,
    },
  },
}));

export const PostCardDemo = React.memo(function PostCard() {
  alert("Hello");
  const cardStyles = useStyles();
  //   const mediaStyles = useSlopeCardMediaStyles();
  //   const shadowStyles = useSoftRiseShadowStyles();
  //   const textCardContentStyles = useN01TextInfoContentStyles();
  return (
    // <AppLayout>
    <Card>
      className={cx(cardStyles.root)}
      <CardMedia
        // classes={mediaStyles}
        image={
          "https://images.unsplash.com/photo-1517147177326-b37599372b73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2229&q=80"
        }
        sx={{ width: "100%", height: "100%" }}
      />
      <Avatar src={"https://i.pravatar.cc/300"} />
      <CardContent>
        <Typography variant="h6"> Nom </Typography>
      </CardContent>
      <Box px={2} pb={2} mt={-1}>
        <IconButton>
          <Share />
        </IconButton>
        <IconButton>
          <FavoriteBorderRounded />
        </IconButton>
      </Box>
    </Card>
    // </AppLayout>
  );
});

export default PostCardDemo;
