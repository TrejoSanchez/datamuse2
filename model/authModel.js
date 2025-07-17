const adminCredentials = {
  email: "admin@datamuse.com",
  password: "123456"
};

export function validarCredenciales(email, password) {
  return email === adminCredentials.email && password === adminCredentials.password;
}
