import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "@mantine/core";

interface Props {
  message?: string;
}

export default function AlertFetchError({
  message = "An error occurred while fetching the data.",
}: Props) {
  return (
    <Alert
      color="red"
      icon={<FontAwesomeIcon icon={faCircleXmark} />}
      title="Error"
    >
      {message}
    </Alert>
  );
}
