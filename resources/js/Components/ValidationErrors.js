import React from "react";

export default function ValidationErrors({ errors }) {
  return (
    Object.keys(errors).length > 0 && (
      <div className="alert alert-warning my-3">
        <div className="font-medium text-red-600">Se identificaron los siguientes problemas:</div>

        <ul className="mt-3 list-disc list-inside text-sm text-red-600">
          {Object.keys(errors).map(function (key, index) {
            return <li key={index}>{errors[key]}</li>;
          })}
        </ul>
      </div>
    )
  );
}
