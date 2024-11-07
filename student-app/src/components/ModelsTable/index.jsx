import React from "react";
import styled from "styled-components";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteModels, getModels } from "../../service/models";

const TableContainer = styled.div`
  max-width: 100%;
  margin: 20px auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
`;

const TableHead = styled.thead`
  background-color: #007bff;
  color: #fff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #dee2e6;
  font-size: 14px;
  color: #495057;
  text-align: center;
`;

const TableHeaderCell = styled.th`
  padding: 12px 15px;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
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

const ModelsTable = ({ carsModels, setCarsModels }) => {
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
            const result = await deleteModels(carsModels.id);
            if (result?.success) {
              toast.success("Data deleted successfully!");

              const refreshTypes = await getModels();
              if (refreshTypes?.success) {
                setCarsModels(refreshTypes.data);
              } else {
                setCarsModels([]);
              }

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
    navigate({ to: `/models/${carsModels.id}` });
  };

  return (
    <TableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Model Name</TableHeaderCell>
            <TableHeaderCell>Manufacture</TableHeaderCell>
            <TableHeaderCell>Transmission</TableHeaderCell>
            <TableHeaderCell>Type_Id</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Specs</TableHeaderCell>
            <TableHeaderCell>Options</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <tbody>
          <TableRow>
            <TableCell>{carsModels.model_name}</TableCell>
            <TableCell>{carsModels.manufacturer} seats</TableCell>
            <TableCell>{carsModels.transmission}</TableCell>
            <TableCell>{carsModels.type_id}</TableCell>
            <TableCell>{carsModels.description}</TableCell>
            <TableCell>
              {Array.isArray(carsModels.specs)
                ? carsModels.specs.join(", ")
                : carsModels.specs}
            </TableCell>
            <TableCell>
              {Array.isArray(carsModels.options)
                ? carsModels.options.join(", ")
                : carsModels.options}
            </TableCell>
            <TableCell>
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
            </TableCell>
          </TableRow>
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default ModelsTable;