import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import { getCars } from "../../service/cars";
import { getModelsById } from "../../service/models";
import CarCard from "../../components/CarCard";
export const Route = createLazyFileRoute("/cars/")({
  component: CarsIndex,
});

function CarsIndex() {
  const { token } = useSelector((state) => state.auth);
  const [cars, setCars] = useState([]);
  const [models, setCarsModelsByid] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCarsData = async () => {
      setIsLoading(true);
      const result = await getCars();
      if (result.success) {
        setCars(result.data);
      }
      setIsLoading(false);
    };

    if (token) {
      getCarsData();
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
      {cars.length === 0 ? (
        <h1>Cars is not found!</h1>
      ) : (
        cars.map((car) => (
          <CarCard setCars={setCars} cars={car} key={car?.id} />
        ))
      )}
    </Row>
  );
}
