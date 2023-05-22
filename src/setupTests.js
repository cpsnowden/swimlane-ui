import "@testing-library/jest-dom";
import { createSerializer } from "@emotion/jest";
import axios from "axios";

// Snapshots should show CSS for magic MUI classes
expect.addSnapshotSerializer(createSerializer());

axios.defaults.adapter = "http";

const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });
