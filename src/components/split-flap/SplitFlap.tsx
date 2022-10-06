import { intervalToDuration } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { FC, useEffect } from "react";
import { CTR } from "./SolariBoard";

const SplitFlap: FC = () => {
  useEffect(() => {
    // once the page loads
    // create a SolariDisplay

    /*
		parameters:
		container - the element that will contain the display
		format - an array of either a single character or an array of characters. 
			The length of this format array is the number of segments.
			There are several defines ready to use:
				CTR.SOLARIVALUES.letter: A to Z and space
				CTR.SOLARIVALUES.number: 0 to 9
				CTR.SOLARIVALUES.hour: 00 to 23
				CTR.SOLARIVALUES.minute: 00 to 59
		segmentWidth: the width in pixels of a single segment
		segmentHeight: the height in pixels of a single segment
		fontSize: the size of the font in pixels
	*/

    // this will be the Solari Display object
    if (!document.getElementById("splitflap-container")?.hasChildNodes()) {
      const display = CTR.SolariBoard({
        container: document.getElementById("splitflap-container"),
        format: [
          CTR.SOLARIVALUES.reverseDay,
          ":",
          CTR.SOLARIVALUES.reverseHour,
          ":",
          CTR.SOLARIVALUES.reverseMinute,
          ":",
          CTR.SOLARIVALUES.reverseMinute,
        ],
        segmentWidth: 50,
        segmentHeight: 100,
        fontSize: 70,
      });

      const update = () => {
        const d = intervalToDuration({
          start: new Date(),
          end: new Date("2022-10-26T20:20:00"),
        });

        display.setContent([
          (d.days! < 10 ? "0" : "") + d.days,
          ":",
          (d.hours! < 10 ? "0" : "") + d.hours,
          ":",
          (d.minutes! < 10 ? "0" : "") + d.minutes,
          ":",
          (d.seconds! < 10 ? "0" : "") + d.seconds,
        ]);
      };

      setInterval(update, 1000);
    }
  }, []);

  return (
    <div id="viewport" className="displayBase">
      <div id="splitflap-container"></div>
    </div>
  );
};

export default SplitFlap;
