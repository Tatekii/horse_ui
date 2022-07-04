import { tuple } from "../../utils/types.utils";

export const SizeTypes = tuple("small", "middle", "large");
export type SizeType = typeof SizeTypes[number];
