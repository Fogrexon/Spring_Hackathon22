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
`.replace(/\n/g, ''),
  width: 10,
  height: 10,
};
