import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { getTypeById, updateType } from "../../../service/carType";

export const Route = createLazyFileRoute("/types/edit/$id")({
  component: EditTypes,
});

function EditTypes() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  const [body_style, setBodyStyle] = useState("");
  const [capacity, setCapacity] = useState("");
  const [fuel_type, setFuelType] = useState("");

  useEffect(() => {
    const fetchTypesData = async () => {
      const type = await getTypeById(id);
      if (!type?.success) {
        navigate({ to: "/types" });
      }
      if (type?.success) {
        setBodyStyle(type.data.body_style);
        setCapacity(type.data.capacity);
        setFuelType(type.data.fuel_type);
      }
    };

    fetchTypesData();
  }, [id, navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();

    const result = await updateType(id, {
      body_style: body_style,
      capacity: capacity,
      fuel_type: fuel_type,
    });

    if (result.success) {
      alert("Types updated successfully!");
      navigate({ to: `/types` });
    } else {
      alert("Failed to update Types.");
    }
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Edit Student</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="body_style">
                <Form.Label column sm={3}>
                  Body Style
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Body Style"
                    required
                    value={body_style}
                    onChange={(event) => {
                      setBodyStyle(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="capacity">
                <Form.Label column sm={3}>
                  Capacity
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Capacity"
                    required
                    value={capacity}
                    onChange={(event) => {
                      setCapacity(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="fuel_type">
                <Form.Label column sm={3}>
                  Fuel Type
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Fuel Type"
                    required
                    value={fuel_type}
                    onChange={(event) => {
                      setFuelType(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>

              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Update Student
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
