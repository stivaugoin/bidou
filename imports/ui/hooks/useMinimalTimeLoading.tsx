import React from "react";

export function useMinimalTimeLoading(minimalTime = 1000): Array<boolean> {
  const [isTimeElapsed, setIsTimeElapsed] = React.useState(false);

  React.useEffect(() => {
    if (!isTimeElapsed) {
      setTimeout(() => {
        setIsTimeElapsed(true);
      }, minimalTime);
    }
  }, [isTimeElapsed, minimalTime, setIsTimeElapsed]);

  return [!isTimeElapsed];
}
