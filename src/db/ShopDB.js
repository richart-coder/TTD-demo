import Dexie from "dexie";

class ShopDB extends Dexie {
  constructor() {
    super("ShoppingCart");

    this.version(1).stores({
      keyValueStore: "key",
    });

    this.keyValueStore = this.table("keyValueStore");
  }

  /**
   * 獲取存儲項 - 模擬 localStorage.getItem
   * @param {string} key - 鍵名
   * @returns {Promise<string|null>} - 值或null
   */
  async getItem(key) {
    const item = await this.keyValueStore.get(key);
    return item ? item.value : null;
  }

  /**
   * 設置存儲項 - 模擬 localStorage.setItem
   * @param {string} key - 鍵名
   * @param {string} value - 值
   * @returns {Promise<void>}
   */
  async setItem(key, value) {
    await this.keyValueStore.put({ key, value });
  }

  /**
   * 刪除存儲項 - 模擬 localStorage.removeItem
   * @param {string} key - 鍵名
   * @returns {Promise<void>}
   */
  async removeItem(key) {
    await this.keyValueStore.delete(key);
  }

  /**
   * 清空存儲 - 模擬 localStorage.clear
   * @returns {Promise<void>}
   */
  async clear() {
    await this.keyValueStore.clear();
  }
}

const db = new ShopDB();

export default db;
