import { call } from "./ApiService";

export function orderSave(orderDTO) {
  return call("/order", "POST", orderDTO);
}

export function orderSearch(customerDTO) {
  return call("/order/search", "POST", customerDTO);
}

export function orderReceiveCheck(productDTO) {
  return call("/order/mark-receive", "POST", productDTO);
}
