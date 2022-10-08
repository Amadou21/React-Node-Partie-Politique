import { useQuery } from "react-query";
const urlBase =
  "https://newsapi.org/v2/everything?q=tesla&from=2022-09-04&sortBy=publishedAt&apiKey=6aa6bcedc8d7454581980844552629a2";
export const queryKey = ["news.findAll"];
export const queryFn = async () =>
  await fetch(urlBase).then((res) => res.json());
export const useNews = () => {
  const { data, isSuccess, ...others } = useQuery(queryKey, queryFn);
  console.log("succ", isSuccess);
  console.log("query", data);
  let newsObj = data || {};
  return { newsObj, ...others };
};
