/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { getUserInfo } from "../../../../../utils/user.util";
export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  let userInfo = getUserInfo();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"
      } menu-item-open menu-item-not-hightlighted`
      : "";
  };

  return (
    <>


      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/dashboard",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">

              <img src="media/allIconsForTable/dashboard.svg" />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        {/* <li
            className={`menu-item ${getMenuItemActive("/menu", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/menu">
              <span className="svg-icon menu-icon">

                <img src="media/allIconsForTable/user.svg" />
              </span>
              <span className="menu-text">Menu</span>
            </NavLink>
          </li> */}
        {
          userInfo?.menu[0]?.menu?.map((data, key) => {
            return (
              data?.name === 'Course Selection' ? (
                <li
                  className={`menu-item menu-item-submenu ${getMenuItemActive(
                    "/courseselection",
                    true
                  )}`}
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                >
                  <NavLink
                    className="menu-link menu-toggle"
                    to="/vehiclecategory"
                  >
                    <span className="svg-icon menu-icon">
                      <img src="media/allIconsForTable/course.svg" />
                    </span>
                    <span className="menu-text">Course Selection</span>
                    <i className="menu-arrow" />
                  </NavLink>
                  <div className="menu-submenu ">
                    <i className="menu-arrow" />
                    <ul className="menu-subnav">

                      <li
                        className={`menu-item menu-item-submenu  ${getMenuItemActive(
                          "/vehiclecategory",
                          false
                        )}`}
                        aria-haspopup="true"
                        data-menu-toggle="hover"
                      >
                        <NavLink
                          className="menu-link"
                          to="/vehiclecategory"
                        >
                          <i className="menu-bullet menu-bullet-dot">
                            <span />
                          </i>
                          <span className="menu-text">Vehicle Category</span>
                        </NavLink>
                      </li>
                      <li
                        className={`menu-item menu-item-submenu  ${getMenuItemActive(
                          "/vehiclesubcategory",
                          false
                        )}`}
                        aria-haspopup="true"
                        data-menu-toggle="hover"
                      >
                        <NavLink
                          className="menu-link"
                          to="/vehiclesubcategory"
                        >
                          <i className="menu-bullet menu-bullet-dot">
                            <span />
                          </i>
                          <span className="menu-text">Vehicle Sub Category</span>
                        </NavLink>
                      </li>
                      <li
                        className={`menu-item menu-item-submenu ${getMenuItemActive(
                          "/coursetype",
                          false
                        )}`}
                        aria-haspopup="true"
                        data-menu-toggle="hover"
                      >
                        <NavLink
                          className="menu-link"
                          to="/coursetype"
                        >
                          <i className="menu-bullet menu-bullet-dot">
                            <span />
                          </i>
                          <span className="menu-text">Course Type</span>
                        </NavLink>
                      </li>
                      <li
                        className={`menu-item menu-item-submenu ${getMenuItemActive(
                          "/coursecategory",
                          false
                        )}`}
                        aria-haspopup="true"
                        data-menu-toggle="hover"
                      >
                        <NavLink
                          className="menu-link"
                          to="/coursecategory"
                        >
                          <i className="menu-bullet menu-bullet-dot">
                            <span />
                          </i>
                          <span className="menu-text">Course Category</span>
                        </NavLink>
                      </li>

                      <li
                        className={`menu-item menu-item-submenu ${getMenuItemActive(
                          "/coursename",
                          false
                        )}`}
                        aria-haspopup="true"
                        data-menu-toggle="hover"
                      >
                        <NavLink
                          className="menu-link"
                          to="/coursename"
                        >
                          <i className="menu-bullet menu-bullet-dot">
                            <span />
                          </i>
                          <span className="menu-text">Course Name</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : data?.name === 'Reports' ? <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/reports",
                  true
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink
                  className="menu-link menu-toggle"
                  to="/reports"
                >
                  <span className="svg-icon menu-icon">
                    <img src="media/allIconsForTable/course.svg" />
                  </span>
                  <span className="menu-text">Reports</span>
                  <i className="menu-arrow" />
                </NavLink>
                <div className="menu-submenu ">
                  <i className="menu-arrow" />
                  <ul className="menu-subnav">

                    <li
                      className={`menu-item menu-item-submenu  ${getMenuItemActive(
                        "/timeslot-addition",
                        false
                      )}`}
                      aria-haspopup="true"
                      data-menu-toggle="hover"
                    >
                      <NavLink
                        className="menu-link"
                        to="/timeslot-addition"
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Timeslot</span>
                      </NavLink>
                    </li>
                    <li
                      className={`menu-item menu-item-submenu  ${getMenuItemActive(
                        "/registered-user",
                        false
                      )}`}
                      aria-haspopup="true"
                      data-menu-toggle="hover"
                    >
                      <NavLink
                        className="menu-link"
                        to="/registered-user"
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Registered User</span>
                      </NavLink>
                    </li>
                    <li
                      className={`menu-item menu-item-submenu ${getMenuItemActive(
                        "/payment-history",
                        false
                      )}`}
                      aria-haspopup="true"
                      data-menu-toggle="hover"
                    >
                      <NavLink
                        className="menu-link"
                        to="/payment-history"
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Payment</span>
                      </NavLink>
                    </li>
                    {/* <li
                      className={`menu-item menu-item-submenu ${getMenuItemActive(
                        "/question-category",
                        false
                      )}`}
                      aria-haspopup="true"
                      data-menu-toggle="hover"
                    >
                      <NavLink
                        className="menu-link"
                        to="/question-category"
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Question Catgory</span>
                      </NavLink>
                    </li> */}

                    {/* <li
                      className={`menu-item menu-item-submenu ${getMenuItemActive(
                        "/question-addition",
                        false
                      )}`}
                      aria-haspopup="true"
                      data-menu-toggle="hover"
                    >
                      <NavLink
                        className="menu-link"
                        to="/question-addition"
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Question</span>
                      </NavLink>
                    </li> */}
                    <li
                      className={`menu-item menu-item-submenu ${getMenuItemActive(
                        "/feedback-records",
                        false
                      )}`}
                      aria-haspopup="true"
                      data-menu-toggle="hover"
                    >
                      <NavLink
                        className="menu-link"
                        to="/feedback-records"
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Feedback</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li> : <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  `/${data?.name.toLowerCase().replace('', '-')}`,
                  true
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink className="menu-link" to={`/${data?.name === "Policy-& Terms" ? data?.name.trim().toLowerCase().replace('&', '-').trim() : data?.name.trim().toLowerCase().replace(' ', '-')}`}>
                  <span className="svg-icon menu-icon">

                    <img src={`media/allIconsForTable/${data?.name === "Policy-& Terms" ? data?.name.trim().toLowerCase().replace('&', '-').trim() : data?.name.trim().toLowerCase().replace(' ', '-')}.svg`} />
                  </span>
                  <span className="menu-text">{data?.name}</span>
                </NavLink>
              </li>

            )
          })
        }
      </ul>
    </>
  );
}
