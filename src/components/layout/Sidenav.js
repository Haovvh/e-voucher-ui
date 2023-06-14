
// import { useState } from "react";
import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";

import header from '../../services/header.service'

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const cart = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z"
        fill="#fff"
      ></path>
    </svg>,
  ];

  const heart = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      ></path>
    </svg>,
  ];

  const dollor = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
        fill="#fff"
      ></path>
      <path
        d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
        fill="#fff"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
        fill="#fff"
      ></path>
    </svg>,
  ];

  const tables = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const billing = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const profile = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const signin = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const signup = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      key={0}
    >
      <path
        d="M0,2A2,2,0,0,1,2,0H8a2,2,0,0,1,2,2V8a2,2,0,0,1-2,2H2A2,2,0,0,1,0,8Z"
        transform="translate(4 4)"
        fill={color}
      />
      <path
        d="M2,0A2,2,0,0,0,0,2V8a2,2,0,0,0,2,2V4A2,2,0,0,1,4,2h6A2,2,0,0,0,8,0Z"
        fill={color}
      />
    </svg>,
  ];
  const isAdmin = header.email() && header.role() && header.role() === "admin";
  const isPartner = header.email() && header.role() && header.role() === "partner";
  const isCustomer = header.email() && header.role() && header.role() === "customer";
  const isUser = header.email() && header.role() !== ""

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" /> 
        
        <span><h2>E-Voucher Pro</h2></span>
      </div>
      <hr />
      
      <Menu theme="light" mode="inline">
      {isAdmin &&
        <Menu.Item key="10">
          <NavLink to="/adminpartner">
            <span
              className="icon"
              style={{
                background: page === "adminpartner" ? color : "",
              }}
            >
              {billing}
            </span>
            <span className="label">Partner</span>
          </NavLink>
        </Menu.Item>
      }
      { isAdmin &&       
        <Menu.Item key="11">
          <NavLink to="/adminpromotion">
            <span
              className="icon"
              style={{
                background: page === "adminpromotion" ? color : "",
              }}
            >
              {tables}
            </span>
            <span className="label">Promotion</span>
          </NavLink>
        </Menu.Item>
      }
      { isAdmin &&       
        <Menu.Item key="12">
          <NavLink to="/admincustomer">
            <span
              className="icon"
              style={{
                background: page === "admincustomer" ? color : "",
              }}
            >
              {signin}
            </span>
            <span className="label">Customer</span>
          </NavLink>
        </Menu.Item>
      }
      { isAdmin &&       
        <Menu.Item key="13">
          <NavLink to="/adminvoucher">
            <span
              className="icon"
              style={{
                background: page === "adminvoucher" ? color : "",
              }}
            >
              {heart}
            </span>
            <span className="label">Voucher</span>
          </NavLink>
        </Menu.Item>
      }
      { isAdmin &&       
        <Menu.Item key="14">
          <NavLink to="/admingame">
            <span
              className="icon"
              style={{
                background: page === "admingame" ? color : "",
              }}
            >
              {cart}
            </span>
            <span className="label">Game</span>
          </NavLink>
        </Menu.Item>
      }
      { isAdmin &&       
        <Menu.Item key="15">
          <NavLink to="/adminreport">
            <span
              className="icon"
              style={{
                background: page === "adminreport" ? color : "",
              }}
            >
              {dashboard}
            </span>
            <span className="label">Report</span>
          </NavLink>
        </Menu.Item>
      }
      { isPartner &&       
        <Menu.Item key="21">
          <NavLink to="/partnerpromotion">
            <span
              className="icon"
              style={{
                background: page === "partnerpromotion" ? color : "",
              }}
            >
              {tables}
            </span>
            <span className="label">Promotion</span>
          </NavLink>
        </Menu.Item>
      }
      { isPartner &&       
        <Menu.Item key="22">
          <NavLink to="/partnerstore">
            <span
              className="icon"
              style={{
                background: page === "partnerstore" ? color : "",
              }}
            >
              {dollor}
            </span>
            <span className="label">Store</span>
          </NavLink>
        </Menu.Item>
      }
      { isPartner &&       
        <Menu.Item key="23">
          <NavLink to="/partnervoucher">
            <span
              className="icon"
              style={{
                background: page === "partnervoucher" ? color : "",
              }}
            >
              {heart}
            </span>
            <span className="label">Voucher</span>
          </NavLink>
        </Menu.Item>
      }
      { isPartner &&       
        <Menu.Item key="24">
          <NavLink to="/partnerusevoucher">
            <span
              className="icon"
              style={{
                background: page === "partnerusevoucher" ? color : "",
              }}
            >
              {heart}
            </span>
            <span className="label">Use Voucher</span>
          </NavLink>
        </Menu.Item>
      }
      { isPartner &&       
        <Menu.Item key="25">
          <NavLink to="/partnergame">
            <span
              className="icon"
              style={{
                background: page === "partnergame" ? color : "",
              }}
            >
              {cart}
            </span>
            <span className="label">Game</span>
          </NavLink>
        </Menu.Item>
      }
      { isPartner &&       
        <Menu.Item key="26">
          <NavLink to="/partnerreport">
            <span
              className="icon"
              style={{
                background: page === "partnerreport" ? color : "",
              }}
            >
              {dashboard}
            </span>
            <span className="label">Report</span>
          </NavLink>
        </Menu.Item>
      }
      { isCustomer &&       
        <Menu.Item key="31">
          <NavLink to="/customerpromotion">
            <span
              className="icon"
              style={{
                background: page === "customerpromotion" ? color : "",
              }}
            >
              {tables}
            </span>
            <span className="label">Promotion</span>
          </NavLink>
        </Menu.Item>
      }     
      { isCustomer &&       
        <Menu.Item key="32">
          <NavLink to="/customervoucher">
            <span
              className="icon"
              style={{
                background: page === "customervoucher" ? color : "",
              }}
            >
              {heart}
            </span>
            <span className="label">Voucher</span>
          </NavLink>
        </Menu.Item>
      }  
        
        <Menu.Item key="9" className="menu-item-header" >
          Account Pages
        </Menu.Item>
        { isAdmin &&       
        <Menu.Item key="19">
          <NavLink to="/adminprofile">
            <span
              className="icon"
              style={{
                background: page === "adminprofile" ? color : "",
              }}
            >
              {profile}
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>
      }
      { isPartner &&       
        <Menu.Item key="29">
          <NavLink to="/partnerprofile">
            <span
              className="icon"
              style={{
                background: page === "partnerprofile" ? color : "",
              }}
            >
              {profile}
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>
      }
      { isCustomer &&       
        <Menu.Item key="39">
          <NavLink to="/customerprofile">
            <span
              className="icon"
              style={{
                background: page === "customerprofile" ? color : "",
              }}
            >
              {profile}
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>
      }
      { isUser && 
        <Menu.Item key="40">
        <NavLink to="/signin">
          <span
            className="icon"
            style={{
              background: page === "logout" ? color : "",
            }}
          >
            {signup}
          </span>
          <span className="label">Logout</span>
        </NavLink>
      </Menu.Item>
      } 
      </Menu>
    </>
  );
}

export default Sidenav;
