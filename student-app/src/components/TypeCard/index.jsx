import React from "react";
import styled from "styled-components";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteType } from "../../service/carType";

const CardContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 250px;
  text-align: center;
  background-color: #fff;
`;

const CarTitle = styled.div`
  font-weight: bold;
  margin-top: 8px;
`;

const CarDetail = styled.div`
  font-size: 14px;
  color: #6c757d;
  margin-top: 4px;
`;

const CarPrice = styled.div`
  color: #28a745;
  font-size: 18px;
  margin-top: 4px;
`;

const UpdateInfo = styled.div`
  color: #6c757d;
  font-size: 12px;
  margin-top: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dc3545;
  background-color: #fff;
  color: #dc3545;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  width: 48%;
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
  padding: 8px;
  cursor: pointer;
  width: 48%;
  font-size: 14px;
`;

const TypeCard = ({ car_types }) => {
  const navigate = useNavigate();

  const onDelete = async (event) => {
    event.preventDefault();

    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this data?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const result = await deleteType(car_types.id);
            if (result?.success) {
              toast.success("Data deleted successfully!");
              navigate({ to: "/types" });
              return;
            }

            toast.error(result?.message);
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
    navigate({ to: `/types/${car_types.id}` });
  };

  return (
    <CardContainer>
      <CarTitle>{car_types.body_style}</CarTitle>
      <CarDetail>{car_types.capacity} seats</CarDetail>
      <CarDetail>{car_types.fuel_type}</CarDetail>
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
    </CardContainer>
  );
};

export default TypeCard;
