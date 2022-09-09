import { useQuery } from "react-query";
const urlBase =
  "https://newsapi.org/v2/everything?q=tesla&from=2022-08-08&sortBy=publishedAt&apiKey=54e1ef58241145089e7186184f30d913";

export const queryKey = ["news.findAll"];
export const queryFn = async () => await fetch(urlBase).then((res) => res.json());
export const useNews = () => {
  const { data, isSuccess, ...others } = useQuery(queryKey, queryFn);
  console.log("succ", isSuccess);
  console.log("query", data);
  let newsObj = data || {};
  return { newsObj, ...others };
};
