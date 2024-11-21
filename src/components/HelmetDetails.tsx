import { Helmet } from "react-helmet-async";

export default function HelmetDetails({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Helmet>
      <title>
        True Skin {title !== "" ? "|" : ""} {title}
      </title>
      <meta name="description" content={description} />
      <link rel="canonical" href={href} />
    </Helmet>
  );
}
