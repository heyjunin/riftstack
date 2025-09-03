import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { trpc } from '../lib/trpc';

export function useAuth() {
  const navigate = useNavigate();
  
  // Queries
  const { data: user, isLoading: isLoadingUser } = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Mutations
  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => {
      navigate('/');
    },
  });

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: () => {
      navigate('/');
    },
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      navigate('/login');
    },
  });

  const updateProfileMutation = trpc.user.updateProfile.useMutation();
  const changePasswordMutation = trpc.user.changePassword.useMutation();

  // Actions
  const login = useCallback(async (email: string, password: string) => {
    try {
      await loginMutation.mutateAsync({ email, password });
    } catch (error) {
      throw error;
    }
  }, [loginMutation]);

  const register = useCallback(async (email: string, username: string, password: string) => {
    try {
      await registerMutation.mutateAsync({ email, username, password });
    } catch (error) {
      throw error;
    }
  }, [registerMutation]);

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error('Logout error:', error);
      // Force navigation even if logout fails
      navigate('/login');
    }
  }, [logoutMutation, navigate]);

  const updateProfile = useCallback(async (updates: { username: string; email?: string }) => {
    try {
      return await updateProfileMutation.mutateAsync(updates);
    } catch (error) {
      throw error;
    }
  }, [updateProfileMutation]);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
      return await changePasswordMutation.mutateAsync({ currentPassword, newPassword });
    } catch (error) {
      throw error;
    }
  }, [changePasswordMutation]);

  return {
    // State
    user,
    isLoadingUser,
    isAuthenticated: !!user,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    
    // Mutation states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isUpdatingProfile: updateProfileMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    
    // Errors
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    updateProfileError: updateProfileMutation.error,
    changePasswordError: changePasswordMutation.error,
  };
}
