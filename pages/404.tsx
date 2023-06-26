// Essentials
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";

const PageNotFound: NextPage = () => {
  return (
    <div className="p-notFound">
      <NextSeo noindex={true} />
      <h1>page not found :/</h1>
      <h3>
        the page you are searching is not found.
        <br/>
        make sure the url doesn&apos;t have any typo and is accurate.
      </h3>
      <Link href="/" className="priButton">
        go to home page
      </Link>
    </div>
  );
};

export default PageNotFound;
