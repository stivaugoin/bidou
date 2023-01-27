import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showNotification } from "@mantine/notifications";

export default function notification(
  type: "error" | "success",
  message?: string
) {
  switch (type) {
    case "error":
      showNotification({
        color: "red",
        icon: <FontAwesomeIcon icon={faTimes} />,
        message: message || "Operation failed",
      });
      break;
    case "success":
      showNotification({
        color: "teal",
        icon: <FontAwesomeIcon icon={faCheck} />,
        message: message || "Operation successful",
      });
      break;
  }
}
