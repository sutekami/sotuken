interface IRepository<T> {
  find?(id?: number): Promise<T> | null;
  first?(params?: any): Promise<T> | null;
  findBy?(params?: any): Promise<T> | null;
  create?(params?: any): Promise<T>;
  update?(params?: any): Promise<T>;
  where?(params?: any): Promise<Array<T>>;
}
