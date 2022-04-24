class Store {
  constructor() {}
  public get(key: string): Promise<any | undefined> {
    const resolve = window.electron.setting.get(key);
    return resolve;
  }

  public set(
    key: string,
    value: string | number | object
  ): Promise<string | undefined> {
    return window.electron.setting
      .set({ key, value })
      .then(() => 'success')
      .catch((err: string) => err);
  }
}

export default Store;
