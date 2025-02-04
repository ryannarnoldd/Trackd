export default interface IItemInput {
  name: string | "Empty Item";
  description?: string | null;
  price?: number | null;
  condition?: string | null;
  image?: string | null;
}
