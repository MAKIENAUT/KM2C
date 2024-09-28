import Main from "@/components/Main";
import { getPosts } from "../../_actions/postAction";

export default async function Home() {
  const res = await getPosts();
  console.log("Response from getPosts:", res);

  return (
    <Main variant="primary">
      <h1>HELLO WORLD</h1>
      {res.errMsg ? (
        <p>Error: {res.errMsg}</p>
      ) : (
        <div>
          <p>Posts retrieved: {res.data ? res.data.length : 0}</p>
          {res.data && res.data.length > 0 ? (
            <ul>
              {res.data.map((post) => (
                <li key={post._id}>
                  {post.msg}
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      )}
    </Main>
  );
}
