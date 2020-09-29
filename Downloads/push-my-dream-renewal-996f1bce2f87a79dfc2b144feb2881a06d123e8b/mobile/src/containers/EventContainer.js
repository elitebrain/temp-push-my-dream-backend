import React, { useState, useEffect } from "react";

import { noticeApi } from "shared/api";
import EventComponent from "components/Event/EventComponent";

const limit = 10;
const type = "event";

const EventContainer = () => {
  const [eventPinList, setEventPinList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [eventCount, setEventCount] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    _getEventList();
  }, []);
  const _getEventList = (offset = 0) => {
    setLoading(true);
    noticeApi.get("/", { params: { offset, limit, type } }).then((res) => {
      if (res.data) {
        console.log("res.data", res.data);
        setEventPinList(res.data.eventPinList);
        setEventList((prevState) => prevState.concat(res.data.eventList));
        setEventCount(res.data.eventCount);
        setLoading(false);
      }
    });
  };
  return (
    <EventComponent
      eventPinList={eventPinList}
      eventList={eventList}
      eventCount={eventCount}
      getEventList={_getEventList}
      loading={loading}
    />
  );
};

export default EventContainer;
