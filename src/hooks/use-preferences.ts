import { useLocalStorage } from "usehooks-ts";

import { Preferences } from "src/types";

interface PreferenceHookRtn {
  preferences: Preferences;
  savePreferences: (preferences: Preferences) => void;
}

export const usePreferences = (): PreferenceHookRtn => {
  const [preferences, savePreferences] = useLocalStorage<Preferences>(
    "swim-lane-preferences",
    {
      venueIds: [],
    }
  );
  return { preferences, savePreferences };
};
