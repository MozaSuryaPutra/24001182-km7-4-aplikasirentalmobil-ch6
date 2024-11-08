import { createLazyFileRoute } from "@tanstack/react-router";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getType } from "../../service/carType";

import TypeTable from "../../components/TypeTable";

export const Route = createLazyFileRoute("/types/")({
  component: Types,
});

function Types() {
  const { token } = useSelector((state) => state.auth);

  const [car_types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTypesData = async () => {
      setIsLoading(true);
      const result = await getType();
      if (result.success) {
        setTypes(result.data);
      }
      setIsLoading(false);
    };

    if (token) {
      getTypesData();
    }
  }, [token]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">
            Please login first to get student data!
          </h1>
        </Col>
      </Row>
    );
  }

  if (isLoading) {
    return (
      <Row className="mt-4">
        <h1>Loading...</h1>
      </Row>
    );
  }

  return (
    <Row className="mt-4">
      <h1>Selamat Datang Di Website Kelompok 4</h1>
      {car_types.length === 0 ? (
        <h1>Types data is not found!</h1>
      ) : (
        car_types.map((carType) => (

          <TypeTable
            setTypes={setTypes}
            car_types={carType}
            key={carType?.id}
          />

        ))
      )}
    </Row>
  );
}
