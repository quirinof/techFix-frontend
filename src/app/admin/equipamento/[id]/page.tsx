"use client";

import EquipmentForm from "@/components/equipment/form";
import EquipmentList from "@/components/equipment/list";
import api from "@/lib/axios/api";
import {
  addEquipment,
  IEquipment,
  setEquipments,
  updateEquipment,
} from "@/lib/redux/features/equipmentSlice";
import { AppDispatch } from "@/lib/redux/store";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useParams } from "next/navigation";

const EquipmentPage: React.FC = () => {
  const { id } = useParams();

  const customerId = id;

  const dispatch: AppDispatch = useDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<
    IEquipment | undefined
  >(undefined);

  const url = `/customers/${customerId}/equipments?customerId=${customerId}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(url);
        dispatch(setEquipments(response.data.data));
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [dispatch, url]);

  const handleAddNew = () => {
    setEditingEquipment(undefined);
    setIsFormVisible(true);
  };

  const handleEdit = (equipment: IEquipment) => {
    setEditingEquipment(equipment);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setEditingEquipment(undefined);
  };

  const handleFormSubmit = async (
    data: Omit<IEquipment, "id" | "createdAt">,
    id?: number
  ) => {
    if (editingEquipment) {
      try {
        await api.put(
          `/customers/${customerId}/equipments/${id}?customerId=${customerId}`,
          data
        );

        dispatch(
          updateEquipment({
            ...editingEquipment,
            ...data,
          })
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await api.post(url, data);

        dispatch(
          addEquipment({
            ...data,
            id: Date.now(),
            createdAt: new Date().toISOString(),
          })
        );
      } catch (err) {
        console.error(err);
      }
    }
    setIsFormVisible(false);
  };

  return (
    <div>
      {isFormVisible ? (
        <EquipmentForm
          initialData={editingEquipment}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <EquipmentList onEdit={handleEdit} onAddNew={handleAddNew} />
      )}
    </div>
  );
};

export default EquipmentPage;
