import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Heading, Text, Flex, Card, Grid, Box, Button } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.description}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
