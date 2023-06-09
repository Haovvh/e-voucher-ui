
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";



import PartnerPromotion from "./pages/partner/partner.promotion";
import PartnerStore from "./pages/partner/partner.store";
import PartnerGame from "./pages/partner/partner.game";
import PartnerVoucher from "./pages/partner/partner.voucher";
import PartnerProfile from "./pages/partner/partner.profile";
import PartnerReport from "./pages/partner/partner.report";

import AdminPromotion from "./pages/admin/admin.promotion";
import AdminPartner from "./pages/admin/admin.partner";
import AdminCustomer from "./pages/admin/admin.customer";
import AdminGame from "./pages/admin/admin.game";
import AdminVoucher from "./pages/admin/admin.voucher";
import AdminProfile from "./pages/admin/admin.profile";
import AdminReport from "./pages/admin/admin.report";

import CustomerPromotion from "./pages/customer/customer.promotion";
import CustomerProfile from "./pages/customer/customer.profile";
import CustomerVoucher from "./pages/customer/customer.voucher";

import Game2048 from "./pages/Game2048";
import GamePokemon from "./pages/GamePokeMon";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Logout from "./pages/Logout";
import Main from "./components/layout/Main";
import Page404 from "./pages/page404";
import NotFound from "./pages/pageNotfound";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import header from "./services/header.service";

function App() {
  const isUser = header.email() && header.role() 
  const isAdmin = header.email() && header.role() && header.role() === "admin";
  const isPartner = header.email() && header.role() && header.role() === "partner";  
  const isCustomer = header.email() && header.role() && header.role() === "customer";
  return (
    <div className="App">
      <Switch>
        <Route  path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/404" exact component={Page404} />
        <Main>
          <Route exact path="/gamepokemon" component={isUser ? GamePokemon : NotFound} />
          <Route exact path="/game2048" component={isUser ? Game2048 : NotFound} />
          <Route exact path="/partnerpromotion" component={isPartner ? PartnerPromotion : NotFound} />
          <Route exact path="/partnerstore" component={isPartner ? PartnerStore : NotFound} />
          <Route exact path="/partnergame" component={isPartner ? PartnerGame : NotFound} />
          <Route exact path="/partnervoucher" component={isPartner ? PartnerVoucher : NotFound} />
          <Route exact path="/partnerreport" component={isPartner ? PartnerReport : NotFound} />
          <Route exact path="/partnerprofile" component={isPartner ? PartnerProfile : NotFound} />

          <Route exact path="/adminpromotion" component={isAdmin ? AdminPromotion : NotFound} />
          <Route exact path="/adminpartner" component={isAdmin ? AdminPartner : NotFound} />
          <Route exact path="/admincustomer" component={isAdmin ? AdminCustomer : NotFound} />
          <Route exact path="/admingame" component={isAdmin ? AdminGame : NotFound} />
          <Route exact path="/adminvoucher" component={isAdmin ? AdminVoucher : NotFound} />
          <Route exact path="/adminprofile" component={isAdmin ? AdminProfile : NotFound} />
          <Route exact path="/adminreport" component={isAdmin ? AdminReport : NotFound} />

          <Route exact path="/customerpromotion" component={isCustomer ? CustomerPromotion : NotFound} />
          <Route exact path="/customerprofile" component={isCustomer ? CustomerProfile : NotFound} />
          <Route exact path="/customervoucher" component={isCustomer ? CustomerVoucher : NotFound} />
          
          <Route exact path="/signin" component={isUser ? Logout : NotFound} />
          
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/*" component={Home} />
          
        </Main>
      </Switch>
    </div>
  );
}

export default App;
