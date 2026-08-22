export const reducer = (prevState, action) => {
    switch (action.type) {
        // Fired on app start (getSession) and on every Supabase auth event
        // (sign in, sign out, token refresh) via onAuthStateChange.
        case 'RESTORE_SESSION':
            return {
                ...prevState,
                session: action.session,
                userToken: action.session?.user?.id ?? null,
                isSignout: action.session == null,
                isLoading: false,
            };
    }
};

export const initialState = {
    isLoading: true,
    isSignout: false,
    session: null,
    userToken: null,
  };