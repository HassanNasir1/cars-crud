import Head from 'next/head';
import SupersetDashboard from './apache-superset';

const Home = () => {
  return (
    <div>
      <Head>
        <title>My Next.js App</title>
        {/* Include Superset Embedding Scripts in the head section */}
        <script src='http://localhost:8088/static/assets/common.547c8a2a.js'></script>
        <script src='http://localhost:8088/static/assets/dashboard.547c8a2a.js'></script>
      </Head>

      {/* Use the SupersetDashboard component */}
      <SupersetDashboard />
      <>Home Page</>
    </div>
  )
}

export default Home
