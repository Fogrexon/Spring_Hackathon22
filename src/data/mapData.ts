export interface MapData {
  width: number; // マップの横の長さ
  height: number; // マップの縦の長さ
  data: string;
  items: number[][]; // アイテムの場所[x,y]の配列にする。  y * width + x番目 アイテムをとりあえず四隅に置くことにする。
  exist: boolean[]; // 長さがitemsと等しい i番目の値は、items[i]がまだとられていなかったらtrue, 取られたらfalseにする。
  post: number[]; // 納品場所[x,y]を示す長さ2の配列
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
  items: [[8, 1], [1, 8], [8, 8]],
  exist: [true, true, true],
  post: [5, 4],
};

export const mapData2: MapData = {
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
  items: [[8, 1], [1, 8], [8, 8]],
  exist: [true, true, true],
  post: [5, 4],
};

export const mapData3: MapData = {
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
  items: [[8, 1], [1, 8], [8, 8]],
  exist: [true, true, true],
  post: [5, 4],
};
