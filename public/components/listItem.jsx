import React from 'react'
import PlayButton from './playButton.jsx'
import EditButton from './editButton.jsx'
import '../stylesheets/listItem.css'

const colorBackgroundDark = '#453E69'

export default class ListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <article className="list-item">
        <div className="list-item__section fill-three-quarters list-item--left">
          <span className="list-item__title">{this.props.title}</span>
          <span className="list-item__description">{this.props.title}</span>
          <span className="list-item__time">{this.props.title}</span>
        </div>
        <div className="list-item__section">
          <div className="list-item__buttons">
            <PlayButton width={"0.625rem"} height={"1rem"} fill={colorBackgroundDark}></PlayButton>
            <EditButton></EditButton>
          </div>
        </div>
      </article>
    )
  }
}