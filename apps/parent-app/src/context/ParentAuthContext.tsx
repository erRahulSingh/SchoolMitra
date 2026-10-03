import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parentApi } from "../lib/api";

export interface StudentChild {
  id: string;
  name: string;
  rollNo?: string;
  admissionNo?: string;
  class?: string;
  section?: string;
  gender?: string;
  bloodGroup?: string;
  photo?: string | null;
  status?: string;
  schoolName?: string;
  schoolCode?: string;
  fatherName?: string;
  motherName?: string;
  dateOfBirth?: string;
  address?: string;
  phone?: string;
  email?: string;
  busNo?: string;
  teacherName?: string;
  attendanceRate?: string;
  dueFee?: string;
}

export interface ParentUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  schoolId?: string;
  schoolName?: string;
  schoolCode?: string;
}

export interface ParentProfile {
  id: string;
  name: string;
  relation: string;
  phone: string;
  email?: string;
  fatherName?: string;
  motherName?: string;
}

interface ParentAuthContextType {
  user: ParentUser | null;
  parent: ParentProfile | null;
  children: StudentChild[];
  currentChild: StudentChild | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
    relation?: string;
    schoolCode?: string;
    childName?: string;
    studentAdmissionNo?: string;
    childClass?: string;
    studentId?: string;
    rollNo?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  selectChild: (childId: string) => void;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const ParentAuthContext = createContext<ParentAuthContextType>({
  user: null,
  parent: null,
  children: [],
  currentChild: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  selectChild: () => {},
  logout: async () => {},
  refreshSession: async () => {},
});

export const ParentAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ParentUser | null>(null);
  const [parent, setParent] = useState<ParentProfile | null>(null);
  const [childrenList, setChildrenList] = useState<StudentChild[]>([]);
  const [currentChild, setCurrentChild] = useState<StudentChild | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load existing session on app startup
  useEffect(() => {
    loadSavedSession();
  }, []);

  const fetchLiveChildren = async (userId: string) => {
    try {
      const res = await parentApi.getParentChildren(userId);
      if (res.success && Array.isArray(res.data?.children) && res.data.children.length > 0) {
        const liveKids: StudentChild[] = res.data.children;
        setChildrenList(liveKids);
        await AsyncStorage.setItem("parent_children", JSON.stringify(liveKids));
        setCurrentChild((prev) => {
          if (!prev) return liveKids[0];
          const match = liveKids.find((k: any) => k.id === prev.id || k._id === prev.id);
          return match || liveKids[0];
        });
      }
    } catch (e) {
      console.warn("[ParentAuthContext] Live children sync warning:", e);
    }
  };

  const loadSavedSession = async () => {
    try {
      setIsLoading(true);
      const savedToken = await AsyncStorage.getItem("accessToken");
      const savedUserStr = await AsyncStorage.getItem("parent_user");
      const savedParentStr = await AsyncStorage.getItem("parent_profile");
      const savedChildrenStr = await AsyncStorage.getItem("parent_children");
      const savedCurrentChildId = await AsyncStorage.getItem("selected_child_id");

      if (savedToken && savedUserStr) {
        setToken(savedToken);
        const parsedUser = JSON.parse(savedUserStr);
        setUser(parsedUser);

        if (savedParentStr) {
          setParent(JSON.parse(savedParentStr));
        }

        if (savedChildrenStr) {
          const parsedChildren = JSON.parse(savedChildrenStr);
          setChildrenList(parsedChildren);

          if (savedCurrentChildId) {
            const found = parsedChildren.find((c: any) => c.id === savedCurrentChildId);
            setCurrentChild(found || parsedChildren[0] || null);
          } else if (parsedChildren.length > 0) {
            setCurrentChild(parsedChildren[0]);
          }
        }

        // Background sync latest children from server
        if (parsedUser?.id) {
          fetchLiveChildren(parsedUser.id);
        }
      }
    } catch (err) {
      console.warn("[ParentAuthContext] Failed to load saved session:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = async (resData: any) => {
    const accessToken = resData.accessToken;
    const refreshToken = resData.refreshToken;
    const userData: ParentUser = resData.user;
    const parentData: ParentProfile = resData.parent;
    const kids: StudentChild[] = resData.children || [];
    const activeChild: StudentChild = resData.currentChild || (kids.length > 0 ? kids[0] : null);

    setToken(accessToken);
    setUser(userData);
    setParent(parentData);
    setChildrenList(kids);
    setCurrentChild(activeChild);

    // Save tokens and profile to AsyncStorage
    await AsyncStorage.setItem("accessToken", accessToken);
    if (refreshToken) {
      await AsyncStorage.setItem("refreshToken", refreshToken);
    }
    await AsyncStorage.setItem("parentToken", accessToken); // Backwards compatibility
    await AsyncStorage.setItem("parent_user", JSON.stringify(userData));
    if (parentData) {
      await AsyncStorage.setItem("parent_profile", JSON.stringify(parentData));
    }
    if (kids.length > 0) {
      await AsyncStorage.setItem("parent_children", JSON.stringify(kids));
    }
    if (activeChild) {
      await AsyncStorage.setItem("selected_child_id", activeChild.id);
    }
  };

  const login = async (identifier: string, password: string) => {
    try {
      setIsLoading(true);
      const isEmail = identifier.includes("@");
      const payload: any = { password };
      if (isEmail) {
        payload.email = identifier.trim().toLowerCase();
      } else {
        // Assume phone
        payload.phone = identifier.trim();
        payload.email = identifier.trim(); // Server checks both
      }

      const res = await parentApi.login(payload);

      if (res.success && res.data) {
        await handleAuthSuccess(res.data);
        return { success: true, message: res.message || "Welcome back!" };
      } else {
        return { success: false, message: res.message || "Login failed. Please check your credentials." };
      }
    } catch (err: any) {
      return { success: false, message: err?.message || "An unexpected error occurred during login." };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
    relation?: string;
    schoolCode?: string;
    childName?: string;
    studentAdmissionNo?: string;
    childClass?: string;
    studentId?: string;
    rollNo?: string;
  }) => {
    try {
      setIsLoading(true);
      const res = await parentApi.register(payload);

      if (res.success && res.data) {
        await handleAuthSuccess(res.data);
        return { success: true, message: res.message || "Account created successfully!" };
      } else {
        return { success: false, message: res.message || "Registration failed." };
      }
    } catch (err: any) {
      return { success: false, message: err?.message || "An error occurred during registration." };
    } finally {
      setIsLoading(false);
    }
  };

  const selectChild = async (childId: string) => {
    const found = childrenList.find((c) => c.id === childId);
    if (found) {
      setCurrentChild(found);
      await AsyncStorage.setItem("selected_child_id", childId);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([
        "accessToken",
        "refreshToken",
        "parentToken",
        "parent_user",
        "parent_profile",
        "parent_children",
        "selected_child_id",
      ]);
    } catch (err) {
      console.warn("[ParentAuthContext] Logout storage clearing error:", err);
    } finally {
      setToken(null);
      setUser(null);
      setParent(null);
      setChildrenList([]);
      setCurrentChild(null);
    }
  };

  const refreshSession = async () => {
    await loadSavedSession();
  };

  return (
    <ParentAuthContext.Provider
      value={{
        user,
        parent,
        children: childrenList,
        currentChild,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        selectChild,
        logout,
        refreshSession,
      }}
    >
      {children}
    </ParentAuthContext.Provider>
  );
};

export const useParentAuth = () => useContext(ParentAuthContext);
export default ParentAuthContext;
