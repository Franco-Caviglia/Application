package com.challenge_java_angula.backend.validation;

import com.challenge_java_angula.backend.app.entity.Admin;

public class AdminValidation {
    public ValidationResponse validate(Admin admin){

        ValidationResponse validationResponse = new ValidationResponse();

        validationResponse.setNumOfErrors(0);

        if(admin.getEmail() == null ||
            !admin.getEmail().matches("^([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$")){
            validationResponse.setNumOfErrors(validationResponse.getNumOfErrors() + 1);
            validationResponse.setMessage("El email debe tener un formato válido");
        }

        if(admin.getPassword() == null ||
        admin.getPassword().length() < 8 ) {
            validationResponse.setNumOfErrors(validationResponse.getNumOfErrors() + 1);
            validationResponse.setMessage("La contraseña debe tener 8 o más caracteres");
        }

        return validationResponse;
    }
}
