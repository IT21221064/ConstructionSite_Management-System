import React from "react";

function AddSitePayments() {
  return (
    <>
      <div>
        <h1>Site Payments</h1>
      </div>
      <label>Site Name: </label>
      <br />
      <input type="text" placeholder="insert site name ..." />
      <br />
      <label>Site Stage: </label>
      <br />
      <input type="text" placeholder="insert site stage ..." />
      <br />
      <label>Collected Site Manager: </label>
      <br />
      <input type="text" placeholder="insert site manager..." />
      <br />
      <label>Paid Amount: </label>
      <br />
      <input type="text" placeholder="insert amount ..." />
      <br />
    </>
  );
}

export default AddSitePayments;
