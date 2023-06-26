// Essentials
import { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import SEO from '../next-seo.config';

// Contexts
import { SettingsProvider } from "../contexts/settingsContext";

// Contexts: Auth
import { SessionProvider } from "next-auth/react";

// Components
import Layout from "../components/layout/Layout";
import withLoading from "../components/withLoading";

// GraphQL
import { ISettings } from "../utils/models/settings";
import { IProject } from "../utils/models/project";
import { ISkills } from "../utils/models/skills";
import { getSettings } from "../utils/services/settings";

// Styles
import "../styles/all.scss";

export interface AllProps {
  project?: IProject | null;
  projects?: IProject[] | [];
  spotlightProject?: IProject | null;
  settings?: ISettings | null;
  skills?: ISkills | null;
}

export default function App({ Component, pageProps, settings }: AppProps & { settings: ISettings }): JSX.Element {

  const ComponentWithLoading = withLoading(Component);

  return (
    <SettingsProvider settings={settings}>
      <SessionProvider session={pageProps.session}>
        <DefaultSeo {...SEO} />
        <Layout>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <ComponentWithLoading {...pageProps} />
        </Layout>
      </SessionProvider>
    </SettingsProvider>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const { Component, ctx } = appContext;

  const settings = await getSettings();
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, settings };
};