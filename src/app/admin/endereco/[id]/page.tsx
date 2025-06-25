"use client";

import AddressForm from "@/components/address/form";
import AddressList from "@/components/address/list";
import api from "@/lib/axios/api";
import {
  addAddress,
  IAddress,
  setAddresses,
  updateAddress,
} from "@/lib/redux/features/addressSlice";
import { AppDispatch } from "@/lib/redux/store";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useParams } from "next/navigation";

const AddressPage: React.FC = () => {
  const { id } = useParams();

  const customerId = id;

  const dispatch: AppDispatch = useDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<IAddress | undefined>(
    undefined
  );

  const url = `/customers/${customerId}/addresses?customerId=${customerId}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(url);
        dispatch(setAddresses(response.data.data));
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [dispatch]);

  const handleAddNew = () => {
    setEditingAddress(undefined);
    setIsFormVisible(true);
  };

  const handleEdit = (address: IAddress) => {
    setEditingAddress(address);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setEditingAddress(undefined);
  };

  const handleFormSubmit = async (
    data: Omit<IAddress, "id" | "createdAt">,
    id?: number
  ) => {
    if (editingAddress) {
      try {
        await api.put(
          `/customers/${customerId}/addresses/${id}?customerId=${customerId}`,
          data
        );

        dispatch(
          updateAddress({
            ...editingAddress,
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
          addAddress({
            ...data,
            id: Date.now(),
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
        <AddressForm
          initialData={editingAddress}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <AddressList onEdit={handleEdit} onAddNew={handleAddNew} />
      )}
    </div>
  );
};

export default AddressPage;
