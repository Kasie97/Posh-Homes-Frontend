import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggle } from "../store/reducers/modalSlice";
import { styled } from "styled-components";
import { FaHouse } from "react-icons/fa6";
import { BiPlusCircle } from "react-icons/bi";
import { MdViewList } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import logo from "../assets/Images/logo.svg";

type Name = {
  name: string;
  link: string;
  icon: React.ReactNode;
};

// Defined the icons separately
const dashboardIcon = <FaHouse />;
const addUnitIcon = <BiPlusCircle />;
const viewUnitIcon = <MdViewList />;
const settingsIcon = <IoSettingsOutline />;
const logoutIcon = <IoIosLogOut />;

const handleLogout = () => {
  localStorage.removeItem("token"); // Fix typo here
  window.location.href = "/";
};

const sidebarNav: Name[] = [
  { name: "Dashboard", link: "/dashboard/main", icon: dashboardIcon },
  { name: "Add Unit", link: "/dashboard/Add-unit", icon: addUnitIcon },
  { name: "View Units", link: "/dashboard/view-unit", icon: viewUnitIcon },
  { name: "Settings", link: "/dashboard/setting", icon: settingsIcon },
  { name: "Logout", link: "/dashboard/logout", icon: logoutIcon },
];

const SidebarSection = () => {
  const dispatch = useDispatch();

  return (
    <>
      <img src={logo} alt="logo" />
      <div style={{ padding: "20px 0" }}>
        {sidebarNav.map((nav, i) => (
          <StyledNavLink
            to={nav.link}
            key={i}
            style={({ isActive }) => ({ color: isActive ? "#3538CD" : "" })}
            onClick={() => {
              if (nav.name === "Logout") {
                handleLogout(); // Call handleLogout for logout link
              }
              dispatch(toggle());
            }}
          >
            {nav.icon}
            {nav.name}
          </StyledNavLink>
        ))}
      </div>
    </>
  );
};

export default SidebarSection;

const StyledNavLink = styled(NavLink)`
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #101828;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 10px;

  i {
    margin-right: 10px;
  }
  &:hover {
    color: #3538cd;
  }
`;
