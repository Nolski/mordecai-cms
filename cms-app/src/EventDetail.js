import { Form, Input, Textarea } from 'formsy-react-components';

import css from "./EventDetail.css";
import React from "react";

export default ({selectedMap, onSubmit}) => {
    if (!selectedMap) return null

    const { title, description, location, start, end,
            media, media_credit, source, source_url, place, video,
            metadata, pos, description_census, description_notes,
            description_media, description_sources, sort } = selectedMap
    let description_text = selectedMap.description_text
    if (!description_text) {
      description_text = description
    }
    return (
      <Form layout="vertical" onSubmit={(data) => { onSubmit(data, pos) }}>
        <Input
          name="title"
          value={title || ""}
          required
          label="Title" />
        <h4>Description</h4>
        <Textarea
          rows={3}
          cols={40}
          value={description_text || ""}
          name="description_text"
          label="Description Text"
        />
        <Textarea
          rows={3}
          cols={40}
          value={description_census || ""}
          name="description_census"
          label="Description Census Data"
        />
        <Textarea
          rows={3}
          cols={40}
          value={description_notes|| ""}
          name="description_notes"
          label="Description Notes"
        />
        <Textarea
          rows={3}
          cols={40}
          value={description_media|| ""}
          name="description_media"
          label="Additional Media Links"
        />

        <Input
          name="location"
          value={location || ""}
          required
          help="Format like: '49.038315, 28.107158'"
          label="GIS/ Lat & Long" />
        <Input
          name="place"
          value={place || ""}
          label="Modern Spellings/Names" />
        <Input
          name="start"
          value={start|| ""}
          type="date"
          required
          label="Start Date" />
        <Input
          name="sort"
          value={sort || 0}
          label="Date Sort" />
        <Input
          name="end"
          value={end || ""}
          type="date"
          label="End date" />
        <Input
          name="media"
          value={media || ""}
          type="url"
          label="Diary Scan URL" />
        <Textarea
          rows={3}
          cols={40}
          value={description_sources|| ""}
          name="description_sources"
          label="Additional Sources"
        />
        <input type="submit" defaultValue="Submit" />
      </Form>
    )
}
