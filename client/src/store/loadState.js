export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('wc_st');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('dt_st', serializedState);
  } catch (err) {
    // TODO: save state error notification
  }
};
