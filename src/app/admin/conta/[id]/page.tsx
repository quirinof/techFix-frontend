"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import api from "@/lib/axios/api";
import {
  IBill,
  addBill,
  setBills,
  updateBill,
} from "@/lib/redux/features/billSlice";
import BillForm from "@/components/bill/form";
import BillList from "@/components/bill/list";
import { useParams } from "next/navigation";
import { setServiceOrders } from "@/lib/redux/features/serviceOrderSlice";

const BillPage: React.FC = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingBill, setEditingBill] = useState<IBill | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const billsResponse = await api.get(`/bills?serviceOrderId=${id}`);
        dispatch(setBills(billsResponse.data.data));

        const osResponse = await api.get(`/service-orders/${id}`);
        dispatch(setServiceOrders([osResponse.data.serviceOrder]));
      } catch (err) {
        console.error("Falha ao buscar dados da conta ou OS:", err);
      }
    }
    fetchData();
  }, [dispatch, id]);

  const serviceOrders = useSelector(
    (state: RootState) => state.serviceOrder.serviceOrder
  );

  const serviceOrder = serviceOrders.find((so) => so.id === Number(id));

  const handleAddNew = () => {
    setEditingBill(undefined);
    setIsFormVisible(true);
  };

  const handleEdit = (bill: IBill) => {
    setEditingBill(bill);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setEditingBill(undefined);
  };

  const handleFormSubmit = async (data: Omit<IBill, "id">, billId?: number) => {
    try {
      if (editingBill && billId) {
        const response = await api.put(`/bills/${billId}`, data);
        dispatch(updateBill(response.data.bill));
      } else {
        const response = await api.post("/bills", data);
        dispatch(addBill(response.data.bill));
      }
      setIsFormVisible(false);
      setEditingBill(undefined);
    } catch (err) {
      console.error("Falha ao salvar a cobrança:", err);
    }
  };

  return (
    <div>
      {isFormVisible ? (
        <BillForm
          initialData={editingBill}
          serviceOrders={serviceOrder ? [serviceOrder] : []}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <BillList onEdit={handleEdit} onAddNew={handleAddNew} />
      )}
    </div>
  );
};

export default BillPage;
