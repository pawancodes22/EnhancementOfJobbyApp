import './index.css'

import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

class SearchBar extends Component {
  state = {searchValue: ''}

  changeSearchInput = event => {
    this.setState({searchValue: event.target.value})
  }

  onClickSubmitSearchInput = () => {
    const {submitSearchInput} = this.props
    const {searchValue} = this.state
    submitSearchInput(searchValue)
  }

  render() {
    return (
      <div className="search-box-container">
        <input
          type="search"
          placeholder="Search"
          className="search-input-job"
          onChange={this.changeSearchInput}
        />
        {/* eslint-disable-next-line */}
        <button
          type="button"
          data-testid="searchButton"
          className="job-search-button"
          onClick={this.onClickSubmitSearchInput}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }
}
export default SearchBar
