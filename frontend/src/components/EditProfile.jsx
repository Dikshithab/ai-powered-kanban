import { useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

function EditProfile({ user, onUpdate }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const saveProfile = async () => {

        try{

            const response = await api.put("/users/profile",{
                name,
                email
            });

            toast.success("Profile Updated");

            onUpdate(response.data);

        }
        catch(error){

            console.log(error);
            console.log(error.response);
            console.log(error.response?.data);
            toast.error("Update Failed");

        }

    };

    return(

        <>

            <div className="input-group">

                <label>Name</label>

                <input
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />

            </div>

            <div className="input-group">

                <label>Email</label>

                <input
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

            </div>

            <button
                className="setting-btn"
                onClick={saveProfile}
            >
                Save Changes
            </button>

        </>

    );

}

export default EditProfile;