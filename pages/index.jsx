"use client";
import React from "react";
import Layout from "../components/Layout";
import {Hero} from "../container/hero/Hero";
import Sales from "../container/sales/Sales";
import Analytics from "../container/analytics/Analytics";

const Home = () => {
  //
  return (
    <Layout>
      <Hero />
      <Sales />
      <Analytics />
    </Layout>
  );
};

export default Home;
