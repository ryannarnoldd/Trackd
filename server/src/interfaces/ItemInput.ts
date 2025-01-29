export default interface IItemInput {
  itemId: string | null;
  title: string | null;
  description?: string | null;
  price?: number | null;
  condition?: string | null;
  image?: string | null;
}
