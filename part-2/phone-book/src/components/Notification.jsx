const Notification = ({ message }) => {
  if (message && message.includes("removed")) {
    return <div className="message-fail">{message}</div>;
  } else {
    if (
      message &&
      (message.startsWith("Added") || message.startsWith("Updated"))
    ) {
      return <div className="message-success">{message}</div>;
    }
  }
};
export default Notification;
