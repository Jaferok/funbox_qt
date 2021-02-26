import React from "react";
import styles from "./style.sass";
import classnames from "classnames";

const cx = classnames.bind(styles);

const Header = () => {
  return (
    <header className={cx("header")}>
      <p className={cx("header__text")}>Funbox QT</p>
    </header>
  );
};

export default Header;
