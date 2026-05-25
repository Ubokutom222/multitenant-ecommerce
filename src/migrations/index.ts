import * as migration_20260520_090406 from "./20260520_090406";
import * as migration_20260520_093629 from "./20260520_093629";
import * as migration_20260520_095031 from "./20260520_095031";
import * as migration_20260525_071504 from "./20260525_071504";

export const migrations = [
  {
    up: migration_20260520_090406.up,
    down: migration_20260520_090406.down,
    name: "20260520_090406",
  },
  {
    up: migration_20260520_093629.up,
    down: migration_20260520_093629.down,
    name: "20260520_093629",
  },
  {
    up: migration_20260520_095031.up,
    down: migration_20260520_095031.down,
    name: "20260520_095031",
  },
  {
    up: migration_20260525_071504.up,
    down: migration_20260525_071504.down,
    name: "20260525_071504",
  },
];
