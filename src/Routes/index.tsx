

import { BrowserRouter, Route, Routes } from "react-router"
import Home  from "../Pages/Home"

const AppRoutes = () => {


    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes