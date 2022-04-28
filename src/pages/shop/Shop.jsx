import ShopMenu from '../../components/navigation/ShopMenu.jsx';
import ShopFooter from '../../components/navigation/ShopFooter.jsx';
import { Outlet  } from "react-router-dom";



export default function Shop() {

    return (
        <div>
            <ShopMenu />
            <Outlet/>
            <ShopFooter />
        </div>
    );
}
