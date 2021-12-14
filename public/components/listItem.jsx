import React from 'react'
import PlayButton from './buttons/playButton.jsx'
import '../stylesheets/listItem.css'

export default class ListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <article className="list-item no-select">
        <div className="list-item__section list-item__section--left clickable">
          <span className="list-item__title hide-text-overflow" title={this.props.title}>{this.props.title}</span>
          <span className="list-item__description hide-text-overflow" title={this.props.description}>{this.props.description}</span>
          <span className="list-item__time" title={this.props.time}>{this.props.time}</span>
        </div>
        <div className="list-item__section list-item__section--right">
          <div className="list-item__buttons">
            <PlayButton width={"1.75rem"} height={"1.75rem"}></PlayButton>
          </div>
        </div>
      </article>
    )
  }
}