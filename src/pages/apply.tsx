import { useEthers } from "@usedapp/core";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyValidator } from "../types/validators";
import { ApplicationForm } from "@prisma/client";
import { Fireworks } from "../components/Fireworks";

const Apply: NextPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ApplicationForm>({
    resolver: zodResolver(applyValidator),
  });
  const { activateBrowserWallet, account } = useEthers();
  const { data: accepted } = trpc.useQuery([
    "form.isAccepted",
    { ethAddress: account ?? "0x" },
  ]);
  const { mutate: applyMutation, isSuccess } = trpc.useMutation("form.apply");

  useEffect(() => {
    const th = localStorage
      .getItem("twitter_handle")
      ?.toLowerCase()
      .trim()
      .replace(/^@+/, "")
      .trim();
    if (th) {
      localStorage.setItem("twitter_handle", th);
      setValue("twitterHandle", th);
    }
  }, []);

  useEffect(() => {
    if (account) {
      setValue("ethAddress", account);
    }
  }, [account, setValue]);

  const onSubmit: SubmitHandler<any> = useCallback(
    (data) => {
      //send to server
      data.twitterHandle = data.twitterHandle
        ?.toLowerCase()
        .trim()
        .replace(/^@+/, "")
        .trim();

      applyMutation(data);
    },
    [applyMutation]
  );

  return (
    <Layout mainClassName="!bg-transparent">
      <div className="py-10 text-yellow text-xl">
        {accepted || isSuccess ? (
          <div className="">
            <p className="mb-4">Your application has been received!</p>
            <Fireworks />
          </div>
        ) : (
          <form
            className="space-y-8 lg:w-1/2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Heading className="text-white">Board the Yacht</Heading>
            <div>
              <p>Why do you want to join our community?</p>
              <textarea {...register("whyDoYouWantToJoin")} />
              <p className="text-red-500 text-base">
                {errors.whyDoYouWantToJoin && "Not long enough"}
              </p>
            </div>
            <div>
              <p>Twitter handle</p>
              <div className="flex items-center">
                <span className="text-yellow text-sm">@</span>
                <input
                  {...register("twitterHandle")}
                  className="text-lg"
                  type="text"
                />
              </div>
              <p className="text-red-500 text-base">
                {errors.twitterHandle && "Required"}
              </p>
            </div>
            <div>
              <p>Discord handle</p>
              <div className="flex items-center">
                <span className="text-yellow text-sm">@</span>
                <input {...register("discordHandle")} type="text" />
              </div>
              <p className="text-red-500 text-base">
                {errors.discordHandle && "Required"}
              </p>
            </div>
            <div>
              <p>Email</p>
              <div className="flex items-center">
                <input {...register("email")} type="text" />
              </div>
              <p className="text-red-500 text-base">
                {errors.email && "Not a proper email address"}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Eth Address</p>
              {account ? (
                <>
                  <input
                    disabled
                    type="text"
                    {...register("ethAddress")}
                    placeholder={"Sign in with metamask"}
                  />
                </>
              ) : (
                <div>
                  <Button
                    type="button"
                    className="text-sm p-2 mt-2 min-w-max"
                    onClick={activateBrowserWallet}
                  >
                    Connect to Wallet
                  </Button>
                  <p className="text-red-500 text-base">
                    {errors.twitterHandle && "Required"}
                  </p>
                </div>
              )}
            </div>
            <Button>Invite Me</Button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default Apply;
