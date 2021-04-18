export interface Coordinates {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface BoundingBox extends Coordinates, Size {}

export enum WasteCategory {
  TRASH = 'Trash',
  RECYCLABLE = 'Recyclable',
  COMPOST = 'Compost',
  EWASTE = 'E-Waste',
}

/**
 * This array constant must be updated according to the content of
 * ml/trash-recognition/annotations/label_map.pbtxt
 */
export const wasteClasses = [
  'bottle',
  'box',
  'computer keyboard',
  'food',
  'mobile phone',
  'plastic bag',
  'tin can',
] as const;

export type WasteClassesType = typeof wasteClasses[number];

export type WasteClassMapType = {
  [key in WasteClassesType]: { category: WasteCategory; info: string };
};

export interface DetectionResult {
  class: WasteClassesType;
  bndBox: BoundingBox;
  confidence: number;
}
