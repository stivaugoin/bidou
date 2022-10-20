import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "@mantine/core";

export default function AlertFetchError() {
  return (
    <Alert
      color="red"
      icon={<FontAwesomeIcon icon={faCircleXmark} />}
      title="Error"
    >
      An error occurred while fetching the data.
    </Alert>
  );
}
