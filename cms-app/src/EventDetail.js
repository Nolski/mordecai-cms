import { Form, Input, Textarea } from 'formsy-react-components';
import React, { Component } from "react";

export default ({selectedMap, onSubmit}) => {
    if (!selectedMap) return null

    const { title, description, location, start, end,
            media, media_credit, source, source_url, place, video,
            metadata, pos } = selectedMap
    return (
        <Form layout="vertical" onSubmit={(data) => { onSubmit(data, pos) }}>
            <Input
                name="title"
                value={title || ""}
                required
                label="Title" />
            <Textarea
                rows={3}
                cols={40}
                value={description || ""}
                name="description"
                label="Description"
            />
            <Input
                name="location"
                value={location || ""}
                required
                help="Format like: '49.038315, 28.107158'"
                label="Location" />
            <Input
                name="start"
                value={start|| ""}
                type="date"
                required
                label="Start Date" />
            <Input
                name="end"
                value={end || ""}
                type="date"
                label="End date" />
            <Input
                name="media"
                value={media || ""}
                type="url"
                label="Media URL" />
            <Input
                name="media_credit"
                value={media_credit || ""}
                label="Media Credit" />
            <Input
                name="source"
                value={source || ""}
                label="Source" />
            <Input
                name="source_url"
                value={source_url || ""}
                type="url"
                label="Source URL" />
            <Input
                name="place"
                value={place || ""}
                label="Location Name" />
            <Textarea
                rows={3}
                cols={40}
                value={metadata || ""}
                name="metadata"
                label="Metadata"
            />
            <Input
                name="video"
                value={video|| ""}
                label="Video URL" />
            <input type="submit" defaultValue="Submit" />
        </Form>
    )
}
