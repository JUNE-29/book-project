// import { login, logout, onUserStateChange } from '@/lib/db-util';
// import { useContext, createContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//     const [user, setUser] = useState();

//     useEffect(() => {
//         onUserStateChange((user) => {
//             console.log(user);
//             setUser(user);
//         });
//     }, []);

//     return (
//         <AuthContext.Provider
//             value={{
//                 user,
//                 uid: user && user.uid,
//                 login: login,
//                 logout: logout,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };
// export function useAuthContext() {
//     return useContext(AuthContext);
// }
