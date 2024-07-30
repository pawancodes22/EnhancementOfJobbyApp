import './index.css'

import {Link} from 'react-router-dom'

import Header from '../Header'

const Home = props => {
  const findJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <div className="home-page-bg">
      <Header />
      <div className="home-main-bg">
        <div className="main-page-content-container">
          <h1 className="main-page-main-heading">
            Find The Job That Fits Your Life
          </h1>
          <p className="main-page-para">
            Millions of people are searching for jobs, salary, information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs" className="link-style">
            <button type="button" className="find-job-button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Home
