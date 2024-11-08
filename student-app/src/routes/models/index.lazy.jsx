import { createLazyFileRoute } from "@tanstack/react-router";

import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getModels } from "../../service/models";
import ModelsTable from "../../components/ModelsTable";

export const Route = createLazyFileRoute("/models/")({
  component: Models,
});

function Models() {
  const { token } = useSelector((state) => state.auth);

  const [carsModels, setCarsModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCarsModels = async () => {
      setIsLoading(true);
      const result = await getModels();
      if (result.success) {
        setCarsModels(result.data);
      }
      setIsLoading(false);
    };

    if (token) {
      getCarsModels();
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
      {carsModels.length === 0 ? (
        <h1>Cars Models is not found!</h1>
      ) : (
        carsModels.map((carModel) => (
          <ModelsTable
            setCarsModels={setCarsModels}
            carsModels={carModel}
            key={carModel?.id}
          />
        ))
      )}
    </Row>
  );
}
