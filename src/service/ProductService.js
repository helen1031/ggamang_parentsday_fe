import { call } from "./ApiService";

export function fetchProducts(orderDTO) {
  return call("/product", "GET", null);
}
