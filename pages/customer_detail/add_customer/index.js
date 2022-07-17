import React, { useState } from "react";

const AddCustomer = () => {
  const [json, setJson] = useState(false);

  return (
    <>
      <div>add customer</div>
      {json ? 1 : 0}
      <input onFocus={() => setJson(true)} onBlur={() => setJson(false)} />
    </>
  );
};

export default AddCustomer;
