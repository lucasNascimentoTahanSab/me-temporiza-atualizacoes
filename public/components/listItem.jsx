import React from 'react'
import PlayButton from './buttons/playButton.jsx'
import EditButton from './buttons/editButton.jsx'
import '../stylesheets/listItem.css'

const colorBackgroundDark = '#453E69'

export default class ListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <article className="list-item">
        <div className="list-item__section fill-three-quarters">
          <span className="list-item__title hide-text-overflow" title={this.props.title}>{this.props.title}</span>
          <span className="list-item__description hide-text-overflow" title={this.props.description}>{this.props.description}</span>
          <span className="list-item__time" title={this.props.time}>{this.props.time}</span>
        </div>
        <div className="list-item__section">
          <div className="list-item__buttons">
            <PlayButton width={"1.75rem"} height={"1.75rem"} fill={colorBackgroundDark}></PlayButton>
            <EditButton width={"1.5rem"} height={"1.5rem"} fill={colorBackgroundDark}></EditButton>
          </div>
        </div>
      </article>
    )
  }
}