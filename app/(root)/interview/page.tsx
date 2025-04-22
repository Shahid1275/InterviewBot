import Agent from "@/components/Agent";
import React from "react";

const page = () => {
  return (
    <>
      <h3>interview Generation</h3>
      <Agent userName="You" type="generate" userId="user1" />
    </>
  );
};

export default page;
