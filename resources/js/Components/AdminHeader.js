import React from "react";

const AdminHeader = () => {
  return (
    <React.Fragment>
      <header className="page-header" role="banner">
        <div className="page-logo">
          <a href="#" className="page-logo-link press-scale-down d-flex align-items-center position-relative" data-toggle="modal" data-target="#modal-shortcut">
            <img src="/vendor/admin/img/logo.png" alt="SmartAdmin WebApp" aria-roledescription="logo" />
            <span className="page-logo-text mr-1">SmartAdmin WebApp</span>
            <span className="position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"></span>
            <i className="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i>
          </a>
        </div>
        <div className="hidden-md-down dropdown-icon-menu position-relative">
          <a href="#" className="header-btn btn js-waves-off" data-action="toggle" data-class="nav-function-hidden" title="Hide Navigation">
            <i className="ni ni-menu"></i>
          </a>
          <ul>
            <li>
              <a href="#" className="btn js-waves-off" data-action="toggle" data-class="nav-function-minify" title="Minify Navigation">
                <i className="ni ni-minify-nav"></i>
              </a>
            </li>
            <li>
              <a href="#" className="btn js-waves-off" data-action="toggle" data-class="nav-function-fixed" title="Lock Navigation">
                <i className="ni ni-lock-nav"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="hidden-lg-up">
          <a href="#" className="header-btn btn press-scale-down" data-action="toggle" data-class="mobile-nav-on">
            <i className="ni ni-menu"></i>
          </a>
        </div>
        {/* <div className="search">
          <form className="app-forms hidden-xs-down" role="search" action="page_search.html" autoComplete="off">
            <input type="text" id="search-field" placeholder="Search for anything" className="form-control" tabIndex="1" />
            <a
              href="#"
              onClick={(e) => {
                return false;
              }}
              className="btn-danger btn-search-close js-waves-off d-none"
              data-action="toggle"
              data-class="mobile-search-on"
            >
              <i className="fal fa-times"></i>
            </a>
          </form>
        </div> */}
        <div className="ml-auto d-flex">
          <div className="hidden-sm-up">
            <a href="#" className="header-icon" data-action="toggle" data-class="mobile-search-on" data-focus="search-field" title="Search">
              <i className="fal fa-search"></i>
            </a>
          </div>
          <div>
            <a href="#" data-toggle="dropdown" title="drlantern@gotbootstrap.com" className="header-icon d-flex align-items-center justify-content-center ml-2">
              <img src="/vendor/admin/img/demo/avatars/avatar-admin.png" className="profile-image rounded-circle" alt="Dr. Codex Lantern" />
              <span className="ml-1 mr-1 text-truncate text-truncate-header hidden-xs-down">Me</span>
              <i className="ni ni-chevron-down hidden-xs-down"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-animated dropdown-lg">
              <div className="dropdown-header bg-trans-gradient d-flex flex-row py-4 rounded-top">
                <div className="d-flex flex-row align-items-center mt-1 mb-1 color-white">
                  <span className="mr-2">
                    <img src="/vendor/admin/img/demo/avatars/avatar-admin.png" className="rounded-circle profile-image" alt="Dr. Codex Lantern" />
                  </span>
                  <div className="info-card-text">
                    <div className="fs-lg text-truncate text-truncate-lg">Dr. Codex Lantern</div>
                    <span className="text-truncate text-truncate-md opacity-80">drlantern@gotbootstrap.com</span>
                  </div>
                </div>
              </div>
              <div className="dropdown-divider m-0"></div>
              <a href="#" className="dropdown-item" data-action="app-fullscreen">
                <span data-i18n="drpdwn.fullscreen">Fullscreen</span>
                <i className="float-right text-muted fw-n">F11</i>
              </a>
              {/* <a href="#" className="dropdown-item" data-action="app-print">
                <span data-i18n="drpdwn.print">Print</span>
                <i className="float-right text-muted fw-n">Ctrl + P</i>
              </a> */}
              <div className="dropdown-divider m-0"></div>
              <a className="dropdown-item fw-500 pt-3 pb-3" href="page_login.html">
                <span data-i18n="drpdwn.page-logout">Logout</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default AdminHeader;
