import Main from "@/components/Main";
import { getPosts } from "../../_actions/postAction";

export default async function Home() {
  const res = await getPosts();
  console.log("Response from getPosts:", res);

  return (
    <>
      <div className="h-screen" /> {/* Spacer for the hero section */}
      <Main variant="primary" className="min-h-screen flex-col">
        <h2 className="mb-4 text-4xl">Welcome to Our Site</h2>
        <p className="text-xl">Explore our amazing features and services.</p>
      </Main>
    </>
  );
}
