import Head from 'next/head';
import SupersetDashboard from './apache-superset';

const Home = () => {
  return (
    <div>
      <Head>
        <title>My Next.js App</title>
 
      </Head>

      {/* Use the SupersetDashboard component */}
      <SupersetDashboard />
      <>Home Page</>
    </div>
  )
}

export default Home
