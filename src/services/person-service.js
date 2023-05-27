import axios from "axios";

export const getAllProducts = () =>
  axios.get("http://localhost:8000/api/products");

export const getOneProduct = (id) =>
  axios.get(`http://localhost:8000/api/products/${id}`);

export const createProduct = (product) =>
  axios.post("http://localhost:8000/api/products", product);

export const updateProduct = (product) =>
  axios.put(`http://localhost:8000/api/products/${product._id}`, product);

export const deleteProduct = (id) =>
  axios.delete(`http://localhost:8000/api/products/${id}`);
