import React from "react";
import { format } from "date-fns";
import styled from "styled-components";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteCars, getCars } from "../../service/cars";

const CardContainer = styled.div`
  max-width: 300px;
  margin: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
`;

const CardText = styled.p`
  font-size: 14px;
  margin: 5px 0;
  color: #555;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dc3545;
  background-color: #fff;
  color: #dc3545;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
`;

const CarCard = ({ cars, setCars }) => {
  const navigate = useNavigate();

  const onDelete = async () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this car?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const result = await deleteCars(cars.id);
            if (result?.success) {
              toast.success("Car deleted successfully!");

              const refreshData = await getCars();
              if (refreshData?.success) {
                setCars(refreshData.data);
              } else {
                setCars([]);
              }
            } else {
              toast.error(result?.message);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleEdit = () => {
    navigate({ to: `/cars/edit/${cars.id}` });
  };

  // Format tanggal menggunakan date-fns
  const formattedAvailableAt = cars.availableAt
    ? format(new Date(cars.availableAt), "yyyy-MM-dd")
    : "Not Available";

  return (
    <CardContainer>
      <ImageContainer>
        <CarImage src={cars.image} />
      </ImageContainer>
      <CardBody>
        {/* Gunakan model_name dari models yang dikirim */}
        <CardTitle>{cars.carsModels.model_name}</CardTitle>
        <CardText>RP {cars.rentPerDay}</CardText>
        <CardText>Available At: {formattedAvailableAt}</CardText>
        <CardText>Description: {cars.description}</CardText>
        <ButtonContainer>
          <DeleteButton onClick={onDelete}>
            <FaTrashAlt style={{ marginRight: "4px" }} />
            Delete
          </DeleteButton>
          <EditButton onClick={handleEdit}>
            <FaEdit style={{ marginRight: "4px" }} />
            Edit
          </EditButton>
        </ButtonContainer>
      </CardBody>
    </CardContainer>
  );
};

export default CarCard;
