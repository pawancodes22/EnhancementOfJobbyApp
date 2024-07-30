import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {FaStar, FaBriefcase, FaExternalLinkAlt} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'

import Header from '../Header'

import SimilarJob from '../SimilarJob'

import SkillItem from '../SkillItem'

const apiStatusConstants = {
  success: 'SUCCESS',
  pending: 'PENDING',
  failure: 'FAILURE',
}

class JobDetailedView extends Component {
  state = {
    jobDetails: [],
    similarJobs: [],
    jobDetailsApiStatus: apiStatusConstants.pending,
  }

  componentDidMount() {
    this.fetchItemDetails()
  }

  getIdInUrl = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    return id
  }

  fetchItemDetails = async () => {
    this.setState({jobDetailsApiStatus: apiStatusConstants.pending})
    const itemDetailsUrl = `https://apis.ccbp.in/jobs/${this.getIdInUrl()}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(itemDetailsUrl, options)
    if (response.ok) {
      const jsonResponse = await response.json()
      const oldJobDetails = jsonResponse.job_details
      const oldSimilarJobs = jsonResponse.similar_jobs
      const jobDetails = {
        companyLogoUrl: oldJobDetails.company_logo_url,
        companyWebsiteUrl: oldJobDetails.company_website_url,
        employmentType: oldJobDetails.employment_type,
        id: oldJobDetails.id,
        jobDescription: oldJobDetails.job_description,
        lifeAtCompany: {
          description: oldJobDetails.life_at_company.description,
          imageUrl: oldJobDetails.life_at_company.image_url,
        },
        location: oldJobDetails.location,
        packagePerAnnum: oldJobDetails.package_per_annum,
        rating: oldJobDetails.rating,
        skills: oldJobDetails.skills.map(item => ({
          name: item.name,
          imageUrl: item.image_url,
        })),
        title: oldJobDetails.title,
      }
      const similarJobs = oldSimilarJobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        rating: item.rating,
        title: item.title,
      }))
      this.setState({
        jobDetails,
        similarJobs,
        jobDetailsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobDetailsApiStatus: apiStatusConstants.failure})
    }
  }

  renderDetailedView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails

    return (
      <>
        <div className="jd-sub-main-bg">
          <div className="icon-header-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-image"
            />
            <div>
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <FaStar className="yellow-star" />
                <p className="job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-salary-container">
            <div className="show-in-row">
              <div className="location-job-container">
                <MdLocationOn />
                <p className="side-para">{location}</p>
              </div>
              <div className="location-job-container">
                <FaBriefcase />
                <p className="side-para">{employmentType}</p>
              </div>
            </div>
            <p className="side-para">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="heading-link-container">
            <h1 className="jd-heading">Description</h1>
            <a href={companyWebsiteUrl} className="visit-link-style">
              Visit
              <FaExternalLinkAlt className="visit-icon-style" />
            </a>
          </div>
          <p>{jobDescription}</p>
          <h1 className="jd-heading margin-up">Skills</h1>
          <ul className="skill-items-container">
            {skills.map(item => (
              <SkillItem id={item.id} item={item} />
            ))}
          </ul>
          <h1 className="jd-heading margin-up">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">
              {lifeAtCompany.description}
            </p>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>
        <h1 className="jd-heading margin-up similar-job-heading">
          Similar Jobs
        </h1>
        <ul className="similar-job-items-container">
          {similarJobs.map(item => (
            <SimilarJob key={item.name} item={item} />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryFetchingJobDetails = () => {
    this.fetchItemDetails()
  }

  renderFailure = () => (
    <div className="jd-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something went wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>

      <button
        type="button"
        className="profile-retry"
        onClick={this.retryFetchingJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderPage = () => {
    const {jobDetailsApiStatus} = this.state
    switch (jobDetailsApiStatus) {
      case apiStatusConstants.success: {
        return this.renderDetailedView()
      }
      case apiStatusConstants.pending: {
        return (
          <div className="jd-failure-view-container">{this.renderLoader()}</div>
        )
      }
      case apiStatusConstants.failure: {
        return this.renderFailure()
      }
      default: {
        return null
      }
    }
  }

  render() {
    return (
      <div className="jd-page-bg">
        <Header />
        <div className="jd-main-bg">{this.renderPage()}</div>
      </div>
    )
  }
}

export default JobDetailedView
