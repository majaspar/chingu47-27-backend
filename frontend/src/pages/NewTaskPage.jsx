import React from "react";
import Layout from "../components/Layout";
import MainDashboard from "../components/MainDashboard";

export default function NewTaskage() {
  return (
    <>
      <Layout NameComponent={MainDashboard} />;
    </>
  );
}