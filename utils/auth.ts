'use client'

const TOKEN_STORAGE_PREFIX = 'ZDCRM_HUB';

export const authTokenStorage = {
  getToken: () =>
    typeof window !== undefined ? JSON.parse(
      window.localStorage.getItem(`${TOKEN_STORAGE_PREFIX}_TOKEN`) as string,
    ) : null,

  setToken: (token: string) => {
    if (typeof window !== undefined) {
      window.localStorage.setItem(
        `${TOKEN_STORAGE_PREFIX}_TOKEN`,
        JSON.stringify(token),
      );
    }
    else {
      return
    }

  },

  clearToken: () => {
    if(typeof window !== undefined){
      window.localStorage.removeItem(`${TOKEN_STORAGE_PREFIX}_TOKEN`);
    }
    else{
      return
    }
  },
};
