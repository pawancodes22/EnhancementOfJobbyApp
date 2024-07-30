import {FaStar, FaBriefcase} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJob = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = item
  return (
    <li className="similar-item-container">
      <div className="icon-header-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="jd-heading">Description</h1>
      <p className="jd-space-occupy">{jobDescription}</p>
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
      </div>
    </li>
  )
}
export default SimilarJob
