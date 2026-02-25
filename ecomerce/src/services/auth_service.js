const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Falha no authService.logout:', error);
    return false;
  }
};

const checkAuthStatus = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    if (!session) throw new Error('Não autenticado');
    return true;
  } catch (error) {
    // console.warn('Falha no checkAuthStatus:', error);
    throw error;
  }
};

export const authService = {
  login,
  register,
  logout,
  checkAuthStatus,
};