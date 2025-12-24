const Notification = ({ message }) => {
  // Si no hay mensaje, no renderizar nada
  if (message === null) {
    return null;
  }

  // Detectar errores
  if (
    message.includes("removed") ||
    message.includes("failed") ||
    message.includes("validation")
  ) {
    return <div className="message-fail">{message}</div>;
  }

  // Detectar éxito
  if (message.startsWith("Added") || message.startsWith("Updated")) {
    return <div className="message-success">{message}</div>;
  }

  // Fallback: Si llega un mensaje que no encaja en ninguno, mostrarlo neutro o como error
  return <div className="message-fail">{message}</div>;
};

export default Notification;
