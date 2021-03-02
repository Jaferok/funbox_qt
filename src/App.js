import styles from "./App.sass";
import "./reset.sass";
import Main from "./Components/Main/";
import Header from "./Components/Header";
import classnames from "classnames";

const cx = classnames.bind(styles);

function App() {
  return (
    <div className={cx("App")}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
