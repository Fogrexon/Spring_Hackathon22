type Direction = 'gUp' | 'gDown' | 'gLeft' | 'gRight' | 'gNone';

export interface GhostData {
    gx: number;
    gy: number;
    ginterval: number;
    gtargetX: number;
    gtargetY: number;
    gpreX: number;
    gpreY: number;
    gstart: number;
    gdirect: Direction;
  }
