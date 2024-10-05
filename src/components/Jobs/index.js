import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import JobItem from '../JobItem'

import SearchBar from '../SearchBar'

const apiStatusConstants = {
  success: 'SUCCESS',
  pending: 'PENDING',
  failure: 'FAILURE',
}

const EmploymentOption = props => {
  const {item, changeEmploymentInput} = props
  const {label, employmentTypeId} = item
  const onchangeEmploymentInput = event => {
    changeEmploymentInput(event.target.checked, employmentTypeId)
  }
  return (
    <li className="job-filter-container">
      <input
        type="checkbox"
        id={employmentTypeId}
        onChange={onchangeEmploymentInput}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

const SalaryOption = props => {
  const {item, changeRadioInput} = props
  const {label, salaryRangeId} = item
  const onChangeRadioInput = () => {
    changeRadioInput(salaryRangeId)
  }
  return (
    <li className="job-radio-container">
      <input
        type="radio"
        id={salaryRangeId}
        className="job-radio-margin"
        name="amount_range"
        onChange={onChangeRadioInput}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

const LocationOption = props => {
  const {item, changeEmploymentInput} = props
  const {label, locationId} = item
  const onchangeLocation = event => {
    changeEmploymentInput(event.target.checked, locationId)
  }
  return (
    <li className="job-location-container">
      <input type="checkbox" id={locationId} onChange={onchangeLocation} />
      <label htmlFor={locationId}>{label}</label>
    </li>
  )
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const locationsList = [
  {label: 'Hyderabad', locationId: 'Hyderabad'},
  {label: 'Bangalore', locationId: 'Bangalore'},
  {label: 'Chennai', locationId: 'Chennai'},
  {label: 'Delhi', locationId: 'Delhi'},
  {label: 'Mumbai', locationId: 'Mumbai'},
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileApiStatus: apiStatusConstants.pending,
    profileDetails: [],
    jobApiStatus: apiStatusConstants.pending,
    jobDetails: [],
    employmentType: [],
    location: [],
    salaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.fetchProfile()
    this.fetchJobs()
  }

  submitSearchInput = value => {
    this.setState({searchInput: value}, this.fetchJobs)
  }

  changeRadioInput = value => {
    this.setState({salaryRange: value}, this.fetchJobs)
  }

  changeEmploymentInput = (checkValue, value) => {
    if (checkValue) {
      this.setState(
        prev => ({employmentType: [...prev.employmentType, value]}),
        this.fetchJobs,
      )
    } else {
      this.setState(
        prev => ({
          employmentType: prev.employmentType.filter(item => item !== value),
        }),
        this.fetchJobs,
      )
    }
  }

  changeLocationInput = (checkValue, value) => {
    if (checkValue) {
      this.setState(
        prev => ({location: [...prev.location, value]}),
        this.fetchJobs,
      )
    } else {
      this.setState(
        prev => ({
          location: prev.location.filter(item => item !== value),
        }),
        this.fetchJobs,
      )
    }
  }

  fetchProfile = async () => {
    this.setState({profileApiStatus: apiStatusConstants.pending})
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok) {
      const jsonResponse = await response.json()
      const item = jsonResponse.profile_details
      const updatedData = {
        name: item.name,
        profileImageUrl: item.profile_image_url,
        shortBio: item.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiUrl: apiStatusConstants.failure})
    }
  }

  renderProfile = () => {
    const {profileDetails, profileApiStatus} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return (
          <>
            <div className="profile-backg">
              <img
                src={profileImageUrl}
                alt="profile"
                className="job-profile-logo"
              />
              <h1 className="job-profile-heading">{name}</h1>
              <p className="job-profile-subheading">{shortBio}</p>
            </div>
          </>
        )
      case apiStatusConstants.pending:
        return <div className="profile-loader">{this.renderLoader()}</div>
      case apiStatusConstants.failure:
        return (
          <div className="profile-loader">
            <button
              type="button"
              className="profile-retry"
              onClick={this.retryFetchingProfile}
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  fetchJobs = async () => {
    this.setState({jobApiStatus: apiStatusConstants.pending})
    const {employmentType, searchInput, salaryRange, location} = this.state
    const employmentTypeString = employmentType.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const jobUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${salaryRange}&search=${searchInput}`
    const response = await fetch(jobUrl, options)
    if (response.ok) {
      const jsonResponse = await response.json()
      const updatedResponse = jsonResponse.jobs.map(jobItems => ({
        companyLogoUrl: jobItems.company_logo_url,
        employmentType: jobItems.employment_type,
        id: jobItems.id,
        jobDescription: jobItems.job_description,
        location: jobItems.location,
        packagePerAnnum: jobItems.package_per_annum,
        rating: jobItems.rating,
        title: jobItems.title,
      }))
      const filteredResponse = updatedResponse.filter(item =>
        location.includes(item.location),
      )
      this.setState({
        jobDetails: location.length === 0 ? updatedResponse : filteredResponse,
        jobApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobApiStatus: apiStatusConstants.failure})
    }
  }

  renderFirstHalf = () => (
    <>
      {this.renderProfile()}
      <hr className="profile-hr" />
      <div>
        <h1 className="job-filter-heading">Type of Employment</h1>
        <ul className="remove-padding">
          {employmentTypesList.map(item => (
            <EmploymentOption
              key={item.employmentTypeId}
              item={item}
              changeEmploymentInput={this.changeEmploymentInput}
            />
          ))}
        </ul>
      </div>
      <hr className="profile-hr" />
      <div>
        <h1 className="job-filter-heading">Salary Range</h1>
        <ul className="remove-padding">
          {salaryRangesList.map(item => (
            <SalaryOption
              key={item.salaryRangeId}
              item={item}
              changeRadioInput={this.changeRadioInput}
            />
          ))}
        </ul>
      </div>
      <hr className="profile-hr" />
      <div>
        <h1 className="job-filter-heading">Job Location</h1>
        <ul className="remove-padding">
          {locationsList.map(item => (
            <LocationOption
              key={item.locationId}
              item={item}
              changeEmploymentInput={this.changeLocationInput}
            />
          ))}
        </ul>
      </div>
    </>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryFetchingJob = () => {
    this.fetchJobs()
  }

  retryFetchingProfile = () => {
    this.fetchProfile()
  }

  renderJobs = () => {
    const {jobDetails, jobApiStatus} = this.state
    switch (jobApiStatus) {
      case apiStatusConstants.success: {
        if (jobDetails.length !== 0) {
          return (
            <ul className="remove-padding">
              {jobDetails.map(item => (
                <JobItem key={item.id} item={item} />
              ))}
            </ul>
          )
        }
        return (
          <div className="jobs-loader">
            <img
              className="no-jobs"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1>No Jobs Found</h1>
            <p>We couldn't find any jobs. Try other filters.</p>
          </div>
        )
      }
      case apiStatusConstants.failure: {
        return (
          <div className="jobs-loader">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for</p>
            <button
              type="button"
              className="profile-retry"
              onClick={this.retryFetchingJob}
            >
              Retry
            </button>
          </div>
        )
      }
      case apiStatusConstants.pending: {
        return <div className="jobs-loader">{this.renderLoader()}</div>
      }
      default:
        return null
    }
  }

  render() {
    const {location} = this.state
    return (
      <div className="job-page-bg">
        <Header />
        <div className="job-main-bg">
          <div className="job-main-first-half">{this.renderFirstHalf()}</div>
          <div className="job-main-second-half">
            <SearchBar submitSearchInput={this.submitSearchInput} />
            {this.renderJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
