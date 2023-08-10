import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import { useSelector, useDispatch } from "react-redux";
import * as selectors from "../../store/selectors";
import { setAuth } from "../../store/auth-reducer";

import PrivateRoute from "../private-route/private-route";
import Token from "../token/token";

import style from "./app.module.scss";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectors.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token === undefined) {
      (window as any).YaAuthSuggest.init(
        {
          client_id: "0f5e2ea359834517b4419ac4f30dbfc8",
          response_type: "token",
          redirect_uri: "https://ydisk.netlify.app/token",
        },
        "https://ydisk.netlify.app",
        {
          parentId: "app__loginBtn--ovkK6",
          view: "button",
          buttonSize: "m",
          buttonView: "main",
          buttonTheme: "light",
          buttonBorderRadius: "10",
          buttonIcon: "ya",
        }
      )
        .then(({ handler }: { handler: any }) => handler())
        .then((data: any) => {
          Cookies.set("token", data.access_token, {
            expires: +data.expires_in,
          });

          dispatch(setAuth());
          navigate("/disk");
        })
        .catch((error: Error) => console.log("error", error));
    } else {
      dispatch(setAuth());
      navigate("/disk");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/disk"
          element={
            <PrivateRoute auth={auth}>
              <div>disk</div>
            </PrivateRoute>
          }
        />
        <Route path="/token" element={<Token />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!auth && <div id={style.loginBtn} />}
    </>
  );
};

export default App;
