import '../styles/globals.css'
import Layout from '../components/layout/Layout';
import { Fragment } from 'react';
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  return (
          <Fragment>  
            <Head>
                <title>React Meetups</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active React meetups"
                ></meta>
            </Head>  
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Fragment>
        )
}

export default MyApp
