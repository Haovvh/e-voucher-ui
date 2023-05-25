
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import Game from "./pages/games/Game";
import Partner from "./pages/partners/Partner";
import Promotion from "./pages/promotion/Promotion";

import Customer from "./pages/customers/Customer";
import Voucher from "./pages/vouchers/Voucher";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route  path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <Main>
          <Route exact path="/customer" component={Customer} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/promotion" component={Promotion} />
          <Route exact path="/partner" component={Partner} />
          <Route exact path="/voucher" component={Voucher} />
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/profile" component={Profile} />
          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
