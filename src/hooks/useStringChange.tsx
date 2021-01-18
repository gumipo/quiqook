import React, { useCallback, SetStateAction, Dispatch } from "react";

const useStringChange = (update: Dispatch<SetStateAction<string>>) => {
  return useCallback(
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      update(event.target.value);
    },
    [update]
  );
};

export default useStringChange;
