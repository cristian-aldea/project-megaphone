import { WasteCategory, WasteClassMapType } from '@project-megaphone/types';

export const MULL_MODEL_URL =
  'https://raw.githubusercontent.com/cristian-aldea/mull-model/main/tfjs-2/model.json';

export const wasteClassMap: WasteClassMapType = {
  bottle: {
    category: WasteCategory.RECYCLABLE,
    info: "Whether made in plastic or glass, they are recyclable. Just make sure they're clean!",
  },
  box: {
    category: WasteCategory.RECYCLABLE,
    info: "Boxes are typically made of cardboard, and are recyclable. Just make sure they're clean!",
  },
  'computer keyboard': {
    category: WasteCategory.EWASTE,
    info: 'Electronic devices like keyboards should be disposed of at specialized e-centers.',
  },
  food: { category: WasteCategory.COMPOST, info: 'Food goes in the compost!' },
  'mobile phone': {
    category: WasteCategory.EWASTE,
    info: 'Electronic devices like phones should be disposed of at specialized e-centers.',
  },
  'plastic bag': {
    category: WasteCategory.TRASH,
    info: 'Plastic bags can be reused. Otherwise, they must be thrown in the garbage.',
  },
  'tin can': { category: WasteCategory.RECYCLABLE, info: 'Metal cans can be recycled!' },
};

export const WasteIconUrlMap: { [a in WasteCategory]: string } = {
  [WasteCategory.COMPOST]: 'assets/icons/compost-icon.svg',
  [WasteCategory.EWASTE]: 'assets/icons/e-waste-icon.svg',
  [WasteCategory.TRASH]: 'assets/icons/trash-icon.svg',
  [WasteCategory.RECYCLABLE]: 'assets/icons/recycle-icon.svg',
};

export const WasteIconMap: { [a in WasteCategory]: HTMLImageElement } = {
  [WasteCategory.COMPOST]: new Image(),
  [WasteCategory.EWASTE]: new Image(),
  [WasteCategory.TRASH]: new Image(),
  [WasteCategory.RECYCLABLE]: new Image(),
};

for (const [category, image] of Object.entries(WasteIconMap)) {
  image.src = WasteIconUrlMap[category];
}
