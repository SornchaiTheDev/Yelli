class Store {
  get(key: string): Promise<string> {
    const resolve = window.electron.setting.get(key);
    return resolve;
  }

  set(key: string, value: string | number): Promise<string> {
    return window.electron.setting
      .set({ key, value })
      .then(() => 'success')
      .catch((err: string) => err);
  }
}

export default Store;