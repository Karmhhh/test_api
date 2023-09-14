import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
const fetchPage = async ({ pageParam = 1 }) => {
  let pp = 5;
  return await axios.get(
    `https://api.punkapi.com/v2/beers?per_page=${pp}&page=${pageParam}`
  );
};
export default function InfQ() {
  const {
    isLoading,
    isError,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["users"], fetchPage, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 10) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) return <i><p>isLoading..</p></i>;
  if (isError) return <i><p>isError..</p></i>;

  return (
    <section>
      <i>
        <b>React Query: Use Infinite Query</b>
      </i>
      {console.log(data?.pages)}
      {data?.pages &&
        data.pages.map((group, i) => {
          return (
            <ul key={i}>
              <i>{i}</i>
              {group.data.map((beer) => {
                return (
                  <li key={beer.id}>
                    {beer.name}
                    {"  "}
                    {beer.ph}
                  </li>
                );
              })}
            </ul>
          );
        })}

      {/* <Button variant="outlined" style={{margin:10}} disabled={!hasNextPage} onClick={fetchNextPage}>
       { isFetchingNextPage ? 'Fetching Next Page' : ' ShowMore' }
      </Button> */}

      <LoadingButton
        size="small"
        disabled={!hasNextPage}
        onClick={fetchNextPage}
        loading={isFetchingNextPage}
        loadingIndicator="Loading…"
        variant="outlined"
      >
        <span>Show More</span>
      </LoadingButton>
    </section>
  );
}
