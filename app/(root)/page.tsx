import { Button } from "@/components/ui/button";
import { Butterfly_Kids, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { dummyInterviews } from "../constants";
import InterviewCard from "../../components/InterviewCard";
const Homepage = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview Ready With AI Powered Practice & Feedback</h2>
          <p>Practice on real Interview Questions and Get instant Feedback</p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">start an interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt={"robot logo"}
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard
              interviweId={undefined}
              key={interview.id}
              {...interview}
            />
          ))}
          {/* <p> You haven't taken any interviews</p> */}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard
              interviweId={undefined}
              key={interview.id}
              {...interview}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Homepage;
