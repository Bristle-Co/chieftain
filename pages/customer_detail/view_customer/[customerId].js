import React from "react";
import { useRouter } from "next/router";

const view_customer = () => {
  const router = useRouter();
  const { customerId } = router.query;
  return <>{customerId}</>;
};

export default view_customer;
