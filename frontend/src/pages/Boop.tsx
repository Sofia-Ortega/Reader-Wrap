import { useEffect, useState } from "react";

function Boop() {
  const [boop, setBoop] = useState<null | string>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://api.readerwrap.com/beep");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.text();
        setBoop(data);
      } catch (error) {
        setBoop("ERROR >(");
        console.error("Error health check:", error);
      }
    })();
  }, []);

  if (boop) {
    return <div>{boop}</div>;
  }

  return <div>Loading... :D</div>;
}

export default Boop;
