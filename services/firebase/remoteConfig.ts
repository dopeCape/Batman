import { remoteConfig } from "@/firebaseConfig";
import { fetchAndActivate, getValue } from "firebase/remote-config";
import { Dispatch } from "react";

export const getConfigValue = async (
  key: string,
  setStateCallback: Dispatch<any>,
  saveLocal: boolean = false
) => {
  const firebaseRemoteConfig = remoteConfig;
  if (firebaseRemoteConfig) {
    await fetchAndActivate(firebaseRemoteConfig).then(() => {
      const data = getValue(firebaseRemoteConfig, key).asString();
      setStateCallback(JSON.parse(data));
      if (saveLocal) {
        localStorage.setItem(key, data);
      }
    });
  }
};
