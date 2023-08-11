import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { useDispatch } from "react-redux";
import { removeAuth } from "../../store/auth-reducer";
import { clearData } from "../../store/fetch-resourses-reducer";

import style from "./header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    Cookies.remove("token");
    dispatch(removeAuth());
    dispatch(clearData());
    navigate("/");
  };

  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.title}>Яндекс disk upload</div>
        <button onClick={logOut} className={style.btn}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
