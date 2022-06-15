export interface MapData {
  width: number;
  height: number;
  data: string;
}

export const mapData1: MapData = {
  data: `
##########
#...#....#
###.#.#.##
#.....#.##
#.###.#.##
#.#.....##
#.#####..#
#.#...##.#
#...#....#
##########
`,
  width: 10,
  height: 10,
};
