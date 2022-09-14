import Button from "../components/Button";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

import { NextPage } from "next";

const filters = {
  id: 0,
  background: [
    "Tan #5",
    "Purple #1",
    "Blue #4",
    "White #1",
    "Orange #1",
    "LightBlue #1",
  ],
  base: ["Penguin#1"],
  colors: ["Purple #1", "Blue #1", "Red #1", "Turqoise #1"],
  mustaches: [
    "Light Blue Mustache #2",
    "Green Twirl Mustache #1",
    "Bushy Mustache #14",
    "Blue Mustache #3",
    "Twirl Mustache #15",
  ],
  ice_cream: [
    "Flavor Tower #2",
    "Choco Cone #5",
    "Sundae #3",
    "Choco Bit #9",
    "Pink Sprinkles #12",
    "Triple Cone #13",
    "Cream Cookies #9",
    "Blue Dip #4",
    "Swirl #1",
    "Choco bit #10",
    "Strawberry #2",
    "Sundae #2",
    "Mint Chip #7",
    "Red Swirls # 4",
  ],
  hats: [
    "PinkCap#14",
    "SantaHat #10",
    "CatBeanie #17",
    "StripedBrim #7",
    "WitchHat#8",
    "PinkCap#15",
    "Bowler #5",
    "RedCap #3",
    "RedBrim # 19",
    "RedBrim #9",
    "BlackCap #19",
    "Red Beanie #22",
    "CowboyHat#15",
  ],
  tattoos: ["#2", "#11", "#4", "#10", "#9", "#8", "#1", "#3", "#7", "#5", "#6"],
  cookies: [
    "Cupcake #7",
    "Pink Sprinkles #2",
    "Candy Cane #24",
    "Choco Chip #54",
    "Ginger Man #3",
    "Tree #24",
    "Cookies #14",
    "Jelly Donuts #30",
  ],
  accessories: [
    "Red Headphones #14",
    "Weed #1",
    "Yellow Glasses #12",
    "Blue Glasses #8",
    "Red Glasses #6",
    "Green Headphones #10",
    "Red Glasses #5",
    "Smoke #2",
    "Monocle #1",
    "Green Glasses #5",
    "Black Glasses #20",
    "Purple Glasses #4",
    "Pink Headphones #9",
  ],
};

const attributes: Record<string, string | number> = {};

const Gallery: NextPage = () => {
  return (
    <Layout>
      <Heading>Gallery</Heading>
      <div className="flex flex-col lg:flex-row items-start lg:justify-between gap-12">
        <div>
          <p className="mb-9">Bear with us.</p>
          <p>Will be live after mint.</p>
        </div>

        <div className="flex content-start lg:w-[75%] font-bold mb-8 gap-4">
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 justify-evenly flex-wrap gap-4">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center"
                >
                  <p className="border-yellow border-2 rounded-lg text-5xl flex items-center justify-center">
                    <div className="mx-auto w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] relative">
                      <div className="absolute bottom-1 w-full h-full glow [mask:url('/images/bear-silhouette.png')]"></div>
                    </div>
                  </p>
                  <p>#{i}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="py-10 flex flex-col md:flex-row items-start justify-start gap-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-wrap md:flex-col gap-4 mx-8"
        >
          {Object.keys(filters).map((filter, i) => (
            <div key={i} className="">
              {filter === "id" ? (
                <input
                  type="number"
                  min={1}
                  max={5555}
                  name="id"
                  onChange={(event) => {
                    attributes.id = event.target.value;
                    console.log(attributes);
                    // refetch({
                    //   limit: variables?.limit,
                    //   cursor: variables?.cursor,
                    //   attributes,
                    // });
                  }}
                />
              ) : (
                <select
                  id={filter}
                  name={filter}
                  placeholder={filter}
                  onChange={(e) => {
                    attributes[e.target.name] = e.target.value;
                    console.log(attributes);
                    // refetch({
                    //   limit: variables?.limit,
                    //   cursor: variables?.cursor,
                    //   attributes,
                    // });
                  }}
                >
                  {filters[filter].map((key: string) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
          {/* <Button
              onClick={() => {
                Object.keys(attributes).forEach((attr) => {
                  document.getElementById(attr).selectedIndex = 0;
                  attributes[attr] = "";
                });
                // refetch({
                //   limit: variables?.limit,
                //   cursor: variables?.cursor,
                //   attributes,
                // });
              }}
            >
              Clear Filters
            </Button> 
        </form>
        {/* {loading ? (
            <p>loading</p>
          ) : ( 
        {/* <div className="flex flex-1 flex-col">
          <div className="flex flex-1 justify-evenly flex-wrap gap-4">
            {data && data.nfts.nfts.length > 0 ? (
              data?.nfts.nfts.map((key) => (
                <GalleryCard key={key.id} {...key} />
              ))
            ) : (
              <p>No results for the given filters</p>
            )}
          </div>
          {data?.nfts.hasMore && (
            <Flex m="auto" mt="3rem">
              <Button isLoading={loading} onClick={filterNFTs}>
                Load More…
              </Button>
            </Flex>
          )}
        </div> 
        {/* )} 
      </div> */}
    </Layout>
  );
};

export default Gallery;
