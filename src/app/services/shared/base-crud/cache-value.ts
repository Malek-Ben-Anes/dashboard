export class CacheValue<T> {
  public constructor(
    public key: string,
    public value: T,
    public expire: Date,
  ) { }
}
