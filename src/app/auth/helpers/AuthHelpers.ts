export const setAuthentication = (token: string, refreshToken: string): void   => {
  localStorage.setItem('accessToken', token);
  localStorage.setItem('refreshToken', refreshToken);
}
