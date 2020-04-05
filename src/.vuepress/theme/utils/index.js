import moment from "moment";
moment.locale("de");

export const ByDate = (order = "DESC") => {
  return (pageA, pageB) => {
    const dateA = moment(pageA.frontmatter.date.start);
    const dateB = moment(pageB.frontmatter.date.start);

    if (order === "DESC") {
      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
      if (dateA === dateB) return 0;
    } else if (order === "ASC") {
      if (dateA > dateB) return 1;
      if (dateA < dateB) return -1;
      if (dateA === dateB) return 0;
    } else {
      throw new Error("unexpected order!");
    }
  };
};

export const ByPriority = (order = "DESC") => {
  return (pageA, pageB) => {
    const priorityA = pageA.frontmatter.priority || 0;
    const priorityB = pageB.frontmatter.priority || 0;

    if (order === "DESC") {
      if (priorityA > priorityB) return -1;
      if (priorityA < priorityB) return 1;
      if (priorityA === priorityB) return 0;
    } else if (order === "ASC") {
      if (priorityA > priorityB) return 1;
      if (priorityA < priorityB) return -1;
      if (priorityA === priorityB) return 0;
    } else {
      throw new Error("unexpected order!");
    }
  };
};

export const OnlyYear = year => {
  return page => {
    const pageYear = moment(page.frontmatter.date).format("YYYY");
    return pageYear == year;
  };
};

export const EventPages = $site => {
  return $site.pages.filter(page => page.frontmatter.layout === "EventPage");
};

export const EVENT_STATE = {
  upcomming: "upcomming",
  active: "active",
  archived: "archived",
  canceled: "canceled"
};

export const REGESTRATION_STATE = {
  soonAvailableWithCountdown: "soonAvailableWithCountdown",
  soonAvailable: "soonAvailable",
  availableWithDeadline: "availableWithDeadline",
  availableButDeadlineExpired: "availableButDeadlineExpired",
  available: "available",
  unavailableFullyBooked: "unavailableFullyBooked",
  unavailableDeadlineExpired: "unavailableDeadlineExpired",
  unavailableCanceled: "unavailableCanceled",
  unavailable: "unavailable"
};

export const isRegestrationAvailable = regestrationState => {
  return [
    REGESTRATION_STATE.availableWithDeadline,
    REGESTRATION_STATE.availableButDeadlineExpired,
    REGESTRATION_STATE.available
  ].includes(regestrationState);
};

export const getRegestrationState = ({
  start,
  signupStart,
  signupEnd,
  isFullyBooked,
  isCanceled
}) => {
  const today = moment();

  if (isCanceled) return REGESTRATION_STATE.unavailableCanceled;
  if (today.isAfter(start)) return REGESTRATION_STATE.unavailable;
  if (isFullyBooked) return REGESTRATION_STATE.unavailableFullyBooked;

  if (signupStart && today.isBefore(signupStart)) {
    return REGESTRATION_STATE.soonAvailableWithCountdown;
  }

  if (signupEnd && today.isAfter(signupEnd, "day")) {
    return REGESTRATION_STATE.availableButDeadlineExpired;
  }

  if (signupEnd) return REGESTRATION_STATE.availableWithDeadline;
  return REGESTRATION_STATE.available;
};
