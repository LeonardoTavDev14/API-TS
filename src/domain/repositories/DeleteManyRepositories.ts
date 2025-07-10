export interface IDeleteManyRepositories {
  deleteMany(id: string): Promise<void>;
}
