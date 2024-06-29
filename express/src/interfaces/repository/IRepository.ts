interface IRepository<T> {
  find?(id?: number): Promise<T> | null;
  find_by?(params?: any): Promise<T> | null;
  create?(params?: any): Promise<T>;
  update?(params?: any): Promise<T>;
  where?(params?: any): Promise<Array<T>>;
}
