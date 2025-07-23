import * as React from "react";
export const Header = () =>
  React.createElement(
    "header",
    null,
    React.createElement("img", {
      className: "logo",
      src: `${process.env.PUBLIC_URL}/images/woo_tit.svg`,
      alt: "물라쥬 멜랑콜릭"
    })
  );
