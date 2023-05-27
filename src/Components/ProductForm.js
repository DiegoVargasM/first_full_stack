import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  createProduct,
  getOneProduct,
  updateProduct,
} from "../services/person-service";

export const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    description: "",
    status: "started",
  });

  const handlerForm = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // enviamos el producto al servidor con
  // las funciones de nuestro service crear o actualizar
  // en funcion si existe el producto o no
  const sendProduct = async (e) => {
    try {
      e.preventDefault();
      const response = !id
        ? await createProduct(product)
        : await updateProduct(product);
      console.log("respuesta:", response);
      navigate("/home");
    } catch (error) {
      console.log("error de respuesta:", error);
    }
  };

  //editar producto
  const getProductFromService = async () => {
    try {
      const response = await getOneProduct(id);
      console.log("get product from service:", response);
      setProduct(response.data.product);
    } catch (error) {
      console.log("get product from service:", error);
    }
  };
  //solo llamamos si existe ID, si no existe significa que estamos creando no actualizando
  useEffect(() => {
    if (id) getProductFromService();
  }, [id]);

  return (
    <Form
      onSubmit={sendProduct}
      style={{ width: "80%", marginLeft: "10%", marginTop: "3%" }}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Titulo</Form.Label>
        <Form.Control
          type="text"
          value={product.title}
          name="title"
          placeholder="Ingresa el producto"
          onChange={handlerForm}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          value={product.price}
          name="price"
          placeholder="Ingresa el precio"
          onChange={handlerForm}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Descripcion</Form.Label>
        <Form.Control
          type="textarea"
          value={product.description}
          name="description"
          placeholder="Ingresa la descripcion"
          onChange={handlerForm}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Status</Form.Label>
        <Form.Select
          aria-label="status"
          value={product.status}
          name="status"
          onChange={handlerForm}
        >
          <option value="started">Pendiente</option>
          <option value="in-progress">En progreso</option>
          <option value="finished">Terminada</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
