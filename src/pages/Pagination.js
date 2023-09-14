import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Button } from "@mui/material";
import CustomizedTables from "./component/tableMui";
import axios from "axios";
const getPosts = async (page) => {
  const perPage = 10;
  let data = await axios.get(
    `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`
  );
  return data;
};
const headCell = ["Beer Name", "Tagline", "Ph", "Volume", "first_brewed"];
export default function Pagination() {
  const [page, setPage] = useState(1);

  const query =
    useQuery({
      queryKey: ["post", page],
      queryFn: () => getPosts(page),
      keepPreviousData: true,
    });
    if (query.isLoading) return <i><p>isLoading</p></i>
    if (query.isError) return <i><p>Error:{query.error}</p></i>
    if (query.isFetching) return <i><p>Fetching Data..</p></i>
    
  return (
    <section style={{ margin: "0", padding: "1rem" }}>
      <i>
        <b>Pagination using Mui Table and React Query.</b>
      </i>
      <div style={{ float: "right", padding: "1rem" }}>
        <Button
          variant="outlined"
          onClick={() => {
            page !== 1 ? setPage(page - 1) : setPage(page);
          }}
        >
          Previous
        </Button>
        {"  "}
        <Button
          variant="outlined"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next
        </Button>
        <br />
        <i>Page {page}</i>
      </div>
      {query.data && (
        <CustomizedTables
          rows={query.data.data}
          headCell={headCell}
        ></CustomizedTables>
      )}
    </section>
  );
}
