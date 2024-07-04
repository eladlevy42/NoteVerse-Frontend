import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "postcss";

function Task({ props }) {
  const { task } = props;
  return (
    <Card className=" w-52 self-center m-auto">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent>{task.body}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default Task;
