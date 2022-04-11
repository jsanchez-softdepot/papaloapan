import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ auth, header, children, breadcrumbs }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  return (
    <React.Fragment>
      <ol className="breadcrumb page-breadcrumb">
        {breadcrumbs &&
          breadcrumbs.length > 0 &&
          breadcrumbs.map((item, index) => {
            return (
              <li key={index.toString()} className="breadcrumb-item">
                <Link href={item.url}>{item.name}</Link>
              </li>
            );
          })}
        {/* <li className="breadcrumb-item active">Dashboard</li> */}
        <li className="position-absolute pos-top pos-right d-none d-sm-block">
          <span className="js-get-date"></span>
        </li>
      </ol>
      <div className="subheader">
        <h1 className="subheader-title">
          <i className={`subheader-icon fal fa-${header.icon}`}></i> {header.title}
          &nbsp;
          <span className="fw-300">{header.subtitle}</span>
        </h1>
      </div>
      {children}

      <Toaster />
    </React.Fragment>
  );
}
