import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Flex direction="column" gap="4">
        <EditIssueButton issueId={issue.id} />
        <DeleteIssueButton issueId={issue.id} />
      </Flex>
    </Grid>
  );
};

export default IssueDetailPage;
