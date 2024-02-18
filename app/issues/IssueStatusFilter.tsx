"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const status: { label: string; value?: Status }[] = [
  {
    label: "All",
  },
  {
    label: "Open",
    value: "OPEN",
  },
  {
    label: "Closed",
    value: "CLOSED",
  },
  { label: "In_Progress", value: "IN_PROGRESS" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => {
        const params = new URLSearchParams();

        const orderBy = searchParams.get("orderBy");
        if (status) {
          params.append("status", status);
        }
        if (orderBy) {
          params.append("orderBy", orderBy);
        }
        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues/" + query);
      }}
    >
      <Select.Trigger />
      <Select.Content>
        {status.map((item) => {
          return (
            <Select.Item key={item.label} value={item.value || ""}>
              {item.label}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
