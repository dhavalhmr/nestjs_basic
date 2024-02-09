import * as bcryptjs from 'bcryptjs';

export function comparePassword(password, UserPassword) {
  return bcryptjs.compare(password, UserPassword);
}

export function bcryptHashPassword(password) {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
}
