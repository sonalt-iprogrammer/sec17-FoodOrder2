import React from "react";
import classes from './Checkout.module.css';
import { useRef ,useState} from 'react';

const isEmpty =(value)=> value.trim()==='';

const isFiveChar =(value)=> value.trim().length===6;



const Checkout = (props) =>{

    const[isFormValid,setIsFormValid]= useState({
        name:true,
        Street:true,
        City:true,
        Pincode:true,
    });




    const NameRef=useRef();
    const StreetRef=useRef();
    const CityRef=useRef();
    const PincodeRef=useRef();
    //const NameRef=useRef();

    const submitHandler=(event)=>{
        event.preventDefault();

        const Name = NameRef.current.value;
        const Street = StreetRef.current.value;
        const City = CityRef.current.value;
        const Pincode = PincodeRef.current.value;
    console.log(Name)
        
        const ValidName= !isEmpty(Name);
        const ValidStreet= !isEmpty(Street);
        const ValidCity= !isEmpty(City);
        const ValidPin= isFiveChar(Pincode);
       // console.log(ValidPin);

        const ValidForm = ValidName&&ValidStreet&&ValidCity&& ValidPin;
         if(!ValidForm){
             setIsFormValid({
                name:ValidName,
                Street:ValidStreet,
                City:ValidCity,
                Pincode:ValidPin

             });
             return;
         }

         props.onConfirm({
             Name:Name,
             Street:Street,
             City:City,
             Pincode:Pincode

         });


        

        

    };


    const NameClasses=`${classes.control} ${isFormValid.name?"":classes.invalid}`;
    const StreetClasses=`${classes.control} ${isFormValid.Street?"":classes.invalid}`;
    const CityClasses=`${classes.control} ${isFormValid.City?"":classes.invalid}`;
    const PinClasses=`${classes.control} ${isFormValid.Pincode?"":classes.invalid}`;

    console.log(NameClasses);
  


    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={NameClasses}>
                <label htmlFor="name">Name</label>
                <input type='text' id="name"ref={NameRef} />
                {!isFormValid.name&&<p> Name Is Not Valid</p>}
            </div>
            <div className={StreetClasses}>
                <label htmlFor="Street">Street</label>
                <input type='text' id="Street"ref={StreetRef} />
                {!isFormValid.Street&&<p> Street Is Not Valid</p>}
            </div>
            <div className={CityClasses}>
                <label htmlFor="City">City</label>
                <input type='text' id="City"ref={CityRef}/>
                {!isFormValid.City&&<p> City Is Not Valid</p>}
            </div>
            <div className={PinClasses}>
                <label htmlFor="Pincode">Pincode</label>
                <input type='text' id="Pincode" ref={PincodeRef} />
                {!isFormValid.Pincode&&<p> Pincode Is Not Valid(must be 6 digit)</p>}
            </div>
            <div className={classes.actions}>
                <button onClick={props.onClose}>Cancel</button>
                <button className={classes.submit}>Submit</button>
            </div>
        </form>
    );

};
export default Checkout;