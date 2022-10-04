import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppLayout from "../Layout/AppLayout";
import MediaCard from "./Components/MediaCard";
import { useNews, queryFn, queryKey } from "./Services/New.api";
import { useQuery } from "react-query";

const Actualites = () => {
  const [data, setData] = useState([
    { nom: "sdbcds jb" },
    { nom: "sdbcds jb" },
    { nom: "sdbcds jb" },
  ]);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=tesla&from=2022-08-09&sortBy=publishedAt&apiKey=54e1ef58241145089e7186184f30d913"
    )
      .then((response) => response.json())
      .then((res) => {
        const articles = res.articles;
        console.log(articles);
        setData(articles);
      });
  }, []);
  console.log("Data :", data);
  //const componentDidMount =
  return (
    // <AppLayout>
    <Box>
      {data.map((dat) => (
        <MediaCard key={dat.title} news={dat} />
      ))}
    </Box>
    // </AppLayout>
  );
};

export default Actualites;
