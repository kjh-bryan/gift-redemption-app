"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import React, { useEffect, useState, useTransition } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "../form-success";
import { Select, SelectItem } from "@/components/ui/select";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { register } from "@/actions/register";
import { getAllTeams } from "@/app/api/team";
import { RoleProps, TeamProps } from "@/interfaces/types";
import { getAllRoles } from "@/app/api/role";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [teamOptions, setTeamOptions] = useState<TeamProps[]>([]);
  const [roleOptions, setRoleOptions] = useState<RoleProps[]>([]);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      team_name: "",
      role_name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  useEffect(() => {
    (async () => {
      const teamData = await getAllTeams();
      console.log("teamData", teamData);
      if (teamData.status === 200) {
        setTeamOptions(teamData.data.data);
      }
      const roleData = await getAllRoles();
      if (roleData.status === 200) {
        setRoleOptions(roleData.data.data);
      }
    })();
  }, []);
  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-row">
              <FormField
                control={form.control}
                name="role_name"
                render={({ field }) => (
                  <FormItem className="w-2/4">
                    <FormLabel>Username</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roleOptions &&
                          roleOptions.map((option) => (
                            <SelectItem
                              key={option.role_name}
                              value={option.role_name}
                            >
                              {option.role_name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="underline"
                render={({ field }) => (
                  <FormItem className="w-11">
                    <FormLabel>.</FormLabel>
                    <FormControl>
                      <Input
                        className="disabled:opacity-100 disabled:shadow-none disabled:border-0 disabled:text-xl"
                        disabled={true}
                        placeholder="_"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-3/4">
                    <FormLabel>.</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="username"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="team_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a team" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teamOptions &&
                        teamOptions.map((option) => (
                          <SelectItem
                            key={option.team_name}
                            value={option.team_name}
                          >
                            {option.team_name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Register
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
