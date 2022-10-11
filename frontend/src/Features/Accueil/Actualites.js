import { Box, Card, CardContent, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppLayout from "../Layout/AppLayout";
import MediaCard from "./Components/MediaCard";
import { useNews, queryFn, queryKey } from "./Services/New.api";
import { useQuery } from "react-query";

const Actualites = () => {
  const [data, setData] = useState([
    {
      source: {
        id: "techcrunch",
        name: "TechCrunch",
      },
      author: "Annie Njanja",
      title: "Google picks South Africa for its first cloud region in Africa",
      description:
        "Alphabet Inc's Google is also building Dedicated Cloud Interconnect sites in Lagos, Nairobi, Johannesburg, and Cape Town.",
      url: "https://techcrunch.com/2022/10/05/google-picks-south-africa-for-its-first-cloud-region-in-africa/",
      urlToImage:
        "https://techcrunch.com/wp-content/uploads/2022/03/GettyImages-1337404332-1.jpg?resize=1200,802",
      publishedAt: "2022-10-05T09:00:05Z",
      content:
        "Tech giant Google has today announced the launch of a cloud region in South Africa, its first in the continent, playing catch-up to other top providers like Amazon Web Services (AWS) and Microsoft Az… [+4725 chars]",
    },
    //--------------------------------------------------------
    {
      source: {
        id: "the-wall-street-journal",
        name: "The Wall Street Journal",
      },
      author: "Isabel Coles",
      title:
        "Russia Uses Iranian-Made Drones to Strike Military Base Deep Inside Ukraine - The Wall Street Journal",
      description:
        "<ol><li>Russia Uses Iranian-Made Drones to Strike Military Base Deep Inside Ukraine  The Wall Street Journal\r\n</li><li>Ukraine-Russia war: The latest maps and key developments  Yahoo News\r\n</li><li>Ukraine Regains Territory From Russian Forces In Kherson Regi…",
      url: "https://www.wsj.com/articles/russia-uses-iranian-made-drones-to-strike-deep-inside-ukraine-11664965580",
      urlToImage: "https://images.wsj.net/im-637424/social",
      publishedAt: "2022-10-05T11:51:00Z",
      content:
        "Russia used suicide drones to strike a military base deep inside Ukraine on Wednesday, posing a growing challenge for Kyiv as its forces \r\npressed advances in the south and east of the country.The he… [+413 chars]",
    },
    {
      source: {
        id: "the-wall-street-journal",
        name: "The Wall Street Journal",
      },
      author: "Alexander Osipovich and Will Horner",
      title:
        "Dow Surges More Than 800 Points in Second Day of Big Gains - The Wall Street Journal",
      description:
        "<ol><li>Dow Surges More Than 800 Points in Second Day of Big Gains  The Wall Street Journal\r\n</li><li>This stock market comeback is unprecedented by one measure  CNBC\r\n</li><li>Dow rallies more than 1,500 points in two days as fear begins to fade  CNN\r\n</li><…",
      url: "https://www.wsj.com/articles/global-stocks-markets-dow-update-10-04-2022-11664880612",
      urlToImage: "https://images.wsj.net/im-636510/social",
      publishedAt: "2022-10-04T22:45:00Z",
      content:
        "U.S. stocks jumped again on Tuesday, extending a strong start to the fourth quarter and giving relief to investors after weeks of punishing losses.\r\nThe Dow Jones Industrial Average advanced 825.43 p… [+167 chars]",
    },
    {
      source: {
        id: "the-wall-street-journal",
        name: "The Wall Street Journal",
      },
      author: "Stephen Fidler, Matthew Luxmoore and Thomas Grove",
      title:
        "Russia Touts Rapid Mobilization but Faces Dilemma as Ukrainians Advance - The Wall Street Journal",
      description:
        "<ol><li>Russia Touts Rapid Mobilization but Faces Dilemma as Ukrainians Advance  The Wall Street Journal\r\n</li><li>Russia mobilization: Over 200,000 citizens drafted into military since Putin order  Fox News\r\n</li><li>Russian Defence Minister Shoigu says Russ…",
      url: "https://www.wsj.com/articles/russia-touts-rapid-mobilization-but-faces-dilemma-as-ukrainians-advance-11664902438",
      urlToImage: "https://images.wsj.net/im-636606/social",
      publishedAt: "2022-10-04T22:37:00Z",
      content:
        "Russias defense minister said 200,000 men had entered the army as part of a mobilization drive that began last month as the rapid \r\nadvance of Ukrainian forces into Russian-occupied territories outpa… [+415 chars]",
    },
    {
      source: {
        id: "the-wall-street-journal",
        name: "The Wall Street Journal",
      },
      author: "Chip Cutter",
      title:
        "Facebook Parent Meta to Shrink Some Offices as It Adapts to Hybrid Work",
      description:
        "Meta says it will consolidate some spaces and rearrange office layouts to make them livelier.",
      url: "https://www.wsj.com/articles/facebook-parent-meta-to-shrink-some-offices-as-it-adapts-to-hybrid-work-11664904841",
      urlToImage: "https://images.wsj.net/im-621031/social",
      publishedAt: "2022-10-04T18:22:48Z",
      content:
        "Meta Platforms Inc. plans to shrink some of its offices as many of its employees \r\ncontinue to do their jobs from home, the latest large company to reassess its real estate in the hybrid-work era.The… [+256 chars]",
    },
    {
      source: {
        id: "the-wall-street-journal",
        name: "The Wall Street Journal",
      },
      author: "Dean Seal",
      title: "Micron to Spend Up to $100 Billion on Chip Factory in New York",
      description:
        "The chip maker plans to build the largest semiconductor fabrication facility in the U.S., increasing domestic chip supply and creating nearly 50,000 jobs in New York.",
      url: "https://www.wsj.com/articles/micron-to-spend-up-to-100-billion-on-chip-factory-in-new-york-11664893884",
      urlToImage: "https://images.wsj.net/im-636655/social",
      publishedAt: "2022-10-04T15:10:43Z",
      content:
        "Micron Technology Inc. has agreed to invest up to $100 billion to build a massive semiconductor manufacturing campus in upstate New York.\r\nThe chip maker said Tuesday that it has plans to build the l… [+187 chars]",
    },
    {
      source: {
        id: "the-wall-street-journal",
        name: "The Wall Street Journal",
      },
      author: "Austen Hufford",
      title: "U.S. Job Openings Fell in August - WSJ - The Wall Street Journal",
      description:
        "<ol><li>U.S. Job Openings Fell in August - WSJ  The Wall Street Journal\r\n</li><li>Job openings plunged by more than 1.1 million in August  CNBC\r\n</li><li>Job openings unexpectedly plunge in August to lowest level since June 2021  Fox Business\r\n</li><li>U.S. j…",
      url: "https://www.wsj.com/articles/job-openings-hiring-economy-august-2022-11664833689",
      urlToImage: "https://images.wsj.net/im-636192/social",
      publishedAt: "2022-10-04T14:18:00Z",
      content:
        "The number of open jobs in the U.S. economy dropped by 10% and layoffs rose slightly, signs that the labor market is starting to cool. \r\nThe Labor Department said Tuesday that job openings fell to a … [+277 chars]",
    },
    {
      source: {
        id: "the-wall-street-journal",
        name: "The Wall Street Journal",
      },
      author: "Peter Grant",
      title:
        "Chicago to Convert Famous Business District Office Buildings to Apartments - The Wall Street Journal",
      description:
        "The city plans to provide millions of dollars in subsidies to revitalize the LaSalle Street corridor.",
      url: "https://www.wsj.com/articles/chicago-to-convert-famous-business-district-office-buildings-to-apartments-11664833045",
      urlToImage: "https://images.wsj.net/im-635286/social",
      publishedAt: "2022-10-04T12:00:00Z",
      content:
        "Chicago is offering financial help to developers willing to convert aging office towers into residential buildings, a new program that could become a test case for other cities looking to promote the… [+415 chars]",
    },
    {
      source: {
        id: "the-wall-street-journal",
        name: "The Wall Street Journal",
      },
      author: "Laine Higgins",
      title:
        "The 2022 College Football Season Is Setting Records—in Coach Firings - The Wall Street Journal",
      description:
        "<ol><li>The 2022 College Football Season Is Setting Records—in Coach Firings  The Wall Street Journal\r\n</li><li>Wisconsin to pay fired football coach Paul Chryst an $11 million buyout  ESPN\r\n</li><li>Wisconsin fires Paul Chryst as college football races to bo…",
      url: "https://www.wsj.com/articles/college-football-season-coach-firings-11664872294",
      urlToImage: "https://images.wsj.net/im-635840/social",
      publishedAt: "2022-10-04T12:00:00Z",
      content:
        "The 2022 college football season is barely a month old and its already breaking recordsfor coaches getting fired. \r\nA year ago, the sport saw an unprecedented three coaches from the Football Bowl Sub… [+256 chars]",
    },
    {
      source: {
        id: "the-wall-street-journal",
        name: "The Wall Street Journal",
      },
      author: "Yang Jie",
      title:
        "Apple Suppliers Add Manufacturing Sites in U.S., With Focus on California",
      description:
        "Partners of the iPhone maker seek to stay nearby as the pandemic has made travel to China difficult.",
      url: "https://www.wsj.com/articles/apple-suppliers-add-manufacturing-sites-in-u-s-with-focus-on-california-11664884045",
      urlToImage: "https://images.wsj.net/im-636519/social",
      publishedAt: "2022-10-04T11:51:46Z",
      content:
        "Apple suppliers added manufacturing operations close to the Cupertino, Calif.-based tech company in fiscal 2021, a sign of how the pandemic and geopolitics \r\nare beginning to reshape supply chains.Of… [+250 chars]",
    },
    {
      source: {
        id: "the-wall-street-journal",
        name: "The Wall Street Journal",
      },
      author: "Maria Armental",
      title:
        "General Atlantic Expands Tech-Buyout Strategy - The Wall Street Journal",
      description:
        "The growth investor has hired Jonathan Durham to lead its expansion into control-oriented deals alongside Anton Levy",
      url: "https://www.wsj.com/articles/general-atlantic-expands-tech-buyout-strategy-11664877604",
      urlToImage: "https://images.wsj.net/im-636177/social",
      publishedAt: "2022-10-04T10:00:00Z",
      content:
        "Growth-equity pioneer General Atlantic aims to expand its technology buyout business, pointing at a long-term opportunity stemming from plunging publicly traded stocks in the sector. To lead the stra… [+150 chars]",
    },
    {
      source: {
        id: "the-wall-street-journal",
        name: "The Wall Street Journal",
      },
      author: "Akane Otani",
      title:
        "Tech Stocks Face New Blow as Strong Dollar Threatens Earnings - The Wall Street Journal",
      description:
        "Technology stocks are in the midst of their worst selloff in years and  the upheaval in the currencies market might make the rout even worse.",
      url: "https://www.wsj.com/articles/tech-stocks-face-new-blow-as-strong-dollar-threatens-earnings-11664837715",
      urlToImage: "https://images.wsj.net/im-635126/social",
      publishedAt: "2022-10-04T09:30:00Z",
      content:
        "Technology stocks are in the midst of their worst selloff in years. Upheaval in the currencies market might make the rout even worse.\r\nLarge technology companies generate 58% of their revenue outside… [+317 chars]",
    },
  ]);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=6aa6bcedc8d7454581980844552629a2"
    )
      .then((response) => response.json())
      .then((res) => {
        const articles = res.articles;
        // console.log(
        //   "les articles --------------------------------------",
        //   articles
        // );
        setData(articles ? articles : data);
      });
  });
  // console.log("Data :", data);
  //const componentDidMount =
  return (
    // <AppLayout>
    <Card>
      <CardContent>
        <Stack spacing={2} direction="row">
          <Grid container spacing={2} mt={2} ml={2}>
            {data.map((dat) => (
              <MediaCard key={dat.title} news={dat} />
            ))}
          </Grid>
        </Stack>
      </CardContent>
    </Card>

    // </AppLayout>
  );
};

export default Actualites;
