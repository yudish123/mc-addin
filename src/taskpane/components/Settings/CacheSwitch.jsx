import { Switch } from "@fluentui/react-components";
import React, { useState, useEffect } from "react";
import { useGlobalstyles } from "../../hooks/styles/useGlobalstyles";
import { Colors } from "../../utils/constants";

const CacheSwitch = () => {
  const globalStyles = useGlobalstyles();
  const [cacheState, setCacheState] = useState(false);
  const [fetchingState, setFetchingState] = useState(true);

  const fetchCacheState = async () => {
    try {
      const cacheState = await OfficeRuntime.storage.getItem("cacheState");
      if (cacheState === null) {
        await OfficeRuntime.storage.setItem("cacheState", true);
        setCacheState(true);
        return;
      }
      setCacheState(cacheState === "true");
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingState(false);
    }
  };

  const handleSwitchChange = async (event) => {
    try {
      const value = event.currentTarget.checked;
      await OfficeRuntime.storage.setItem("cacheState", value);
      setCacheState(value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCacheState();
  }, []);
  return (
    <>
      {fetchingState ? (
        <div className={globalStyles.h3}>Fetching cache state...</div>
      ) : (
        <Switch
          style={{ alignSelf: "flex-start", color: Colors.accent }}
          checked={cacheState}
          onChange={handleSwitchChange}
        />
      )}
    </>
  );
};

export default CacheSwitch;
