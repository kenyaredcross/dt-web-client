import Nav from "../components/Nav";
import ContactPage from "../components/ContactPage";
import { buildMeta } from "../lib/seo";

export const metadata = buildMeta({
  title: "Contact | Kenya Red Cross Digital Transformation",
  description: "Book a demo, explore a partnership, or get in touch with the Kenya Red Cross Digital Transformation Department.",
  path: "/contact",
});

export default function Page() {
  return (
    <>
      <Nav />
      <ContactPage />
    </>
  );
}
