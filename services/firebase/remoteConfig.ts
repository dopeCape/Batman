import { remoteConfig } from "@/firebaseConfig";
import { fetchAndActivate, getValue } from "firebase/remote-config";
import { Dispatch } from "react";

export const getConfigValue = async (
  key: string,
  setStateCallback: Dispatch<any>,
  saveLocal: boolean = false
) => {
  console.log(`Getitng Config for ${key}`);
  const firebaseRemoteConfig = remoteConfig;
  if (firebaseRemoteConfig) {
    await fetchAndActivate(firebaseRemoteConfig).then(() => {
      const data = getValue(firebaseRemoteConfig, key).asString();
      console.log(`Getitng Config for ${key}`, data);
      setStateCallback(JSON.parse(data));
      if (saveLocal) {
        localStorage.setItem(key, data);
      }
    });
  }
};
