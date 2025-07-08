export interface IHashProviderRepositories {
  hash(data: string): Promise<string>;
}
