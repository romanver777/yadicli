import React, { useEffect } from "react";

const Token = () => {
  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js"
    );
    script.setAttribute("id", "yaSendScript");
    head?.appendChild(script);

    const suggestToken = () => {
      (window as any).YaSendSuggestToken("https://ydisk.netlify.app", {
        flag: true,
      });
    };
    const addedScript = document.getElementById("yaSendScript");
    addedScript?.addEventListener("load", suggestToken);

    return () => addedScript?.removeEventListener("load", suggestToken);
  }, []);

  return <div />;
};

export default Token;
