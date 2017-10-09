import React, { Component } from 'react'
import css from './EventList.css'

class Event extends Component {
    render() {
      const { title, id, selectItem, deleteEvent } = this.props
      return (
        <li className="event-list-item"
          key={id}
          onClick={() => selectItem(id)}>
          {title} <span
                    className="close close-event"
                    onClick={(e) => {
                        e.preventDefault()
                        deleteEvent(id)
                    }}>X</span>
        </li>
      )
    }
}

class AddEventButton extends Component {
  render() {
    const { addEvent } = this.props
    return (
      <button onClick={addEvent}>Add Event</button>
    )
  }
}

class EventList extends Component {
    render() {
        let count = -1
        const { name, data, selectItem, addEvent, deleteEvent } = this.props
        const eventComponents = data.map(event => {
            count++
                   return <Event {...event}
                            id={count}
                            selectItem={selectItem}
                            deleteEvent={deleteEvent} />
        })
        return (
            <div>
                <h4 className="map-title">{name}</h4>
                <ul>
                    {eventComponents}
                  <li><AddEventButton addEvent={addEvent} /></li>
                </ul>
            </div>
        );
    }
}

export default EventList;
