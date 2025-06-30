"use client";

import ServiceOrderForm from "@/components/service-order/form";
import ServiceOrderList from "@/components/service-order/list";
import api from "@/lib/axios/api";
import {
  IServiceOrder,
  addServiceOrder,
  setServiceOrders,
  updateServiceOrder,
} from "@/lib/redux/features/serviceOrderSlice";
import { setcustomer } from "@/lib/redux/features/customerSlice";
import { AppDispatch } from "@/lib/redux/store";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

const ServiceOrderPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState<IServiceOrder | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get("/service-orders");
        dispatch(setServiceOrders(response.data.data));
      } catch (err) {
        console.error(err);
      }
    }
    fetchOrders();
  }, [dispatch]);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await api.get("/customers");
        dispatch(setcustomer(response.data.data));
      } catch (err) {
        console.error(err);
      }
    }
    fetchCustomers();
  }, [dispatch]);

  const customers = useSelector((state: RootState) => state.customer.customer);

  const handleAddNew = () => {
    setEditingOrder(undefined);
    setIsFormVisible(true);
  };

  const handleEdit = (order: IServiceOrder) => {
    setEditingOrder(order);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setEditingOrder(undefined);
  };

  const handleFormSubmit = async (
    data: Omit<IServiceOrder, "id" | "createdAt">,
    id?: number
  ) => {
    if (editingOrder) {
      try {
        const { ...rest } = data;
        await api.put(`/service-orders/${id}`, rest);

        dispatch(
          updateServiceOrder({
            ...editingOrder,
            ...data,
          })
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await api.post("/service-orders", data);

        dispatch(
          addServiceOrder({
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
        <ServiceOrderForm
          initialData={editingOrder}
          customers={customers}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <ServiceOrderList onEdit={handleEdit} onAddNew={handleAddNew} />
      )}
    </div>
  );
};

export default ServiceOrderPage;
