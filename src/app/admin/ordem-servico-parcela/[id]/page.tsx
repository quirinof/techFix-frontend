"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { useParams } from "next/navigation";
import api from "@/lib/axios/api";
import {
  IBill,
  setBills,
  addBill,
  updateBill,
} from "@/lib/redux/features/billSlice";
import BillForm from "@/components/bill/form";
import BillList from "@/components/bill/list";

const BillPage: React.FC = () => {
  const { id: serviceOrderId } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingBill, setEditingBill] = useState<IBill | undefined>(undefined);

  useEffect(() => {
    if (serviceOrderId) {
      const fetchData = async () => {
        try {
          const response = await api.get(
            `/bills?serviceOrderId=${serviceOrderId}&perPage=100`
          );
          dispatch(setBills(response.data.data));
        } catch (err) {
          console.error("Falha ao buscar as faturas:", err);
        }
      };
      fetchData();
    }
  }, [dispatch, serviceOrderId]);

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

  const handleFormSubmit = async (data: Omit<IBill, "id">, id?: number) => {
    try {
      if (editingBill && id) {
        const response = await api.put(`/bills/${id}`, data);

        dispatch(updateBill(response.data.bill));
      } else {
        const response = await api.post("/bills", data);

        dispatch(addBill(response.data.bill));
      }
      setIsFormVisible(false);
      setEditingBill(undefined);
    } catch (err) {
      console.error("Falha ao salvar a fatura:", err);
    }
  };

  return (
    <div>
      {isFormVisible ? (
        <BillForm
          initialData={editingBill}
          serviceOrderId={Number(serviceOrderId)}
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
