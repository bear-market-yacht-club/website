import { Mainnet, useEthers } from "@usedapp/core";
import { add, compareAsc, intervalToDuration, sub } from "date-fns";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { useIsWhitelistUsed, useMint, useTotalSupply } from "../hooks/bmyc";
import { trpc } from "../utils/trpc";
import { Modal } from "react-responsive-modal";
import { log } from "next-axiom";
import { useRouter } from "next/router";

const TimeSlot = ({ unit, amount }: { unit: string; amount?: number }) => {
  return (
    <div className="text-center min-w-20">
      <div className="font-black text-8xl md:text-6xl">{amount}</div>
      <div className="uppercase text-2xl md:text-lg">{unit}</div>
    </div>
  );
};

const Mint: NextPage = () => {
  const router = useRouter();
  const { account, chainId } = useEthers();
  const [agreed, setAgreed] = useState(false);
  const [mintDuration, setMintDuration] = useState<Duration>();
  const freeWhitelistMints = 3;
  const { send, state } = useMint();
  const { data: mintDataHolder } = trpc.useQuery([
    "mint.merkle-proof-holder",
    { ethAddress: account || "0x" },
  ]);
  const { data: mintData } = trpc.useQuery([
    "mint.merkle-proof",
    { ethAddress: account || "0x" },
  ]);
  const [isMintTime, setMintTime] = useState(false);
  const usedWhitelist = useIsWhitelistUsed(account);
  const isWhitelistUsed = (usedWhitelist ?? 0) > freeWhitelistMints;
  const [quantity, setQuantity] = useState(
    freeWhitelistMints - (usedWhitelist ?? 0)
  );
  const totalSupply = useTotalSupply();
  const { mutate: addEmail, status: emailStatus } =
    trpc.useMutation("mailing.addEmail");
  const emailRef = useRef<HTMLInputElement>(null);
  const [twitterHandle, setTwitterHandle] = useState<string | undefined>(
    undefined
  );

  let merkleProofHolder: string[],
    whitelistedHolder = false,
    merkleProof: string[],
    whitelisted = false;
  if (mintDataHolder) {
    ({ merkleProof: merkleProofHolder, whitelisted: whitelistedHolder } =
      mintDataHolder);
  }
  if (mintData) {
    ({ merkleProof, whitelisted } = mintData);
  }
  const mintTimeUTC = new Date("2022-11-10T21:20:00Z");
  const isHolderMintTime =
    !isMintTime &&
    whitelistedHolder &&
    compareAsc(mintTimeUTC, new Date()) === 1 &&
    compareAsc(mintTimeUTC, add(new Date(), { minutes: 30 })) === -1;

  useEffect(() => {
    log.debug(
      JSON.stringify({
        account,
        whitelisted,
        merkleProof,
        whitelistedHolder,
        merkleProofHolder,
      })
    );
  }, [account, whitelisted]);

  useEffect(() => {
    setQuantity(freeWhitelistMints - (usedWhitelist ?? 0));
  }, [usedWhitelist]);

  useEffect(() => {
    const setDuration = () => {
      const nowUTC = new Date();
      const d = intervalToDuration({
        start: nowUTC,
        end: whitelistedHolder
          ? sub(mintTimeUTC, { minutes: 30 })
          : mintTimeUTC,
      });

      setMintDuration(d);
      setMintTime(compareAsc(mintTimeUTC, nowUTC) === -1);
    };
    setDuration();
    const intervalId = setInterval(() => {
      setDuration();
    }, 1000);

    const th = localStorage
      .getItem("twitter_handle")
      ?.toLowerCase()
      .trim()
      .replace(/^@+/, "")
      .trim();
    if (th) {
      localStorage.setItem("twitter_handle", th);
      setTwitterHandle(th);
    }

    return () => clearInterval(intervalId);
  }, [account, whitelistedHolder]);

  useEffect(() => {
    log.debug(JSON.stringify({ account, state }));
  }, [state]);

  const onMint = async () => {
    const tx = await send(
      quantity,
      isHolderMintTime ? merkleProofHolder : merkleProof,
      {
        value: 0,
        gasLimit: 200000,
      }
    );
    log.debug(JSON.stringify(tx));
  };

  const onQuantityChange = (value: ChangeEvent<HTMLInputElement>) => {
    let newQuantity = parseInt(value.currentTarget.value) || 0;
    newQuantity = Math.max(1, newQuantity);
    newQuantity = Math.min(
      freeWhitelistMints - (usedWhitelist ?? 0),
      newQuantity
    );
    setQuantity(newQuantity);
  };

  const subscribe = () => {
    if (emailRef.current?.value) {
      addEmail({
        email: emailRef.current.value,
        twitterHandle,
      });
    }
  };

  return (
    <Layout>
      <Heading>Mint</Heading>
      <div className="flex flex-col items-center gap-4">
        <div className="mx-auto relative">
          <Image
            src="/images/bears.gif"
            width={300}
            height={300}
            alt="bears preview"
          />
        </div>
        <Heading>
          {isHolderMintTime ? (
            <span className="text-yellow">
              Minting For Current Holders ONLY
            </span>
          ) : !isMintTime ? (
            "Minting:"
          ) : (
            <span className="text-yellow">Minting Live!</span>
          )}
        </Heading>
        {!isHolderMintTime && !isMintTime ? (
          <div className="-mt-12 md:-mt-8 scale-50 gap-12 md:scale-100 flex">
            <TimeSlot unit="days" amount={mintDuration?.days} />
            <TimeSlot unit="hours" amount={mintDuration?.hours} />
            <TimeSlot unit="minutes" amount={mintDuration?.minutes} />
            <TimeSlot unit="seconds" amount={mintDuration?.seconds} />
          </div>
        ) : (
          <div className="-mt-12 md:-mt-8 scale-50 gap-12 md:scale-100 flex">
            <div className="font-black text-8xl md:text-5xl">
              {totalSupply ?? 0} / 5555
            </div>
          </div>
        )}
        <div className="md:mt-4 flex flex-col gap-4 justify-between items-center text-center">
          {!account ? (
            <p>Connect your wallet to see if you&apos;re whitelisted</p>
          ) : (whitelisted || whitelistedHolder) && !isWhitelistUsed ? (
            <p>You have been whitelisted!</p>
          ) : isWhitelistUsed ? (
            <p>You have already claimed your mint</p>
          ) : (
            <>You have not been whitelisted</>
          )}
        </div>
        {(isMintTime || isHolderMintTime) && !isWhitelistUsed ? (
          <div className="flex flex-col items-center gap-4">
            <div>
              <Checkbox
                checked={agreed}
                onChange={() => setAgreed((prev) => !prev)}
                label={
                  <span>
                    Check to agree to the{" "}
                    <Link href="/tos.txt">Terms of Service</Link> and{" "}
                    <Link href="/privacy-policy.txt">Privacy Policy</Link>
                  </span>
                }
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="flex gap-8">
                <div className="flex items-stretch text-yellow">
                  <input
                    className="bg-black border-b-yellow border-b-2 w-12 text-3xl text-center"
                    min={1}
                    max={freeWhitelistMints}
                    value={quantity}
                    type="number"
                    onChange={onQuantityChange}
                  />
                  <div className="flex flex-col w-6">
                    <svg
                      className="flex-grow cursor-pointer"
                      onClick={() =>
                        setQuantity((prev) =>
                          Math.min(
                            freeWhitelistMints - (usedWhitelist ?? 0),
                            prev + 1
                          )
                        )
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#bfc500"
                        d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
                      />
                    </svg>
                    <svg
                      className="flex-grow cursor-pointer"
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="#bfc500"
                        d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                      />
                    </svg>
                  </div>
                </div>
                <Button
                  className=""
                  onClick={onMint}
                  disabled={
                    !agreed ||
                    chainId !== Mainnet.chainId ||
                    (isHolderMintTime && !whitelistedHolder) ||
                    (isMintTime && !whitelisted)
                  }
                >
                  Mint
                </Button>
              </div>
              {!account ? (
                <div className="mt-4 text-red-500">Connect wallet to mint</div>
              ) : chainId !== Mainnet.chainId ? (
                <div className="mt-4 text-red-500">
                  Change network to Ethereum mainnet to mint
                </div>
              ) : !agreed ? (
                <div className="mt-4 text-red-500">
                  You must agree to the Terms of Service and Privacy Policy to
                  mint
                </div>
              ) : (
                (isHolderMintTime && !whitelistedHolder) ||
                (isMintTime && !whitelisted && (
                  <div className="mt-4 text-red-500">
                    You must be whitelisted to mint
                  </div>
                ))
              )}
            </div>
            {state.status === "PendingSignature" ||
            state.status === "Mining" ? (
              <div className="text-yellow">Confirming Transaction</div>
            ) : state.status === "Fail" ? (
              <div className="text-red-500">
                {state.errorCode}: {state.errorMessage}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <>
            <div>Enter your email to get notified of any updates</div>
            <div className="flex gap-4 text-xl">
              <input
                className=""
                ref={emailRef}
                placeholder="email@example.com"
                type="text"
              />
              <Button
                className="p-1 bg-transparent text-yellow border-2 !border-solid border-yellow"
                onClick={subscribe}
              >
                Submit
              </Button>
            </div>
            {emailStatus === "error" && <div>Invalid Email</div>}
            {emailStatus === "success" && <div>Submitted</div>}
          </>
        )}
        <Modal
          open={state.status === "Success"}
          onClose={() => {
            router.reload();
          }}
          center
          styles={{
            modal: {
              backgroundColor: "black",
              border: "2px solid #bfc500",
              borderRadius: "1em",
            },
            closeButton: {
              top: "1.5em",
              right: "1.5em",
              fill: "#bfc500",
            },
          }}
        >
          <div className="flex flex-col items-center">
            <div className="text-green-400 text-3xl mb-2">Success!</div>
            <div className="text-center">
              Welcome to our big happy bear fam!
              <br />
              Stay tuned for the art reveal!
            </div>
            <div className="flex flex-col items-center gap-2">
              <a
                className="my-4 no-underline"
                rel="noreferrer"
                target="_blank"
                href={`https://twitter.com/intent/tweet?text=I just minted ${quantity} bear${
                  quantity > 1 ? "s" : ""
                }!! Mint is live ${
                  isHolderMintTime ? "for previous holders " : ""
                }@ bmyc.io/mint! 🐻 @BearMarketYC`}
              >
                <Button>Tweet</Button>
              </a>
              <hr className="h-2 w-full text-white" />
              <div>Enter your email to subscribe to our club list</div>
              <div className="flex gap-4 text-xl">
                <input
                  className=""
                  ref={emailRef}
                  placeholder="email@example.com"
                  type="text"
                />
                <Button
                  className="p-1 bg-transparent text-yellow border-2 !border-solid border-yellow"
                  onClick={subscribe}
                >
                  Submit
                </Button>
              </div>
              {emailStatus === "error" && <div>Invalid Email</div>}
              {emailStatus === "success" && <div>Submitted</div>}
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default Mint;
