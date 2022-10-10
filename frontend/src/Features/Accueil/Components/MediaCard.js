import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const MediaCard = ({ news }) => {
  return (
    <Grid item container mb={2} spacing={2} xs={12} md={4} sm={6} lg={4} xl={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={news?.urlToImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {news.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {news.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
export default MediaCard;
