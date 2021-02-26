import styles from "./App.sass";
import "./reset.sass";
import Main from "./Components/Main/";
import Header from "./Components/Header";
import { YMaps } from "react-yandex-maps";
import classnames from "classnames";

export const API_KEY = "d3e0c9ae-f48f-4bf9-9ca8-73ab1f081655";

const cx = classnames.bind(styles);

function App() {
  return (
    <YMaps
      query={{
        apikey: API_KEY,
      }}
    >
      <div className={cx("App")}>
        <Header />
        <Main />
      </div>
    </YMaps>
  );
}

export default App;
