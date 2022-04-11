import React from "react";

export default function FlashAlert({ message, type }) {
  return <div className={`alert alert-${type} my-3 py-3`}>{message}</div>;
}
