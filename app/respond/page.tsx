import { Suspense } from "react";

import TokenChecker from "@/features/respond/TokenChecker";

const Respond = () => {
  return (
    <Suspense>
      <TokenChecker />
    </Suspense>
  );
};

export default Respond;
