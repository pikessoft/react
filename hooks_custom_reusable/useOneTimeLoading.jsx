import { useEffect, useState } from "react";

const useOneTimeLoading = (loading) => {
  const [oneTimeLoading, setOneTimeLoading] = useState(true);

  useEffect(() => {
    if (oneTimeLoading && !loading) {
      setOneTimeLoading(false);
    }
  }, [loading]);

  return oneTimeLoading;
};

export default useOneTimeLoading;
