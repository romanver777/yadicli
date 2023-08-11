import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { TAppDispatch, TRootState } from "../../store/store";
import { fetchResourses } from "../../store/fetch-resourses-reducer";
import * as selectors from "../../store/selectors";

import Header from "../header/header";
import UploadFiles from "../uploadFiles/uploadFiles";

import folderIcon from "../../style/icons/open-folder.png";
import fileIcon from "../../style/icons/file.png";
import style from "./page-disk.module.scss";
import Cookies from "js-cookie";

const PageDisk = () => {
  const dispatch: TAppDispatch = useDispatch();
  const addedLimit = 20;
  const path = "/";
  const [limit, setLimit] = useState<number>(addedLimit);

  const items = useSelector(selectors.getItems);
  const total = useSelector(selectors.getTotal);
  const loading = useSelector((state: TRootState) => state.data.loading);
  const error = useSelector((state: TRootState) => state.data.error);

  useEffect(() => {
    const token = Cookies.get("token") || "";
    void dispatch(fetchResourses({ token, path, limit }));
  }, [limit]);

  const showMore = () => {
    setLimit(limit + addedLimit);
  };

  const onDone = () => {
    const token = Cookies.get("token") || "";
    void dispatch(fetchResourses({ token, path, limit }));
  };

  return (
    <>
      <Header />
      <main className={style.main}>
        <div className={style.container}>
          {loading && !items && (
            <div className={style.message}>Загружаем..</div>
          )}
          {error && <div className={style.message}>Что-то пошло не так..</div>}
          {items && items.length > 0 && (
            <>
              <UploadFiles onDone={onDone} />
              <div className={style.disk}>
                <p className={style.total}>
                  Показано: {items.length} из {total}
                </p>
                <ul className={style.list}>
                  {items.map((item, i) => {
                    if (item.type === "dir") {
                      return (
                        <li key={i} className={style.listItem}>
                          <img src={folderIcon} width={50} />
                          <p className={style.name}>
                            {item.name.length > 10
                              ? item.name.slice(0, 10) + "..."
                              : item.name}
                          </p>
                        </li>
                      );
                    } else {
                      return (
                        <li
                          key={i}
                          className={style.listItem + " " + style.listItemFile}
                        >
                          <img src={fileIcon} width={38} />
                          <p className={style.name + " " + style.nameFile}>
                            {item.name.length > 8
                              ? item.name.slice(0, 8) + "..."
                              : item.name}
                          </p>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
              {total && total > items.length && (
                <button onClick={showMore} disabled={loading && !!items.length}>
                  {loading && !!items.length ? "Загружаем.." : "Показать ещё"}
                </button>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default PageDisk;
