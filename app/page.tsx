import Nav from "./components/Nav";
import HomeView from "./components/HomeView";
import TiltCards from "./components/TiltCards";
import { buildMeta } from "./lib/seo";

export const metadata = buildMeta({
  title: "Kenya Red Cross | Digital Transformation",
  path: "/",
});

export default function Page() {
  return (
    <>
      <Nav />
      <HomeView />
      <TiltCards />
    </>
  );
}
