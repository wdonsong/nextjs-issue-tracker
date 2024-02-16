import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../../validationSchemas";
import prisma from "@/prisma/client";

interface Props {
  params: {
    id: string;
  };
}
export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
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
      title: body.title,
      description: body.desc,
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
