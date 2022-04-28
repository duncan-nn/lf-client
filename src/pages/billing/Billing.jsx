import BillingNav from '../../components/navigation/BillingNav.jsx';
import { Outlet  } from "react-router-dom";
import CheckoutFooter from '../../components/navigation/CheckoutFooter.jsx';


export default function Billing() {

    return (
        <div>
            <BillingNav />
            <Outlet/>
            <CheckoutFooter />
        </div>
    );
}