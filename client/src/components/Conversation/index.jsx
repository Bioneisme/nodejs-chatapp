import React, {useEffect, useState} from "react";
import API from "../../api";

const Conversation = ({conversation, currentUser}) => {
    const [user, setUser] = useState(null)

    useEffect(async () => {
        const friendId = conversation.users.find(m => m != currentUser.id)

        try {
            const res = await API.get('/getUserById/' + friendId)
            setUser(res.data)
        } catch (e) {
            console.log(e)
        }
    }, []);

    if (!user) return "Loading..."

    return (
        <div className="text-center">
            <img className="rounded-circle border border-dark contacts-image"
                 src={user.image}/>
            <p>{user.nickname}</p>
        </div>
    );
};
export default Conversation;