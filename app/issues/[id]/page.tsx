import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Heading, Text, Flex, Card } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params: { id } }: Props) => {
  const validateId = parseInt(id);
  if (typeof validateId !== "number") notFound();
  const issue = await prisma.issue.findUnique({
    where: {
      id: validateId,
    },
  });
  if (!issue) notFound();
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.description}</Text>
      </Flex>
      <Card>{issue.description}</Card>
    </div>
  );
};

export default IssueDetailPage;
