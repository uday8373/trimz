"use client";
import React from "react";
import Layout from "../components/Layout";
import {Hero} from "../container/hero/Hero";
import Sales from "../container/sales/Sales";

const Home = () => {
  //
  return (
    <Layout>
      <Hero />
      <Sales />
    </Layout>
  );
};

export default Home;
