import React, { Fragment } from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import { getEntityByAttribute } from '@teleporthq/cms-mappers/caisy'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Dynamic Interactions Analyst</title>
          <meta
            property="og:title"
            content="test-page - Dynamic Interactions Analyst"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_kdcyer) => (
            <Fragment>
              <h1>Heading</h1>
              <h1>{context_kdcyer?.id}</h1>
            </Fragment>
          )}
          params={{
            projectId: '3bd8eb33-2aaa-4620-87bf-d7ccd04d0245',
            query:
              'query MyQuery{TypeWithRichText{_meta{createdAt updatedAt id}title content{json connections{__typename  }}}}',
            attribute: 'id',
            id: '2',
          }}
          initialData={props.contextKdcyerProp}
          persistDataDuringLoading={true}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextKdcyerProp = await getEntityByAttribute({
      ...context?.params,
      projectId: '3bd8eb33-2aaa-4620-87bf-d7ccd04d0245',
      query:
        'query MyQuery{TypeWithRichText{_meta{createdAt updatedAt id}title content{json connections{__typename  }}}}',
      attribute: 'id',
      id: '2',
    })
    return {
      props: {
        contextKdcyerProp: contextKdcyerProp?.data?.[0],
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      props: {},
      revalidate: 60,
    }
  }
}
