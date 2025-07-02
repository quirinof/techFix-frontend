"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import api from "@/lib/axios/api";
import {
  IServiceOrderItem,
  addServiceOrderItem,
  setServiceOrderItems,
  updateServiceOrderItem,
} from "@/lib/redux/features/serviceOrderItemSlice";
import { IServiceOrder } from "@/lib/redux/features/serviceOrderSlice";
import ServiceOrderItemForm from "@/components/service-ordem-item/form";
import ServiceOrderItemList from "@/components/service-ordem-item/list";
import { useParams } from "next/navigation";
import { setEquipments } from "@/lib/redux/features/equipmentSlice";

interface ServiceOrderItemPageProps {
  serviceOrder: IServiceOrder;
}

const ServiceOrderItemPage: React.FC<ServiceOrderItemPageProps> = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<IServiceOrderItem | undefined>(
    undefined
  );

  const serviceOrder = {
    id,
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const osResponse = await api.get(`service-orders/${id}`);

        const equipmentResponse = await api.get(
          `/customers/${osResponse.data.serviceOrder.customerId}/equipments?customerId=${osResponse.data.serviceOrder.customerId}`
        );

        const itemsResponse = await api.get(
          `/service-order-item?serviceOrderId=${serviceOrder?.id}`
        );

        dispatch(setEquipments(equipmentResponse.data.data));
        dispatch(setServiceOrderItems(itemsResponse.data.data));
      } catch (err) {
        console.error("Falha ao buscar dados dos itens ou equipamentos:", err);
      }
    }
    fetchData();
  }, [dispatch, serviceOrder?.id]);

  const { equipments } = useSelector((state: RootState) => state.equipment);

  const handleAddNew = () => {
    setEditingItem(undefined);
    setIsFormVisible(true);
  };

  const handleEdit = (item: IServiceOrderItem) => {
    setEditingItem(item);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setEditingItem(undefined);
  };

  const handleFormSubmit = async (
    data: Omit<IServiceOrderItem, "id">,
    id?: number
  ) => {
    try {
      if (editingItem && id) {
        const response = await api.put(`/service-order-item/${id}`, data);

        dispatch(updateServiceOrderItem(response.data.serviceOrderItem));
      } else {
        const response = await api.post("/service-order-item", data);

        dispatch(addServiceOrderItem(response.data.serviceOrderItem));
      }
      setIsFormVisible(false);
      setEditingItem(undefined);
    } catch (err) {
      console.error("Falha ao salvar o item:", err);
    }
  };

  return (
    <div>
      {isFormVisible ? (
        <ServiceOrderItemForm
          initialData={editingItem}
          equipments={equipments}
          serviceOrderId={Number(serviceOrder?.id)}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <ServiceOrderItemList onEdit={handleEdit} onAddNew={handleAddNew} />
      )}
    </div>
  );
};

export default ServiceOrderItemPage;
