import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import moment from 'moment';

import css from "./App.css";
import EventList from "./EventList.js";
import EventDetail from "./EventDetail.js";
import { updateTimeMap } from "./api/timemap";

const emptyEvent = {
  description: "",
  end: "",
  location: "",
  media: "",
  media_credit: "",
  metadata: "",
  place: "",
  pos: 0,
  source: "",
  source_url: "",
  start: "",
  title: "New Event",
  video: "",
}

class Description extends Component {
  render() {
    const { text, place, census, notes, media, sources } = this.props
    const cList = census && census.split('\n').map((c, i) => <p key={i}>{c}</p>)
    const sList = sources && sources.split('\n').map((s, i) => <p key={i}>{s}</p>)
    const mList = media && media.split('\n').map((m, i) => <p key={i}>{m}</p>)
    const noteList = notes && notes.split('\n').map((n, i) => <p key={i}>{n}</p>)
    const textList = text.split('\n').map((n, i) => <p key={i}>{n}</p>)
    return (
      <div>
        {place && <p><strong>Location:</strong> {place}</p>}
        <p>{textList}</p>
        {census &&
        <div><strong>Census Data:</strong><br/>
           {cList}</div>}
        {notes && <p><strong>Notes:</strong><br />
          {noteList}</p>}

        {sources && <div><strong>Additional Sources:</strong><br/>
           {sList}</div>}
        {media && <div><strong>Additional Media:</strong><br/>
           {mList}</div>}
      </div>
    )
  }
}
Description.propTypes = {
  text: PropTypes.string.isRequired,
  place: PropTypes.string,
  census: PropTypes.string,
  notes: PropTypes.string,
  media: PropTypes.string,
  sources: PropTypes.string,
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      timemaps: [],
      selectedMap: null
    };
  }

  componentDidMount() {
    try {
      const cookie = document.cookie.split(';').find(a => a.trim().startsWith('csrftoken='))
      this.csrfToken = cookie.split('csrftoken=')[1];
    } catch (e) {
      console.error('CSRF Token not found in cookies, please log out')
    }

    fetch("/api/v1/timemap/1/")
           .then(response => {
              response.json().then(json => {
                this.setState({ timemaps: [json] });
              })
           });
  }
  componentDidUpdate() {
    Alert.closeAll();
  }

  _sortMap(map) {
    map.data = map.data.sort((a, b) => {
      const aSort = parseInt(a.sort) || 0
      const bSort = parseInt(b.sort) || 0
      if (moment.utc(a.start).diff(moment.utc(b.start)) === 0) {
        return aSort - bSort
      }
      return moment.utc(a.start).diff(moment.utc(b.start))
    })
    return map
  }

  _updateMap(newMap) {
    updateTimeMap(newMap, this.csrfToken)
      .then(response => {
        if (!response.ok) {
          throw(response);
        }
        response.json().then(json => {
          this.setState({ timemaps: [json] });
          Alert.success('Information saved', {
            position: 'top-right',
            effect: 'scale',
            beep: false,
            timeout: 2000,
            onClose: Alert.closeAll(),
          });
        })
      })
      .catch((e) => {
        Alert.error('Error saving information', {
          position: 'top-right',
          effect: 'scale',
          beep: false,
          timeout: 2000,
          onClose: Alert.closeAll(),
        });
      });

  }
  _getDescription(event) {
    let a = document.createElement('div')

    ReactDOM.render(
      <Description
        place={event.place}
        census={event.description_census}
        notes={event.description_notes}
        media={event.description_media}
        sources={event.description_sources}
        text={event.description_text} />,
      a
    )

    return a.outerHTML
  }

  saveItem(event, pos) {
    let newMap = this.state.timemaps[0]
    Alert.closeAll();
    event.description = this._getDescription(event)

    newMap.data[pos] = event
    newMap = this._sortMap(newMap)
    this._updateMap(newMap)
  }
  addEvent() {
    let newMap = this.state.timemaps
    newMap[0].data.push(emptyEvent)
    this.setState({timemaps: newMap}, () => this.selectItem(newMap[0].data.length - 1))
  }
  deleteEvent(pos) {
    if (!window.confirm("This will totally delete this event and it will be gone forever if you click OK. So totally press cancel if you don't want this to happen!")) {
      return
    }

    let newMap = this.state.timemaps[0]
    Alert.closeAll();
    newMap.data.splice(pos, 1)
      this.setState({timemaps: newMap})
    this._updateMap(newMap)
  }
  selectItem(id) {
    const map = this.state.timemaps[0]
    this.setState({ selectedMap: {...map.data[id], pos: id} })
  }

  render() {
    const event = this.state.timemaps[0];
    if (!event) {
      return null;
    }
    return (
      <div id="footer-wrapper" className="footerWrapper" ref="asdf">
        <header className="style1">
          <h2>TimeMapper CMS</h2>
        </header>
        <div className="row">
          <div className="3u">
            <EventList {...event}
              selectItem={this.selectItem.bind(this)}
              addEvent={this.addEvent.bind(this)}
              deleteEvent={this.deleteEvent.bind(this)}
            />
          </div>
          <div className="9u">
            <EventDetail onSubmit={this.saveItem.bind(this)}
              selectedMap={this.state.selectedMap}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
