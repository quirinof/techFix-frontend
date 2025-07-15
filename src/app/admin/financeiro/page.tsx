"use client";
import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  Calendar,
} from "lucide-react";
import api from "@/lib/axios/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { setBills } from "@/lib/redux/features/billSlice";

const FinancialDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const dispatch: AppDispatch = useDispatch();
  const bills = useSelector((state: RootState) => state.bill.bills);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/bills`);
        dispatch(setBills(response.data.data));
      } catch (err) {
        console.error("Falha ao buscar as faturas:", err);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(parseFloat(value));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const calculateMetrics = () => {
    const totalAmount = bills.reduce(
      (sum, bill) => sum + parseFloat(bill.amount),
      0
    );
    const paidAmount = bills
      .filter((bill) => bill.status === "paid")
      .reduce((sum, bill) => sum + parseFloat(bill.amount), 0);
    const pendingAmount = bills
      .filter((bill) => bill.status === "pending")
      .reduce((sum, bill) => sum + parseFloat(bill.amount), 0);
    const overdueAmount = bills
      .filter((bill) => bill.status === "overdue")
      .reduce((sum, bill) => sum + parseFloat(bill.amount), 0);

    return {
      total: totalAmount,
      paid: paidAmount,
      pending: pendingAmount,
      overdue: overdueAmount,
      paidCount: bills.filter((bill) => bill.status === "paid").length,
      pendingCount: bills.filter((bill) => bill.status === "pending").length,
      overdueCount: bills.filter((bill) => bill.status === "overdue").length,
    };
  };

  const metrics = calculateMetrics();

  const pieData = [
    { name: "Pago", value: metrics.paid, color: "#3B82F6" },
    { name: "Pendente", value: metrics.pending, color: "#93C5FD" },
    { name: "Vencido", value: metrics.overdue, color: "#1E40AF" },
  ];

  const barData = [
    { name: "Pago", quantidade: metrics.paidCount, valor: metrics.paid },
    {
      name: "Pendente",
      quantidade: metrics.pendingCount,
      valor: metrics.pending,
    },
    {
      name: "Vencido",
      quantidade: metrics.overdueCount,
      valor: metrics.overdue,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-blue-50 text-blue-600";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const translateStatus = (status: string) => {
    switch (status) {
      case "paid":
        return "Pago";
      case "pending":
        return "Pendente";
      case "overdue":
        return "Vencido";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "dashboard"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("listagem")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "listagem"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Listagem
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Geral
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(metrics.total)}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Valores Pagos
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(metrics.paid)}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Valores Pendentes
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(metrics.pending)}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Valores Vencidos
                    </p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatCurrency(metrics.overdue)}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Distribuição por Status
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        //@ts-ignore
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Valores por Status
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Bar dataKey="valor" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resumo Estatístico
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {metrics.paidCount}
                  </p>
                  <p className="text-sm text-gray-600">Faturas Pagas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">
                    {metrics.pendingCount}
                  </p>
                  <p className="text-sm text-gray-600">Faturas Pendentes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">
                    {metrics.overdueCount}
                  </p>
                  <p className="text-sm text-gray-600">Faturas Vencidas</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Listagem de Lançamentos
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Método
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data Vencimento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ordem de Serviço
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bills.map((bill) => (
                    <tr key={bill.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{bill.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(bill.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium uppercase">
                          {bill.paymentMethod}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {formatDate(bill.dueDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            bill.status
                          )}`}
                        >
                          {getStatusIcon(bill.status)}
                          <span className="ml-1">
                            {translateStatus(bill.status)}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        #{bill.serviceOrderId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {bills.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum lançamento encontrado</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialDashboard;
