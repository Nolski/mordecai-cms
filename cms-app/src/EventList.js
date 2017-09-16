import React, { Component } from 'react'
import css from './EventList.css'

class Event extends Component {
    render() {
        const { title, id, selectItem } = this.props
        return <li className="event-list-item"
                   key={id}
                   onClick={() => selectItem(id)}>{title}</li>
    }
}

class EventList extends Component {
    render() {
        let count = -1
        const { name, data, selectItem } = this.props
        const eventComponents = data.map(event => {
            count++
            return <Event {...event} id={count} selectItem={selectItem} />
        })
        return (
            <div>
                <h4 className="map-title">{name}</h4>
                <ul>
                    {eventComponents}
                </ul>
            </div>
        );
    }
}

export default EventList;
