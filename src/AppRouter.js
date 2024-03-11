import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MakeOrder from "./pages/MakeOrder";
import ReceiveOrder from "./pages/ReceiveOrder";
import OrderDetailCheck from "./components/receive/OrderDetail";
import EditOrder from "./pages/EditOrder";
import EditOrderDetail from "./pages/EditOrderDetail";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/make-order" element={<MakeOrder />}></Route>
        <Route path="/receive-order" element={<ReceiveOrder />}></Route>
        <Route path="/order-details-check" element={<OrderDetailCheck />} />
        <Route path="/edit-order" element={<EditOrder />}></Route>
        <Route path="/edit-order-detail" element={<EditOrderDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
