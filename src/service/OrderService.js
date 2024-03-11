import { call } from "./ApiService";

export function orderSave(orderDTO) {
  return call("/order", "POST", orderDTO);
}

export function orderSearch(customerDTO) {
  return call("/order/search", "POST", customerDTO);
}

export function orderSearchByOid(oid) {
  return call(`/order/${oid}`, "GET", null);
}

export function orderReceiveCheck(productDTO) {
  return call("/order/mark-receive", "POST", productDTO);
}

export function orderDelete(oid) {
  return call(`/order/delete-order?oid=${oid}`, "DELETE", null);
}
