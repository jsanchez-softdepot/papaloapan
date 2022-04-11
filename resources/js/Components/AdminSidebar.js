import React from "react";
import { Link } from "@inertiajs/inertia-react";

const AdminSidebar = () => {
  return (
    <React.Fragment>
      <aside className="page-sidebar">
        <div className="page-logo">
          <a href="#" className="page-logo-link press-scale-down d-flex align-items-center position-relative">
            <img src="/vendor/admin/img/logo.png" alt="SmartAdmin WebApp" aria-roledescription="logo" />
            <span className="page-logo-text mr-1">Papaloapan</span>
            <span className="position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"></span>
            <i className="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i>
          </a>
        </div>
        <nav id="js-primary-nav" className="primary-nav" role="navigation">
          <div className="nav-filter">
            <div className="position-relative">
              <input type="text" id="nav_filter_input" placeholder="Filter menu" className="form-control" tabIndex="0" />
              <a
                href="#"
                onClick={(e) => {
                  return false;
                }}
                className="btn-primary btn-search-close js-waves-off"
                data-action="toggle"
                data-class="list-filter-active"
                data-target=".page-sidebar"
              >
                <i className="fal fa-chevron-up"></i>
              </a>
            </div>
          </div>
          {/* <div className="info-card">
            <img src="/vendor/admin/img/demo/avatars/avatar-admin.png" className="profile-image rounded-circle" alt="Dr. Codex Lantern" />
            <div className="info-card-text">
              <a href="#" className="d-flex align-items-center text-white">
                <span className="text-truncate text-truncate-sm d-inline-block">Dr. Codex Lantern</span>
              </a>
              <span className="d-inline-block text-truncate text-truncate-sm">Toronto, Canada</span>
            </div>
            <img src="/vendor/admin/img/card-backgrounds/cover-2-lg.png" className="cover" alt="cover" />
            <a
              href="#"
              onClick={(e) => {
                return false;
              }}
              className="pull-trigger-btn"
              data-action="toggle"
              data-class="list-filter-active"
              data-target=".page-sidebar"
              data-focus="nav_filter_input"
            >
              <i className="fal fa-angle-down"></i>
            </a>
          </div> */}
          <ul id="js-nav-menu" className="nav-menu">
            <li className="active">
              <Link href={route("admin.index")} title="Dashboard" data-filter-tags="dashboard" preserveState>
                <i className="fal fa-globe"></i>
                <span className="nav-link-text">Dashboard</span>
              </Link>
            </li>
            <li>
              <a href="#" title="Usuarios" data-filter-tags="usuarios roles">
                <i className="fal fa-users"></i>
                <span className="nav-link-text">Usuarios</span>
              </a>
              <ul>
                <li>
                  <Link href={route("admin.users.index")} title="Usuarios" data-filter-tags="usuarios" preserveState>
                    <span className="nav-link-text">Usuarios</span>
                  </Link>
                </li>
                <li>
                  <a href="#" title="Roles" data-filter-tags="roles">
                    <span className="nav-link-text">Roles</span>
                  </a>
                </li>
              </ul>
            </li>
            {/* <li className="nav-title">Navigation Title</li> */}
            {/* <li>
              <a href="#" title="Category" data-filter-tags="category">
                <i className="fal fa-file"></i>
                <span className="nav-link-text" data-i18n="nav.category">
                  Category
                </span>
              </a>
              <ul>
                <li>
                  <a href="#" title="Menu child" data-filter-tags="utilities menu child">
                    <span className="nav-link-text" data-i18n="nav.utilities_menu_child">
                      Sub-category
                    </span>
                  </a>
                  <ul>
                    <li>
                      <a href="#" title="Sublevel Item" data-filter-tags="utilities menu child sublevel item">
                        <span className="nav-link-text" data-i18n="nav.utilities_menu_child_sublevel_item">
                          Sublevel Item
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#" title="Another Item" data-filter-tags="utilities menu child another item">
                        <span className="nav-link-text" data-i18n="nav.utilities_menu_child_another_item">
                          Another Item
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li> */}
          </ul>
          <div className="filter-message js-filter-message bg-success-600"></div>
        </nav>
        <div className="nav-footer shadow-top">
          <a
            href="#"
            onClick={(e) => {
              return false;
            }}
            data-action="toggle"
            data-class="nav-function-minify"
            className="hidden-md-down"
          >
            <i className="ni ni-chevron-right"></i>
            <i className="ni ni-chevron-right"></i>
          </a>
          {/* <ul className="list-table m-auto nav-footer-buttons">
                            <li>
                                <a href="#" data-toggle="tooltip" data-placement="top" title="Chat logs">
                                    <i className="fal fa-comments"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" data-toggle="tooltip" data-placement="top" title="Support Chat">
                                    <i className="fal fa-life-ring"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" data-toggle="tooltip" data-placement="top" title="Make a call">
                                    <i className="fal fa-phone"></i>
                                </a>
                            </li>
                        </ul> */}
        </div>
      </aside>
    </React.Fragment>
  );
};

export default AdminSidebar;
