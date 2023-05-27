import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/person-service";
import { Link } from "react-router-dom";
import { deleteProduct } from "../services/person-service";
export const Home = () => {
  const [products, setProducts] = useState([]);

  const getProductsFromService = async () => {
    try {
      const list = await getAllProducts();
      console.log("get products from service:", list);
      setProducts(list.data.products);
    } catch (error) {
      console.log("get products from service:", error);
    }
  };

  const status = {
    started: "Iniciado",
    "in-progress": "En Progreso",
    finished: "Terminado",
  };

  const removeProduct = async (id) => {
    try {
      const response = await deleteProduct(id);
      console.log("respuesta:", response);
      const newProductList = products.filter((product) => product._id !== id);
      setProducts(newProductList);
    } catch (error) {
      console.log("error de respuesta:", error);
    }
  };

  //queremos llamarlo al montar el componente
  useEffect(() => {
    getProductsFromService();
  }, []);

  return (
    <>
      <h1>Home</h1>
      <button>
        <Link to={"/crear-producto"}>Crear Producto</Link>
      </button>
      {/* Usamos "?" para verificar si products existe */}
      {products?.map((product) => (
        <ul key={product._id}>
          <li>Producto: {product.title}</li>
          <li>Precio: ${product.price}</li>
          <li>Descripcion: {product.description}</li>
          <li>Estado: {status[product.status]}</li>
          <button>
            <Link to={`/editar-producto/${product._id}`}>Editar</Link>
          </button>
          <button onClick={() => removeProduct(product._id)}>Eliminar</button>
        </ul>
      ))}
    </>
  );
};
