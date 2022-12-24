/**
  * Contact Object
  * 
  * testValidContact() = Test les data contact avec des REG_EX 
  * Affichage message erreur 
  * @return {boolean} 
  */
export default class contactcart {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    } 
    testValidContact(){
      // MAsque regEx validation formulaire
      const REG_EX_MASK_NAME = /^[A-Za-z]{2,38}$/;
      const REG_EX_MASK_ADDRESS =  /^[0-9]{1,5}\s+[A-Za-zéèàïêç\-\s]{2,50}$/;
      const REG_EX_MASK_CITY = /^[A-Za-zéèàïêç\-\s]{1,50}\s+[0-9]{5}$/; // City + zip code
      const REG_EX_MASK_MAIL =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   
      // Vérification si la fonction return vrai ou faux
     let firstname_valid = REG_EX_MASK_NAME.test(this.firstName);
     let lastname_valid = REG_EX_MASK_NAME.test(this.lastName);
     let adress_valid = REG_EX_MASK_ADDRESS.test(this.address);
     let city_valid = REG_EX_MASK_CITY.test(this.city);
     let email_valid = REG_EX_MASK_MAIL.test(this.email);
   
     if (!firstname_valid){
       // Error
       document.querySelector("#firstNameErrorMsg").innerText = "Merci de renseigner votre Prenom";
     }else{
       document.querySelector("#firstNameErrorMsg").innerText = "";
     }
     if (!lastname_valid){
       // Error
       document.querySelector("#lastNameErrorMsg").innerText = "Merci de renseigner votre Nom";
     }else{
       document.querySelector("#lastNameErrorMsg").innerText = "";
     }
     if (!adress_valid){
       // Error
       document.querySelector("#addressErrorMsg").innerText = "Renseigner votre adresse";
     }else{
       document.querySelector("#addressErrorMsg").innerText = "";
     }
     if (!city_valid){
       // Error
       document.querySelector("#cityErrorMsg").innerText = "Renseigner votre ville et votre code postal.";
     }else{
       document.querySelector("#cityErrorMsg").innerText = "";
     }
     if (!email_valid){
       // Error
       document.querySelector("#emailErrorMsg").innerText = "E-mail non valide.";
     }else{
       document.querySelector("#emailErrorMsg").innerText = "";
     }
   
     if (firstname_valid && lastname_valid && adress_valid && city_valid && email_valid){
       return true;
     } else {
       return false;
     }
   }
  }