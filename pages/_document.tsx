import * as React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

import globalStyles from '../styles/index.less';

export default class MyDocument extends Document {
  // static async getInitialProps(ctx: any) {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   return { ...initialProps };
  // }
  public render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
