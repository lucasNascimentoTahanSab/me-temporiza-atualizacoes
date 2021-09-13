import React from 'react'

export default class ReloadButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1263 9.18594L19.2 12.2788L32.3519 8.99692L22.8773 0L21.6732 4.02061C9.51015 5.09525 0 14.5073 0 25.9592C0 38.132 10.7452 48 24 48C37.2548 48 48 38.132 48 25.9592L48 25.9592H42.6667V25.9592C42.6667 35.4269 34.3093 43.1021 24 43.1021C13.6907 43.1021 5.33334 35.4269 5.33334 25.9592C5.33334 17.7112 11.6759 10.8238 20.1263 9.18594Z" fill="#741384" />
      </svg>
    )
  }
}