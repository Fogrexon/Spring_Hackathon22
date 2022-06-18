type Direction = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'None';

export interface PlayerData {
  x: number;
  y: number;
  direction: Direction;
  targetX: number;
  targetY: number;
  preX: number;
  preY: number;
  start: number;
  have: number; // 今持っているアイテムの数
  nouhin: number; // 納品したアイテムの数
}
