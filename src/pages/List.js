import axios from "axios";
import { useQuery } from "react-query";
import { useMemo } from "react";

const getUsers = async () => {
  return await axios.get("https://api.github.com/users");
};
export default function List() {
  const memoizedVal = useMemo(() => getUsers, []);
  const query = useQuery("users", getUsers);
  if (query.isLoading) return <i><p>isLoading</p></i>
  if (query.isError) return <i><p>Error:{query.error}</p></i>
  if (query.isFetching) return <i><p>Fetching Data..</p></i>
  
  
  return (
    <section style={{ margin: "auto", width: "200px", padding: "0.5rem" }}>
      {query.data &&
        query.data.data.map((el) => (
          <section key={el.id}>
            <ul>
              <li>
                {" "}
                <b>{el.id + " " + el.login}</b>
              </li>
              <i>
                {" "}
                {"Type: " + el.type}
                <br />
                {" Admin User: "}
                {el.site_admin ? "Yes" : "No"}
              </i>
            </ul>
          </section>
        ))}
    </section>
  );
}
