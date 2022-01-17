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
      {/* begin::Menu Nav */}
      {userInfo?.user?.role?.roleName === "superadmin" && (
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Dashboard*/}
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
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
              />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>

        <li
          className={`menu-item ${getMenuItemActive("/user", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/user">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
              />
            </span>
            <span className="menu-text">User</span>
          </NavLink>
        </li>

        <li
            className={`menu-item menu-item-submenu ${getMenuItemActive(
              "/",
              true
            )}`}
            aria-haspopup="true"
            data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                />
              </span>
              <span className="menu-text">Course Selection</span>
              <i className="menu-arrow" />
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow" />
              <ul className="menu-subnav">
                {/* Inputs */}
                {/*begin::2 Level*/}
                <li
                  className={`menu-item menu-item-submenu  ${getMenuItemActive(
                    "/courseselection/vehiclecategory",
                    false
                  )}`}
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                >
                  <NavLink className="menu-link" to="/courseselection/vehiclecategory">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Vehicle Category</span>
                  </NavLink>
                </li>

                <li
                  className={`menu-item menu-item-submenu  ${getMenuItemActive(
                    "/courseselection/coursetype",
                    false
                  )}`}
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                >
                  <NavLink
                    className="menu-link"
                    to="/courseselection/coursetype"
                  >
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Course Type</span>
                  </NavLink>
                </li>

                <li
                  className={`menu-item menu-item-submenu  ${getMenuItemActive(
                    "/courseselection/coursename",
                    false
                  )}`}
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                >
                  <NavLink
                    className="menu-link"
                    to="/courseselection/coursename"
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
{/* 
        <li
          className={`menu-item ${getMenuItemActive("/inventory", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/inventory">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
              />
            </span>
            <span className="menu-text">Inventory</span>
          </NavLink>
        </li> */}

        {/* <li
          className={`menu-item ${getMenuItemActive("/marketPlace", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/marketPlace">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
              />
            </span>
            <span className="menu-text">Market Place</span>
          </NavLink>
        </li> */}


        {/* <li
          className={`menu-item ${getMenuItemActive("/order", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/order">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
              />
            </span>
            <span className="menu-text">Order</span>
          </NavLink>
        </li> */}


        {/* <li
          className={`menu-item ${getMenuItemActive("/properties", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/properties">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
              />
            </span>
            <span className="menu-text">Properties</span>
          </NavLink>
        </li> */}
      </ul>
      ) }
      {/* end::Menu Nav */}
    </>
  );
}
