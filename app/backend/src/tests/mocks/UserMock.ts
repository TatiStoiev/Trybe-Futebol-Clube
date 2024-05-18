export const user = {
    email: 'billyjoe@email.com',
    password: 'JustBillie',
  };
  
 export const userInvalidPasswordFormat = {
    email: 'billyjoe@email.br',
    password: '123',
  };
  
 export const wrongPasswordUser = {
    email: 'billyjoe@email.com',
    password: 'senhaerrada',
  };

  export const WithoutEmailUser = {
    email: '',
    password: 'JustBillie',
  };

  export const WithoutPasswordlUser = {
    email: 'billyjoe@email.com',
    password: '',
  };

  export const invalidEmailFormat = {
    email: 'user@user',
    password: 'sJustBillie',
  };

  export const tokenPayload = { 
    email: 'test@example.com', 
    role: 'user' 
  };

 export const userRegistered = { ...user, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };

 export const validLoginBody = { email: 'admin@admin.com', password: 'secret_admin' };