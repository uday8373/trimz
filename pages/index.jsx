"use client";
import React from "react";
import Layout from "../components/Layout";
import {Hero} from "../container/hero/Hero";
import Sales from "../container/sales/Sales";
import Analytics from "../container/analytics/Analytics";
import Seo from "../container/seo/Seo";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Analytics />
      <Sales />
      <Seo />
    </Layout>
  );
};

export default Home;
