import './index.css'

import {FaStar, FaBriefcase} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'

import {Link} from 'react-router-dom'

const JobItem = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = item
  return (
    <li className="job-container">
      <Link to={`/jobs/${id}`} className="link-style">
        <div className="icon-header-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <h1 className="description-heading">Description</h1>
        <p>{jobDescription}</p>
      </Link>
    </li>
  )
}
export default JobItem
