export const user = {
    id: 1,
    name: 'Billy Joe',
    email: 'billyjoe@email.com',
    password: 'JustBillie',
  };
  
 export const userWithoutPassword = {
    id: 1,
    name: 'Billy Joe',
    email: 'billyjoe@email.com',
  };
  
 export const wrongPasswordUser = {
    id: 1,
    name: 'Billy Joe',
    email: 'billyjoe@email.com',
    password: 'senhaerrada',
  };

 export const userRegistered = { ...user, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };

 export const validLoginBody = { email: 'admin@admin.com', password: 'secret_admin' };