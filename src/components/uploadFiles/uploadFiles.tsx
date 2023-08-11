import React, { useState } from "react";

import style from "./uploadFiles.module.scss";
import Cookies from "js-cookie";

type TUrl = {
  href: string;
  method: string;
  operation_id: string;
  templated: boolean;
};

type TProps = {
  onDone: () => void;
};

const UploadFiles = ({ onDone }: TProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const uploadFile = (file: File) => {
    const token = Cookies.get("token") || "";
    const path = "/";

    const formData = new FormData();
    formData.append("file", file);

    return fetch(
      `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${path}${file.name}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `OAuth ${token}`,
        },
      }
    )
      .then((data) => data.json())
      .then((res: TUrl) =>
        fetch(res.href, {
          method: "PUT",
          body: formData,
        })
      )
      .catch((err: Error) => setError(err.message));
  };

  const uploadFiles = () => {
    setLoading(true);
    const uploadPromises = files.map((file) => uploadFile(file));

    Promise.all(uploadPromises)
      .then(() => {
        setLoading(false);
        setDone(true);
        setFiles([]);
        onDone();
      })
      .catch((err: Error) => setError(err.message));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (done) setDone(false);
    setFiles(Array.from((e.target as HTMLInputElement).files ?? []));
  };
  const handleClick = () => uploadFiles();

  return (
    <div className={style.upload}>
      <div className={style.inputWr}>
        <input
          type="file"
          id="file"
          multiple
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e)
          }
        />
        <label htmlFor="file" className={style.label}>
          Выберите файлы
        </label>
        {files.length === 1 && (
          <span className={style.addedFiles}>{files[0].name}</span>
        )}
        {files.length > 1 && (
          <span className={style.addedFiles}>Выбрано: {files.length}</span>
        )}
        {error && <span className={style.addedFiles}>{error}</span>}
        {done && <span className={style.addedFiles}>Файлы загружены</span>}
      </div>

      <button onClick={handleClick} disabled={!files.length || loading}>
        {loading ? "Загружаем" : "Загрузить"}
      </button>
    </div>
  );
};

export default UploadFiles;
