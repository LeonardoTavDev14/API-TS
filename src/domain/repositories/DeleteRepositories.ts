export interface IDeleteRepositories {
  delete(id: string): Promise<void>;
}
