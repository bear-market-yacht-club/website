import { useEthers } from "@usedapp/core";
import { NextPage } from "next";
import { useEffect } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyValidator } from "../types/validators";
import { ApplicationForm } from "@prisma/client";

const Apply: NextPage = () => {
  const { account } = useEthers();
  const { data: alreadyApplied } = trpc.useQuery([
    "form.getApplication",
    { ethAddress: account || "" },
  ]);
  const { mutate: applyMutation, isSuccess } = trpc.useMutation("form.apply");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ApplicationForm>({
    resolver: zodResolver(applyValidator),
  });

  useEffect(() => {
    if (account) setValue("ethAddress", account);
  }, [account, setValue]);

  const onSubmit: SubmitHandler<ApplicationForm> = (data) => {
    //send to server
    applyMutation(data);
  };

  return (
    <Layout>
      <div className="py-10 text-yellow text-xl">
        {isSuccess || alreadyApplied ? (
          "Your application has been received and is being reviewed. You'll be notified if you're accepted."
        ) : (
          <form className="space-y-8 w-1/2" onSubmit={handleSubmit(onSubmit)}>
            <Heading className="text-white">Membership Application</Heading>
            <div>
              <p>How will you benefit the community?</p>
              <textarea {...register("howWillYouHelp")} />
              <p className="text-red-500 text-base">
                {errors.howWillYouHelp && "Not long enough"}
              </p>
            </div>
            <div>
              <p>Why will you hodl for the long term?</p>
              <textarea {...register("longTerm")} />
              <p className="text-red-500 text-base">
                {errors.longTerm && "Not long enough"}
              </p>
            </div>
            <div>
              <p>Twitter handle</p>
              <input
                {...register("twitterHandle")}
                type="text"
                placeholder="@"
              />
              <p className="text-red-500 text-base">
                {errors.twitterHandle && "Required"}
              </p>
            </div>
            <div>
              <p>Discord handle</p>
              <input
                {...register("discordHandle")}
                type="text"
                placeholder="@"
              />
              <p className="text-red-500 text-base">
                {errors.discordHandle && "Required"}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Eth Address</p>
              <input
                disabled
                type="text"
                {...register("ethAddress")}
                placeholder={"Sign in with metamask"}
              />
              <p className="text-red-500 text-base">
                {errors.ethAddress && "Required"}
              </p>
            </div>
            <Button>Invite Me</Button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default Apply;
