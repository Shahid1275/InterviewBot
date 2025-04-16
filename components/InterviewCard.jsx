import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Add this import
import { getRandomInterviewCover } from "../lib/utils";
import DisplayTechIcons from "./DisplayTechIcons";

const InterviewCard = ({
  interviweId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}) => {
  const feedback = null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM DD, YYYY");

  return (
    <div className="card-border w-[360px] mx:sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
            <p className="badge-text">{normalizedType}</p>
          </div>
          <Image
            className="rounded-full object-fit size-[90px]"
            width={90}
            height={90}
            src={getRandomInterviewCover()}
            alt="cover-image"
          />
          <h3 className="mt-5 capitalize">{role} interview</h3>
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="./calendar.svg"
                alt="calender"
                width={22}
                height={22}
              />
              <p>{formattedDate}</p>
              <div className="flex flex-row gap-2">
                <Image
                  src="./star.svg"
                  alt="star image"
                  width={22}
                  height={22}
                />
                <p>{feedback?.totalScore || "---"}/100</p>
              </div>
            </div>
          </div>
          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ||
              "No feedback available yet. Complete the interview to receive detailed assessment."}
          </p>
          <div className="flex flex-row justify-between mt-4">
            <DisplayTechIcons techstack={techstack} />
            <Button className="btn-primary">
              <Link
                href={
                  feedback
                    ? `/interview/${interviweId}/feedback`
                    : `/interview/${interviweId}`
                }
              >
                {feedback ? "View Feedback" : "view Interview"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
