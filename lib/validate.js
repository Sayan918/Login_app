export default function login_validate (values){
    const errors = {};
 
  
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length<8||values.password.length > 20) {
        errors.password = 'Must be greater than 8 charcters and less than 20 characters ';
      }
      else if(values.password.includes(" ")){
        errors.password="invalid password"
      }
  
    return errors; 
}
export function signup_validate (values){
    const errors = {};
  if(!values.username){
    errors.username ="*Required"

  }else if(values.username.includes(" ")){
    errors.username ="should not have any space in usename"
  }
  
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length<8||values.password.length > 20) {
        errors.password = 'Must be greater than 8 charcters and less than 20 characters ';
      }
      else if(values.password.includes(" ")){
        errors.password="invalid password"
      }


    if (!values.conpassword) {
        errors.conpassword = 'Required';
      } else if (values.conpassword !== values.password) {
        errors.conpassword = 'password does not match ';
      } else if(values.conpassword.includes(" ")){
        errors.conpassword="invalid confirm password"
      }

      
  
    return errors; 
}