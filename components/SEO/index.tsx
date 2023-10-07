import Head from "next/head";

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
};

const SEO = ({ title, description, keywords }: SEOProps) => {
  return (
    <Head>
      <title>{title}</title>

      <meta name='description' content={description} />
      <meta name='author' content='' />
      <meta name='keywords' content={keywords} />

      {/* link manifest.json */}
      <link rel='manifest' href='/manifest.json' />

      {/* this sets logo in Apple smartphones. */}
      <link rel='apple-touch-icon' href='/icons/favicon.png' />

      {/* Open Graph SEO */}
      <meta property='og:title' content={title} key='ogtitle' />
      <meta property='og:description' content={description} key='ogdesc' />
      <meta property='og:url' content='' key='ogurl' />
      <meta property='og:locale' content='en-GB' />
      <meta property='og:type' content='website' />
      <meta
        name='image'
        property='og:image'
        content='https://images.unsplash.com/photo-1589010588553-46e8e7c21788?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=960&q=80'
        key='ogimage'
      />
      <meta property='og:site_name' content='' key='ogsitename' />
      <meta property='og:keywords' content={keywords} />
      {/* End of Open Graph SEO */}

      {/* Twitter SEO */}
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:creator' content='' />
      <meta name='twitter:image' content='' />
      {/* End of Twitter SEO */}

      <link rel='icon' href='' />
    </Head>
  );
};

export default SEO;
