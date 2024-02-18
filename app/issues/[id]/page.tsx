import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { NextAuthConfig } from "@/app/api/auth/[...nextauth]/NextAuthConfig";
import { getServerSession } from "next-auth";
import AssigneeSelect from "../AssigneeSelect";
import { Metadata } from "next";
import { cache } from "react";
interface Props {
  params: { id: string };
}
const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  })
);
const IssueDetailPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(NextAuthConfig);
  const validateId = parseInt(id);
  if (typeof validateId !== "number") notFound();
  const issue = await fetchUser(validateId);
  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Flex direction="column" gap="4">
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      )}
    </Grid>
  );
};

export default IssueDetailPage;

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(+params.id);
  return {
    title: issue?.title,
    description: "Details of issue " + issue?.title,
    // openGraphImage: {
    //   url: issue.image,
    // },
  };
}
