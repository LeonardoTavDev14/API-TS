export interface ICompareProviderRepositories {
  compare(data: string, hashed: string): Promise<boolean>;
}
