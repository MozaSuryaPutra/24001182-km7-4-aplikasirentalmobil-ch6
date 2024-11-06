import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import {
  getDetailStudent,
  updateStudent,
} from "../../../service/student/index.js";
import { getUniversities } from "../../../service/university";
import { getClasses } from "../../../service/class";

export const Route = createLazyFileRoute("/students/edit/$id")({
  component: EditStudent,
});

function EditStudent() {
  const navigate = useNavigate();
  const [currentProfilePicture, setCurrentProfilePicture] = useState("");
  const { id } = Route.useParams();
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [profilePicture, setProfilePicture] = useState(undefined);
  const [universities, setUniversities] = useState([]);
  const [universityId, setUniversityId] = useState(0);
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState(0);

  useEffect(() => {
    const fetchStudentData = async () => {
      const student = await getDetailStudent(id);
      if (!student?.success) {
        navigate({ to: "/login" });
      }
      if (student?.success) {
        setName(student.data.name);
        setNickName(student.data.nick_name);
        setUniversityId(student.data.university_id);
        setClassId(student.data.class_id);
        setCurrentProfilePicture(student.data.profile_picture);
      }
    };

    const fetchUniversitiesData = async () => {
      const result = await getUniversities();
      if (result?.success) {
        setUniversities(result.data);
      }
    };

    const fetchClassesData = async () => {
      const result = await getClasses();
      if (result?.success) {
        setClasses(result.data);
      }
    };

    fetchStudentData();
    fetchUniversitiesData();
    fetchClassesData();
  }, [id, navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();

    const result = await updateStudent(id, {
      name,
      nick_name: nickName,
      university_id: universityId,
      class_id: classId,
      profile_picture: profilePicture,
    });

    if (result.success) {
      alert("Student updated successfully!");
      navigate({ to: `/students/${id}` });
    } else {
      alert("Failed to update student.");
    }
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Edit Student</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm={3}>
                  Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="nick_name">
                <Form.Label column sm={3}>
                  Nick Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Nick Name"
                    required
                    value={nickName}
                    onChange={(event) => {
                      setNickName(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="university">
                <Form.Label column sm={3}>
                  University
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    aria-label="Default select example"
                    required
                    value={universityId}
                    onChange={(event) => setUniversityId(event.target.value)}
                  >
                    <option disabled value="">
                      Select University
                    </option>
                    {universities.length > 0 &&
                      universities.map((university) => (
                        <option key={university.id} value={university.id}>
                          {university.name}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="class">
                <Form.Label column sm={3}>
                  Class
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    aria-label="Default select example"
                    required
                    value={classId}
                    onChange={(event) => setClassId(event.target.value)}
                  >
                    <option disabled value="">
                      Select Class
                    </option>
                    {classes.length > 0 &&
                      classes.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.class}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="profilePicture">
                <Form.Label column sm={3}>
                  Profile Picture
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="file"
                    placeholder="Choose File"
                    onChange={(event) => {
                      setProfilePicture(event.target.files[0]);
                      setCurrentProfilePicture(
                        URL.createObjectURL(event.target.files[0])
                      );
                    }}
                    accept=".jpg,.png"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="profilePicture">
                <Form.Label column sm={3}></Form.Label>
                <Col sm={9}>
                  <Image src={currentProfilePicture} fluid />
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
