import { NextRequest, NextResponse } from "next/server";
import { issueSchema, patchIssueSchema } from "../../../validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextAuthConfig } from "../../auth/[...nextauth]/route";

interface Props {
  params: {
    id: string;
  };
}
export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(NextAuthConfig);
  if (!session) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  }
  const { assignedToUserId, title, desc } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: body.assignedToUserId },
    });
    if (!user)
      return NextResponse.json(
        { message: "Invalid user" },
        {
          status: 400,
        }
      );
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!issue) {
    return NextResponse.json(
      {
        message: "Issue not found",
      },
      {
        status: 404,
      }
    );
  }

  const newIssue = await prisma.issue.update({
    where: {
      id: +params.id,
    },
    data: {
      title,
      description: desc,
      assignedToUserId,
    },
  });

  return NextResponse.json(newIssue, {
    status: 200,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(NextAuthConfig);
  if (!session) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const id = parseInt(params.id);
  if (typeof id !== "number") {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id,
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ message: "Issue deleted" });
}
