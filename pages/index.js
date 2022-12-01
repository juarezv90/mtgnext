import Head from 'next/head'
import Search from '../components/Search'
import SearchResults from '../components/SearchResults'
export default function Home() {
  return (
    <div>
      <Head>
        <title>The Crammed Mox</title>
        <meta name="description" content="The next best MTG card building application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search />
      <SearchResults />
    </div>
  )
}
