export interface ImageType {
  id: string;
  path: string;
}

export interface MaterialType {
  name: string;
  amount: string;
}

export interface FlavorType {
  name: string;
  amount: string;
}

export interface MethodType {
  description: string;
  time: number;
}

export interface MethodListType {
  image: ImageType;
  method: MethodType[];
}
