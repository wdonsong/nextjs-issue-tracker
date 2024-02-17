"use client";

import { Select } from "@radix-ui/themes";
import React from "react";

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger></Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>suggestion</Select.Label>
          <Select.Item value="1">mosh</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
