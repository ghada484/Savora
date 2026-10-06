import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

const DEMO_ADMIN = {
  id: "demo-admin",
  name: "Savora Admin",
  email: "admin@savora.com",
  phone: "01000000000",
  password: "admin123",
  role: "admin",
};

const getSavedUsers = () => {
  try {
    return (
      JSON.parse(
        localStorage.getItem("savoraUsers")
      ) || []
    );
  } catch (error) {
    return [];
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser =
        localStorage.getItem("savoraUser");

      return savedUser
        ? JSON.parse(savedUser)
        : null;
    } catch (error) {
      return null;
    }
  });


  // Create demo admin automatically
  useEffect(() => {
    const savedUsers = getSavedUsers();

    const adminExists = savedUsers.some(
      (item) =>
        item.email?.toLowerCase() ===
        DEMO_ADMIN.email.toLowerCase()
    );

    if (!adminExists) {
      localStorage.setItem(
        "savoraUsers",
        JSON.stringify([
          ...savedUsers,
          DEMO_ADMIN,
        ])
      );
    }
  }, []);


  // Save logged-in user
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "savoraUser",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("savoraUser");
    }
  }, [user]);


  // Register
  const register = (userData) => {
    const savedUsers = getSavedUsers();

    const existingUser = savedUsers.find(
      (item) =>
        item.email?.toLowerCase() ===
        userData.email.toLowerCase()
    );

    if (existingUser) {
      return {
        success: false,
        message:
          "An account with this email already exists.",
      };
    }

    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      role: "customer",
    };

    const updatedUsers = [
      ...savedUsers,
      newUser,
    ];

    localStorage.setItem(
      "savoraUsers",
      JSON.stringify(updatedUsers)
    );

    const loggedInUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
    };

    setUser(loggedInUser);

    return {
      success: true,
      message: "Account created successfully.",
    };
  };


  // Login
  const login = (email, password) => {
    const savedUsers = getSavedUsers();

    const foundUser = savedUsers.find(
      (item) =>
        item.email?.toLowerCase() ===
          email.toLowerCase() &&
        item.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const loggedInUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      phone: foundUser.phone,
      role: foundUser.role,
    };

    setUser(loggedInUser);

    return {
      success: true,
      message: "Login successful.",
    };
  };


  // Logout
  const logout = () => {
    setUser(null);
  };


  // Update profile
  const updateUser = (updatedData) => {
    if (!user) {
      return;
    }

    const savedUsers = getSavedUsers();

    const updatedUsers = savedUsers.map(
      (item) =>
        item.id === user.id
          ? {
              ...item,
              ...updatedData,
            }
          : item
    );

    localStorage.setItem(
      "savoraUsers",
      JSON.stringify(updatedUsers)
    );

    setUser({
      ...user,
      ...updatedData,
    });
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}