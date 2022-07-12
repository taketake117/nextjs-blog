import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import utilStyle from "../styles/utils.module.css"
import { getPostsData } from '../lib/post'

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();//id, title, date, thumbnail
  console.log(allPostsData);

  return{
    props: {
      allPostsData,
    },
  };
}

export default function Home({allPostsData}) {
  return <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyle.headingMd}>
      <p>
        私はSESの会社で働いているエンジニアで、案件の一つで電子教材の開発に携わってから
        Web開発に興味を持ち転職活動をしています。
        　開発経験は約1年でまだまだ知らないことが多いですが少しづつ学んでいる途中です。
      </p>
    </section>

    <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
      <h2>私の情報について</h2>

    <div className={styles.grid}>
      {allPostsData.map(({id,title, date, thumbnail}) => (
        <article className={styles.homeItem} key={id}>
         <Link href={`/posts/${id}`}>
          <img src={`${thumbnail}`} 
          className={styles.thumbnailImage} />
         </Link>
         <Link href="/">
          <a className={utilStyle.boldText}>
            {title}
          </a>
         </Link>
       </article>
      ))}

    </div>
    </section>
    
  </Layout>
}
