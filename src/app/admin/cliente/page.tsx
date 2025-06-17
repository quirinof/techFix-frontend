"use client";

import CustomerForm from "@/components/customer/form";
import CustomerList from "@/components/customer/list";
import api from "@/lib/axios/api";
import {
  addcustomer,
  ICustomer,
  setcustomer,
  updatecustomer,
} from "@/lib/redux/features/customerSlice";
import { AppDispatch } from "@/lib/redux/store";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const CustomerPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<ICustomer | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/customers");
        dispatch(setcustomer(response.data.data));
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [dispatch]);

  const handleAddNew = () => {
    setEditingCustomer(undefined);
    setIsFormVisible(true);
  };

  const handleEdit = (customer: ICustomer) => {
    setEditingCustomer(customer);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setEditingCustomer(undefined);
  };

  const handleFormSubmit = async (
    data: Omit<ICustomer, "id" | "createdAt">
  ) => {
    if (editingCustomer) {
      try {
        await api.patch("/customers", data);

        dispatch(
          updatecustomer({
            ...editingCustomer,
            ...data,
          })
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        console.log(data);
        await api.post("/customers", data);

        dispatch(
          addcustomer({
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
        <CustomerForm
          initialData={editingCustomer}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <CustomerList onEdit={handleEdit} onAddNew={handleAddNew} />
      )}
    </div>
  );
};

export default CustomerPage;
